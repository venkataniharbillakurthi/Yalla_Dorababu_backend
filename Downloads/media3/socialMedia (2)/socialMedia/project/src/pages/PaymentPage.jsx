import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, X, CreditCard, Calendar, Lock, User, Smartphone, DollarSign, SmartphoneNfc } from 'lucide-react';
import PaymentLogos from '../components/PaymentLogos';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [plan, setPlan] = useState(null);
  const [activeTab, setActiveTab] = useState('card');
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('');

  useEffect(() => {
    // Get plan details from location state
    if (location.state?.plan) {
      setPlan(location.state.plan);
    } else {
      // Redirect back to pricing if no plan is selected
      navigate('/pricing');
    }
  }, [location.state, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : '';
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    
    return v;
  };

  const upiApps = [
    { id: 'gpay', name: 'Google Pay', icon: 'gpay' },
    { id: 'phonepe', name: 'PhonePe', icon: 'phonepe' },
    { id: 'paytm', name: 'Paytm', icon: 'paytm' },
    { id: 'amazonpay', name: 'Amazon Pay', icon: 'amazonpay' },
    { id: 'bhim', name: 'BHIM UPI', icon: 'bhim' },
    { id: 'other', name: 'Other UPI Apps', icon: 'other' },
  ];

  const handleUpiPayment = (e) => {
    e.preventDefault();
    if (!upiId || !selectedUpiApp) return;
    
    setIsProcessing(true);
    // Simulate UPI payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 2000);
  };

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Complete Your Purchase</h2>
              <button 
                onClick={() => navigate('/pricing')}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="px-6 py-8">
            {/* Payment Method Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('card')}
                  className={`${activeTab === 'card' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Credit/Debit Card
                </button>
                <button
                  onClick={() => setActiveTab('upi')}
                  className={`${activeTab === 'upi' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <SmartphoneNfc className="mr-2 h-5 w-5" />
                  UPI Payment
                </button>
              </nav>
            </div>
          </div>

          {isSuccess ? (
              <div className="text-center py-12">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
                <p className="text-gray-600 mb-8">
                  Your {plan.name} plan has been activated successfully. Redirecting to dashboard...
                </p>
              </div>
            ) : (
              <>
                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-900">{plan.name} Plan</h4>
                      <p className="text-sm text-gray-500">Billed {plan.period === 'month' ? 'monthly' : 'annually'}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-sm text-gray-500">/{plan.period}</span>
                    </div>
                  </div>
                </div>

                {activeTab === 'card' ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                      Card number
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="card-number"
                        value={formatCardNumber(cardNumber)}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0000 0000 0000 0000"
                        maxLength="19"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry date
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="expiry"
                          value={formatExpiry(expiry)}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-300 rounded-md"
                          placeholder="MM/YY"
                          maxLength="5"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="cvv"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-300 rounded-md"
                          placeholder="123"
                          maxLength="4"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name on card
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-300 rounded-md"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        `Pay $${plan.price} ${plan.period === 'year' ? '/year' : '/month'}`
                      )}
                    </button>
                  </div>
                </form>
                ) : (
                  <form onSubmit={handleUpiPayment} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Choose UPI App</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                        {upiApps.map((app) => (
                          <button
                            key={app.id}
                            type="button"
                            onClick={() => setSelectedUpiApp(app.id)}
                            className={`p-4 border rounded-lg flex flex-col items-center justify-center h-24 transition-colors ${
                              selectedUpiApp === app.id 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-2 p-2 shadow-sm border border-gray-100">
                              {app.icon === 'other' ? (
                                <DollarSign className="h-6 w-6 text-gray-600" />
                              ) : (
                                <>
                                  {React.createElement(PaymentLogos[app.icon], {
                                    className: 'h-8 w-auto max-w-full',
                                  })}
                                </>
                              )}
                            </div>
                            <span className="text-xs text-center">{app.name}</span>
                          </button>
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <label htmlFor="upi-id" className="block text-sm font-medium text-gray-700 mb-1">
                          UPI ID
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="upi-id"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-300 rounded-md"
                            placeholder="yourname@upi"
                            required
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          Enter your UPI ID (e.g., 1234567890@ybl, name@okhdfcbank)
                        </p>
                      </div>
                      
                      <div className="mt-6">
                        <button
                          type="submit"
                          disabled={isProcessing || !upiId || !selectedUpiApp}
                          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isProcessing ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            `Pay ₹${plan.price}`
                          )}
                        </button>
                        
                        <div className="mt-4 flex items-center justify-center">
                          <div className="flex items-center">
                            <Lock className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">Secure payment powered by UPI</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
