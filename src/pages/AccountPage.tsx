import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, CreditCard, Headphones, LogOut, Package, RefreshCw, ShieldCheck, ShoppingBag, UserRound } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { apiRequest } from '@/lib/api';
import { cn } from '@/lib/utils';

type Order = {
  _id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
  items: { name: string; quantity: number }[];
};

const formatMoney=(value:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(value);
const formatDate=(value:string)=>new Intl.DateTimeFormat('en-IN',{day:'numeric',month:'short',year:'numeric'}).format(new Date(value));
const labelStatus=(value:string)=>value.replace(/[_-]+/g,' ').replace(/\b\w/g,(letter)=>letter.toUpperCase());
const statusTone=(value:string,type:'order'|'payment')=>{
  const normalized=value.toLowerCase();
  if(['delivered','completed','paid','captured'].some((status)=>normalized.includes(status)))return 'border-green-700/20 bg-green-50 text-green-800';
  if(['cancelled','failed','refunded'].some((status)=>normalized.includes(status)))return 'border-red-700/20 bg-red-50 text-red-800';
  if(['shipped','processing'].some((status)=>normalized.includes(status)))return 'border-blue-700/20 bg-blue-50 text-blue-800';
  return type==='payment'?'border-amber-700/20 bg-amber-50 text-amber-900':'border-secondary/30 bg-secondary/10 text-[#78500f]';
};

function StatusBadge({value,type}:{value:string;type:'order'|'payment'}){
  return <span className={cn('inline-flex min-h-7 items-center border px-2.5 text-[10px] font-bold uppercase tracking-[.08em]',statusTone(value,type))}>{labelStatus(value||'Pending')}</span>;
}

function OrderSkeleton(){return <div className="border border-border/70 bg-white p-4 shadow-[0_12px_35px_-30px_rgba(63,35,12,.55)] sm:p-5"><div className="flex items-start justify-between gap-4"><div className="space-y-2"><Skeleton className="h-4 w-36"/><Skeleton className="h-4 w-24"/></div><Skeleton className="h-7 w-24"/></div><div className="my-5 border-y py-4"><Skeleton className="h-5 w-5/6"/><Skeleton className="mt-2 h-4 w-2/3"/></div><div className="flex justify-between"><Skeleton className="h-7 w-28"/><Skeleton className="h-7 w-24"/></div></div>}

function OrderCard({order}:{order:Order}){
  const itemCount=order.items.reduce((sum,item)=>sum+Number(item.quantity||0),0);
  return <article className="group overflow-hidden border border-border/80 bg-white shadow-[0_16px_40px_-34px_rgba(61,32,10,.65)] transition duration-300 hover:border-secondary/60 hover:shadow-[0_22px_48px_-32px_rgba(61,32,10,.45)]">
    <header className="border-b border-border/70 bg-[#fffaf1] px-4 py-4 sm:px-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-muted-foreground">Order receipt</p><h3 className="mt-1 break-all font-mono text-sm font-bold text-foreground sm:text-base">#{order.orderNumber}</h3><p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><CalendarDays className="h-3.5 w-3.5"/>{formatDate(order.createdAt)}</p></div><StatusBadge value={order.status} type="order"/></div></header>
    <div className="px-4 py-5 sm:px-5"><div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center bg-primary/8 text-primary"><Package className="h-5 w-5"/></span><div className="min-w-0"><p className="text-xs font-bold uppercase tracking-[.12em] text-muted-foreground">{itemCount} {itemCount===1?'item':'items'}</p><p className="mt-1 break-words text-sm leading-6 text-foreground">{order.items.map((item)=>`${item.name} × ${item.quantity}`).join(' · ')||'Order details unavailable'}</p></div></div></div>
    <footer className="grid gap-3 border-t border-border/70 px-4 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:px-5"><div className="flex min-w-0 items-center gap-2"><CreditCard className="h-4 w-4 shrink-0 text-primary"/><span className="text-xs font-semibold text-muted-foreground">Payment</span><StatusBadge value={order.paymentStatus} type="payment"/></div><div className="flex items-baseline justify-between gap-4 sm:justify-end"><span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total</span><strong className="text-xl tabular-nums text-primary">{formatMoney(order.total)}</strong></div></footer>
  </article>;
}

export default function AccountPage() {
  const { user, loading, login, register, logout } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState('');
  const ordersRequest=useRef(0);

  const loadOrders=useCallback(async()=>{
    const requestId=++ordersRequest.current;
    setOrdersLoading(true);setOrdersError('');
    try{
      let references:string[]=[];
      try{references=JSON.parse(localStorage.getItem('guestOrderReferences')||'[]')}catch{references=[]}
      const [accountResult,guestResult]=await Promise.all([
        user?apiRequest<{orders:Order[]}>('/orders/mine'):Promise.resolve({orders:[]}),
        references.length?apiRequest<{orders:Order[]}>('/orders/guest-lookup',{method:'POST',body:JSON.stringify({references})}):Promise.resolve({orders:[]}),
      ]);
      if(requestId===ordersRequest.current){const unique=new Map([...accountResult.orders,...guestResult.orders].map((order)=>[order._id,order]));setOrders([...unique.values()].sort((a,b)=>+new Date(b.createdAt)-+new Date(a.createdAt)));}
    }catch(cause){if(requestId===ordersRequest.current)setOrdersError(cause instanceof Error?cause.message:'Unable to load orders');}
    finally{if(requestId===ordersRequest.current)setOrdersLoading(false)}
  },[user]);

  useEffect(()=>{void loadOrders();return()=>{ordersRequest.current=ordersRequest.current+1}},[loadOrders]);
  const initials=useMemo(()=>user?.name.split(/\s+/).filter(Boolean).map((part)=>part[0]).join('').slice(0,2).toUpperCase()||'AT',[user?.name]);
  const submit=async(event:FormEvent)=>{event.preventDefault();setError('');try{if(mode==='login')await login(form.email,form.password);else await register(form)}catch(cause){setError(cause instanceof Error?cause.message:'Unable to continue')}};

  if(user)return <main className="min-h-[75vh] bg-[linear-gradient(180deg,#fff5e6_0,#fffaf2_280px,#fff8ed_100%)] px-4 py-8 sm:py-12">
    <div className="mx-auto max-w-6xl">
      <header className="relative overflow-hidden border border-[#e3d1b7] bg-[#17320d] px-5 py-7 text-white shadow-[0_24px_60px_-38px_rgba(40,20,4,.7)] sm:px-8 sm:py-9"><div aria-hidden="true" className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-[45px] border-[#d18a24]/15"/><div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex min-w-0 items-center gap-4"><div className="grid h-16 w-16 shrink-0 place-items-center border border-white/25 bg-[#f4bf63] text-xl font-extrabold text-primary shadow-inner sm:h-20 sm:w-20 sm:text-2xl">{initials}</div><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#f4bf63]">Your Achari account</p><h1 className="mt-1 break-words text-2xl font-bold sm:text-3xl">Namaste, {user.name}</h1><p className="mt-1 break-all text-sm text-white/70">{user.email}</p></div></div><Button onClick={logout} variant="outline" className="min-h-11 w-full border-white/30 bg-transparent text-white hover:bg-white hover:text-primary sm:w-auto"><LogOut className="mr-2 h-4 w-4"/>Sign out</Button></div></header>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border border-border/80 bg-white/85 shadow-[0_16px_42px_-34px_rgba(61,32,10,.55)] lg:sticky lg:top-24"><div className="border-b p-5"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-accent">Account summary</p><dl className="mt-4 space-y-4 text-sm"><div><dt className="text-xs text-muted-foreground">Customer</dt><dd className="mt-1 break-words font-semibold">{user.name}</dd></div>{user.phone&&<div><dt className="text-xs text-muted-foreground">Mobile</dt><dd className="mt-1 font-semibold">{user.phone}</dd></div>}<div><dt className="text-xs text-muted-foreground">Orders on this account</dt><dd className="mt-1 text-2xl font-bold tabular-nums text-primary">{ordersLoading?'—':orders.length}</dd></div></dl></div><nav aria-label="Account shortcuts" className="p-3"><Link to="/products" className="flex min-h-12 items-center justify-between px-2 text-sm font-semibold hover:bg-[#fff5e4] hover:text-primary"><span className="flex items-center gap-3"><ShoppingBag className="h-4 w-4"/>Browse the pantry</span><ArrowRight className="h-4 w-4"/></Link><Link to="/contact" className="flex min-h-12 items-center justify-between px-2 text-sm font-semibold hover:bg-[#fff5e4] hover:text-primary"><span className="flex items-center gap-3"><Headphones className="h-4 w-4"/>Get order help</span><ArrowRight className="h-4 w-4"/></Link></nav><div className="border-t bg-[#fffaf2] p-5"><p className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary"/>Your order details are available only on this signed-in account.</p></div></aside>

        <section aria-labelledby="orders-title" className="min-w-0"><div className="mb-5 flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-accent">From cart to doorstep</p><h2 id="orders-title" className="mt-1 text-2xl font-bold sm:text-3xl">Order history</h2><p className="mt-1 text-sm text-muted-foreground">Receipts and payment status for your recent orders.</p></div>{!ordersLoading&&!ordersError&&<p className="text-sm font-semibold text-primary">{orders.length} {orders.length===1?'order':'orders'}</p>}</div>
          {ordersLoading?<div className="space-y-4" aria-label="Loading your orders" aria-busy="true"><OrderSkeleton/><OrderSkeleton/><OrderSkeleton/></div>:ordersError?<div role="alert" className="border border-red-800/20 bg-white p-6 text-center"><span className="mx-auto grid h-11 w-11 place-items-center bg-red-50 text-red-800"><RefreshCw className="h-5 w-5"/></span><h3 className="mt-4 text-lg font-bold">We could not load your orders</h3><p className="mt-2 text-sm text-muted-foreground">{ordersError}</p><Button onClick={()=>void loadOrders()} variant="outline" className="mt-5 min-h-11 border-primary text-primary"><RefreshCw className="mr-2 h-4 w-4"/>Retry</Button></div>:orders.length===0?<div className="border border-border bg-white px-5 py-14 text-center"><span className="mx-auto grid h-14 w-14 place-items-center bg-secondary/10 text-secondary"><ShoppingBag className="h-6 w-6"/></span><h3 className="mt-5 text-2xl font-bold">Your first jar is waiting.</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">When you place an order, its receipt and status will appear here.</p><Button asChild className="mt-6 min-h-11 rounded-none px-6"><Link to="/products">Browse products<ArrowRight className="ml-2 h-4 w-4"/></Link></Button></div>:<div className="space-y-4">{orders.map((order)=><OrderCard key={order._id} order={order}/>)}</div>}
        </section>
      </div>
    </div>
  </main>;

  return <main className="min-h-[75vh] bg-[linear-gradient(135deg,#fff4e1,#fffaf3)] px-4 py-8 sm:py-12"><section className="mx-auto grid max-w-4xl overflow-hidden border border-border bg-white shadow-[0_25px_70px_-45px_rgba(64,31,8,.65)] md:grid-cols-[.8fr_1.2fr]"><div className="hidden bg-primary p-8 text-white md:flex md:flex-col md:justify-between"><div><img src="/brand/achari-tiwari-logo.png" alt="Achari Tiwari" className="h-20 w-20 bg-[#fff8ed] object-contain"/><p className="mt-8 text-xs font-bold uppercase tracking-[.2em] text-[#f4bf63]">Welcome to the pantry</p><h1 className="mt-3 text-3xl font-bold leading-tight">Your orders,<br/>kept beautifully together.</h1></div><p className="flex gap-2 text-sm leading-6 text-white/70"><ShieldCheck className="mt-1 h-4 w-4 shrink-0"/>Secure access to receipts and order updates.</p></div><div className="p-5 sm:p-8"><div className="text-center md:text-left"><span className="mx-auto grid h-14 w-14 place-items-center bg-primary/10 text-primary md:mx-0"><UserRound className="h-6 w-6"/></span><h2 className="mt-5 text-2xl font-bold sm:text-3xl">{mode==='login'?'Welcome back':'Create your account'}</h2><p className="mt-2 text-sm text-muted-foreground">You can also continue as a guest during checkout.</p></div><form onSubmit={submit} className="mt-7 space-y-4 [&_input]:min-h-12 [&_input]:text-base">{mode==='register'&&<><div><Label>Name</Label><Input required value={form.name} onChange={(event)=>setForm({...form,name:event.target.value})}/></div><div><Label>Mobile number</Label><Input required inputMode="tel" value={form.phone} onChange={(event)=>setForm({...form,phone:event.target.value})}/></div></>}<div><Label>Email</Label><Input required type="email" value={form.email} onChange={(event)=>setForm({...form,email:event.target.value})}/></div><div><Label>Password</Label><Input required minLength={6} type="password" value={form.password} onChange={(event)=>setForm({...form,password:event.target.value})}/></div>{error&&<p role="alert" className="border border-red-700/20 bg-red-50 p-3 text-sm text-red-800">{error}</p>}<Button disabled={loading} className="min-h-12 w-full rounded-none">{loading?'Please wait…':mode==='login'?'Sign in':'Register'}</Button></form>{ordersLoading?<div className="mt-6"><Skeleton className="h-4 w-40"/><Skeleton className="mt-3 h-16 w-full rounded-none"/></div>:!ordersError&&orders.length>0?<div className="mt-7 border-t pt-6"><h3 className="font-bold">Guest orders on this device</h3><div className="mt-3 space-y-2">{orders.map((order)=><div key={order._id} className="flex min-w-0 justify-between gap-3 border p-3 text-sm"><span className="min-w-0 break-all">{order.orderNumber}<br/><small className="uppercase text-primary">{order.status}</small></span><strong className="shrink-0">{formatMoney(order.total)}</strong></div>)}</div></div>:null}<button type="button" onClick={()=>{setMode(mode==='login'?'register':'login');setError('')}} className="mt-5 min-h-11 w-full text-sm font-semibold text-primary underline-offset-4 hover:underline">{mode==='login'?'New here? Create an account':'Already registered? Sign in'}</button></div></section></main>;
}
