import axios from 'axios';

const BASE_URL = 'https://mainnet-public.mirrornode.hedera.com';
const API_PATH = '/api/v1';

export interface TokenHolder {
  account: string;
  balance: string;
  percentage: number;
}

export interface TokenInfo {
  name: string;
  symbol: string;
  decimals: string;
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
    const url = `${BASE_URL}${API_PATH}/tokens/${formattedTokenId}`;
    console.log('Fetching token info from:', url);
    const response = await axios.get(url);
    console.log('Token Info Response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching token info:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url
    });
    throw new Error(
      error.response?.data?.message || 
      error.response?.statusText || 
      'Error fetching token data'
    );
  }
}

export async function getTokenHolders(tokenId: string, limit: number = 50): Promise<TokenHoldersResponse> {
  try {
    const formattedTokenId = formatTokenId(tokenId);
    const tokenInfo = await getTokenInfo(formattedTokenId);
    console.log('Token Info:', {
      name: tokenInfo.name,
      symbol: tokenInfo.symbol,
      decimals: tokenInfo.decimals,
      total_supply: tokenInfo.total_supply
    });
    
    // Use a Map to ensure unique accounts
    const holdersMap = new Map<string, any>();
    let hasMore = true;
    
    // Get first page with maximum limit
    const fetchPage = async (nextLink: string | null = null) => {
      const url = nextLink ? `${BASE_URL}${nextLink}` : `${BASE_URL}${API_PATH}/tokens/${formattedTokenId}/balances?limit=100`;
      console.log('Fetching balances from:', url);
      return axios.get(url);
    };

    // Fetch first page
    const firstResponse = await fetchPage();
    let holders = firstResponse.data.balances.filter((h: any) => h.balance !== '0' && BigInt(h.balance) > 0);
    holders.forEach(h => holdersMap.set(h.account, h));
    
    hasMore = !!firstResponse.data.links?.next;
    let nextLink = firstResponse.data.links?.next;

    // Fetch remaining pages
    let pageCount = 1;
    const maxPages = 200; // Increased to 200 pages to get more holders
    
    while (hasMore && pageCount < maxPages && nextLink) {
      try {
        console.log(`Fetching page ${pageCount + 1} using next link`);
        const response = await fetchPage(nextLink);
        holders = response.data.balances.filter((h: any) => h.balance !== '0' && BigInt(h.balance) > 0);
        
        if (holders.length > 0) {
          holders.forEach(h => holdersMap.set(h.account, h));
          console.log(`Found ${holders.length} holders on page ${pageCount + 1} (total unique: ${holdersMap.size})`);
        } else {
          hasMore = false;
        }
        
        nextLink = response.data.links?.next;
        hasMore = hasMore && !!nextLink;
        pageCount++;
        
        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error fetching page ${pageCount + 1}:`, error);
        hasMore = false;
      }
    }

    // Convert Map back to array
    const allHolders = Array.from(holdersMap.values());
    console.log(`Total unique holders fetched: ${allHolders.length} from ${pageCount} pages`);

    const decimals = Number(tokenInfo.decimals);
    const oneToken = BigInt(10 ** decimals);
    const totalSupplyBigInt = BigInt(tokenInfo.total_supply);

    // Sort holders by numeric balance value
    console.log('Sorting holders...');
    const sortedHolders = allHolders
      .map(holder => ({
        ...holder,
        numericBalance: BigInt(holder.balance)
      }))
      .sort((a, b) => {
        return a.numericBalance > b.numericBalance ? -1 : 
               a.numericBalance < b.numericBalance ? 1 : 0;
      })
      .slice(0, limit);

    const formattedHolders = sortedHolders.map(holder => {
      const percentage = Number((holder.numericBalance * BigInt(1000000) / totalSupplyBigInt)) / 10000;
      
      return {
        account: holder.account,
        balance: holder.balance,
        percentage
      };
    });

    // Log top 20 holders with formatted balances for verification
    console.log('Top holders:', formattedHolders.slice(0, 20).map(h => ({
      account: h.account,
      balance: formatBalance(h.balance, decimals),
      percentage: h.percentage.toFixed(4) + '%'
    })));

    const stats = {
      totalAccounts: allHolders.length + (hasMore ? '+' : ''),
      accountsAboveOne: allHolders.filter(holder => BigInt(holder.balance) >= oneToken).length
    };

    return {
      holders: formattedHolders,
      stats
    };
  } catch (error: any) {
    console.error('Error fetching token holders:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url
    });
    throw error;
  }
}

export async function getAccountInfo(accountId: string) {
  try {
    const response = await axios.get(`${BASE_URL}${API_PATH}/accounts/${accountId}`);
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
