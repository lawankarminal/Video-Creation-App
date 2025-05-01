import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkSession = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };
    
    setTimeout(checkSession, 1000);
    
    const logoutTimer = setTimeout(() => {
      logout();
    }, 60 * 60 * 1000);
    
    return () => clearTimeout(logoutTimer);
  }, []);
  
  const loginWithOTP = async (email) => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`OTP sent to ${email}`);
      setLoading(false);
      return;
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
      setLoading(false);
      throw error;
    }
  };
  
  const verifyOTP = async (email, otp) => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (otp.length === 6) {
        const mockUser = {
          id: '123456',
          name: 'Demo User',
          email,
          avatar: 'https://i.pravatar.cc/150?img=68',
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setLoading(false);
        toast.success('Login successful!');
        return true;
      } else {
        toast.error('Invalid OTP. Please try again.');
        setLoading(false);
        return false;
      }
    } catch (error) {
      toast.error('Failed to verify OTP. Please try again.');
      setLoading(false);
      return false;
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        loginWithOTP,
        verifyOTP,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};