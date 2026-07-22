import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiRequest } from '@/lib/api';

const STORAGE_KEY = 'productWishlist';
type WishlistResponse = { wishlist: Array<{ _id?: string } | string> };
type WishlistValue = {
  ids: string[];
  loading: boolean;
  updatingId: string | null;
  contains(productId: string): boolean;
  toggle(productId: string): Promise<boolean>;
  remove(productId: string): Promise<void>;
};

const WishlistContext = createContext<WishlistValue | null>(null);
const readLocal = () => { try { const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); return Array.isArray(value) ? value.map(String) : []; } catch { return []; } };
const writeLocal = (ids: string[]) => localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
const idsFromResponse = (body: WishlistResponse) => body.wishlist.map(item => typeof item === 'string' ? item : String(item._id || '')).filter(Boolean);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [ids, setIds] = useState<string[]>(readLocal);
  const [loading, setLoading] = useState(Boolean(user));
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const sync = async () => {
      if (!user) { const local = readLocal(); if (active) { setIds(local); setLoading(false); } return; }
      setLoading(true);
      try {
        const local = readLocal();
        const body = local.length
          ? await apiRequest<WishlistResponse>('/users/wishlist/merge', { method: 'POST', body: JSON.stringify({ productIds: local }) })
          : await apiRequest<WishlistResponse>('/users/wishlist');
        if (active) { const next = idsFromResponse(body); setIds(next); writeLocal([]); }
      } catch {
        if (active) setIds(readLocal());
      } finally { if (active) setLoading(false); }
    };
    void sync();
    return () => { active = false; };
  }, [user?.id]);

  const toggle = useCallback(async (productId: string) => {
    const wasLiked = ids.includes(productId);
    const next = wasLiked ? ids.filter(id => id !== productId) : [...ids, productId];
    setIds(next); setUpdatingId(productId);
    try {
      if (user) {
        const body = wasLiked
          ? await apiRequest<WishlistResponse>(`/users/wishlist/remove/${productId}`, { method: 'DELETE' })
          : await apiRequest<WishlistResponse>('/users/wishlist/add', { method: 'POST', body: JSON.stringify({ productId }) });
        setIds(idsFromResponse(body));
      } else writeLocal(next);
      return !wasLiked;
    } catch (error) { setIds(ids); throw error; }
    finally { setUpdatingId(null); }
  }, [ids, user]);

  const remove = useCallback(async (productId: string) => { if (ids.includes(productId)) await toggle(productId); }, [ids, toggle]);
  const value = useMemo<WishlistValue>(() => ({ ids, loading, updatingId, contains: productId => ids.includes(productId), toggle, remove }), [ids, loading, updatingId, toggle, remove]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => { const value = useContext(WishlistContext); if (!value) throw new Error('useWishlist must be used inside WishlistProvider'); return value; };
