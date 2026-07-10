import React, { useState } from 'react';
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
import { products as fallbackProducts } from '@/data/products';
import { useProductReviews, useProducts } from '@/hooks/useStoreData';
import { apiRequest } from '@/lib/api';
import { Input } from '@/components/ui/input';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { toast } = useToast();
  const { showToast } = useGlobalToast();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const [reviewForm,setReviewForm]=useState({name:'',email:'',rating:5,comment:''});
  const [reviewMessage,setReviewMessage]=useState('');
  const { products } = useProducts(fallbackProducts);
  const product = id ? products.find((item) => item.id === id) : null;
  const { reviews, rating, refresh: refreshReviews } = useProductReviews(product?.id);

  if (!product) {
    return <main className="min-h-[65vh] grid place-items-center px-4"><div className="text-center"><p className="text-sm font-semibold uppercase tracking-[.2em] text-primary">Nothing in this jar</p><h1 className="mt-3 text-3xl font-bold">Product not found</h1><Button asChild className="mt-6"><Link to="/products"><ArrowLeft className="mr-2 h-4 w-4" />Back to products</Link></Button></div></main>;
  }

  const mrp = Math.ceil((product.price * 1.18) / 10) * 10;
  const savings = mrp - product.price;
  const addSelectedQuantity = () => {
    for (let i = 0; i < quantity; i += 1) dispatch({ type: 'ADD_TO_CART', product });
  };
  const handleAddToCart = () => { addSelectedQuantity(); showToast(product, quantity); };
  const handleBuyNow = () => { addSelectedQuantity(); navigate('/checkout'); };
  const handleLike = () => {
    setIsLiked((liked) => !liked);
    toast({ title: isLiked ? 'Removed from wishlist' : 'Saved to wishlist', description: `${product.name} ${isLiked ? 'was removed.' : 'is saved for later.'}` });
  };
  const handleShare = async () => {
    const url = `${window.location.origin}/product/${product.id}`;
    try {
      if (navigator.share) await navigator.share({ title: product.name, text: product.description, url });
      else { await navigator.clipboard.writeText(url); toast({ title: 'Link copied', description: 'Share it with someone who loves a good achar.' }); }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') toast({ title: 'Could not share', description: 'Please try again.' });
    }
  };
  const checkDelivery = () => {
    if (!/^\d{6}$/.test(pincode)) { setDeliveryMessage('Enter a valid 6-digit Indian pincode.'); return; }
    setDeliveryMessage('Delivery available · Estimated in 2–5 business days');
  };
  const submitReview=async(event:React.FormEvent)=>{event.preventDefault();if(!product)return;setReviewMessage('');try{const body=await apiRequest<{message:string}>(`/products/${product.id}/reviews`,{method:'POST',body:JSON.stringify(reviewForm)});setReviewMessage(body.message);setReviewForm({name:'',email:'',rating:5,comment:''});void refreshReviews();}catch(error){setReviewMessage(error instanceof Error?error.message:'Unable to submit review')}};

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
            <div className="relative overflow-hidden border border-[#e8dfd2] bg-[#f4eee3] shadow-[0_18px_60px_-38px_rgba(67,35,21,.45)]">
              <img src={product.image} alt={`${product.name} jar`} className="aspect-square h-full w-full object-cover transition-transform duration-700 hover:scale-[1.025] motion-reduce:transition-none" />
              <div className="absolute left-4 top-4 flex items-center gap-2 bg-[#fffaf0] px-3 py-2 text-xs font-bold text-primary shadow-sm"><Award className="h-4 w-4" /> Small-batch quality</div>
            </div>
            <button type="button" aria-label={`View ${product.name} image`} className="mt-3 h-20 w-20 overflow-hidden border-2 border-primary bg-muted p-1 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"><img src={product.image} alt="" className="h-full w-full object-cover" /></button>
          </div>

          <div className="min-w-0">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-primary">{product.category}</p>
              <Badge variant="outline" className={product.inStock ? 'border-green-700/30 text-green-800' : 'border-destructive/30 text-destructive'}>{product.inStock ? 'In stock' : 'Out of stock'}</Badge>
            </div>
            <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">{product.name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center gap-1 text-[#b86c00]" aria-label={`Rated ${rating || 4.8} out of 5`}><Star className="h-4 w-4 fill-current" /><strong>{rating ? rating.toFixed(1) : 'New'}</strong></div>
              <a href="#reviews" className="font-medium underline decoration-muted-foreground/40 underline-offset-4">{reviews.length} verified reviews</a>
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

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-[1fr_1fr_auto_auto]">
              <Button onClick={handleAddToCart} disabled={!product.inStock} size="lg" className="h-13 rounded-none text-base"><ShoppingBag className="mr-2 h-5 w-5" />Add to cart</Button>
              <Button onClick={handleBuyNow} disabled={!product.inStock} size="lg" variant="outline" className="h-13 rounded-none border-primary text-base text-primary hover:bg-primary hover:text-primary-foreground">Buy now</Button>
              <Button onClick={handleLike} variant="outline" size="icon" className="h-13 w-13 rounded-none" aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}><Heart className={`h-5 w-5 ${isLiked ? 'fill-primary text-primary' : ''}`} /></Button>
              <Button onClick={handleShare} variant="outline" size="icon" className="h-13 w-13 rounded-none" aria-label="Share product"><Share2 className="h-5 w-5" /></Button>
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

        <div id="reviews" className="scroll-mt-24"><p className="text-xs font-bold uppercase tracking-[.2em] text-primary">Customer confidence</p><div className="mt-3 flex items-end gap-4"><span className="text-6xl font-bold">{rating?rating.toFixed(1):'—'}</span><div className="pb-1"><div className="flex text-[#b86c00]">{[0,1,2,3,4].map((n) => <Star key={n} className="h-4 w-4 fill-current" />)}</div><p className="mt-1 text-sm text-muted-foreground">Based on {reviews.length} approved reviews</p></div></div><div className="mt-6 space-y-3">{reviews.slice(0,4).map((review:any)=><article key={review._id} className="border border-[#e8dfd2] bg-background p-4"><div className="flex text-[#b86c00]">{Array.from({length:review.rating}).map((_,n)=><Star key={n} className="h-3.5 w-3.5 fill-current"/>)}</div><p className="mt-2 text-sm leading-6 text-muted-foreground">{review.comment}</p><p className="mt-2 text-xs font-bold">{review.name}</p></article>)}</div><form onSubmit={submitReview} className="mt-7 grid gap-3 border border-[#e8dfd2] bg-background p-5 sm:grid-cols-2"><h3 className="font-bold sm:col-span-2">Share your experience</h3><Input required placeholder="Your name" value={reviewForm.name} onChange={e=>setReviewForm({...reviewForm,name:e.target.value})}/><Input type="email" placeholder="Email (not published)" value={reviewForm.email} onChange={e=>setReviewForm({...reviewForm,email:e.target.value})}/><select className="rounded-md border border-input bg-background px-3 py-2 text-sm" value={reviewForm.rating} onChange={e=>setReviewForm({...reviewForm,rating:Number(e.target.value)})}>{[5,4,3,2,1].map(value=><option key={value} value={value}>{value} stars</option>)}</select><Input required minLength={5} placeholder="Write your review" value={reviewForm.comment} onChange={e=>setReviewForm({...reviewForm,comment:e.target.value})}/><Button className="sm:col-span-2">Submit for review</Button>{reviewMessage&&<p className="text-sm text-muted-foreground sm:col-span-2">{reviewMessage}</p>}</form></div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 max-w-full border-t bg-background p-2.5 shadow-[0_-8px_25px_rgba(0,0,0,.08)] md:hidden"><div className="mx-auto grid w-full min-w-0 max-w-lg grid-cols-[72px_minmax(0,1fr)] items-center gap-2"><div className="min-w-0"><p className="text-xs text-muted-foreground">Total</p><p className="truncate text-lg font-bold text-primary">₹{product.price * quantity}</p></div><Button onClick={handleAddToCart} disabled={!product.inStock} className="h-12 min-w-0 rounded-none px-2 text-sm"><ShoppingBag className="mr-1.5 h-5 w-5 shrink-0" /><span className="truncate">Add {quantity} to cart</span></Button></div></div>
    </main>
  );
};

export default ProductDetail;
