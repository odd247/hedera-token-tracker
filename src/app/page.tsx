'use client';

import { useState } from 'react';
import { getTokenHolders, getTokenInfo, TokenHolder, TokenInfo } from '@/utils/hedera';
import { useQuery } from '@tanstack/react-query';

interface TokenData {
  holders: TokenHolder[];
  info: TokenInfo | null;
  error: string | null;
  loading: boolean;
}

export default function Home() {
  const [tokenId, setTokenId] = useState('');
  const [searchTrigger, setSearchTrigger] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['token', searchTrigger],
    queryFn: async () => {
      if (!searchTrigger) return null;
      
      const info = await getTokenInfo(searchTrigger);
      const holders = await getTokenHolders(searchTrigger);
      
      return {
        info: {
          name: info.name,
          symbol: info.symbol,
          total_supply: info.total_supply,
          decimals: info.decimals
        },
        holders: holders.holders
      };
    },
    enabled: !!searchTrigger,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
  });

  const handleSearch = () => {
    if (!tokenId.trim()) {
      return;
    }
    setSearchTrigger(tokenId);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatBalance = (balance: string, decimals: number) => {
    try {
      const value = Number(balance);
      if (isNaN(value)) return '0';
      
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
    <main>
      <div className="content-wrapper p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-medium mb-12 text-center">
            Hedera Token Balances
          </h1>
          
          <div className="flex gap-4 mb-12">
            <input
              type="text"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter token ID (e.g., 0.0.1234)"
              className="flex-1 px-4 py-2 text-base border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 bg-gray-900"
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className={`px-6 py-2 rounded-lg text-base font-medium text-white transition-colors ${
                isLoading 
                  ? 'bg-gray-700 cursor-not-allowed' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {isLoading && (
            <div className="text-center py-8">
              <p className="text-base text-gray-400">
                Keep your shirt on, I am sorting through a lot of information (older token = more data)
                <span className="loading-dots ml-1"></span>
              </p>
            </div>
          )}

          {error && (
            <div className="border-2 border-red-300 bg-red-50 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error.message}</span>
            </div>
          )}

          {data && !isLoading && (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8 shadow-sm">
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className="text-xl font-medium text-gray-200">{data.info.name}</h2>
                <span className="text-sm text-gray-500">{data.info.symbol}</span>
              </div>
              <div className="text-sm text-gray-500">Total Supply</div>
              <div className="text-2xl font-medium text-gray-200">{Number(data.info.total_supply).toLocaleString()}</div>
            </div>
          )}

          {data && data.holders.length > 0 && !isLoading && (
            <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-sm">
              <table className="token-table">
                <thead>
                  <tr>
                    <th className="w-20">#</th>
                    <th>Account</th>
                    <th className="text-right">Balance</th>
                    <th className="w-24 text-right">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {data.holders.map((holder, index) => (
                    <tr key={holder.account}>
                      <td>
                        <div className="token-rank">
                          {index + 1}
                        </div>
                      </td>
                      <td className="token-account truncate max-w-0">
                        {holder.account}
                        {holder.account === '0.0.7891970' && (
                          <span className="ml-8 text-sm text-gray-500">(Bonding Curve)</span>
                        )}
                        {holder.account === '0.0.2997798' && (
                          <span className="ml-8 text-sm text-gray-500">(DaVinciGraph Lock)</span>
                        )}
                        {holder.account === '0.0.3158042' && (
                          <span className="ml-8 text-sm text-gray-500">(DaVinciGraph Burn)</span>
                        )}
                        {holder.account === '0.0.6126395' && (
                          <span className="ml-8 text-sm text-gray-500">(SaucerSwapLP)</span>
                        )}
                      </td>
                      <td className="token-balance text-right">
                        {formatBalance(holder.balance, data.info.decimals)}
                      </td>
                      <td className="token-share text-right">
                        {((Number(holder.balance) / Number(data.info.total_supply)) * 100).toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <footer className="w-full p-4 text-center text-gray-500">
        brought to you by <a href="https://x.com/odd247" target="_blank" className="hover:underline">odd</a> enterprises
      </footer>
    </main>
  );
}
