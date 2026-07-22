import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useProducts } from '@/hooks/useStoreData';
import { useWishlist } from '@/contexts/WishlistContext';

export default function WishlistPage() {
  const { products, loading: productsLoading } = useProducts();
  const { ids, loading, updatingId, remove } = useWishlist();
  const likedProducts = ids.map(id => products.find(product => product.id === id)).filter(Boolean);
  const isLoading = loading || productsLoading;

  return <main className="min-h-[70vh] bg-[#fffaf2] px-4 py-10 sm:py-14">
    <div className="mx-auto max-w-6xl">
      <header className="border-b border-border pb-5"><p className="text-xs font-bold uppercase tracking-[.2em] text-accent">Saved for later</p><div className="mt-2 flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-3xl font-bold sm:text-4xl">Your liked products</h1><p className="mt-2 text-sm text-muted-foreground">The jars you want to come back to.</p></div>{!isLoading && <p className="text-sm font-semibold text-primary">{likedProducts.length} {likedProducts.length === 1 ? 'product' : 'products'}</p>}</div></header>
      {isLoading ? <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading liked products">{[0,1,2].map(item => <div key={item} className="border bg-white p-4"><Skeleton className="aspect-[4/3] w-full rounded-none"/><Skeleton className="mt-4 h-6 w-3/4"/><Skeleton className="mt-3 h-5 w-24"/></div>)}</div>
      : likedProducts.length === 0 ? <section className="mt-8 border border-border bg-white px-5 py-16 text-center"><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary"><Heart className="h-7 w-7"/></span><h2 className="mt-5 text-2xl font-bold">No liked products yet</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">Open a product and select “Save for later.” It will appear here.</p><Button asChild className="mt-6 min-h-11"><Link to="/products"><ShoppingBag className="mr-2 h-4 w-4"/>Browse products</Link></Button></section>
      : <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{likedProducts.map(product => product && <article key={product.id} className="border border-border bg-white p-4 shadow-card"><Link to={`/product/${product.slug || product.id}`} className="block aspect-[4/3] bg-[#f4eee3] p-3"><img src={product.image} alt={`${product.name} jar`} className="h-full w-full object-contain"/></Link><div className="mt-4"><Link to={`/product/${product.slug || product.id}`} className="text-lg font-bold hover:text-primary">{product.name}</Link><p className="mt-2 text-xl font-bold text-primary">₹{product.price}</p><div className="mt-4 flex gap-2"><Button asChild className="min-h-11 flex-1"><Link to={`/product/${product.slug || product.id}`}>View product</Link></Button><Button variant="outline" size="icon" className="h-11 w-11 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800" disabled={updatingId === product.id} onClick={() => void remove(product.id)} aria-label={`Remove ${product.name} from liked products`}><Trash2 className="h-4 w-4"/></Button></div></div></article>)}</section>}
    </div>
  </main>;
}
