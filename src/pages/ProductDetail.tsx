import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Award, Check, ChevronRight, Clock3, Heart, Leaf, Minus, PackageCheck,
  Plus, Share2, ShieldCheck, ShoppingBag, Sparkles, Star, Truck, UtensilsCrossed,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useGlobalToast } from '@/contexts/ToastContext';
import { useToast } from '@/hooks/use-toast';
import { useProductReviews, useProducts } from '@/hooks/useStoreData';
import { apiRequest } from '@/lib/api';
import { analyticsItem, trackEvent } from '@/lib/analytics';
import { Input } from '@/components/ui/input';
import { LoadError } from '@/components/StorefrontStates';
import { Skeleton } from '@/components/ui/skeleton';
import { useWishlist } from '@/contexts/WishlistContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { toast } = useToast();
  const { showToast } = useGlobalToast();
  const [quantity, setQuantity] = useState(1);
  const { contains, toggle, updatingId } = useWishlist();
  const [pincode, setPincode] = useState('');
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const [reviewForm,setReviewForm]=useState({name:'',email:'',rating:5,comment:''});
  const [reviewMessage,setReviewMessage]=useState('');
  const { products, loading: productLoading, error: productError, refetch: refetchProducts } = useProducts();
  const product = id ? products.find((item) => item.id === id || item.slug === id) : null;
  const isLiked = product ? contains(product.id) : false;
  const hasPersistedProduct = Boolean(product && /^[a-f\d]{24}$/i.test(product.id));
  const [selectedImage,setSelectedImage]=useState('');
  useEffect(()=>setSelectedImage(product?.image||''),[product?.id,product?.image]);
  useEffect(() => {
    if (!product) return;
    void trackEvent('view_item', { currency: 'INR', value: product.price, items: [analyticsItem(product)] });
  }, [product]);
  const { reviews, rating, loading: reviewsLoading, error: reviewsError, refresh: refreshReviews } = useProductReviews(hasPersistedProduct ? product?.id : undefined);

  if (productLoading) {
    return <main className="min-h-screen bg-[#fcfaf5]" aria-label="Loading product" aria-busy="true"><div className="container mx-auto grid gap-8 px-4 py-10 lg:grid-cols-2 lg:gap-14"><Skeleton className="aspect-square w-full rounded-none"/><div><Skeleton className="h-4 w-24"/><Skeleton className="mt-5 h-12 w-full"/><Skeleton className="mt-3 h-12 w-3/4"/><Skeleton className="mt-7 h-5 w-40"/><Skeleton className="mt-7 h-24 w-full"/><div className="mt-7 grid grid-cols-3 gap-px"><Skeleton className="h-28 rounded-none"/><Skeleton className="h-28 rounded-none"/><Skeleton className="h-28 rounded-none"/></div><Skeleton className="mt-8 h-14 w-full rounded-none"/><Skeleton className="mt-3 h-14 w-full rounded-none"/></div></div></main>;
  }

  if (productError) {
    return <main className="min-h-[65vh] px-4 py-16"><LoadError title="This product could not be loaded" message={productError.message} onRetry={refetchProducts} className="mx-auto max-w-xl" /></main>;
  }

  if (!product) {
    return <main className="min-h-[65vh] grid place-items-center px-4"><div className="text-center"><p className="text-sm font-semibold uppercase tracking-[.2em] text-primary">Nothing in this jar</p><h1 className="mt-3 text-3xl font-bold">Product not found</h1><Button asChild className="mt-6"><Link to="/products"><ArrowLeft className="mr-2 h-4 w-4" />Back to products</Link></Button></div></main>;
  }

  const mrp = Math.ceil((product.price * 1.18) / 10) * 10;
  const savings = mrp - product.price;
  const addSelectedQuantity = () => {
    for (let i = 0; i < quantity; i += 1) dispatch({ type: 'ADD_TO_CART', product });
  };
  const handleAddToCart = () => {
    addSelectedQuantity();
    showToast(product, quantity);
    void trackEvent('add_to_cart', { currency: 'INR', value: product.price * quantity, items: [analyticsItem(product, quantity)] });
  };
  const handleBuyNow = () => {
    addSelectedQuantity();
    const eventData = { currency: 'INR', value: product.price * quantity, items: [analyticsItem(product, quantity)] };
    void trackEvent('add_to_cart', eventData);
    void trackEvent('begin_checkout', eventData);
    navigate('/checkout');
  };
  const handleLike = async () => {
    try {
      const liked = await toggle(product.id);
      void trackEvent(liked ? 'add_to_wishlist' : 'remove_from_wishlist', { currency: 'INR', value: product.price, items: [analyticsItem(product)] });
      toast({ title: liked ? 'Saved to wishlist' : 'Removed from wishlist', description: `${product.name} ${liked ? 'is saved for later.' : 'was removed.'}` });
    } catch (error) { toast({ title:'Could not update wishlist', description:error instanceof Error ? error.message : 'Please try again.' }); }
  };
  const handleShare = async () => {
    const url = `${window.location.origin}/product/${product.id}`;
    try {
      if (navigator.share) await navigator.share({ title: product.name, text: product.description, url });
      else { await navigator.clipboard.writeText(url); toast({ title: 'Link copied', description: 'Share it with someone who loves a good achar.' }); }
      void trackEvent('share', { method: navigator.share ? 'native_share' : 'clipboard', content_type: 'product', item_id: product.sku || product.id });
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') toast({ title: 'Could not share', description: 'Please try again.' });
    }
  };
  const checkDelivery = () => {
    if (!/^\d{6}$/.test(pincode)) { setDeliveryMessage('Enter a valid 6-digit Indian pincode.'); void trackEvent('check_delivery', { result: 'invalid' }); return; }
    setDeliveryMessage('Delivery available · Estimated in 2–5 business days');
    void trackEvent('check_delivery', { result: 'available' });
  };
  const submitReview=async(event:React.FormEvent)=>{event.preventDefault();if(!product||!hasPersistedProduct)return;setReviewMessage('');try{const body=await apiRequest<{message:string}>(`/products/${product.id}/reviews`,{method:'POST',body:JSON.stringify(reviewForm)});setReviewMessage(body.message);void trackEvent('submit_review',{item_id:product.sku||product.id,rating:reviewForm.rating});setReviewForm({name:'',email:'',rating:5,comment:''});void refreshReviews();}catch(error){setReviewMessage(error instanceof Error?error.message:'Unable to submit review')}};

  const facts = [
    { icon: PackageCheck, label: product.weight, note: 'Net weight' },
    { icon: Clock3, label: product.shelfLife, note: 'Shelf life' },
    { icon: Leaf, label: 'Natural', note: 'Traditional ingredients' },
  ];

  return (
    <main className="bg-[#fcfaf5] pb-24 text-foreground md:pb-0">
      <div className="border-b bg-background/80">
        <nav aria-label="Breadcrumb" className="container mx-auto flex items-center gap-2 px-4 py-3 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link><ChevronRight className="h-3 w-3" /><Link to="/products" className="hover:text-primary">Pickles</Link><ChevronRight className="h-3 w-3" /><span className="truncate text-foreground">{product.name}</span>
        </nav>
      </div>

      <section className="container mx-auto min-w-0 px-3 py-7 sm:px-4 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,.98fr)] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-[4/3] overflow-hidden border border-[#e8dfd2] bg-[#f4eee3] p-3 shadow-[0_18px_60px_-38px_rgba(67,35,21,.45)] sm:p-5">
              <img src={selectedImage||product.image} alt={`${product.name} jar`} className="h-full w-full object-contain" />
              <div className="absolute left-4 top-4 flex items-center gap-2 bg-[#fffaf0] px-3 py-2 text-xs font-bold text-primary shadow-sm"><Award className="h-4 w-4" /> Small-batch quality</div>
            </div>
            <div className="mt-3 flex flex-wrap gap-3">{(product.images?.length?product.images:[product.image]).map((image,index)=><button key={image} type="button" onClick={()=>setSelectedImage(image)} aria-label={`View ${product.name} image ${index+1}`} className={`h-20 w-20 overflow-hidden border-2 bg-[#f4eee3] p-1.5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${selectedImage===image?'border-primary':'border-transparent'}`}><img src={image} alt="" className="h-full w-full object-contain" /></button>)}</div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-primary">{product.category}</p>
              <Badge variant="outline" className={product.inStock ? 'border-green-700/30 text-green-800' : 'border-destructive/30 text-destructive'}>{product.inStock ? 'In stock' : 'Out of stock'}</Badge>
            </div>
            <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">{product.name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              {reviewsLoading ? <Skeleton className="h-5 w-32" /> : <><div className="flex items-center gap-1 text-[#b86c00]" aria-label={rating ? `Rated ${rating} out of 5` : 'Not yet rated'}><Star className="h-4 w-4 fill-current" /><strong>{rating ? rating.toFixed(1) : 'New'}</strong></div><a href="#reviews" className="font-medium underline decoration-muted-foreground/40 underline-offset-4">{reviews.length} verified reviews</a></>}
              <span className="text-muted-foreground">Loved with dal, rice & paratha</span>
            </div>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">{product.description}</p>

            <div className="mt-6 flex flex-wrap items-end gap-3 border-y border-[#e8dfd2] py-5">
              <span className="text-3xl font-bold text-primary">₹{product.price}</span>
              <span className="pb-1 text-sm text-muted-foreground line-through">MRP ₹{mrp}</span>
              <span className="mb-1 bg-[#f4e6c3] px-2 py-1 text-xs font-bold text-[#715008]">Save ₹{savings}</span>
              <span className="w-full text-xs text-muted-foreground">Inclusive of all taxes</span>
            </div>

            <dl className="mt-6 grid grid-cols-3 divide-x border border-[#e8dfd2] bg-background">
              {facts.map(({ icon: Icon, label, note }) => <div key={label} className="px-3 py-4 text-center"><Icon className="mx-auto h-5 w-5 text-primary" /><dt className="mt-2 text-sm font-bold">{label}</dt><dd className="mt-1 text-[11px] leading-tight text-muted-foreground">{note}</dd></div>)}
            </dl>

            <div className="mt-7">
              <p className="mb-3 text-sm font-bold">Choose quantity</p>
              <div className="flex h-11 w-36 items-center justify-between border border-input bg-background">
                <button aria-label="Decrease quantity" type="button" disabled={quantity === 1} onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="grid h-full w-11 place-items-center hover:bg-muted disabled:opacity-30"><Minus className="h-4 w-4" /></button>
                <span aria-live="polite" className="font-bold">{quantity}</span>
                <button aria-label="Increase quantity" type="button" disabled={quantity === 10} onClick={() => setQuantity((q) => Math.min(10, q + 1))} className="grid h-full w-11 place-items-center hover:bg-muted disabled:opacity-30"><Plus className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="mt-5 border border-[#dfd3c2] bg-[#fffaf0] p-3 shadow-[0_14px_34px_-28px_rgba(67,35,21,.55)] sm:p-4">
              <div className="grid gap-2 min-[380px]:grid-cols-2">
                <Button onClick={handleAddToCart} disabled={!product.inStock} size="lg" className="h-14 rounded-sm px-4 text-base font-semibold shadow-[0_8px_20px_-14px_rgba(20,70,18,.9)]">
                  <ShoppingBag className="mr-2 h-5 w-5 shrink-0" />
                  <span>{product.inStock ? 'Add to cart' : 'Out of stock'}</span>
                </Button>
                <Button onClick={handleBuyNow} disabled={!product.inStock} size="lg" variant="outline" className="h-14 rounded-sm border-primary bg-background px-4 text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground">
                  <span>Buy now</span>
                  <ChevronRight className="ml-2 h-5 w-5 shrink-0" />
                </Button>
              </div>

              <div className="mt-3 grid gap-2 border-t border-[#e8dfd2] pt-3 min-[380px]:grid-cols-2">
                <Button
                  onClick={handleLike}
                  disabled={updatingId === product.id}
                  variant="outline"
                  className={`h-12 min-w-0 rounded-sm border-[#dfd3c2] px-3 font-semibold ${isLiked ? 'border-primary/40 bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary' : 'bg-background text-foreground hover:border-primary/40 hover:bg-[#f7efdf] hover:text-primary'}`}
                  aria-label={isLiked ? 'Remove from wishlist' : 'Save product for later'}
                  aria-pressed={isLiked}
                >
                  <Heart className={`mr-2 h-4.5 w-4.5 shrink-0 ${isLiked ? 'fill-primary text-primary' : 'text-primary'}`} />
                  <span className="truncate">{isLiked ? 'Saved' : 'Save for later'}</span>
                </Button>
                <Button onClick={handleShare} variant="outline" className="h-12 min-w-0 rounded-sm border-[#dfd3c2] bg-background px-3 font-semibold text-foreground hover:border-primary/40 hover:bg-[#f7efdf] hover:text-primary" aria-label={`Share ${product.name}`}>
                  <Share2 className="mr-2 h-4.5 w-4.5 shrink-0 text-primary" />
                  <span>Share</span>
                </Button>
              </div>
            </div>

            <div className="mt-7 border border-[#e8dfd2] bg-background p-5">
              <div className="flex items-center gap-2 font-bold"><Truck className="h-5 w-5 text-primary" />Check delivery to your doorstep</div>
              <div className="mt-3 flex"><input aria-label="Delivery pincode" inputMode="numeric" maxLength={6} value={pincode} onChange={(e) => { setPincode(e.target.value.replace(/\D/g, '')); setDeliveryMessage(''); }} placeholder="Enter 6-digit pincode" className="min-w-0 flex-1 border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" /><Button onClick={checkDelivery} className="rounded-none">Check</Button></div>
              {deliveryMessage && <p aria-live="polite" className={`mt-2 text-xs font-medium ${deliveryMessage.startsWith('Delivery') ? 'text-green-800' : 'text-destructive'}`}>{deliveryMessage}</p>}
            </div>

            <div className="mt-4 grid gap-3 bg-[#f6ead6] p-5 text-sm sm:grid-cols-2">
              <p><strong>Free delivery</strong><br /><span className="text-muted-foreground">On orders above ₹699</span></p>
              <p><strong>Easy payment</strong><br /><span className="text-muted-foreground">COD and UPI available</span></p>
            </div>
            <div className="mt-5 flex flex-wrap justify-between gap-3 border-t pt-5 text-xs font-semibold text-muted-foreground"><span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" />Secure checkout</span><span className="flex items-center gap-1.5"><PackageCheck className="h-4 w-4 text-primary" />Careful packing</span><span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-primary" />Traditional recipe</span></div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e8dfd2] bg-background py-14">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[.7fr_1.3fr]">
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-primary">Inside the jar</p><h2 className="mt-3 text-3xl font-bold">Everything you want to know</h2><p className="mt-4 leading-7 text-muted-foreground">Simple ingredients, familiar flavours and practical care instructions—clearly shared.</p></div>
          <Accordion type="single" collapsible defaultValue="ingredients" className="border-t">
            <AccordionItem value="ingredients"><AccordionTrigger className="text-left text-base hover:no-underline">Ingredients</AccordionTrigger><AccordionContent><div className="flex flex-wrap gap-2">{product.ingredients.map((item) => <Badge key={item} variant="secondary">{item}</Badge>)}</div></AccordionContent></AccordionItem>
            <AccordionItem value="taste"><AccordionTrigger className="text-left text-base hover:no-underline">Taste & pairing</AccordionTrigger><AccordionContent className="leading-6 text-muted-foreground">A bright, savoury pickle with layered spice. Serve a small spoonful with dal-chawal, stuffed parathas, khichdi, curd rice or everyday thalis.</AccordionContent></AccordionItem>
            <AccordionItem value="storage"><AccordionTrigger className="text-left text-base hover:no-underline">Storage</AccordionTrigger><AccordionContent className="leading-6 text-muted-foreground">Store tightly closed in a cool, dry place. Always use a clean, dry spoon and keep moisture away from the jar. Refrigerate after opening for best quality.</AccordionContent></AccordionItem>
            <AccordionItem value="details"><AccordionTrigger className="text-left text-base hover:no-underline">Product details</AccordionTrigger><AccordionContent><dl className="grid grid-cols-2 gap-4 text-sm"><div><dt className="text-muted-foreground">Net weight</dt><dd className="font-semibold">{product.weight}</dd></div><div><dt className="text-muted-foreground">Shelf life</dt><dd className="font-semibold">{product.shelfLife}</dd></div><div><dt className="text-muted-foreground">Category</dt><dd className="font-semibold">{product.category}</dd></div><div><dt className="text-muted-foreground">Availability</dt><dd className="font-semibold">{product.inStock ? 'In stock' : 'Out of stock'}</dd></div></dl></AccordionContent></AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="overflow-hidden bg-[#7e241d] py-16 text-[#fff9ed]">
        <div className="container mx-auto px-4"><div className="max-w-xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#f7c96a]">From our kitchen to your table</p><h2 className="mt-3 text-3xl font-bold md:text-4xl">Crafted slowly. Relished instantly.</h2></div>
          <ol className="relative mt-10 grid gap-8 md:grid-cols-4 md:gap-4 before:absolute before:left-[12%] before:right-[12%] before:top-6 before:hidden before:border-t before:border-dashed before:border-[#f7c96a]/50 md:before:block">
            {[['01', Leaf, 'Ingredients selected', 'Fresh produce and aromatic spices are carefully chosen.'], ['02', UtensilsCrossed, 'Recipe prepared', 'Ingredients are mixed in balanced, traditional proportions.'], ['03', Clock3, 'Flavours matured', 'The achar is given time to develop its full character.'], ['04', PackageCheck, 'Packed with care', 'Each jar is closed securely before it begins its journey.']].map(([num, Icon, title, copy]) => { const ProcessIcon = Icon as typeof Leaf; return <li key={String(num)} className="relative"><span className="relative z-10 grid h-12 w-12 place-items-center border border-[#f7c96a]/50 bg-[#7e241d]"><ProcessIcon className="h-5 w-5 text-[#f7c96a]" /></span><p className="mt-5 text-xs font-bold tracking-[.18em] text-[#f7c96a]">STEP {num as string}</p><h3 className="mt-2 text-lg font-bold">{title as string}</h3><p className="mt-2 max-w-xs text-sm leading-6 text-[#fff9ed]/75">{copy as string}</p></li>; })}
          </ol>
        </div>
      </section>

      <section className="container mx-auto grid gap-12 px-4 py-16 lg:grid-cols-2">
        <div><p className="text-xs font-bold uppercase tracking-[.2em] text-primary">Good to know</p><h2 className="mt-3 text-3xl font-bold">Frequently asked</h2><Accordion type="single" collapsible className="mt-7 border-t">{[
          ['How should I store the pickle?', 'Keep the lid tightly closed, use only a clean dry spoon, and refrigerate after opening for best quality.'],
          ['Is oil separation normal?', 'Yes. Natural settling and a layer of oil can occur in traditionally prepared pickles. Stir gently with a clean, dry spoon.'],
          ['When will my order arrive?', 'Most serviceable pincodes receive orders in 2–5 business days after dispatch.'],
          ['Does it contain preservatives?', `The full ingredient list is shown above. Please review it carefully; this recipe contains: ${product.ingredients.join(', ')}.`],
        ].map(([q, a], index) => <AccordionItem key={q} value={`faq-${index}`}><AccordionTrigger className="text-left hover:no-underline">{q}</AccordionTrigger><AccordionContent className="leading-6 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></div>

        <div id="reviews" className="scroll-mt-24"><p className="text-xs font-bold uppercase tracking-[.2em] text-primary">Customer confidence</p>{reviewsLoading ? <div className="mt-4" aria-label="Loading reviews" aria-busy="true"><div className="flex items-end gap-4"><Skeleton className="h-16 w-24"/><div className="space-y-2"><Skeleton className="h-4 w-28"/><Skeleton className="h-4 w-44"/></div></div><div className="mt-6 space-y-3">{Array.from({length:3}).map((_,index)=><div key={index} className="border bg-background p-4"><Skeleton className="h-4 w-24"/><Skeleton className="mt-3 h-4 w-full"/><Skeleton className="mt-2 h-4 w-3/4"/></div>)}</div></div> : reviewsError ? <LoadError title="Reviews are temporarily unavailable" message={reviewsError.message} onRetry={refreshReviews} className="mt-5" /> : <><div className="mt-3 flex items-end gap-4"><span className="text-6xl font-bold">{rating?rating.toFixed(1):'—'}</span><div className="pb-1">{rating > 0 && <div className="flex text-[#b86c00]">{[0,1,2,3,4].map((n) => <Star key={n} className="h-4 w-4 fill-current" />)}</div>}<p className="mt-1 text-sm text-muted-foreground">{reviews.length ? `Based on ${reviews.length} approved reviews` : 'Be the first to review this jar'}</p></div></div><div className="mt-6 space-y-3">{reviews.slice(0,4).map((review)=><article key={review._id} className="border border-[#e8dfd2] bg-background p-4"><div className="flex text-[#b86c00]">{Array.from({length:review.rating}).map((_,n)=><Star key={n} className="h-3.5 w-3.5 fill-current"/>)}</div><p className="mt-2 text-sm leading-6 text-muted-foreground">{review.comment}</p><p className="mt-2 text-xs font-bold">{review.name}</p></article>)}</div></>}{hasPersistedProduct&&<form onSubmit={submitReview} className="mt-7 grid gap-3 border border-[#e8dfd2] bg-background p-5 sm:grid-cols-2"><h3 className="font-bold sm:col-span-2">Share your experience</h3><Input required placeholder="Your name" value={reviewForm.name} onChange={e=>setReviewForm({...reviewForm,name:e.target.value})}/><Input type="email" placeholder="Email (not published)" value={reviewForm.email} onChange={e=>setReviewForm({...reviewForm,email:e.target.value})}/><select className="rounded-md border border-input bg-background px-3 py-2 text-sm" value={reviewForm.rating} onChange={e=>setReviewForm({...reviewForm,rating:Number(e.target.value)})}>{[5,4,3,2,1].map(value=><option key={value} value={value}>{value} stars</option>)}</select><Input required minLength={5} placeholder="Write your review" value={reviewForm.comment} onChange={e=>setReviewForm({...reviewForm,comment:e.target.value})}/><Button className="sm:col-span-2">Submit for review</Button>{reviewMessage&&<p className="text-sm text-muted-foreground sm:col-span-2">{reviewMessage}</p>}</form>}</div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 max-w-full border-t border-[#dfd3c2] bg-[#fffaf0] px-3 pb-[max(.625rem,env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-10px_30px_rgba(67,35,21,.12)] md:hidden"><div className="mx-auto grid w-full min-w-0 max-w-lg grid-cols-[76px_minmax(0,1fr)] items-center gap-2.5"><div className="min-w-0"><p className="text-[11px] font-medium text-muted-foreground">Total</p><p className="truncate text-lg font-bold leading-tight text-primary">₹{product.price * quantity}</p></div><Button onClick={handleAddToCart} disabled={!product.inStock} className="h-12 min-w-0 rounded-sm px-3 text-sm font-semibold shadow-[0_8px_20px_-14px_rgba(20,70,18,.9)]"><ShoppingBag className="mr-1.5 h-5 w-5 shrink-0" /><span className="truncate">{product.inStock ? `Add ${quantity} to cart` : 'Out of stock'}</span></Button></div></div>
    </main>
  );
};

export default ProductDetail;
