import { ArrowRight, CheckCircle2, Home, MessageSquareQuote, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadError } from '@/components/StorefrontStates';
import { useReviews } from '@/hooks/useStoreData';

const clampRating = (rating: number) => Math.min(5, Math.max(0, Number(rating) || 0));

function ReviewSkeleton() {
  return (
    <div className="border border-border/70 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="mt-6 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-11/12" />
      <Skeleton className="mt-2 h-4 w-3/5" />
      <Skeleton className="mt-6 h-4 w-36" />
    </div>
  );
}

const ReviewsPage = () => {
  const { reviews, loading, error, refetch } = useReviews();
  const averageRating = reviews.length
    ? reviews.reduce((total, review) => total + clampRating(review.rating), 0) / reviews.length
    : 0;

  return (
    <main className="min-h-screen bg-[#fffaf1] pb-20">
      <section className="relative overflow-hidden border-b border-[#e6d6bd] bg-[#f6ead7]">
        <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(circle_at_center,rgba(174,101,21,.14),transparent_68%)]" />
        <div className="container relative mx-auto px-4 pb-11 pt-7 sm:pb-14 sm:pt-9 lg:pb-16">
          <nav aria-label="Breadcrumb" className="flex min-h-11 items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="inline-flex min-h-11 items-center gap-2 font-semibold hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Home className="h-4 w-4" /> Home
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Customer reviews</span>
          </nav>

          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent">Voices from the table</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">Real notes from people who opened a jar.</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Read approved customer experiences about the flavours, meals and jars they have enjoyed from Achari Tiwari.</p>
            </div>

            <div className="border-y border-[#d9c29e] py-5 lg:border lg:bg-[#fffaf1]/80 lg:px-6">
              {loading ? (
                <div aria-label="Loading review summary" aria-busy="true">
                  <Skeleton className="h-12 w-32" />
                  <Skeleton className="mt-3 h-4 w-44" />
                </div>
              ) : reviews.length ? (
                <>
                  <div className="flex items-end gap-3">
                    <strong className="text-5xl tracking-[-0.05em] text-primary">{averageRating.toFixed(1)}</strong>
                    <div className="pb-1">
                      <div className="flex gap-0.5 text-[#b86c00]" aria-label={`${averageRating.toFixed(1)} out of 5 stars`}>
                        {Array.from({ length: 5 }).map((_, index) => <Star key={index} aria-hidden="true" className={`h-4 w-4 ${index < Math.round(averageRating) ? 'fill-current' : ''}`} />)}
                      </div>
                      <p className="mt-1 text-xs font-semibold text-muted-foreground">Average rating</p>
                    </div>
                  </div>
                  <p className="mt-4 border-t border-[#d9c29e] pt-3 text-sm text-muted-foreground"><strong className="text-foreground">{reviews.length}</strong> approved {reviews.length === 1 ? 'review' : 'reviews'}</p>
                </>
              ) : (
                <p className="text-sm leading-6 text-muted-foreground">No approved reviews have been published yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pt-10 sm:pt-12" aria-live="polite">
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2" aria-label="Loading customer reviews" aria-busy="true">
            {Array.from({ length: 6 }).map((_, index) => <ReviewSkeleton key={index} />)}
          </div>
        ) : error ? (
          <LoadError title="Customer reviews could not be loaded" message={error.message} onRetry={refetch} className="mx-auto max-w-2xl" />
        ) : reviews.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {reviews.map((review) => {
              const rating = clampRating(review.rating);
              return (
                <article key={review._id} className="group flex min-h-64 flex-col border border-[#e4d5bd] bg-white p-5 shadow-[0_18px_45px_-38px_rgba(61,35,12,.65)] transition hover:-translate-y-0.5 hover:border-[#c89a57] hover:shadow-[0_24px_55px_-38px_rgba(61,35,12,.75)] sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex gap-0.5 text-[#b86c00]" aria-label={`${rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, index) => <Star key={index} aria-hidden="true" className={`h-4 w-4 ${index < Math.round(rating) ? 'fill-current' : ''}`} />)}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary"><CheckCircle2 className="h-4 w-4" /> Approved review</span>
                  </div>
                  <blockquote className="mt-6 flex-1 text-base leading-7 text-foreground">“{review.comment}”</blockquote>
                  <footer className="mt-6 border-t border-[#eee3d1] pt-4">
                    <h2 className="font-bold text-foreground">{review.name}</h2>
                    {review.product && <p className="mt-1 text-sm text-muted-foreground">Enjoyed: <span className="font-semibold text-accent">{review.product}</span></p>}
                  </footer>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl border-y border-[#dcc7a7] py-14 text-center sm:py-16">
            <MessageSquareQuote className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 text-2xl font-bold tracking-tight">The first table story is still being written.</h2>
            <p className="mx-auto mt-3 max-w-lg leading-7 text-muted-foreground">Approved customer reviews will appear here. Until then, explore the pantry and find a jar worth talking about.</p>
            <Button asChild className="mt-7 min-h-11 px-6">
              <Link to="/products">Explore all products <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        )}

        {reviews.length > 0 && !loading && !error && (
          <div className="mt-12 flex flex-col items-start justify-between gap-5 border-y border-[#dcc7a7] py-7 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Find your favourite</p>
              <h2 className="mt-2 text-2xl font-bold">Ready to bring tradition to your table?</h2>
            </div>
            <Button asChild className="min-h-11 w-full px-6 sm:w-auto">
              <Link to="/products">Explore the pantry <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        )}
      </section>
    </main>
  );
};

export default ReviewsPage;
