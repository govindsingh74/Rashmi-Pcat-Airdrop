import React from 'react';
import { Twitter, Facebook, Instagram, Youtube, Users, BarChart3, Settings } from 'lucide-react';

export default function Data() {
  const sections = [
    {
      title: 'Community',
      icon: Users,
      stats: {
        totalMembers: '125K',
        activeUsers: '45K',
        growth: '+12.5%',
      },
      activities: [
        { name: 'New Members Today', value: '234' },
        { name: 'Active Discussions', value: '56' },
        { name: 'Community Events', value: '12' },
      ]
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      stats: {
        totalViews: '1.2M',
        engagement: '15.2%',
        conversion: '8.5%',
      },
      activities: [
        { name: 'Daily Active Users', value: '45,678' },
        { name: 'Average Session', value: '12m' },
        { name: 'Bounce Rate', value: '32%' },
      ]
    },
    {
      title: 'Settings',
      icon: Settings,
      stats: {
        lastUpdated: '2h ago',
        configurations: '15',
        status: 'Active',
      },
      activities: [
        { name: 'Security Level', value: 'High' },
        { name: 'Notifications', value: 'Enabled' },
        { name: 'Backup Status', value: 'Up to date' },
      ]
    }
  ];

  const socialMedia = [
    {
      platform: 'Twitter',
      icon: Twitter,
      stats: {
        followers: '85K',
        engagement: '12%',
        posts: '1.2K',
      },
      recentPosts: [
        { content: 'Launch Announcement', engagement: '5.2K' },
        { content: 'Community Update', engagement: '3.8K' },
      ]
    },
    {
      platform: 'Facebook',
      icon: Facebook,
      stats: {
        followers: '65K',
        engagement: '8%',
        posts: '856',
      },
      recentPosts: [
        { content: 'Feature Preview', engagement: '3.1K' },
        { content: 'User Spotlight', engagement: '2.9K' },
      ]
    },
    {
      platform: 'Instagram',
      icon: Instagram,
      stats: {
        followers: '92K',
        engagement: '15%',
        posts: '934',
      },
      recentPosts: [
        { content: 'Community Highlights', engagement: '4.5K' },
        { content: 'Behind the Scenes', engagement: '3.7K' },
      ]
    },
    {
      platform: 'YouTube',
      icon: Youtube,
      stats: {
        followers: '45K',
        engagement: '18%',
        posts: '156',
      },
      recentPosts: [
        { content: 'Tutorial Series', engagement: '15K' },
        { content: 'Project Overview', engagement: '12K' },
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Main Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {sections.map((section) => (
          <div key={section.title} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
              <section.icon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {Object.entries(section.stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <p className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="text-lg font-semibold text-gray-900">{value}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {section.activities.map((activity) => (
                <div key={activity.name} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{activity.name}</span>
                  <span className="text-sm font-medium text-purple-600">{activity.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Social Media Section */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Social Media</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialMedia.map((platform) => (
          <div key={platform.platform} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <platform.icon className="h-6 w-6 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold">{platform.platform}</h3>
              </div>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View Details
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              {Object.entries(platform.stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <p className="text-sm text-gray-500 capitalize">{key}</p>
                  <p className="text-lg font-semibold">{value}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Recent Posts</h4>
              {platform.recentPosts.map((post, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">{post.content}</span>
                  <span className="text-sm font-medium text-purple-600">{post.engagement} engagements</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}