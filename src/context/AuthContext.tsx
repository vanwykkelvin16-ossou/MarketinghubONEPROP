import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

const ACCESS_CODE = 'oneproperty@2026!';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (code: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('one_auth') === 'true';
  });

  const login = (code: string) => {
    if (code === ACCESS_CODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('one_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('one_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
