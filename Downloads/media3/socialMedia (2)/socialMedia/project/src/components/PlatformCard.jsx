import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Users } from 'lucide-react';

const STORAGE_KEY = 'social_media_credentials';

export const PlatformCard = ({
  name,
  icon,
  followers,
  bgColor,
  textColor,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if credentials exist in localStorage on component mount
  useEffect(() => {
    const credentials = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (credentials[name]) {
      setIsConnected(true);
    }
  }, [name]);

  const handleConnect = () => {
    if (isConnected) {
      // Disconnect
      const credentials = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      delete credentials[name];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
      setIsConnected(false);
    } else {
      // Show modal to enter credentials
      setIsModalOpen(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      try {
        // Save to localStorage
        const credentials = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        credentials[name] = { email, password };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
        
        setIsConnected(true);
        setIsModalOpen(false);
        setEmail('');
        setPassword('');
      } catch (err) {
        setError('Failed to save credentials');
        console.error('Error saving credentials:', err);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError('');
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center`}>
              <span className={`text-xl font-bold ${textColor}`}>{icon}</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{name}</h3>
              {followers && (
                <p className="text-sm text-gray-500 flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {followers}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isConnected ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <XCircle className="w-6 h-6 text-gray-400" />
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`text-sm px-3 py-1 rounded-full ${
            isLoading
              ? 'bg-blue-100 text-blue-700'
              : isConnected 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {isLoading ? 'Connecting...' : isConnected ? 'Connected' : 'Not Connected'}
          </span>
          
          <button
            onClick={handleConnect}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isConnected
                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                : `${bgColor} ${textColor} hover:opacity-90 transform hover:scale-105`
            }`}
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </button>
        </div>
      </div>

      {/* Connection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Connect {name}</h3>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-lg font-medium text-white ${bgColor} hover:opacity-90 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Connecting...' : 'Connect'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};