import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tokenId = searchParams.get('tokenId');
  const limit = searchParams.get('limit') || '50';

  if (!tokenId) {
    return NextResponse.json({ error: 'Token ID is required' }, { status: 400 });
  }

  try {
    const formattedTokenId = formatTokenId(tokenId);
    const url = `https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/${formattedTokenId}/balances?limit=${limit}&order=desc`;
    console.log('Fetching token holders from:', url);
    const response = await axios.get(url);
    
    const holders = response.data.balances.map((balance: any) => ({
      account: balance.account,
      balance: balance.balance,
      percentage: calculatePercentage(balance.balance, response.data.total_supply)
    }));

    console.log('Successfully fetched holders:', holders.length);

    return NextResponse.json({
      holders,
      stats: {
        totalAccounts: response.data.balances.length.toString(),
        accountsAboveOne: holders.filter((h: any) => Number(h.balance) > 1).length
      }
    });
  } catch (error: any) {
    console.error('Error fetching token holders:', error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data?.message || 'Error fetching token holders' },
      { status: error.response?.status || 500 }
    );
  }
}

function formatTokenId(tokenId: string): string {
  tokenId = tokenId.trim().toLowerCase();
  
  if (tokenId.includes('.')) {
    return tokenId;
  }
  
  if (/^\d+$/.test(tokenId)) {
    return `0.0.${tokenId}`;
  }
  
  return tokenId;
}

function calculatePercentage(balance: string, totalSupply: string): number {
  const balanceNum = BigInt(balance);
  const totalSupplyNum = BigInt(totalSupply);
  
  if (totalSupplyNum === BigInt(0)) return 0;
  
  // Convert to number for percentage calculation (with 4 decimal places)
  return Number((balanceNum * BigInt(10000) / totalSupplyNum) / BigInt(100));
}
