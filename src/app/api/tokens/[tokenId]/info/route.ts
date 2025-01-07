import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(
  request: Request,
  { params }: { params: { tokenId: string } }
) {
  const tokenId = params.tokenId;

  if (!tokenId) {
    return NextResponse.json({ error: 'Token ID is required' }, { status: 400 });
  }

  try {
    const formattedTokenId = formatTokenId(tokenId);
    const url = `https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/${formattedTokenId}`;
    const response = await axios.get(url);
    
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching token info:', error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data?.message || 'Error fetching token data' },
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
