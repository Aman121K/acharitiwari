import React, { useEffect, useMemo, useState } from 'react';
import { Check, RotateCcw, Search, ShieldCheck, SlidersHorizontal, Truck } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products as fallbackProducts } from '@/data/products';
import { useProducts } from '@/hooks/useStoreData';

type SortMode = 'featured' | 'name' | 'price-low' | 'price-high';

const ProductsPage = () => {
  const { products, loading } = useProducts(fallbackProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<SortMode>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    products.forEach((product) => counts.set(product.category, (counts.get(product.category) || 0) + 1));
    return Array.from(counts, ([name, count]) => ({ name, count }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase();
    return products
      .filter((product) => {
        const searchable = [product.name, product.description, product.category, product.subCategory]
          .filter(Boolean).join(' ').toLocaleLowerCase();
        return (!query || searchable.includes(query))
          && (selectedCategory === 'All' || product.category === selectedCategory)
          && (!inStockOnly || product.inStock);
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, searchTerm, selectedCategory, sortBy, inStockOnly]);

  const hasFilters = Boolean(searchTerm || selectedCategory !== 'All' || inStockOnly || sortBy !== 'featured');
  const resetFilters = () => { setSearchTerm(''); setSelectedCategory('All'); setInStockOnly(false); setSortBy('featured'); };

  return (
    <main className="min-h-screen pb-16">
      <section className="border-b border-border/70 bg-[#fff8ed]">
        <div className="container mx-auto px-4 pb-7 pt-9 sm:pb-9 sm:pt-12">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-accent">The Achari pantry</p>
          <div className="grid items-end gap-5 lg:grid-cols-[1fr_auto]">
            <div>
              <h1 className="max-w-3xl text-4xl font-extrabold tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">Aachar made the way you remember it.</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Explore small-batch Indian pickles prepared with traditional recipes, honest ingredients and flavours made for every thali.</p>
            </div>
            <div className="grid grid-cols-3 gap-2 border-y border-border py-3 text-[10px] font-semibold uppercase tracking-wider text-primary sm:flex sm:gap-5 sm:text-xs">
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-secondary" />Traditional</span>
              <span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-secondary" />Pan-India</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-secondary" />Secure / COD</span>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-30 border-b border-border bg-[#fff8ed]/95 shadow-[0_8px_24px_-20px_rgba(58,35,13,.6)] backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="grid gap-2 sm:grid-cols-[minmax(220px,1fr)_210px_auto]">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search aachar, category or ingredient…" className="h-12 w-full border border-input bg-white pl-10 pr-4 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
            </label>
            <label className="relative">
              <span className="sr-only">Sort products</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortMode)} className="h-12 w-full appearance-none border border-input bg-white px-3 pr-9 text-sm font-semibold text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/15">
                <option value="featured">Featured first</option><option value="name">Name A–Z</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option>
              </select>
              <SlidersHorizontal className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
            </label>
            <button type="button" onClick={() => setInStockOnly((value) => !value)} aria-pressed={inStockOnly} className={`flex h-12 min-w-40 items-center justify-center gap-2 border px-4 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${inStockOnly ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-white text-foreground hover:border-primary'}`}>
              <span className={`flex h-5 w-5 items-center justify-center border ${inStockOnly ? 'border-white/50 bg-white text-primary' : 'border-border'}`}>{inStockOnly && <Check className="h-3.5 w-3.5" />}</span>In stock only
            </button>
          </div>
          <nav aria-label="Product categories" className="mt-3 -mx-4 overflow-x-auto px-4 scrollbar-hide">
            <div className="flex min-w-max items-end gap-2 sm:min-w-0 sm:flex-wrap">
              {[{ name: 'All', count: products.length }, ...categories].map((category) => {
                const selected = selectedCategory === category.name;
                return <button key={category.name} type="button" aria-pressed={selected} onClick={() => setSelectedCategory(category.name)} className={`min-h-11 border px-3.5 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected ? 'border-primary bg-primary text-primary-foreground shadow-[inset_0_-3px_0_#aa6a16]' : 'border-border bg-[#fffdf8] text-foreground hover:border-primary'}`}><span className="text-sm font-bold">{category.name === 'All' ? 'All jars' : category.name}</span><span className={`ml-2 text-[10px] ${selected ? 'text-white/70' : 'text-muted-foreground'}`}>{category.count}</span></button>;
              })}
            </div>
          </nav>
        </div>
      </div>

      <section className="container mx-auto px-4 pt-7" aria-live="polite">
        <div className="mb-5 flex min-h-10 flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <p className="text-sm text-muted-foreground"><strong className="text-base text-foreground">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'jar' : 'jars'} found</p>
          {hasFilters && <button onClick={resetFilters} className="flex min-h-10 items-center gap-2 text-sm font-bold text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><RotateCcw className="h-4 w-4" /> Reset filters</button>}
        </div>

        {loading && products.length === 0 ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Loading products">
            {Array.from({ length: 8 }).map((_, index) => <div key={index} className="animate-pulse"><div className="aspect-[4/3] bg-muted" /><div className="mt-4 h-3 w-24 bg-muted"/><div className="mt-3 h-6 w-3/4 bg-muted"/><div className="mt-5 h-11 bg-muted"/></div>)}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="mx-auto max-w-xl border-y border-border py-16 text-center">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-accent">Pantry shelf empty</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">No aachar matches those filters.</h2>
            <p className="mt-2 text-muted-foreground">Try a broader search or reset your filters to see the complete collection.</p>
            <button onClick={resetFilters} className="mt-6 min-h-11 bg-primary px-6 font-bold text-primary-foreground hover:bg-primary/90">Show all products</button>
          </div>
        )}
      </section>
    </main>
  );
};

export default ProductsPage;
