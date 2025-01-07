'use client';

import { useState } from 'react';
import { getTokenHolders, getTokenInfo, TokenHolder, TokenInfo } from '../utils/hedera';

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

  const formatBalance = (balance: string, decimals: number) => {
    const value = BigInt(balance);
    const divisor = BigInt(10 ** decimals);
    const integerPart = value / divisor;
    const fractionalPart = value % divisor;
    
    let formattedFractional = fractionalPart.toString().padStart(decimals, '0');
    // Remove trailing zeros
    formattedFractional = formattedFractional.replace(/0+$/, '');
    
    const formattedInteger = integerPart.toLocaleString();
    
    return formattedFractional ? `${formattedInteger}.${formattedFractional}` : formattedInteger;
  };

  const handleSearch = async () => {
    if (!tokenId) {
      setData(prev => ({ ...prev, error: 'Please enter a token ID' }));
      return;
    }

    setData(prev => ({ ...prev, loading: true, error: null }));

    try {
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

      const response = await getTokenHolders(tokenId);
      setData(prev => ({
        ...prev,
        holders: response.holders,
        loading: false
      }));
    } catch (error) {
      console.error('Error fetching token data:', error);
      setData(prev => ({
        ...prev,
        error: 'Error fetching token data. Please check the token ID and try again.',
        loading: false
      }));
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
            placeholder="Enter token ID (e.g., 0.0.1234)"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleSearch}
            disabled={data.loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {data.loading ? 'Loading...' : 'Search'}
          </button>
        </div>

        {data.error && (
          <div className="text-red-500 mb-4">{data.error}</div>
        )}

        {data.info && (
          <div className="mb-8 p-4 bg-gray-100 rounded">
            <h2 className="text-xl font-bold mb-2">Token Information</h2>
            <div><strong>Name:</strong> {data.info.name}</div>
            <div><strong>Symbol:</strong> {data.info.symbol}</div>
            <div><strong>Total Supply:</strong> {formatBalance(data.info.total_supply, data.info.decimals)}</div>
          </div>
        )}

        {data.holders.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Top Token Holders</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Account</th>
                    <th className="p-2 text-right">Balance</th>
                    <th className="p-2 text-right">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {data.holders.map((holder, index) => (
                    <tr key={holder.account} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="p-2">{holder.account}</td>
                      <td className="p-2 text-right font-mono">
                        {data.info ? formatBalance(holder.balance, data.info.decimals) : holder.balance}
                      </td>
                      <td className="p-2 text-right">{holder.percentage.toFixed(4)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
