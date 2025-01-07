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
    const response = await axios.get(`${BASE_URL}/token/info?tokenId=${formattedTokenId}`);
    return {
      name: response.data.name,
      symbol: response.data.symbol,
      decimals: Number(response.data.decimals),
      total_supply: response.data.total_supply
    };
  } catch (error: any) {
    console.error('Error fetching token info:', {
      error,
      response: error.response?.data
    });
    throw error;
  }
}

export async function getTokenHolders(tokenId: string, limit: number = 50): Promise<TokenHoldersResponse> {
  try {
    const formattedTokenId = formatTokenId(tokenId);
    const response = await axios.get(`${BASE_URL}/token/holders?tokenId=${formattedTokenId}&limit=${limit}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching token holders:', {
      error,
      response: error.response?.data
    });
    throw error;
  }
}

export async function getAccountInfo(accountId: string) {
  try {
    const response = await axios.get(`${BASE_URL}/accounts/${accountId}`);
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
