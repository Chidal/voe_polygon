"use client";

import { useEffect, useState } from 'react';
import { Transaction, WalletActivity } from '../types';

const DeveloperDashboard: React.FC = () => {
  const [events, setEvents] = useState<(Transaction | WalletActivity)[]>([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/events');
    eventSource.onmessage = (event) => {
      const newEvent: Transaction | WalletActivity = JSON.parse(event.data);
      setEvents((prev) => [newEvent, ...prev].slice(0, 50));
    };
    return () => eventSource.close();
  }, []);

  return (
    <div className="bg-gray-900 p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">Developer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Token Transfers</h2>
          <div className="overflow-auto max-h-96">
            <table className="w-full text-white">
              <thead>
                <tr>
                  <th className="p-2">Hash</th>
                  <th className="p-2">From</th>
                  <th className="p-2">To</th>
                  <th className="p-2">Token</th>
                </tr>
              </thead>
              <tbody>
                {events
                  .filter((e): e is Transaction => 'hash' in e)
                  .map((tx) => (
                    <tr key={tx.hash} className="border-t border-gray-700">
                      <td className="p-2 truncate">{tx.hash.slice(0, 10)}...</td>
                      <td className="p-2 truncate">{tx.from.slice(0, 10)}...</td>
                      <td className="p-2 truncate">{tx.to.slice(0, 10)}...</td>
                      <td className="p-2">{tx.tokenSymbol}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Wallet Activity</h2>
          <div className="overflow-auto max-h-96">
            <table className="w-full text-white">
              <thead>
                <tr>
                  <th className="p-2">Address</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Token</th>
                </tr>
              </thead>
              <tbody>
                {events
                  .filter((e): e is WalletActivity => 'type' in e)
                  .map((activity) => (
                    <tr key={activity.address + activity.timestamp} className="border-t border-gray-700">
                      <td className="p-2 truncate">{activity.address.slice(0, 10)}...</td>
                      <td className="p-2">{activity.type}</td>
                      <td className="p-2">{activity.amount}</td>
                      <td className="p-2">{activity.tokenSymbol}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;