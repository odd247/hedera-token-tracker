import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tokenId = searchParams.get('tokenId');

  if (!tokenId) {
    return NextResponse.json({ error: 'Token ID is required' }, { status: 400 });
  }

  try {
    const formattedTokenId = formatTokenId(tokenId);
    const url = `https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/${formattedTokenId}`;
    const response = await axios.get(url);
    
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching token info:', error);
    return NextResponse.json(
      { error: 'Error fetching token data' },
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
