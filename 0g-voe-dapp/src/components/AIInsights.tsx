"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Transaction } from '../types';
import { Switch } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/solid';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const AIInsights: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [anomalyAlerts, setAnomalyAlerts] = useState<boolean>(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');
    ws.onmessage = (event) => {
      try {
        const newTransaction: Transaction = JSON.parse(event.data);
        setTransactions((prev) => [newTransaction, ...prev].slice(0, 50));
      } catch (error) {
        console.error('WebSocket parsing error:', error);
      }
    };
    ws.onerror = () => {
      console.error('WebSocket error');
      ws.close();
    };
    return () => ws.close();
  }, []);

  const handleAnomalyToggle = (enabled: boolean) => {
    setAnomalyAlerts(enabled);
    if (enabled) {
      alert('Anomaly alerts enabled!');
    }
  };

  const walletActivity = transactions.reduce((acc, tx) => {
    acc[tx.from] = (acc[tx.from] || 0) + parseFloat(tx.value);
    return acc;
  }, {} as Record<string, number>);

  return (
    <motion.div className="space-y-4" initial="hidden" animate="visible" variants={fadeIn}>
      <h2 className="text-2xl font-bold text-white text-shadow-glow">AI Insights</h2>
      <div className="bg-gray-900/50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-white text-shadow-glow mb-2 flex items-center">
          <BellIcon className="h-5 w-5 mr-2" /> Anomaly Alerts
        </h3>
        <Switch
          checked={anomalyAlerts}
          onChange={handleAnomalyToggle}
          className={`${anomalyAlerts ? 'bg-blue-600' : 'bg-gray-600'} relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className={`${anomalyAlerts ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
        </Switch>
      </div>
      <div className="bg-gray-900/50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-white text-shadow-glow mb-2">Wallet Activity Summary</h3>
        <ul className="text-gray-200">
          {Object.entries(walletActivity).map(([wallet, total]) => (
            <li key={wallet} className="py-1">
              {wallet.slice(0, 6)}...: {total.toFixed(2)} ETH
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default AIInsights;