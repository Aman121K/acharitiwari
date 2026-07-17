import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, RotateCcw, Search, ShieldCheck, SlidersHorizontal, Truck } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useCategories, useProducts, type StoreCategory } from '@/hooks/useStoreData';
import { LoadError, ProductGridSkeleton } from '@/components/StorefrontStates';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearchParams } from 'react-router-dom';
import { analyticsItem, safeSearchTerm, trackEvent } from '@/lib/analytics';

type SortMode = 'featured' | 'name' | 'price-low' | 'price-high';

const ProductsPage = () => {
  const { products, loading, error, refetch } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [sortBy, setSortBy] = useState<SortMode>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const trackedListKey = useRef('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const requestedCategory = searchParams.get('category')?.trim() || '';
  const selectedCategory = categories.find((category) => category._id === selectedCategoryId);
  const categoryFilterLoading = Boolean(requestedCategory) && categoriesLoading;
  const contentLoading = loading || categoryFilterLoading;

  useEffect(() => {
    if (categoriesLoading) return;
    if (!requestedCategory) {
      setSelectedCategoryId('all');
      return;
    }

    const normalizedCategory = requestedCategory.toLocaleLowerCase();
    const matchingCategory = categories.find((category) => (
      category._id === requestedCategory
      || category.slug.toLocaleLowerCase() === normalizedCategory
      || category.name.toLocaleLowerCase() === normalizedCategory
    ));
    if (matchingCategory) {
      setSelectedCategoryId(matchingCategory._id);
      setSearchTerm('');
      return;
    }

    setSelectedCategoryId('missing');
    setSearchTerm('');
  }, [categories, categoriesLoading, requestedCategory]);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase();
    return products
      .filter((product) => {
        const searchable = [product.name, product.description, product.category, product.subCategory]
          .filter(Boolean).join(' ').toLocaleLowerCase();
        return (!query || searchable.includes(query))
          && (selectedCategoryId === 'all' || (selectedCategoryId !== 'missing' && (
            product.categoryId === selectedCategoryId || product.category === selectedCategory?.name
          )))
          && (!inStockOnly || product.inStock);
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, searchTerm, selectedCategory, selectedCategoryId, sortBy, inStockOnly]);

  const hasFilters = Boolean(searchTerm || selectedCategoryId !== 'all' || inStockOnly || sortBy !== 'featured');

  useEffect(() => {
    if (contentLoading || !filteredProducts.length) return;
    const categoryName = selectedCategory?.name || 'All products';
    const key = `${selectedCategoryId}|${sortBy}|${inStockOnly}|${safeSearchTerm(searchTerm)}|${filteredProducts.map((item) => item.id).join(',')}`;
    if (trackedListKey.current === key) return;
    const timer = window.setTimeout(() => {
      trackedListKey.current = key;
      void trackEvent('view_item_list', {
        item_list_id: selectedCategory?.slug || 'all_products',
        item_list_name: categoryName,
        items: filteredProducts.slice(0, 20).map((product, index) => analyticsItem(product, 1, index)),
      });
      if (searchTerm.trim()) void trackEvent('search', { search_term: safeSearchTerm(searchTerm) });
    }, 500);
    return () => window.clearTimeout(timer);
  }, [contentLoading, filteredProducts, inStockOnly, searchTerm, selectedCategory, selectedCategoryId, sortBy]);

  const selectCategory = (category: StoreCategory | null) => {
    setSelectedCategoryId(category?._id || 'all');
    setSearchTerm('');
    const nextParams = new URLSearchParams(searchParams);
    if (!category) nextParams.delete('category');
    else nextParams.set('category', category.slug);
    setSearchParams(nextParams);
    void trackEvent('product_filter', { filter_type: 'category', filter_value: category?.slug || 'all' });
  };
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategoryId('all');
    setInStockOnly(false);
    setSortBy('featured');
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('category');
    setSearchParams(nextParams);
  };

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
            <button type="button" onClick={() => setInStockOnly((value) => { const next = !value; void trackEvent('product_filter', { filter_type: 'stock', filter_value: next ? 'in_stock' : 'all' }); return next; })} aria-pressed={inStockOnly} className={`flex h-12 min-w-40 items-center justify-center gap-2 border px-4 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${inStockOnly ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-white text-foreground hover:border-primary'}`}>
              <span className={`flex h-5 w-5 items-center justify-center border ${inStockOnly ? 'border-white/50 bg-white text-primary' : 'border-border'}`}>{inStockOnly && <Check className="h-3.5 w-3.5" />}</span>In stock only
            </button>
          </div>
          <nav aria-label="Product categories" className="mt-3 -mx-4 overflow-x-auto px-4 scrollbar-hide">
            <div className="flex min-w-max items-end gap-2 sm:min-w-0 sm:flex-wrap">
              {categoriesLoading ? Array.from({length:4}).map((_,index)=><Skeleton key={index} className="h-11 w-28 rounded-none" />) : <>
                <button type="button" aria-pressed={selectedCategoryId === 'all'} onClick={() => selectCategory(null)} className={`min-h-11 border px-3.5 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selectedCategoryId === 'all' ? 'border-primary bg-primary text-primary-foreground shadow-[inset_0_-3px_0_#aa6a16]' : 'border-border bg-[#fffdf8] text-foreground hover:border-primary'}`}><span className="text-sm font-bold">All jars</span><span className={`ml-2 text-[10px] ${selectedCategoryId === 'all' ? 'text-white/70' : 'text-muted-foreground'}`}>{products.length}</span></button>
                {categories.map((category) => { const selected = selectedCategoryId === category._id; return <button key={category._id} type="button" aria-pressed={selected} onClick={() => selectCategory(category)} className={`min-h-11 border px-3.5 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected ? 'border-primary bg-primary text-primary-foreground shadow-[inset_0_-3px_0_#aa6a16]' : 'border-border bg-[#fffdf8] text-foreground hover:border-primary'}`}><span className="text-sm font-bold">{category.name}</span><span className={`ml-2 text-[10px] ${selected ? 'text-white/70' : 'text-muted-foreground'}`}>{category.productCount}</span></button>; })}
              </>}
            </div>
          </nav>
        </div>
      </div>

      <section className="container mx-auto px-4 pt-7" aria-live="polite">
        <div className="mb-5 flex min-h-10 flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          {contentLoading ? <Skeleton className="h-5 w-28" /> : <div><p className="text-sm text-muted-foreground"><strong className="text-base text-foreground">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'jar' : 'jars'} found</p>{requestedCategory && selectedCategoryId === 'missing' && <p className="mt-1 text-xs text-destructive">The category “{requestedCategory}” is not available.</p>}</div>}
          {hasFilters && <button onClick={resetFilters} className="flex min-h-10 items-center gap-2 text-sm font-bold text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><RotateCcw className="h-4 w-4" /> Reset filters</button>}
        </div>

        {contentLoading ? (
          <ProductGridSkeleton />
        ) : error ? (
          <LoadError title="The pantry could not be loaded" message={error.message} onRetry={refetch} className="mx-auto max-w-2xl" />
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="mx-auto max-w-xl border-y border-border py-16 text-center">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-accent">Pantry shelf empty</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">{hasFilters ? 'No aachar matches those filters.' : 'Our next batch is on its way.'}</h2>
            <p className="mt-2 text-muted-foreground">{hasFilters ? 'Try a broader search or reset your filters to see the complete collection.' : 'There are no products available right now. Please check back soon.'}</p>
            {hasFilters && <button onClick={resetFilters} className="mt-6 min-h-11 bg-primary px-6 font-bold text-primary-foreground hover:bg-primary/90">Show all products</button>}
          </div>
        )}
      </section>
    </main>
  );
};

export default ProductsPage;
