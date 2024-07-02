import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContextType, AuthProviderProps, DecodedToken } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    const decodedToken: DecodedToken = jwtDecode(token);
    console.log(decodedToken);
    setRole(decodedToken.role);
    setUserName(decodedToken.sub);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, userName, login, logout }}>
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
