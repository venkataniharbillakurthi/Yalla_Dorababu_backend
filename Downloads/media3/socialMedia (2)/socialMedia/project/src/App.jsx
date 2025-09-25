import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/auth/Login';
import { Dashboard } from './components/Dashboard';
import { Home } from './components/Home';
import Pricing from './components/Pricing';
import PaymentPage from './pages/PaymentPage';
import PrivateRoute from './components/auth/PrivateRoute';
import Sidebar from './components/Sidebar';
import { Home as HomeIcon, Link2, DollarSign, CreditCard } from 'lucide-react';

// Wrapper component to conditionally render the layout
const Layout = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Home', path: '/', icon: <HomeIcon className="w-5 h-5" /> },
    { name: 'Integrations', path: '/integrations', icon: <Link2 className="w-5 h-5" /> },
    { name: 'Pricing', path: '/pricing', icon: <DollarSign className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar navItems={navItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

// Header component
const Header = () => {
  const { currentUser, logout } = useAuth();
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-16">
          <div className="flex items-center space-x-4">
            <button 
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Logout
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{currentUser?.name || 'User'}</p>
                <p className="text-xs text-gray-500">Free Plan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={
              <Login />
            } />
            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="/pricing" element={
              <PrivateRoute>
                <Pricing />
              </PrivateRoute>
            } />
            <Route path="/integrations" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/payment" element={
              <PrivateRoute>
                <PaymentPage />
              </PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;