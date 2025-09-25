import React, { useState } from 'react';
import { Image, Video, Calendar, Send, X, Plus, FileImage, FileVideo, Instagram, AlertCircle, CheckCircle2 } from 'lucide-react';
import apiService from '../services/api';
import { InstagramCredentialsModal } from './InstagramCredentialsModal';

export const PostComposer = () => {
  const [postText, setPostText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [postStatus, setPostStatus] = useState(null); // null, 'success', 'error'
  const [postMessage, setPostMessage] = useState('');
  const [platforms, setPlatforms] = useState([
    { id: 'instagram', name: 'Instagram', selected: false, maxChars: 2200, bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500', textColor: 'text-white' },
    { id: 'facebook', name: 'Facebook', selected: false, maxChars: 63206, bgColor: 'bg-blue-600', textColor: 'text-white' },
    { id: 'twitter', name: 'Twitter', selected: false, maxChars: 280, bgColor: 'bg-black', textColor: 'text-white' },
    { id: 'threads', name: 'Threads', selected: false, maxChars: 500, bgColor: 'bg-gray-900', textColor: 'text-white' },
    { id: 'linkedin', name: 'LinkedIn', selected: false, maxChars: 3000, bgColor: 'bg-blue-700', textColor: 'text-white' }
  ]);

  const togglePlatform = (id) => {
    setPlatforms(prev => 
      prev.map(platform => 
        platform.id === id 
          ? { ...platform, selected: !platform.selected }
          : platform
      )
    );
  };

  const selectedPlatforms = platforms.filter(p => p.selected);
  const minCharLimit = Math.min(...selectedPlatforms.map(p => p.maxChars));
  const isOverLimit = postText.length > minCharLimit;

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(prev => [...prev, ...files]);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return <FileImage className="w-6 h-6 text-blue-500" />;
    } else if (file.type.startsWith('video/')) {
      return <FileVideo className="w-6 h-6 text-purple-500" />;
    }
    return <FileImage className="w-6 h-6 text-gray-500" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handlePost = () => {
    if (selectedPlatforms.length === 0) {
      setPostStatus('error');
      setPostMessage('Please select at least one platform');
      return;
    }
    if (!postText.trim() && selectedFiles.length === 0) {
      setPostStatus('error');
      setPostMessage('Please enter some content or add media files');
      return;
    }
    
    // Check if Instagram is selected
    const instagramSelected = selectedPlatforms.some(p => p.id === 'instagram');
    
    if (instagramSelected) {
      // Open modal for Instagram credentials
      setIsModalOpen(true);
    } else {
      // Handle other platforms (placeholder for now)
      setPostStatus('error');
      setPostMessage('Currently only Instagram posting is supported');
    }
  };

  const handleInstagramPost = async (credentials) => {
    setIsPosting(true);
    setPostStatus(null);
    setPostMessage('');

    try {
      // Validate that files are selected for Instagram
      if (selectedFiles.length === 0) {
        throw new Error('Instagram posts require at least one image or video file');
      }

      const postData = {
        username: credentials.username,
        password: credentials.password,
        caption: postText,
        share_to_threads: credentials.share_to_threads,
        share_to_facebook: credentials.share_to_facebook,
        files: selectedFiles
      };

      const response = await apiService.postToInstagram(postData);
      
      setPostStatus('success');
      setPostMessage('Successfully posted to Instagram!');
      
      // Reset form on success
      setPostText('');
      setSelectedFiles([]);
      setPlatforms(prev => prev.map(p => ({ ...p, selected: false })));
      setIsModalOpen(false);
      
    } catch (error) {
      console.error('Posting failed:', error);
      setPostStatus('error');
      setPostMessage(error.message || 'Failed to post to Instagram. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  const handleCloseModal = () => {
    if (!isPosting) {
      setIsModalOpen(false);
    }
  };

  const clearStatus = () => {
    setPostStatus(null);
    setPostMessage('');
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Create New Post</h2>
          <div className="text-sm text-gray-500">
            Selected: {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Status Message */}
        {postStatus && postMessage && (
          <div className={`flex items-center p-4 rounded-lg ${
            postStatus === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            {postStatus === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
            )}
            <p className={`text-sm ${
              postStatus === 'success' ? 'text-green-700' : 'text-red-700'
            }`}>
              {postMessage}
            </p>
            <button
              onClick={clearStatus}
              className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

      {/* Platform Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Select Platforms</label>
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => togglePlatform(platform.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                platform.selected
                  ? `${platform.bgColor} ${platform.textColor} transform scale-105`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {platform.name}
            </button>
          ))}
        </div>
      </div>

      {/* Post Content */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Post Content</label>
          <span className={`text-sm ${
            isOverLimit ? 'text-red-500' : 'text-gray-500'
          }`}>
            {postText.length}/{minCharLimit}
          </span>
        </div>
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind? Share it across all your platforms..."
          className={`w-full h-32 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            isOverLimit ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {isOverLimit && (
          <p className="text-sm text-red-500">
            Content exceeds character limit for selected platforms
          </p>
        )}
      </div>

      {/* Media Upload */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Media (Optional)</label>
          <span className="text-xs text-gray-500">{selectedFiles.length}/10 files</span>
        </div>
        
        {selectedFiles.length > 0 && (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getFileIcon(file)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-2">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              disabled={selectedFiles.length >= 10}
            />
            <div className={`flex items-center justify-center space-x-2 p-4 border-2 border-dashed rounded-lg transition-colors ${
              selectedFiles.length >= 10 
                ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                : 'border-gray-300 hover:border-blue-400 text-gray-500'
            }`}>
              <Image className="w-5 h-5" />
              <span className="text-sm">Add Images</span>
            </div>
          </label>
          
          <label className="cursor-pointer">
            <input
              type="file"
              accept="video/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              disabled={selectedFiles.length >= 10}
            />
            <div className={`flex items-center justify-center space-x-2 p-4 border-2 border-dashed rounded-lg transition-colors ${
              selectedFiles.length >= 10 
                ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                : 'border-gray-300 hover:border-blue-400 text-gray-500'
            }`}>
              <Video className="w-5 h-5" />
              <span className="text-sm">Add Videos</span>
            </div>
          </label>
        </div>
        
        {selectedFiles.length >= 10 && (
          <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
            Maximum 10 files allowed. Remove some files to add more.
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end pt-4 border-t border-gray-200">
        <div className="flex space-x-3">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Save Draft
          </button>
          <button
            onClick={handlePost}
            disabled={(!postText.trim() && selectedFiles.length === 0) || selectedPlatforms.length === 0 || isOverLimit}
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Post Now {selectedFiles.length > 0 && `(${selectedFiles.length} files)`}</span>
          </button>
        </div>
      </div>
      </div>

      {/* Instagram Credentials Modal */}
      <InstagramCredentialsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleInstagramPost}
        isLoading={isPosting}
      />
    </>
  );
};
