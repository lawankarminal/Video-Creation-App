import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, KeyRound, Video } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Login = () => {
  const { loginWithOTP, verifyOTP, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    navigate('/');
    return null;
  }
  
  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    try {
      await loginWithOTP(email);
      setOtpSent(true);
    } catch (error) {
      console.error('Failed to send OTP:', error);
    }
  };
  
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    try {
      const success = await verifyOTP(email, otp);
      if (success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Failed to verify OTP:', error);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 px-4 transition-all ease-out duration-200 ">
      <div className="max-w-md  w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center">
              <Video className="h-12 w-12 text-purple-600" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">VideoAI Platform</h1>
            <p className="mt-2 text-gray-600">Sign in to create amazing video content</p>
          </div>
          
          {!otpSent ? (
            // Email form
            <form onSubmit={handleSendOTP} className="space-y-6 space-x-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className=" w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <Button
                type="submit"
                fullWidth
                isLoading={loading}
                icon={<Send size={18} />}
              >
                Send OTP
              </Button>
              
              <p className="text-center text-xs text-gray-500 mt-4">
                For demo purposes, any 6-digit code will work as OTP.
              </p>
            </form>
          ) : (
            // OTP verification form
            <form onSubmit={handleVerifyOTP} className="space-y-6 slide-up transition-all ease-out duration-200 ">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP sent to {email}
                </label>
                <input
                  id="otp"
                  type="text"
                  required
                  className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="******"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                />
                <p className="mt-1 text-xs text-gray-500 text-right">
                  <button
                    type="button"
                    className="text-purple-600 hover:text-purple-800"
                    onClick={() => setOtpSent(false)}
                  >
                    Change email
                  </button>
                </p>
              </div>
              
              <Button
                type="submit"
                fullWidth
                isLoading={loading}
                icon={<KeyRound size={18} />}
              >
                Verify & Log In
              </Button>
              
              <p className="text-center text-xs text-gray-500 mt-4">
                For demo purposes, enter any 6-digit number as the OTP.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;