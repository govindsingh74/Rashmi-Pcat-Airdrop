import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Twitter, Facebook, Instagram, Youtube, BarChart3, Users, Settings, LogOut, Database } from 'lucide-react';
import { Cat } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Cat className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">PCAT Airdrop</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.name}</span>
              <div className="hidden md:flex space-x-4">
                <button
                  onClick={() => navigate('/airdrop')}
                  className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/data')}
                  className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Data
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar & Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:w-64
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        `}>
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              <button
                onClick={() => navigate('/community')}
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-purple-50 hover:text-purple-600 w-full"
              >
                <Users className="mr-3 h-6 w-6" />
                Community
              </button>
              <button
                onClick={() => navigate('/analytics')}
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-purple-50 hover:text-purple-600 w-full"
              >
                <BarChart3 className="mr-3 h-6 w-6" />
                Analytics
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-purple-50 hover:text-purple-600 w-full"
              >
                <Settings className="mr-3 h-6 w-6" />
                Settings
              </button>
            </div>
            
            <div className="mt-8">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Social Media
              </h3>
              <div className="mt-2 space-y-1">
                <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-purple-50 hover:text-purple-600">
                  <Twitter className="mr-3 h-5 w-5" />
                  Twitter
                </a>
                <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-purple-50 hover:text-purple-600">
                  <Facebook className="mr-3 h-5 w-5" />
                  Facebook
                </a>
                <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-purple-50 hover:text-purple-600">
                  <Instagram className="mr-3 h-5 w-5" />
                  Instagram
                </a>
                <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-purple-50 hover:text-purple-600">
                  <Youtube className="mr-3 h-5 w-5" />
                  YouTube
                </a>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-md mt-8">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Cat className="h-6 w-6 text-purple-600" />
              <span className="ml-2 text-gray-600">© 2024 PCAT Airdrop. All rights reserved.</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}