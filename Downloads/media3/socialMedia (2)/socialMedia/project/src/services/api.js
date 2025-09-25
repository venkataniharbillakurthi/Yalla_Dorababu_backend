// API service for communicating with the FastAPI backend
const API_BASE_URL = 'http://localhost:8000';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  /**
   * Post content to Instagram using the backend API
   * @param {Object} postData - The post data
   * @param {string} postData.username - Instagram username
   * @param {string} postData.password - Instagram password
   * @param {string} postData.caption - Post caption
   * @param {boolean} postData.share_to_threads - Whether to share to Threads
   * @param {boolean} postData.share_to_facebook - Whether to share to Facebook
   * @param {File[]} postData.files - Array of media files
   * @returns {Promise<Object>} - API response
   */
  async postToInstagram(postData) {
    const formData = new FormData();
    
    // Append text data
    formData.append('username', postData.username);
    formData.append('password', postData.password);
    formData.append('caption', postData.caption || '');
    formData.append('share_to_threads', postData.share_to_threads || false);
    formData.append('share_to_facebook', postData.share_to_facebook || false);
    
    // Append files
    if (postData.files && postData.files.length > 0) {
      postData.files.forEach((file) => {
        formData.append('files', file);
      });
    }

    try {
      const response = await fetch(`${this.baseUrl}/post-to-instagram/`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header when using FormData - browser will set it automatically
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  /**
   * Check if the backend API is available
   * @returns {Promise<boolean>} - True if API is available
   */
  async checkHealth() {
    try {
      const response = await fetch(`${this.baseUrl}/docs`, {
        method: 'GET',
      });
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
