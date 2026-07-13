import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiRequest } from '@/lib/api';

type Order = {
  _id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
  items: { name: string; quantity: number }[];
};

export default function AccountPage() {
  const { user, loading, login, register, logout } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const loadOrders = async () => {
      setOrdersLoading(true);
      setOrdersError('');
      try {
        const references = JSON.parse(localStorage.getItem('guestOrderReferences') || '[]');
        const [accountResult, guestResult] = await Promise.all([
          user ? apiRequest<{ orders: Order[] }>('/orders/mine') : Promise.resolve({ orders: [] }),
          references.length
            ? apiRequest<{ orders: Order[] }>('/orders/guest-lookup', { method: 'POST', body: JSON.stringify({ references }) })
            : Promise.resolve({ orders: [] }),
        ]);
        if (!cancelled) {
          const unique = new Map([...accountResult.orders, ...guestResult.orders].map((order) => [order._id, order]));
          setOrders([...unique.values()].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)));
        }
      } catch (err) {
        if (!cancelled) setOrdersError(err instanceof Error ? err.message : 'Unable to load orders');
      } finally {
        if (!cancelled) setOrdersLoading(false);
      }
    };
    void loadOrders();
    return () => { cancelled = true; };
  }, [user]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      mode === 'login' ? await login(form.email, form.password) : await register(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to continue');
    }
  };

  if (user) return (
    <main className="min-h-[70vh] px-4 py-10 sm:py-16">
      <section className="section-shell mx-auto max-w-3xl">
        <div className="text-center">
        <img src="/brand/achari-tiwari-logo.png" alt="Achari Tiwari" className="mx-auto mb-5 h-28 w-28 object-contain" />
        <p className="text-sm font-bold uppercase tracking-widest text-primary">Your account</p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Namaste, {user.name}</h1>
        <p className="mt-3 break-all text-muted-foreground">{user.email}</p>
        </div>
        <div className="mt-10 border-t pt-8">
          <h2 className="text-xl font-bold">Your orders</h2>
          {ordersLoading && <p className="mt-4 text-sm text-muted-foreground">Loading your orders…</p>}
          {ordersError && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{ordersError}</p>}
          {!ordersLoading && !ordersError && orders.length === 0 && <p className="mt-4 text-sm text-muted-foreground">You have not placed any orders yet.</p>}
          <div className="mt-4 space-y-3">
            {orders.map((order) => (
              <article key={order._id} className="rounded-xl border bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div><p className="font-mono text-sm font-semibold">{order.orderNumber}</p><p className="mt-1 text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</p></div>
                  <div className="text-right"><p className="font-semibold">₹{order.total}</p><p className="mt-1 text-xs font-semibold uppercase text-primary">{order.status}</p></div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{order.items.map((item) => `${item.name} × ${item.quantity}`).join(', ')}</p>
                <p className="mt-2 text-xs text-muted-foreground">Payment: {order.paymentStatus}</p>
              </article>
            ))}
          </div>
        </div>
        <Button onClick={logout} variant="outline" className="mt-8 min-h-12 w-full sm:w-auto">Sign out</Button>
      </section>
    </main>
  );

  return (
    <main className="min-h-[75vh] px-4 py-8 sm:py-12">
      <section className="section-shell mx-auto max-w-lg">
        <div className="text-center">
          <img src="/brand/achari-tiwari-logo.png" alt="Achari Tiwari" className="mx-auto h-24 w-24 object-contain" />
          <h1 className="mt-4 text-2xl font-bold sm:text-3xl">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
          <p className="mt-2 text-sm text-muted-foreground">You can also continue as a guest during checkout.</p>
        </div>
        <form onSubmit={submit} className="mt-7 space-y-4 [&_input]:min-h-12 [&_input]:text-base">
          {mode === 'register' && <>
            <div><Label>Name</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Mobile number</Label><Input required inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          </>}
          <div><Label>Email</Label><Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div><Label>Password</Label><Input required minLength={6} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
          {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <Button disabled={loading} className="min-h-12 w-full">{loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Register'}</Button>
        </form>
        {!ordersLoading && orders.length > 0 && <div className="mt-7 border-t pt-6"><h2 className="font-bold">Guest orders on this device</h2><div className="mt-3 space-y-2">{orders.map((order) => <div key={order._id} className="flex justify-between rounded-lg border p-3 text-sm"><span>{order.orderNumber}<br/><small className="uppercase text-primary">{order.status}</small></span><strong>₹{order.total}</strong></div>)}</div></div>}
        <button type="button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }} className="mt-5 min-h-11 w-full text-sm font-semibold text-primary">
          {mode === 'login' ? 'New here? Create an account' : 'Already registered? Sign in'}
        </button>
      </section>
    </main>
  );
}
