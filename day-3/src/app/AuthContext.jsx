import { createContext, useContext, useState } from 'react';
import { login as apiLogin } from '../services/employeeService';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('employee-portal-user') || 'null'));
  async function login(email, password, role) {
    const result = await apiLogin(email, password);
    const next = { email, role, token: result.token };
    localStorage.setItem('employee-portal-user', JSON.stringify(next));
    setUser(next);
  }
  function logout() { localStorage.removeItem('employee-portal-user'); setUser(null); }
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
