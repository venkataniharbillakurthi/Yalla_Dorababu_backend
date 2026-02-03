# Environment Variables Summary

This document lists all environment variables used in both frontend and backend.

## Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Database Configuration
DB_URL=jdbc:mysql://localhost:3306/andhra_machines?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=86400000

# Email Configuration
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Admin Contact Information
ADMIN_EMAIL=your_admin_email@gmail.com
ADMIN_PHONE=+91 8328657726
```

## Frontend Environment Variables

Create a `.env` file in the `frontend` directory with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api

# WhatsApp Configuration
VITE_WHATSAPP_NUMBER=918328657726
```

## Important Notes

- **Backend `.env`**: Must be in `backend/` directory (same level as `pom.xml`)
- **Frontend `.env`**: Must be in `frontend/` directory (same level as `package.json`)
- Both `.env` files are already in `.gitignore` and will NOT be committed
- Never commit real credentials to version control
- For production, set these variables in your hosting platform's environment settings

## Verification

### Backend
After creating the backend `.env` file and restarting the application, you should see:
```
✓ Environment variables loaded from .env file
  Loaded X variables
```

### Frontend
After creating the frontend `.env` file, restart your development server:
```bash
npm run dev
```

The application will use the environment variables. If variables are missing, the app will use fallback values (for frontend) or fail to start (for backend).

