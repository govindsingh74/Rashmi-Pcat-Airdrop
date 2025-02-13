import React from 'react';
import { TrendingUp, Users, ThumbsUp, Award } from 'lucide-react';

export default function Analytics() {
  const metrics = [
    { name: 'Total Followers', value: '350K+', change: '+12.5%', icon: Users },
    { name: 'Engagement Rate', value: '15.2%', change: '+2.3%', icon: ThumbsUp },
    { name: 'Total Posts', value: '3.1K', change: '+8.1%', icon: TrendingUp },
    { name: 'Achievement Score', value: '92', change: '+5.4%', icon: Award },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics Overview</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div key={metric.name} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{metric.name}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
              <metric.icon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <span className="text-green-500 text-sm">{metric.change}</span>
              <span className="text-gray-500 text-sm"> vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Platform Performance</h2>
          <div className="space-y-4">
            {[
              { platform: 'Twitter', value: '42%' },
              { platform: 'Facebook', value: '28%' },
              { platform: 'Instagram', value: '20%' },
              { platform: 'YouTube', value: '10%' },
            ].map((platform) => (
              <div key={platform.platform}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-500">{platform.platform}</span>
                  <span className="text-sm font-medium text-gray-900">{platform.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: platform.value }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'New Twitter Followers', value: '+1,234', time: '2h ago' },
              { action: 'Facebook Post Engagement', value: '+856', time: '4h ago' },
              { action: 'Instagram Story Views', value: '+2,567', time: '6h ago' },
              { action: 'YouTube Video Views', value: '+3,890', time: '12h ago' },
            ].map((activity, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <span className="text-sm font-semibold text-green-500">{activity.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}