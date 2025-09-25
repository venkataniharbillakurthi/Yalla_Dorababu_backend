import React, { useState, useEffect, useRef } from 'react';
import { PlatformCard } from './PlatformCard';
import { PostComposer } from './PostComposer';
import { BarChart3, TrendingUp, Users, MessageCircle, Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const [greeting, setGreeting] = useState(getGreeting());
  
  // Update greeting if user stays on the page across time changes
  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 3600000); // Update every hour
    
    return () => clearInterval(interval);
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'connected', 'disconnected'
  const [isAnimating, setIsAnimating] = useState(false);
  const prevFilterRef = useRef('all');
  const cardRefs = useRef([]);
  
  // Animation effect when filter changes
  useEffect(() => {
    if (prevFilterRef.current !== activeFilter) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      prevFilterRef.current = activeFilter;
      return () => clearTimeout(timer);
    }
  }, [activeFilter, searchQuery]);
  const [platforms, setPlatforms] = useState([
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📷',
      connected: false,
      connecting: false,
      followers: '12.5K followers',
      bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      textColor: 'text-white'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: '📘',
      connected: false,
      connecting: false,
      followers: '8.3K followers',
      bgColor: 'bg-blue-600',
      textColor: 'text-white'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: '🐦',
      connected: false,
      connecting: false,
      followers: '5.2K followers',
      bgColor: 'bg-black',
      textColor: 'text-white'
    },
    {
      id: 'threads',
      name: 'Threads',
      icon: '🧵',
      connected: false,
      connecting: false,
      followers: '3.1K followers',
      bgColor: 'bg-gray-900',
      textColor: 'text-white'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '💼',
      connected: false,
      connecting: false,
      followers: '2.8K connections',
      bgColor: 'bg-blue-700',
      textColor: 'text-white'
    }
  ]);

  const handleConnect = (index) => {
    setPlatforms(prev => 
      prev.map((platform, i) => 
        i === index 
          ? { ...platform, connecting: !platform.connected ? true : false, connected: platform.connected ? false : platform.connected }
          : platform
      )
    );
  };

  const handleConnectionComplete = (index, success) => {
    setPlatforms(prev => 
      prev.map((platform, i) => 
        i === index 
          ? { ...platform, connecting: false, connected: success }
          : platform
      )
    );
  };

  const connectedCount = platforms.filter(p => p.connected).length;
  
  // Filter platforms based on search and active filter
  const filteredPlatforms = platforms
    .filter(platform => 
      platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      platform.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(platform => {
      if (activeFilter === 'connected') return platform.connected;
      if (activeFilter === 'disconnected') return !platform.connected;
      return true; // 'all' filter
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Bar with Greeting */}
      <div className="relative bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-sm p-8 mb-8 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200 rounded-full opacity-20"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-200 rounded-full opacity-20"></div>
        
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-blue-700 mb-4 shadow-sm">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            Welcome back!
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {greeting}, {currentUser?.name || 'there'}! <span className="wave">👋</span>
          </h1>
          
          <p className="text-lg text-gray-600 mt-3 max-w-lg mx-auto">
            Ready to create something amazing today? Your audience is waiting!
          </p>
          
          <div className="mt-6 flex items-center justify-center space-x-3">
            <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="h-2 w-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="h-2 w-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
          </div>
        </div>
      </div>
      {/* Post Composer */}
      <PostComposer />

      {/* Platform Integrations */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Platform Integrations</h2>
            <p className="text-sm text-gray-500 mt-1">
              {connectedCount} of {platforms.length} platforms connected
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300"
                placeholder="Search platforms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease'
                }}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Filter Buttons */}
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  activeFilter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('connected')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeFilter === 'connected' ? 'bg-green-100 text-green-800' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Connected
              </button>
              <button
                onClick={() => setActiveFilter('disconnected')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  activeFilter === 'disconnected' ? 'bg-red-100 text-red-800' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Not Connected
              </button>
            </div>
          </div>
        </div>
        
        {/* Platform Cards */}
        {filteredPlatforms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlatforms.map((platform, index) => (
              <div 
                key={platform.name} 
                ref={el => cardRefs.current[index] = el}
                className={`transform transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg ${
                  isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
                style={{
                  animation: isAnimating ? 'none' : `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`,
                  opacity: 0,
                  transform: isAnimating ? 'translateY(20px)' : 'translateY(0)'
                }}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <PlatformCard
                    {...platform}
                    onConnect={() => handleConnect(platforms.findIndex(p => p.id === platform.id))}
                    onConnectionComplete={(success) => handleConnectionComplete(platforms.findIndex(p => p.id === platform.id), success)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No platforms found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery ? 'Try a different search term' : 'All platforms are connected'}
            </p>
          </div>
        )}
        
        {/* Connection Status Summary */}
        <div 
          className="mt-8 bg-white rounded-xl shadow-sm p-6 transform transition-all duration-500 hover:shadow-md"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02)'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Connection Status</h3>
              <p className="text-sm text-gray-500">
                {connectedCount === platforms.length ? 'All platforms connected! 🎉' : 
                 `Connect ${platforms.length - connectedCount} more platform${platforms.length - connectedCount !== 1 ? 's' : ''} to get started`}
              </p>
            </div>
            <div className="w-1/2">
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                  style={{ 
                    width: `${(connectedCount / platforms.length) * 100}%`,
                    backgroundSize: '200% 100%',
                    animation: 'gradientBG 3s ease infinite',
                    boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)'
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1 text-right">{connectedCount} of {platforms.length} connected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Ready to expand your reach?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect all your social media platforms and start posting to multiple channels simultaneously. 
            Save time and increase your social media presence with our unified posting system.
          </p>
          <div className="flex justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Connect All Platforms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};