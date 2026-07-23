import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Sparkles, Star } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useBanners, useProducts, useReviews, useStoreSettings } from '@/hooks/useStoreData';
import spiceMarketHero from '@/assets/spice-market-hero.jpg';
import mixedAachar from '@/assets/mixed-aachar-collection.jpg';
import { LoadError, ProductGridSkeleton } from '@/components/StorefrontStates';
import { Skeleton } from '@/components/ui/skeleton';
import { analyticsItem, trackEvent } from '@/lib/analytics';

const Homepage = () => {
  const { products, loading: productsLoading, error: productsError, refetch: refetchProducts } = useProducts();
  const { banners } = useBanners();
  const { data: settings, loading: settingsLoading } = useStoreSettings();
  const { reviews, loading: reviewsLoading, error: reviewsError, refetch: refetchReviews } = useReviews();
  const heroBanner = banners.find((banner) => banner.displayLocation === 'home');

  useEffect(() => {
    if (heroBanner) void trackEvent('view_promotion', { promotion_id: heroBanner._id, promotion_name: heroBanner.title, creative_slot: 'homepage_hero' });
  }, [heroBanner]);

  useEffect(() => {
    if (!productsLoading && products.length) void trackEvent('view_item_list', { item_list_id: 'homepage_featured', item_list_name: 'Homepage featured products', items: products.slice(0, 8).map((product, index) => analyticsItem(product, 1, index)) });
  }, [products, productsLoading]);

  const averageRating = reviews.length ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : null;

  return (
    <div className="bg-[#f6f0e4]">
      <section className="relative overflow-hidden border-b border-[#c9b896]">
        <div className="mx-auto grid min-h-[660px] max-w-[1440px] lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative z-10 flex flex-col justify-center px-5 py-16 sm:px-10 lg:px-16 lg:py-24 xl:px-24">
            <div className="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.24em] text-[#8f1715]">
              <span className="h-px w-10 bg-[#b58235]" /> The Indian pantry atelier
            </div>
            {settingsLoading ? (
              <div className="space-y-5" aria-label="Loading store introduction" aria-busy="true"><Skeleton className="h-20 w-full"/><Skeleton className="h-20 w-4/5"/><Skeleton className="h-6 w-full"/><Skeleton className="h-6 w-2/3"/></div>
            ) : (
              <>
                <h1 className="max-w-2xl font-display text-[clamp(3.4rem,7vw,6.9rem)] leading-[.88] tracking-[-.045em] text-[#201b15]">{settings?.heroTitle || 'Ghar ka swaad, bottled beautifully.'}</h1>
                <p className="mt-8 max-w-xl text-base leading-7 text-[#665746] sm:text-lg">{settings?.heroDescription || 'Traditional Indian aachar, carefully prepared in small batches for tables that value memory, craft and honest flavour.'}</p>
              </>
            )}
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link to="/products" onClick={() => { if (heroBanner) void trackEvent('select_promotion', { promotion_id: heroBanner._id, promotion_name: heroBanner.title, creative_slot: 'homepage_hero' }); }} className="group inline-flex min-h-12 items-center gap-5 bg-[#17320d] px-6 text-sm font-semibold text-white transition hover:bg-[#244a18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8f1715] focus-visible:ring-offset-2">
                Shop the collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/about" className="inline-flex min-h-12 items-center gap-2 border-b border-[#8f1715] text-sm font-semibold text-[#201b15] hover:text-[#8f1715]">Read our story <ChevronRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-12 grid max-w-xl grid-cols-3 border-y border-[#c9b896] py-5 text-[10px] font-semibold uppercase tracking-[.14em] text-[#4f4438]">
              <span>Small-batch</span><span className="border-x border-[#c9b896] px-4 text-center">Traditional recipe</span><span className="text-right">Pan-India delivery</span>
            </div>
          </div>

          <div className="relative min-h-[500px] overflow-hidden bg-[#17320d] lg:min-h-full">
            <img src={heroBanner?.image || spiceMarketHero} alt="Spices and ingredients used in Achari Tiwari recipes" className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-[1.02]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17320d]/70 via-transparent to-black/10" />
            <div className="absolute inset-5 border border-[#e4bc73]/70 sm:inset-8" />
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between gap-6 text-white sm:bottom-12 sm:left-12 sm:right-12">
              <div><p className="text-[10px] font-semibold uppercase tracking-[.28em] text-[#efd49f]">From Gopalganj, Bihar</p><p className="mt-2 max-w-sm font-display text-3xl leading-tight sm:text-4xl">A jar full of place, season and patience.</p></div>
              <span className="hidden border border-[#efd49f]/60 px-3 py-2 text-[10px] uppercase tracking-[.18em] sm:block">Made with care</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-start justify-between gap-7 border-b border-[#c9b896] pb-8 md:flex-row md:items-end">
            <div><p className="text-[11px] font-semibold uppercase tracking-[.25em] text-[#8f1715]">The pantry edit · 01</p><h2 className="mt-4 font-display text-4xl leading-none tracking-tight text-[#201b15] sm:text-6xl">Jars worth gathering around.</h2></div>
            <p className="max-w-md text-sm leading-6 text-[#665746]">Our current selection of traditional pickles—bright, balanced and ready to transform the everyday thali.</p>
          </div>
          <div className="mb-12">{productsLoading ? <ProductGridSkeleton count={8}/> : productsError ? <LoadError title="Featured jars could not be loaded" message={productsError.message} onRetry={refetchProducts} className="mx-auto max-w-2xl"/> : products.length ? <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">{products.slice(0,8).map((product)=><ProductCard key={product.id} product={product}/>)}</div> : <div className="border-y border-[#c9b896] py-12 text-left"><h3 className="font-display text-3xl">Fresh batches are coming soon.</h3><p className="mt-2 text-[#665746]">Please check back for the next pantry release.</p></div>}</div>
          <Link to="/products" className="group inline-flex items-center gap-5 border-b border-[#201b15] pb-2 text-sm font-semibold">Explore all jars <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
        </div>
      </section>

      <section className="bg-[#17320d] text-white">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
          <div className="relative min-h-[460px] overflow-hidden"><img src={mixedAachar} alt="A collection of traditional Achari Tiwari pickles" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-[#17320d]/20"/><div className="absolute inset-8 border border-[#e4bc73]/55"/></div>
          <div className="px-6 py-16 sm:px-12 lg:px-20 lg:py-24">
            <p className="text-[11px] font-semibold uppercase tracking-[.25em] text-[#e4bc73]">How a jar comes together · 02</p>
            <h2 className="mt-5 max-w-xl font-display text-4xl leading-[1.02] sm:text-6xl">Tradition, treated with attention.</h2>
            <p className="mt-6 max-w-xl leading-7 text-white/70">The best aachar is not hurried. It begins with familiar recipes, thoughtfully chosen ingredients and preparation that respects each flavour.</p>
            <ol className="mt-10 divide-y divide-white/15 border-y border-white/15">
              {[['01','Traditional recipes','Flavours rooted in familiar Indian kitchens.'],['02','Careful preparation','Each batch is prepared with close attention to balance.'],['03','Natural ingredients','Spices, produce and time do the important work.'],['04','Secure delivery','Packed carefully for its journey to your table.']].map(([n,title,copy])=><li key={n} className="grid grid-cols-[3rem_1fr] gap-4 py-5"><span className="font-display text-xl text-[#e4bc73]">{n}</span><div><h3 className="font-display text-2xl">{title}</h3><p className="mt-1 text-sm text-white/60">{copy}</p></div></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-[11px] font-semibold uppercase tracking-[.25em] text-[#8f1715]">From your tables · 03</p><h2 className="mt-4 font-display text-4xl sm:text-6xl">Notes from the pantry.</h2></div>{averageRating && <div className="flex items-center gap-3 border-l border-[#b58235] pl-4"><Star className="h-5 w-5 fill-[#b58235] text-[#b58235]"/><span className="font-display text-3xl">{averageRating}</span><span className="text-xs uppercase tracking-wider text-[#665746]">Average rating</span></div>}</div>
          {reviewsLoading ? <div className="mt-10 grid gap-5 md:grid-cols-3"><Skeleton className="h-64"/><Skeleton className="h-64"/><Skeleton className="h-64"/></div> : reviewsError ? <LoadError title="Reviews could not be loaded" message={reviewsError.message} onRetry={refetchReviews} className="mt-10"/> : reviews.length ? <div className="custom-scrollbar mt-10 flex snap-x gap-5 overflow-x-auto pb-6" aria-label="Customer reviews">{reviews.map((review,index)=><figure key={`${review.name}-${index}`} className="w-[86vw] shrink-0 snap-start border border-[#c9b896] bg-[#fffaf1] p-7 sm:w-[420px]"><div className="flex gap-1" aria-label={`${review.rating} out of 5 stars`}>{Array.from({length:5}).map((_,i)=><Star key={i} className={`h-3.5 w-3.5 ${i<review.rating?'fill-[#b58235] text-[#b58235]':'text-[#c9b896]'}`}/>)}</div><blockquote className="mt-7 font-display text-2xl leading-snug">“{review.comment}”</blockquote><figcaption className="mt-8 border-t border-[#d9cbb1] pt-4 text-xs uppercase tracking-[.12em]"><strong>{review.name}</strong><span className="mt-1 block text-[#786b5c]">Verified customer · {review.product}</span></figcaption></figure>)}</div> : <p className="mt-10 border-y border-[#c9b896] py-10 text-[#665746]">Customer notes will appear here as they arrive.</p>}
          <p className="mt-2 flex items-center gap-2 text-xs uppercase tracking-[.15em] text-[#786b5c]"><ArrowRight className="h-4 w-4"/> Swipe or scroll to read more</p>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-10 lg:pb-28"><div className="relative mx-auto max-w-7xl overflow-hidden bg-[#8f1715] px-7 py-14 text-white sm:px-14 lg:py-20"><div className="absolute right-0 top-0 h-full w-1/3 border-l border-white/15 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:18px_18px]"/><div className="relative max-w-3xl"><Sparkles className="h-6 w-6 text-[#e4bc73]"/><h2 className="mt-5 font-display text-4xl leading-tight sm:text-6xl">Bring a little more flavour to the table.</h2><p className="mt-5 max-w-xl text-white/75">Find a jar for everyday meals, festive spreads or a thoughtful pantry gift.</p><Link to="/products" className="mt-8 inline-flex min-h-12 items-center gap-5 bg-[#fffaf1] px-6 text-sm font-semibold text-[#201b15] hover:bg-white">Choose your jar <ArrowRight className="h-4 w-4"/></Link></div></div></section>
    </div>
  );
};

export default Homepage;
