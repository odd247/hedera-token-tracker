import axios from 'axios';
import pThrottle from 'p-throttle';

const BASE_URL = '/api';
const MIRROR_NODE_URL = 'https://mainnet-public.mirrornode.hedera.com';

// Throttle API calls to 5 requests per second
const throttle = pThrottle({
  limit: 5,
  interval: 1000
});

const throttledGet = throttle(async (url: string) => {
  return await axios.get(url);
});

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
  if (!tokenId) {
    throw new Error('Token ID is required');
  }

  tokenId = tokenId.trim().toLowerCase();
  
  if (tokenId.includes('.')) {
    // Validate shard.realm.num format
    const parts = tokenId.split('.');
    if (parts.length !== 3 || !parts.every(part => /^\d+$/.test(part))) {
      throw new Error('Invalid token ID format. Expected format: shard.realm.number');
    }
    return tokenId;
  }
  
  if (/^\d+$/.test(tokenId)) {
    return `0.0.${tokenId}`;
  }
  
  throw new Error('Invalid token ID format. Expected a number or shard.realm.number format');
}

export async function getTokenInfo(tokenId: string): Promise<TokenInfo> {
  try {
    const formattedTokenId = formatTokenId(tokenId);
    const url = `${MIRROR_NODE_URL}/api/v1/tokens/${formattedTokenId}`;
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
    let url = `${MIRROR_NODE_URL}/api/v1/tokens/${formattedTokenId}/balances?limit=100`;
    console.log('%c[API Call] Fetching token holders from:', 'color: #2196F3; font-weight: bold;', url);
    
    let allBalances: ApiBalance[] = [];
    let hasNextPage = true;
    let pageCount = 0;
    const MAX_PAGES = 200; // Increased to get more holders

    while (hasNextPage && pageCount < MAX_PAGES) {
      console.log('%c[API Call] Fetching page:', 'color: #2196F3; font-weight: bold;', url);
      const response = await throttledGet(url);
      pageCount++;
      
      if (!response.data || !Array.isArray(response.data.balances)) {
        console.error('%c[Error] Invalid response format:', 'color: #f44336; font-weight: bold;', response.data);
        throw new Error('Invalid response format from Hedera API');
      }

      const validBalances = response.data.balances.filter((balance: ApiBalance) => 
        Number(balance.balance) > 0 && // Only include non-zero balances
        balance.account !== '0.0.98' // Filter out null account
      );
      
      allBalances = [...allBalances, ...validBalances];
      console.log('%c[API Response] Got balances:', 'color: #2196F3; font-weight: bold;', validBalances.length);

      if (response.data.links?.next && pageCount < MAX_PAGES) {
        url = `${MIRROR_NODE_URL}${response.data.links.next}&limit=100`;
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

    console.log('%c[Processing] Calculating percentages...', 'color: #2196F3; font-weight: bold;');
    const holders = allBalances
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
      // Filter holders with more than 100 tokens
      .filter((holder: TokenHolder) => Number(holder.balance) >= 100)
      // Sort by balance in descending order
      .sort((a, b) => Number(b.balance) - Number(a.balance));

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
        totalAccounts: allBalances.length.toString(),
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
