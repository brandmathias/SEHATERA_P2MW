
"use client";

import type { UserRole, User } from '@/types';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (name: string, role: UserRole) => void;
  logout: () => void;
  updateUserRole: (role: UserRole) => void;
  updateUserAvatar: (avatarUrl: string) => void;
  updateUserProfile: (name: string, bio: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const storedUser = localStorage.getItem('sehateraUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (name: string, role: UserRole) => {
    const newUser: User = { 
      id: Date.now().toString(), 
      name, 
      email: `${name.toLowerCase().replace(' ', '.')}@example.com`, 
      role,
      bio: role === 'volunteer' ? 'Saya senang mendengarkan cerita masa lalu dan berbagi keceriaan.' : ''
    };
    setUser(newUser);
    localStorage.setItem('sehateraUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sehateraUser');
  };

  const updateUserRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('sehateraUser', JSON.stringify(updatedUser));
    }
  };

  const updateUserAvatar = (avatarUrl: string) => {
    if (user) {
      const updatedUser = { ...user, avatarUrl };
      setUser(updatedUser);
      localStorage.setItem('sehateraUser', JSON.stringify(updatedUser));
    }
  };

  const updateUserProfile = (name: string, bio: string) => {
    if (user) {
      const updatedUser = { ...user, name, bio };
      setUser(updatedUser);
      localStorage.setItem('sehateraUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, updateUserRole, updateUserAvatar, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
