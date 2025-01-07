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

interface ApiBalance {
  account: string;
  balance: string | number;
  decimals: number;
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
    console.log('%c[API Call] Fetching token info from:', 'color: #4CAF50; font-weight: bold;', url);
    const response = await axios.get(url);
    console.log('%c[Token Info] Response:', 'color: #4CAF50; font-weight: bold;', response.data);
    
    const decimals = Number(response.data.decimals);
    const totalSupply = Number(response.data.total_supply) / Math.pow(10, decimals);
    
    return {
      name: response.data.name,
      symbol: response.data.symbol,
      decimals: decimals,
      total_supply: totalSupply.toString()
    };
  } catch (error: any) {
    console.error('%c[Error] Failed to fetch token info:', 'color: #f44336; font-weight: bold;', error.response?.data || error.message);
    throw error;
  }
}

export async function getTokenHolders(tokenId: string): Promise<TokenHoldersResponse> {
  try {
    console.log('%c[Token Holders] Starting fetch...', 'color: #2196F3; font-weight: bold;');
    
    const formattedTokenId = formatTokenId(tokenId);
    let url = `https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/${formattedTokenId}/balances`;
    console.log('%c[API Call] Fetching token holders from:', 'color: #2196F3; font-weight: bold;', url);
    
    let allBalances: ApiBalance[] = [];
    let hasNextPage = true;

    while (hasNextPage) {
      console.log('%c[API Call] Fetching page:', 'color: #2196F3; font-weight: bold;', url);
      const response = await axios.get<{ balances: ApiBalance[], links?: { next?: string } }>(url);
      
      if (!response.data || !Array.isArray(response.data.balances)) {
        console.error('%c[Error] Invalid response format:', 'color: #f44336; font-weight: bold;', response.data);
        throw new Error('Invalid response format from Hedera API');
      }

      allBalances = [...allBalances, ...response.data.balances];
      console.log('%c[API Response] Got balances:', 'color: #2196F3; font-weight: bold;', response.data.balances.length);

      // Check for next page
      if (response.data.links?.next) {
        url = `https://mainnet-public.mirrornode.hedera.com${response.data.links.next}`;
      } else {
        hasNextPage = false;
      }
    }

    console.log('%c[API Response] Total balances:', 'color: #2196F3; font-weight: bold;', allBalances.length);

    let totalSupply = '0';
    try {
      const infoResponse = await getTokenInfo(tokenId);
      totalSupply = infoResponse.total_supply;
      console.log('%c[Total Supply]', 'color: #2196F3; font-weight: bold;', totalSupply);
    } catch (error) {
      console.error('%c[Error] Failed to fetch total supply:', 'color: #f44336; font-weight: bold;', error);
      totalSupply = '0';
    }

    console.log('%c[Processing] Filtering balances...', 'color: #2196F3; font-weight: bold;');
    const validBalances = allBalances.filter((balance): balance is ApiBalance => {
      const isValid = balance && 
        typeof balance.account === 'string' && 
        (typeof balance.balance === 'string' || typeof balance.balance === 'number') &&
        typeof balance.decimals === 'number';
      
      if (!isValid) {
        console.log('%c[Invalid Balance]', 'color: #FFC107; font-weight: bold;', {
          balance,
          isValidAccount: typeof balance.account === 'string',
          isValidBalance: typeof balance.balance === 'string' || typeof balance.balance === 'number',
          isValidDecimals: typeof balance.decimals === 'number'
        });
      }
      
      return isValid;
    });

    console.log('%c[Valid Balances] Count:', 'color: #2196F3; font-weight: bold;', validBalances.length);

    console.log('%c[Processing] Calculating percentages...', 'color: #2196F3; font-weight: bold;');
    const holders = validBalances
      .map((balance): TokenHolder => {
        // Convert balance to actual value using decimals
        const rawBalance = Number(balance.balance);
        const adjustedBalance = rawBalance / Math.pow(10, balance.decimals);
        const balanceStr = adjustedBalance.toString();
        
        const totalSupplyNum = Number(totalSupply);
        const percentage = totalSupplyNum > 0 ? (adjustedBalance * 100) / totalSupplyNum : 0;
        
        return {
          account: balance.account,
          balance: balanceStr,
          percentage
        };
      })
      // Filter out balances less than 1
      .filter(holder => Number(holder.balance) >= 1)
      // Sort by balance in descending order
      .sort((a, b) => Number(b.balance) - Number(a.balance))
      // Take top 50 holders
      .slice(0, 50);

    console.log('%c[Final Holders] Count:', 'color: #2196F3; font-weight: bold;', holders.length);
    holders.forEach(holder => {
      console.log('%c[Holder]', 'color: #2196F3;', {
        account: holder.account,
        balance: holder.balance,
        percentage: holder.percentage + '%'
      });
    });

    const result: TokenHoldersResponse = {
      holders,
      stats: {
        totalAccounts: validBalances.length.toString(),
        accountsAboveOne: holders.length
      }
    };

    console.log('%c[Final Result]', 'color: #4CAF50; font-weight: bold;', result);
    return result;

  } catch (error: any) {
    console.error('%c[Error] Failed to fetch token holders:', 'color: #f44336; font-weight: bold;', error.response?.data || error.message);
    throw error;
  }
}

function calculatePercentage(balance: string, totalSupply: string): number {
  try {
    if (!balance || !totalSupply || balance === '0' || totalSupply === '0') {
      return 0;
    }

    // Convert to whole numbers by removing decimals
    const balanceWhole = Math.floor(Number(balance));
    const totalSupplyWhole = Math.floor(Number(totalSupply));
    
    if (totalSupplyWhole === 0) {
      return 0;
    }
    
    // Calculate percentage with higher precision
    const percentage = (balanceWhole * 100) / totalSupplyWhole;
    return Math.min(100, Math.max(0, percentage)); // Ensure between 0 and 100
  } catch (error) {
    console.error('%c[Error] Failed to calculate percentage:', 'color: #f44336; font-weight: bold;', error);
    return 0;
  }
}

export async function getAccountInfo(accountId: string) {
  try {
    const response = await axios.get(`/api/accounts/${accountId}`);
    return response.data;
  } catch (error: any) {
    console.error('%c[Error] Failed to fetch account info:', 'color: #f44336; font-weight: bold;', {
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
    console.error('%c[Error] Failed to format balance:', 'color: #f44336; font-weight: bold;', error);
    return balance;
  }
}
