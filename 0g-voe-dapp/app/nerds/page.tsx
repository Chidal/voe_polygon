"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClipboardIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { EventLog } from '@/types';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const DevDashboard: React.FC = () => {
  const [events, setEvents] = useState<EventLog[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');
    ws.onmessage = (event) => {
      try {
        const newEvent: EventLog = JSON.parse(event.data);
        setEvents((prev) => [newEvent, ...prev].slice(0, 50));
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

  const filteredEvents = events.filter(
    (event) =>
      event.transactionHash.toLowerCase().includes(search.toLowerCase()) ||
      event.eventName?.toLowerCase().includes(search.toLowerCase()) ||
      event.params?.from.toLowerCase().includes(search.toLowerCase()) ||
      event.params?.to.toLowerCase().includes(search.toLowerCase())
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const exportEvents = () => {
    const csv = [
      ['Hash,Event Name,From,To,Value'],
      ...filteredEvents.map((event) => [
        event.transactionHash,
        event.eventName || '',
        event.params?.from || '',
        event.params?.to || '',
        event.params?.value || '',
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'event-logs.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const queryEvents = async (blockNumber: string, address: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/events/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blockNumber, address }),
      });
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('API query error:', error);
    }
  };

  return (
    <motion.div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-8" initial="hidden" animate="visible" variants={fadeIn}>
      <h1 className="text-4xl font-bold text-white text-shadow-glow mb-8">Developer Dashboard</h1>
      <div className="space-y-4">
        <div className="bg-gray-900/50 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold text-white text-shadow-glow mb-2">Event Log Search</h2>
          <input
            type="text"
            placeholder="Search by hash, event name, or address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="bg-gray-900/50 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold text-white text-shadow-glow mb-2">API Query Tool</h2>
          <input
            type="text"
            placeholder="Enter block number"
            onChange={(e) => queryEvents(e.target.value, '')}
            className="w-full p-2 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
          <input
            type="text"
            placeholder="Enter address"
            onChange={(e) => queryEvents('', e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
        </div>
        <div className="bg-gray-900/50 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold text-white text-shadow-glow mb-2">Event Logs</h2>
          <button
            onClick={exportEvents}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" /> Export CSV
          </button>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-200">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-4">Hash</th>
                  <th className="py-2 px-4">Event Name</th>
                  <th className="py-2 px-4">From</th>
                  <th className="py-2 px-4">To</th>
                  <th className="py-2 px-4">Value</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="border-b border-gray-800 hover:bg-gray-800/20">
                    <td className="py-2 px-4">
                      <div className="flex items-center">
                        {event.transactionHash.slice(0, 6)}...
                        <button
                          onClick={() => copyToClipboard(event.transactionHash)}
                          className="ml-2 text-blue-400 hover:text-blue-300"
                        >
                          <ClipboardIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                    <td className="py-2 px-4">{event.eventName || 'Unknown'}</td>
                    <td className="py-2 px-4">{event.params?.from.slice(0, 6)}...</td>
                    <td className="py-2 px-4">{event.params?.to.slice(0, 6)}...</td>
                    <td className="py-2 px-4">{event.params?.value}</td>
                  </tr>
                ))}
              </tbody>
                          </table>
            </div>
          </div>
          </div>
        </motion.div>
  );
}

export default DevDashboard;