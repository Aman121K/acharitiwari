import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { apiRequest } from '@/lib/api';

export type Customer = { id:string; name:string; email:string; phone?:string; role:string };
type AuthValue = { user:Customer|null; loading:boolean; login(email:string,password:string):Promise<void>; register(data:{name:string;email:string;phone:string;password:string}):Promise<void>; logout():void };
const AuthContext = createContext<AuthValue|null>(null);

export function AuthProvider({children}:{children:ReactNode}) {
  const [user,setUser] = useState<Customer|null>(() => { try { return JSON.parse(localStorage.getItem('customerUser') || 'null'); } catch { return null; } });
  const [loading,setLoading] = useState(false);
  const persist = (data:any) => { localStorage.setItem('customerToken',data.token); localStorage.setItem('customerUser',JSON.stringify(data.user)); setUser(data.user); };
  const value = useMemo<AuthValue>(() => ({
    user, loading,
    login: async (email,password) => { setLoading(true); try { persist(await apiRequest('/auth/login',{method:'POST',body:JSON.stringify({email,password})})); } finally { setLoading(false); } },
    register: async (details) => { setLoading(true); try { persist(await apiRequest('/auth/register',{method:'POST',body:JSON.stringify(details)})); } finally { setLoading(false); } },
    logout: () => { localStorage.removeItem('customerToken'); localStorage.removeItem('customerUser'); setUser(null); },
  }), [user,loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => { const value=useContext(AuthContext); if(!value) throw new Error('useAuth must be used inside AuthProvider'); return value; };
