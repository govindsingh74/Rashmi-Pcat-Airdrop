import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Wallet, Gift, Clock, Users, ArrowUpRight } from 'lucide-react';

export default function Airdrop() {
  const { user } = useAuth();

  const stats = [
    { name: 'Total PCAT Tokens', value: '100,000', change: '+12.5%', icon: Gift },
    { name: 'Time Until Drop', value: '14 days', change: null, icon: Clock },
    { name: 'Participants', value: '45,678', change: '+5.2%', icon: Users },
    { name: 'Your Allocation', value: '2,500', change: '+2.3%', icon: Wallet },
  ];

  const activities = [
    { action: 'Wallet Connected', time: '2 hours ago', status: 'Completed' },
    { action: 'KYC Verification', time: '1 day ago', status: 'Pending' },
    { action: 'Social Tasks', time: '3 days ago', status: 'In Progress' },
    { action: 'Community Tasks', time: '5 days ago', status: 'Completed' },
  ];

  const tasks = [
    { name: 'Follow on Twitter', reward: '100 PCAT', completed: true },
    { name: 'Join Telegram', reward: '150 PCAT', completed: true },
    { name: 'Share Announcement', reward: '200 PCAT', completed: false },
    { name: 'Invite Friends', reward: '300 PCAT', completed: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">PCAT Airdrop Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome to your airdrop control center</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-purple-600" />
              </div>
              {stat.change && (
                <div className="mt-2">
                  <span className="text-green-500 text-sm">{stat.change}</span>
                  <span className="text-gray-500 text-sm"> vs last period</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Wallet Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Wallet</h2>
              <Wallet className="h-6 w-6 text-purple-600" />
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Connected Address</p>
                <p className="text-gray-900 font-mono break-all">{user?.walletAddress}</p>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500 mb-2">Recent Activity</p>
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      activity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      activity.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Airdrop Tasks</h2>
              <Gift className="h-6 w-6 text-purple-600" />
            </div>
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-4 ${
                      task.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{task.name}</p>
                      <p className="text-xs text-purple-600">{task.reward}</p>
                    </div>
                  </div>
                  <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                    {task.completed ? 'View' : 'Complete'}
                  </button>
                </div>
              ))}
              <div className="pt-4">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-purple-600 rounded-md text-purple-600 hover:bg-purple-50">
                  View All Tasks
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}