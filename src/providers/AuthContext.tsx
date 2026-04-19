import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile } from '../types/User';
import { userApi } from '../features/auth/api/user';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  updateUser: (newData: UserProfile) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await userApi.getMe();
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        localStorage.setItem('userName', `${data.firstName} ${data.lastName}`);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const updateUser = (newData: UserProfile) => {
    setUser(newData);
    localStorage.setItem('userName', `${newData.firstName} ${newData.lastName}`);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = '/auth';
  };

  return (
    <AuthContext.Provider value={{ user, loading, updateUser, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для удобного использования в компонентах
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};