"use client";

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Transaction } from '../types';
import { Chart, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, ChartTypeRegistry } from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  MatrixController,
  MatrixElement
);

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const TransactionTracker: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<string>('');

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

  const filteredTransactions = useMemo(
    () => transactions.filter((tx) => filter === '' || tx.token.toLowerCase().includes(filter.toLowerCase())),
    [transactions, filter]
  );

  // Feature 2: Token Distribution Pie Chart
  const tokenDistribution = transactions.reduce((acc, tx) => {
    acc[tx.token] = (acc[tx.token] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = {
    labels: Object.keys(tokenDistribution),
    datasets: [
      {
        data: Object.values(tokenDistribution),
        backgroundColor: ['rgba(59, 130, 246, 0.6)', 'rgba(236, 72, 153, 0.6)', 'rgba(139, 92, 246, 0.6)'],
        borderColor: ['rgba(59, 130, 246, 1)', 'rgba(236, 72, 153, 1)', 'rgba(139, 92, 246, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const, labels: { color: '#E5E7EB' } },
    },
  };

  // Feature 9: Transaction Value Heatmap
  const heatmapData = transactions.reduce((acc, tx) => {
    const hour = new Date(tx.timestamp).getHours();
    const value = parseFloat(tx.value);
    acc[hour] = (acc[hour] || 0) + value;
    return acc;
  }, {} as Record<number, number>);

  const maxValue = Math.max(...Object.values(heatmapData), 1) || 1;

  const matrixData = {
    datasets: [
      {
        label: 'Transaction Value Heatmap',
        data: Array.from({ length: 24 }, (_, hour) => ({
          x: hour,
          y: 0,
          v: heatmapData[hour] || 0,
        })),
        backgroundColor: (ctx: { dataset: { data: { v: number }[] }; dataIndex: number }) => {
          const value = ctx.dataset.data[ctx.dataIndex]?.v || 0;
          const alpha = value / maxValue;
          return `rgba(59, 130, 246, ${alpha})`;
        },
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        width: ({ chart }: { chart: ChartJS<keyof ChartTypeRegistry> }) => (chart.chartArea ? chart.chartArea.width / 24 : 0),
        height: ({ chart }: { chart: ChartJS<keyof ChartTypeRegistry> }) => (chart.chartArea ? chart.chartArea.height : 0),
      },
    ],
  };

  const matrixOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: { raw: { x: number; v: number } }) => `Hour ${ctx.raw.x}: ${ctx.raw.v.toFixed(2)} ETH`,
        },
      },
    },
    scales: {
      x: {
        type: 'linear' as const,
        min: 0,
        max: 23,
        ticks: {
          stepSize: 1,
          callback: (value: number) => `${value}:00`,
          color: '#E5E7EB',
        },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      y: {
        display: false,
      },
    },
  };

  const chartData = {
    labels: filteredTransactions.map((tx) => new Date(tx.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Transaction Value (ETH)',
        data: filteredTransactions.map((tx) => parseFloat(tx.value)),
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const, labels: { color: '#E5E7EB' } },
      title: { display: false },
    },
    scales: {
      x: {
        ticks: { color: '#E5E7EB' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      y: {
        ticks: { color: '#E5E7EB' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    },
  };

  return (
    <motion.div className="space-y-4" initial="hidden" animate="visible" variants={fadeIn}>
      <h2 className="text-2xl font-bold text-white text-shadow-glow">Transaction Tracker</h2>
      <input
        type="text"
        placeholder="Filter by token (e.g., USDT)"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="bg-gray-900/50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-white text-shadow-glow mb-2">Token Distribution</h3>
        <Pie data={pieData} options={pieOptions} />
      </div>
      <div className="bg-gray-900/50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-white text-shadow-glow mb-2">Transaction Value Heatmap</h3>
        <Chart type="matrix" data={matrixData} options={matrixOptions} />
      </div>
      <div className="bg-gray-900/50 p-4 rounded-lg">
        <Line data={chartData} options={chartOptions} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-200">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 px-4">Hash</th>
              <th className="py-2 px-4">From</th>
              <th className="py-2 px-4">To</th>
              <th className="py-2 px-4">Value</th>
              <th className="py-2 px-4">Token</th>
              <th className="py-2 px-4">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.hash} className="border-b border-gray-800 hover:bg-gray-800/20">
                <td className="py-2 px-4">{tx.hash.slice(0, 6)}...</td>
                <td className="py-2 px-4">{tx.from.slice(0, 6)}...</td>
                <td className="py-2 px-4">{tx.to.slice(0, 6)}...</td>
                <td className="py-2 px-4">{tx.value}</td>
                <td className="py-2 px-4">{tx.token}</td>
                <td className="py-2 px-4">{new Date(tx.timestamp).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default TransactionTracker;