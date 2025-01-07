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
      <div className="max-w-6xl mx-auto p-8 font-mono">
        <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Hedera Token Tracker
        </h1>
        
        <div className="flex gap-4 mb-12">
          <input
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter token ID (e.g., 0.0.1234)"
            className="flex-1 p-3 text-lg border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/90 backdrop-blur"
          />
          <button
            onClick={handleSearch}
            disabled={data.loading}
            className={`px-8 py-3 rounded-lg text-lg font-bold text-white shadow-lg transform transition-all duration-200 ${
              data.loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 hover:shadow-xl active:scale-95'
            }`}
          >
            {data.loading ? '⚡️ Searching...' : '🔍 Search'}
          </button>
        </div>

        {data.loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-bounce bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 mb-4">
              <span className="text-2xl">🐸</span>
            </div>
            <p className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              Keep your shirt on, I'm sorting through a lot of information...
            </p>
            <p className="text-gray-500">Fetching token data and analyzing holder distribution</p>
          </div>
        )}

        {data.error && (
          <div className="border-2 border-red-300 bg-red-50 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{data.error}</span>
          </div>
        )}

        {data.info && !data.loading && (
          <div className="bg-white/90 backdrop-blur border-2 border-purple-200 rounded-lg p-8 mb-12 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              {data.info.name} ({data.info.symbol})
            </h2>
            <div className="border-2 border-purple-100 rounded-lg p-6">
              <p className="text-purple-600 font-bold mb-2">Total Supply</p>
              <p className="text-3xl font-bold">{Number(data.info.total_supply).toLocaleString()}</p>
            </div>
          </div>
        )}

        {data.holders.length > 0 && !data.loading && (
          <div className="bg-white/90 backdrop-blur border-2 border-purple-200 rounded-lg overflow-hidden shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-500 to-pink-500">
                  <th className="w-24 px-6 py-4 text-left text-white font-bold">Rank</th>
                  <th className="px-6 py-4 text-left text-white font-bold">Account</th>
                  <th className="w-48 px-6 py-4 text-right text-white font-bold">Balance</th>
                  <th className="w-32 px-6 py-4 text-right text-white font-bold">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                {data.holders.map((holder, index) => (
                  <tr key={holder.account} className="hover:bg-purple-50 transition-colors duration-150">
                    <td className="w-24 px-6 py-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-md">
                        #{index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-base truncate max-w-0">
                      {holder.account}
                    </td>
                    <td className="w-48 px-6 py-4 text-right font-bold text-purple-600 whitespace-nowrap">
                      {Number(holder.balance).toLocaleString()}
                    </td>
                    <td className="w-32 px-6 py-4 text-right font-bold text-pink-500 whitespace-nowrap">
                      {holder.percentage.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
