import React from 'react';
import { Twitter, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Community() {
  const communities = [
    {
      platform: 'Twitter',
      icon: Twitter,
      stats: { followers: '125K', engagement: '12%', posts: '1.2K' },
      topPosts: [
        { title: 'Launch Announcement', engagement: '5.2K' },
        { title: 'Community Update', engagement: '3.8K' },
      ]
    },
    {
      platform: 'Facebook',
      icon: Facebook,
      stats: { followers: '85K', engagement: '8%', posts: '856' },
      topPosts: [
        { title: 'Community Event', engagement: '3.1K' },
        { title: 'Feature Preview', engagement: '2.9K' },
      ]
    },
    {
      platform: 'Instagram',
      icon: Instagram,
      stats: { followers: '95K', engagement: '15%', posts: '934' },
      topPosts: [
        { title: 'Project Showcase', engagement: '4.5K' },
        { title: 'Team Introduction', engagement: '3.7K' },
      ]
    },
    {
      platform: 'YouTube',
      icon: Youtube,
      stats: { followers: '45K', engagement: '18%', posts: '156' },
      topPosts: [
        { title: 'Tutorial Video', engagement: '15K' },
        { title: 'Project Overview', engagement: '12K' },
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Community Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {communities.map((community) => (
          <div key={community.platform} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <community.icon className="h-6 w-6 text-purple-600" />
              <h2 className="ml-2 text-xl font-semibold">{community.platform}</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">Followers</p>
                <p className="text-lg font-semibold">{community.stats.followers}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Engagement</p>
                <p className="text-lg font-semibold">{community.stats.engagement}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Posts</p>
                <p className="text-lg font-semibold">{community.stats.posts}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Top Posts</h3>
              {community.topPosts.map((post, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-sm">{post.title}</span>
                  <span className="text-sm text-purple-600">{post.engagement} engagements</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}