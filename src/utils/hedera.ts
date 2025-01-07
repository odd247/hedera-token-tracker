import axios from 'axios';

const BASE_URL = '/api';

export interface TokenHolder {
  account: string;
  balance: string;
  percentage: number;
}

export interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: string;
}

export interface TokenHoldersResponse {
  holders: TokenHolder[];
  stats: {
    totalAccounts: string;
    accountsAboveOne: number;
  };
}

function formatTokenId(tokenId: string): string {
  // Remove any spaces and convert to lowercase
  tokenId = tokenId.trim().toLowerCase();
  
  // If it's already in shard.realm.num format, return as is
  if (tokenId.includes('.')) {
    return tokenId;
  }
  
  // If it's just a number, convert to 0.0.number format
  if (/^\d+$/.test(tokenId)) {
    return `0.0.${tokenId}`;
  }
  
  return tokenId;
}

export async function getTokenInfo(tokenId: string): Promise<TokenInfo> {
  try {
    const formattedTokenId = formatTokenId(tokenId);
    const url = `https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/${formattedTokenId}`;
    console.log('Fetching from:', url);
    const response = await axios.get(url);
    
    return {
      name: response.data.name,
      symbol: response.data.symbol,
      decimals: Number(response.data.decimals),
      total_supply: response.data.total_supply
    };
  } catch (error: any) {
    console.error('Error fetching token info:', error.response?.data || error.message);
    throw error;
  }
}

export async function getTokenHolders(tokenId: string, limit: number = 50): Promise<TokenHoldersResponse> {
  try {
    const formattedTokenId = formatTokenId(tokenId);
    const url = `https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/${formattedTokenId}/balances?limit=${limit}&order=desc`;
    console.log('Fetching from:', url);
    const response = await axios.get(url);
    
    // Debug response
    console.log('Raw token holders response:', JSON.stringify(response.data, null, 2));

    if (!response.data || !response.data.balances) {
      console.error('Invalid response format:', response.data);
      throw new Error('Invalid response format from Hedera API');
    }

    let totalSupply = '0';
    try {
      const infoResponse = await getTokenInfo(tokenId);
      totalSupply = infoResponse.total_supply;
      console.log('Total supply:', totalSupply);
    } catch (error) {
      console.error('Error fetching total supply:', error);
      totalSupply = '0';
    }

    const validBalances = response.data.balances.filter((balance: any) => {
      const isValid = balance && 
        typeof balance.account === 'string' && 
        typeof balance.balance === 'string' &&
        BigInt(balance.balance) > BigInt(0);
      
      if (!isValid) {
        console.log('Invalid balance entry:', balance);
      }
      
      return isValid;
    });

    console.log('Valid balances count:', validBalances.length);

    const holders = validBalances.map((balance: any) => {
      const percentage = calculatePercentage(balance.balance, totalSupply);
      console.log(`Holder ${balance.account}: Balance ${balance.balance}, Percentage ${percentage}%`);
      
      return {
        account: balance.account,
        balance: balance.balance,
        percentage
      };
    });

    // Sort holders by balance in descending order
    holders.sort((a, b) => {
      const balanceA = BigInt(a.balance);
      const balanceB = BigInt(b.balance);
      return balanceB > balanceA ? 1 : balanceB < balanceA ? -1 : 0;
    });

    const response = {
      holders,
      stats: {
        totalAccounts: validBalances.length.toString(),
        accountsAboveOne: holders.filter((h: TokenHolder) => BigInt(h.balance) > BigInt(1)).length
      }
    };

    console.log('Processed response:', JSON.stringify(response, null, 2));
    return response;

  } catch (error: any) {
    console.error('Error fetching token holders:', error.response?.data || error.message);
    throw error;
  }
}

function calculatePercentage(balance: string, totalSupply: string): number {
  try {
    if (!balance || !totalSupply || balance === '0' || totalSupply === '0') {
      return 0;
    }

    const balanceNum = BigInt(balance);
    const totalSupplyNum = BigInt(totalSupply);
    
    if (totalSupplyNum === BigInt(0)) {
      return 0;
    }
    
    // Calculate percentage with higher precision
    const percentage = Number((balanceNum * BigInt(10000) / totalSupplyNum)) / 100;
    return Math.min(100, Math.max(0, percentage)); // Ensure between 0 and 100
  } catch (error) {
    console.error('Error calculating percentage:', error);
    return 0;
  }
}

export async function getAccountInfo(accountId: string) {
  try {
    const response = await axios.get(`/api/accounts/${accountId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching account info:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url
    });
    throw error;
  }
}

// Helper function to format raw balance with decimals
function formatBalance(balance: string, decimals: number): string {
  try {
    const balanceBN = BigInt(balance);
    const divisor = BigInt(10 ** decimals);
    const wholePart = balanceBN / divisor;
    const fractionalPart = balanceBN % divisor;
    
    let result = wholePart.toString();
    if (fractionalPart > 0) {
      let fractionalStr = fractionalPart.toString().padStart(decimals, '0');
      // Keep all significant decimal places
      while (fractionalStr.endsWith('0')) {
        fractionalStr = fractionalStr.slice(0, -1);
      }
      if (fractionalStr.length > 0) {
        result += '.' + fractionalStr;
      }
    }
    
    // Add thousand separators
    const parts = result.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  } catch (error) {
    console.error('Error formatting balance:', error);
    return balance;
  }
}
