# Social Media Automation Platform

A full-stack social media automation platform that allows users to post content to Instagram automatically using a React frontend and FastAPI backend.

## Features

- 🚀 **Modern React Frontend** with Vite and Tailwind CSS
- 🤖 **FastAPI Backend** with Instagram automation
- 📸 **Media Upload Support** for images and videos
- 🔐 **Secure Authentication** with Firebase
- 📱 **Responsive Design** that works on all devices
- ⚡ **Real-time Status Updates** during posting process
- 🔄 **Cross-platform Sharing** to Instagram, Threads, and Facebook

## Prerequisites

Before running this application, make sure you have the following installed:

- **Python 3.8+** - [Download from python.org](https://www.python.org/downloads/)
- **Node.js 16+** - [Download from nodejs.org](https://nodejs.org/)
- **Google Chrome Browser** - Required for Selenium automation
- **ChromeDriver** - Will be automatically installed by webdriver-manager

## Quick Start

### Option 1: Automated Setup (Recommended)

1. **Clone or download** this project to your local machine
2. **Double-click** `start-services.bat` to automatically:
   - Install all dependencies
   - Start both frontend and backend servers
   - Open the application in your browser

### Option 2: Manual Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the backend server:**
   ```bash
   python -m uvicorn src.insta_main:app --reload --host 0.0.0.0 --port 8000
   ```

4. **Start the frontend server** (in a new terminal):
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173`

## Usage Guide

### 1. Login to the Platform
- Use the demo credentials or create a new account
- Default demo user: `user@example.com` / `password123`

### 2. Create a New Post
1. Navigate to the **Integrations** page
2. Click on **Create New Post**
3. Select **Instagram** as your platform
4. Enter your post content (caption)
5. Upload images or videos (required for Instagram)
6. Click **Post Now**

### 3. Instagram Authentication
- When posting to Instagram, you'll be prompted for your Instagram credentials
- Enter your Instagram username and password
- Choose additional sharing options (Threads, Facebook)
- Click **Post to Instagram**

### 4. Monitor Progress
- Watch the real-time status updates as your post is being published
- Get notified when the post is successfully published or if there are any errors

## API Endpoints

The backend provides the following endpoints:

- `GET /` - Health check and API information
- `GET /health` - Service health status
- `POST /post-to-instagram/` - Post content to Instagram
- `GET /docs` - Interactive API documentation (Swagger UI)

## Project Structure

```
project/
├── src/
│   ├── components/          # React components
│   │   ├── PostComposer.jsx # Main posting interface
│   │   └── InstagramCredentialsModal.jsx # Login modal
│   ├── services/           # API service layer
│   │   └── api.js          # Backend communication
│   ├── contexts/           # React contexts
│   │   └── AuthContext.jsx # Authentication management
│   └── insta_main.py       # FastAPI backend server
├── requirements.txt        # Python dependencies
├── package.json           # Node.js dependencies
├── start-services.bat     # Automated startup script
└── README.md             # This file
```

## Configuration

### Backend Configuration
- **Port:** 8000 (configurable in `src/insta_main.py`)
- **CORS:** Configured for frontend origins
- **File uploads:** Temporary files stored in `temp_uploads_*` directories

### Frontend Configuration
- **Port:** 5173 (Vite default)
- **API Base URL:** `http://localhost:8000` (configurable in `src/services/api.js`)

## Troubleshooting

### Common Issues

1. **"Python is not installed"**
   - Install Python 3.8+ from python.org
   - Make sure Python is added to your system PATH

2. **"Node.js is not installed"**
   - Install Node.js 16+ from nodejs.org
   - Restart your terminal after installation

3. **"Chrome browser not found"**
   - Install Google Chrome browser
   - Make sure it's in the default installation location

4. **"CORS errors in browser"**
   - Ensure both frontend and backend are running
   - Check that backend is running on port 8000

5. **"Instagram login fails"**
   - Check your Instagram credentials
   - Ensure your account is not protected by 2FA
   - Try logging in manually to Instagram first

### Getting Help

If you encounter issues:

1. Check the console output in both terminal windows
2. Visit the API documentation at `http://localhost:8000/docs`
3. Ensure all prerequisites are properly installed
4. Try restarting both services

## Security Notes

- Instagram credentials are only used temporarily and not stored
- All uploaded files are automatically deleted after posting
- The application runs locally on your machine for security

## Development

### Backend Development
```bash
# Run with auto-reload
python -m uvicorn src.insta_main:app --reload

# View API docs
http://localhost:8000/docs
```

### Frontend Development
```bash
# Start development server
npm run dev

# Build for production
npm run build
```

## License

This project is for educational and personal use. Please respect Instagram's Terms of Service and use responsibly.

## Contributing

Feel free to submit issues and enhancement requests!
