'use client';

import { useState } from 'react';
import { getTokenHolders, getTokenInfo, TokenHolder } from '../utils/hedera';

interface TokenInfo {
  name: string;
  symbol: string;
  total_supply: string;
  decimals: number;
}

interface HolderStats {
  totalAccounts: number | string;
  accountsAboveOne: number;
}

export default function Home() {
  const [tokenId, setTokenId] = useState('');
  const [holders, setHolders] = useState<TokenHolder[]>([]);
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [holderStats, setHolderStats] = useState<HolderStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatTokenAmount = (amount: string, decimals: number): string => {
    try {
      if (!amount) return '0';
      const amountBN = BigInt(amount);
      const divisor = BigInt(10 ** decimals);
      const wholePart = amountBN / divisor;
      const fractionalPart = amountBN % divisor;
      
      let result = wholePart.toString();
      if (fractionalPart > 0) {
        let fractionalStr = fractionalPart.toString().padStart(decimals, '0');
        // Trim trailing zeros but keep at least 2 decimal places if there are any decimals
        while (fractionalStr.length > 2 && fractionalStr.endsWith('0')) {
          fractionalStr = fractionalStr.slice(0, -1);
        }
        if (fractionalStr.length > 0) {
          result += '.' + fractionalStr;
        }
      }
      
      // Add thousand separators to the whole part
      const parts = result.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    } catch (error) {
      console.error('Error formatting amount:', error);
      return amount;
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError('');
      setTokenInfo(null);
      setHolderStats(null);
      
      const info = await getTokenInfo(tokenId);
      setTokenInfo({
        name: info.name,
        symbol: info.symbol,
        total_supply: info.total_supply,
        decimals: info.decimals
      });

      const response = await getTokenHolders(tokenId);
      setHolders(response.holders);
      setHolderStats(response.stats);
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'Error fetching token data. Please check the token ID and try again.');
      setTokenInfo(null);
      setHolders([]);
      setHolderStats(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Hedera Token Holder Tracker</h1>
        
        <div className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="Enter Token ID (e.g., 0.0.123456)"
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? 'Loading...' : 'Search'}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {tokenInfo && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">{tokenInfo.name} ({tokenInfo.symbol})</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-600">Total Supply</p>
                <p className="text-xl font-semibold">{formatTokenAmount(tokenInfo.total_supply, tokenInfo.decimals)}</p>
              </div>
              <div>
                <p className="text-gray-600">Decimals</p>
                <p className="text-xl font-semibold">{tokenInfo.decimals}</p>
              </div>
            </div>
            {holderStats && (
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-gray-600">Total Holders</p>
                  <p className="text-xl font-semibold">
                    {typeof holderStats.totalAccounts === 'number' 
                      ? holderStats.totalAccounts.toLocaleString()
                      : holderStats.totalAccounts}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Holders with > 1 Token</p>
                  <p className="text-xl font-semibold">{holderStats.accountsAboveOne.toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {holders.length > 0 && (
          <div className="bg-white rounded-lg shadow">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Rank</th>
                  <th className="p-4 text-left">Account</th>
                  <th className="p-4 text-right">Balance</th>
                  <th className="p-4 text-right">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {holders.map((holder, index) => (
                  <tr key={holder.account} className="border-b hover:bg-gray-50">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 font-mono">{holder.account}</td>
                    <td className="p-4 text-right">{tokenInfo ? formatTokenAmount(holder.balance, tokenInfo.decimals) : '0'}</td>
                    <td className="p-4 text-right">{holder.percentage.toFixed(4)}%</td>
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
