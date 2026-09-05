import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'swifttrack_admin_auth';

export const AuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (adminUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error saving auth state', e);
    }
  }, [adminUser]);

  const login = (email, password) => {
    // Demo authentication check
    if ((email === 'admin@swifttrack.io' && password === 'admin123') || (email === 'admin' && password === 'admin') || (email && password)) {
      const user = {
        name: 'Chief Logistics Officer',
        email: email.includes('@') ? email : 'admin@swifttrack.io',
        role: 'Super Administrator',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        hub: 'Global Dispatch HQ'
      };
      setAdminUser(user);
      return { success: true };
    }
    return { success: false, error: 'Invalid admin credentials. Use demo: admin@swifttrack.io / admin123' };
  };

  const logout = () => {
    setAdminUser(null);
  };

  return (
    <AuthContext.Provider value={{ adminUser, isAuthenticated: !!adminUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
