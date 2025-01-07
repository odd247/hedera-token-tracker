'use client';

import { useState } from 'react';
import { getTokenHolders, getTokenInfo, TokenHolder, TokenInfo } from '@/utils/hedera';

interface TokenData {
  holders: TokenHolder[];
  info: TokenInfo | null;
  error: string | null;
  loading: boolean;
}

export default function Home() {
  const [tokenId, setTokenId] = useState('');
  const [data, setData] = useState<TokenData>({
    holders: [],
    info: null,
    error: null,
    loading: false
  });

  const handleSearch = async () => {
    if (!tokenId.trim()) {
      setData(prev => ({ ...prev, error: 'Please enter a token ID' }));
      return;
    }

    setData(prev => ({ ...prev, loading: true, error: null }));

    try {
      console.log('Fetching token info for:', tokenId);
      const info = await getTokenInfo(tokenId);
      console.log('Received token info:', info);

      setData(prev => ({
        ...prev,
        info: {
          name: info.name,
          symbol: info.symbol,
          total_supply: info.total_supply,
          decimals: info.decimals
        }
      }));

      console.log('Fetching token holders...');
      const response = await getTokenHolders(tokenId);
      console.log('Received token holders:', response.holders.length);
      
      setData(prev => ({
        ...prev,
        holders: response.holders,
        loading: false
      }));
    } catch (error: any) {
      console.error('Error in handleSearch:', error.response?.data || error);
      setData(prev => ({
        ...prev,
        error: error.response?.data?.error || 'Error fetching token data. Please check the token ID and try again.',
        loading: false
      }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatBalance = (balance: string, decimals: number) => {
    try {
      // Convert balance to number and handle decimals
      const value = Number(balance);
      if (isNaN(value)) return '0';
      
      // Format with proper decimal places
      const formatted = value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals
      });
      
      return formatted;
    } catch (error) {
      console.error('Error formatting balance:', error);
      return '0';
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Hedera Token Tracker</h1>
        
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter token ID (e.g., 0.0.1234)"
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            disabled={data.loading}
            className={`px-4 py-2 rounded text-white font-medium ${
              data.loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {data.loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {data.loading && (
          <div className="text-center py-8 animate-pulse">
            <p className="text-xl text-gray-600 font-medium mb-4">🐸 Keep your shirt on, I'm sorting through a lot of information...</p>
            <p className="text-gray-500">Fetching token data and analyzing holder distribution</p>
          </div>
        )}

        {data.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{data.error}</span>
          </div>
        )}

        {data.info && !data.loading && (
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">{data.info.name} ({data.info.symbol})</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Total Supply</p>
                <p className="text-xl font-semibold">{Number(data.info.total_supply).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Decimals</p>
                <p className="text-xl font-semibold">{data.info.decimals}</p>
              </div>
            </div>
          </div>
        )}

        {data.holders.length > 0 && !data.loading && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Top Token Holders</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {data.holders.map((holder, index) => (
                <div key={holder.account} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="w-8 text-lg font-bold text-gray-400">#{index + 1}</div>
                    <div className="flex-1">
                      <p className="font-mono text-sm">{holder.account}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">
                            Balance: <span className="font-medium">{Number(holder.balance).toLocaleString()}</span>
                          </p>
                        </div>
                        <div className="w-24 text-right">
                          <p className="text-sm font-medium text-gray-900">{holder.percentage.toFixed(2)}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
