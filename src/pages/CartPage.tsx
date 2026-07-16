import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { analyticsItem, trackEvent } from '@/lib/analytics';

const CartPage = () => {
  const { state, dispatch } = useCart();
  const cartViewTracked = useRef(false);

  useEffect(() => {
    if (cartViewTracked.current || !state.items.length) return;
    cartViewTracked.current = true;
    void trackEvent('view_cart', { currency: 'INR', value: state.total, items: state.items.map((item) => analyticsItem(item, item.quantity)) });
  }, [state.items, state.total]);

  const updateQuantity = (productId: string, quantity: number) => {
    const item = state.items.find((candidate) => candidate.id === productId);
    if (item && quantity !== item.quantity) {
      const difference = Math.abs(quantity - item.quantity);
      void trackEvent(quantity > item.quantity ? 'add_to_cart' : 'remove_from_cart', {
        currency: 'INR',
        value: item.price * difference,
        items: [analyticsItem(item, difference)],
      });
    }
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const removeFromCart = (productId: string) => {
    const item = state.items.find((candidate) => candidate.id === productId);
    if (item) void trackEvent('remove_from_cart', { currency: 'INR', value: item.price * item.quantity, items: [analyticsItem(item, item.quantity)] });
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const trackCheckout = () => {
    void trackEvent('begin_checkout', { currency: 'INR', value: state.total, items: state.items.map((item) => analyticsItem(item, item.quantity)) });
  };

  if (state.items.length === 0) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center px-3 py-10 sm:px-4 sm:py-16">
        <div className="section-shell w-full min-w-0 max-w-xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h1 className="mb-3 text-3xl font-semibold text-foreground">Your cart feels a little empty</h1>
          <p className="mb-8 text-muted-foreground">Add a few jars of your favorite pickles and we’ll get your order ready in no time.</p>
          <Button asChild variant="spice" size="lg" className="min-h-12 w-full sm:w-auto">
            <Link to="/products">
              Continue shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-3 py-6 sm:px-4 sm:py-10">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Shopping bag</p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Your curated order</h1>
          <p className="text-muted-foreground">Great taste, secure delivery, and premium packaging.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="space-y-4">
            {state.items.map((item) => (
              <Card key={item.id} className="min-w-0 overflow-hidden border-border/70 bg-white/85 shadow-card">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <img src={item.image} alt={item.name} className="h-24 w-full rounded-2xl object-cover sm:h-24 sm:w-24" />

                    <div className="flex-1 space-y-2">
                      <div className="flex min-w-0 items-start justify-between gap-3">
                        <div>
                          <h3 className="break-words text-lg font-semibold text-foreground">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                        <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">₹{item.price}</div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Sparkles className="h-4 w-4 text-accent" />
                        {item.weight} • {item.shelfLife}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                      <div className="flex items-center rounded-full border border-border bg-background p-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-foreground">₹{item.price * item.quantity}</p>
                        <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)} className="text-destructive hover:text-destructive">
                          <Trash2 className="mr-1 h-4 w-4" /> Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <Card className="border-border/70 bg-white/90 shadow-card">
              <CardContent className="p-6">
                <h2 className="mb-5 text-xl font-semibold text-foreground">Order summary</h2>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Subtotal ({state.itemCount} items)</span>
                    <span className="font-medium text-foreground">₹{state.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-medium text-emerald-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated tax</span>
                    <span className="font-medium text-foreground">₹{Math.round(state.total * 0.05)}</span>
                  </div>
                </div>
                <Separator className="my-5" />
                <div className="flex items-center justify-between text-lg font-semibold text-foreground">
                  <span>Total</span>
                  <span>₹{state.total + Math.round(state.total * 0.05)}</span>
                </div>
                <div className="mt-6 space-y-3">
                  <Button asChild variant="spice" size="lg" className="w-full">
                    <Link to="/checkout" onClick={trackCheckout}>
                      Proceed to checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full">
                    <Link to="/products">Continue shopping</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-card">
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-foreground">Why shoppers love us</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-3"><Truck className="h-4 w-4 text-primary" /> Fast delivery across India</div>
                  <div className="flex items-center gap-3"><Shield className="h-4 w-4 text-primary" /> Secure and sealed packaging</div>
                  <div className="flex items-center gap-3"><Sparkles className="h-4 w-4 text-primary" /> Freshly prepared with authentic spice blends</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
