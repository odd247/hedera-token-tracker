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
              disabled={data.loading}
              className={`px-6 py-2 rounded-lg text-base font-medium text-white transition-colors ${
                data.loading 
                  ? 'bg-gray-700 cursor-not-allowed' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {data.loading ? (
                <span className="inline-flex items-center">
                  Searching<span className="loading-dots"></span>
                </span>
              ) : (
                'Search'
              )}
            </button>
          </div>

          {data.loading && (
            <div className="text-center py-8">
              <p className="text-base text-gray-400">
                Keep your shirt on, I am sorting through a lot of information<span className="loading-dots"></span>
              </p>
            </div>
          )}

          {data.error && (
            <div className="border-2 border-red-300 bg-red-50 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{data.error}</span>
            </div>
          )}

          {data.info && !data.loading && (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8 shadow-sm">
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className="text-xl font-medium text-gray-200">{data.info.name}</h2>
                <span className="text-sm text-gray-500">{data.info.symbol}</span>
              </div>
              <div className="text-sm text-gray-500">Total Supply</div>
              <div className="text-2xl font-medium text-gray-200">{Number(data.info.total_supply).toLocaleString()}</div>
            </div>
          )}

          {data.holders.length > 0 && !data.loading && (
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
                      </td>
                      <td className="token-balance text-right">
                        {Number(holder.balance).toLocaleString()}
                      </td>
                      <td className="token-share text-right">
                        {holder.percentage.toFixed(2)}%
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
