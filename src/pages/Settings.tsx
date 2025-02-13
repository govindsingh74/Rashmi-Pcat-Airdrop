import React, { useState } from 'react';
import { Save } from 'lucide-react';

export default function Settings() {
  const [socialLinks, setSocialLinks] = useState({
    twitter: '',
    facebook: '',
    instagram: '',
    youtube: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Social links updated:', socialLinks);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Social Media Settings</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
              Twitter Profile URL
            </label>
            <input
              type="url"
              id="twitter"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="https://twitter.com/yourusername"
              value={socialLinks.twitter}
              onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
              Facebook Profile URL
            </label>
            <input
              type="url"
              id="facebook"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="https://facebook.com/yourusername"
              value={socialLinks.facebook}
              onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
              Instagram Profile URL
            </label>
            <input
              type="url"
              id="instagram"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="https://instagram.com/yourusername"
              value={socialLinks.instagram}
              onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="youtube" className="block text-sm font-medium text-gray-700">
              YouTube Channel URL
            </label>
            <input
              type="url"
              id="youtube"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="https://youtube.com/c/yourchannel"
              value={socialLinks.youtube}
              onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}