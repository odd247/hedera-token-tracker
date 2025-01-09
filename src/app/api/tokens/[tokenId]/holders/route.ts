import { NextResponse } from 'next/server';
import { getTokenHolders, getTokenInfo } from '@/utils/hedera';
import axios from 'axios';

export async function GET(
  request: Request,
  { params }: { params: { tokenId: string } }
) {
  const tokenId = params.tokenId;

  if (!tokenId) {
    return NextResponse.json({ error: 'Token ID is required' }, { 
      status: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }

  try {
    const startTime = Date.now();
    const [info, holders] = await Promise.all([
      getTokenInfo(tokenId),
      getTokenHolders(tokenId)
    ]);
    const duration = Date.now() - startTime;
    console.log(`API call duration: ${duration} ms`);

    return NextResponse.json({
      info,
      holders: holders.holders
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error: any) {
    console.error('Error fetching token data:', error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 404) {
      return NextResponse.json({ error: 'Token not found' }, { 
        status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }
    
    if (error.response?.status === 400) {
      return NextResponse.json({ error: 'Invalid token ID format' }, { 
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }
    
    if (error.response?.status === 429) {
      return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { 
        status: 429,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}

axios.defaults.timeout = 60000; // 60 second timeout
