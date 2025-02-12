import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    isAuthenticated: false,
    isAdmin: false,
  });

  const login = async (email: string, password: string) => {
    // TODO: Implement actual authentication
    if (email === 'danielacmfirmalegal@gmail.com' && password === 'isabella.10') {
      setUser({
        isAuthenticated: true,
        isAdmin: true,
      });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser({
      isAuthenticated: false,
      isAdmin: false,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}