import React, { useState } from 'react';
import { ArrowUpRight, Check, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart, type Product } from '@/contexts/CartContext';
import { useGlobalToast } from '@/contexts/ToastContext';
import { analyticsItem, trackEvent } from '@/lib/analytics';

interface ProductCardProps { product: Product }

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();
  const { showToast } = useGlobalToast();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const detailPath = `/product/${product.slug || product.id}`;

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', product });
    showToast(product, 1);
    void trackEvent('add_to_cart', { currency: 'INR', value: product.price, items: [analyticsItem(product)] });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };
  const trackSelection = () => {
    void trackEvent('select_item', { item_list_id: 'product_grid', item_list_name: 'Product grid', items: [analyticsItem(product)] });
  };

  return (
    <article className="group flex min-w-0 flex-col border-b border-border bg-card transition-shadow duration-300 hover:shadow-[0_16px_35px_-24px_rgba(58,35,13,.65)]">
      <Link to={detailPath} onClick={trackSelection} className="relative block aspect-[4/3] overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-muted" />}
        <img src={product.image} alt={`${product.name} – ${product.weight} jar`} loading="lazy" onLoad={() => setImageLoaded(true)} onError={() => setImageLoaded(true)} className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.035] ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
        <span className={`absolute left-3 top-3 border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.12em] ${product.inStock ? 'border-white/40 bg-primary text-white' : 'border-white/40 bg-accent text-white'}`}>{product.inStock ? 'In stock' : 'Out of stock'}</span>
        <span className="absolute bottom-3 right-3 bg-[#fff8ed] px-2 py-1 text-[11px] font-bold text-foreground">{product.weight}</span>
      </Link>

      <div className="flex flex-1 flex-col px-1 py-4">
        <p className="truncate text-[10px] font-bold uppercase tracking-[.16em] text-accent">{product.category}{product.subCategory ? ` · ${product.subCategory}` : ''}</p>
        <Link to={detailPath} onClick={trackSelection} className="mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <h2 className="line-clamp-2 text-lg font-bold leading-snug tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary">{product.name}</h2>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted-foreground">{product.description}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div><span className="text-[10px] uppercase tracking-wider text-muted-foreground">Price</span><p className="text-xl font-extrabold text-primary">₹{product.price.toLocaleString('en-IN')}</p></div>
          <Link to={detailPath} onClick={trackSelection} className="flex min-h-11 items-center gap-1 text-sm font-bold text-foreground underline decoration-border underline-offset-4 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Details <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <button type="button" onClick={addToCart} disabled={!product.inStock} className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 bg-primary px-4 text-sm font-extrabold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground">
          {justAdded ? <><Check className="h-4 w-4" /> Added to cart</> : <><ShoppingBag className="h-4 w-4" /> {product.inStock ? 'Add to cart' : 'Currently unavailable'}</>}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
