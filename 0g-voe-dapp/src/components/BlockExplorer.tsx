"use client";

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Block } from '../types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const BlockExplorer: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');
    ws.onmessage = (event) => {
      try {
        const newBlock: Block = JSON.parse(event.data);
        setBlocks((prev) => [newBlock, ...prev].slice(0, 50));
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

  // Feature 3: Gas Fee Tracker
  const gasData = {
    labels: blocks.map((block) => new Date(block.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Gas Used (Gwei)',
        data: blocks.map((block) => parseFloat(block.gasUsed)),
        borderColor: 'rgba(236, 72, 153, 1)',
        backgroundColor: 'rgba(236, 72, 153, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const gasOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const, labels: { color: '#E5E7EB' } },
      title: { display: false },
    },
    scales: {
      x: { ticks: { color: '#E5E7EB' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
      y: { ticks: { color: '#E5E7EB' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
    },
  };

  // Feature 7: Block Time Trend Chart
  const blockTimeData = {
    labels: blocks.map((block) => new Date(block.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Block Time (s)',
        data: blocks.map((block) => parseFloat(block.blockTime)),
        borderColor: 'rgba(139, 92, 246, 1)',
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const blockTimeOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const, labels: { color: '#E5E7EB' } },
      title: { display: false },
    },
    scales: {
      x: { ticks: { color: '#E5E7EB' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
      y: { ticks: { color: '#E5E7EB' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
    },
  };

  return (
    <motion.div className="space-y-4" initial="hidden" animate="visible" variants={fadeIn}>
      <h2 className="text-2xl font-bold text-white text-shadow-glow">Block Explorer</h2>
      <div className="bg-gray-900/50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-white text-shadow-glow mb-2">Gas Fee Tracker</h3>
        <Line data={gasData} options={gasOptions} />
      </div>
      <div className="bg-gray-900/50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-white text-shadow-glow mb-2">Block Time Trend</h3>
        <Line data={blockTimeData} options={blockTimeOptions} />
      </div>
    </motion.div>
  );
};

export default BlockExplorer;