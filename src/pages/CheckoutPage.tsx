import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getCartSessionId, useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useStoreSettings } from '@/hooks/useStoreData';
import { apiRequest } from '@/lib/api';

const CheckoutPage = () => {
  const { state, dispatch } = useCart();
  const { toast } = useToast();
  const { user } = useAuth();
  const { data: settings } = useStoreSettings();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    paymentMethod: 'cod',
    notes: '',
    marketingAccepted: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    setError('');
  };

  useEffect(() => {
    if (user) setFormData((current) => ({ ...current, email: current.email || user.email, firstName: current.firstName || user.name.split(' ')[0] || '', lastName: current.lastName || user.name.split(' ').slice(1).join(' '), phone: current.phone || user.phone || '' }));
  }, [user]);

  useEffect(() => {
    if (!state.items.length || step >= 4) return;
    const timer = window.setTimeout(() => {
      void apiRequest('/cart', {
        method: 'PUT',
        body: JSON.stringify({
          sessionId: getCartSessionId(),
          checkoutStarted: true,
          customer: { name: `${formData.firstName} ${formData.lastName}`.trim(), email: formData.email, phone: formData.phone },
          items: state.items.map(item => ({ productId: item.id, name: item.name, price: item.price, quantity: item.quantity, image: item.image, sku: item.sku })),
        }),
      }).catch(() => undefined);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [formData.email, formData.firstName, formData.lastName, formData.phone, state.items, step]);

  const handleNext = () => {
    if (step === 1) {
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) return setError('Enter a valid email address.');
      if (!formData.firstName.trim() || !formData.lastName.trim()) return setError('Enter your full name.');
      if (!formData.address.trim() || !formData.city.trim() || !formData.state.trim()) return setError('Enter your complete delivery address.');
      if (!/^\d{6}$/.test(formData.pincode)) return setError('Enter a valid 6-digit Indian pincode.');
      if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, '').slice(-10))) return setError('Enter a valid 10-digit mobile number.');
    }
    setError('');
    setStep(step + 1);
  };

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    setError('');
    try {
      const result = await apiRequest<any>('/orders', {
        method: 'POST',
        body: JSON.stringify({
          customer: { name: `${formData.firstName} ${formData.lastName}`.trim(), email: formData.email, phone: formData.phone },
          shippingAddress: { street: formData.address, line2: formData.address2, city: formData.city, state: formData.state, zipCode: formData.pincode, country: 'India' },
          items: state.items.map((item) => ({ productId: item.id, name: item.name, price: item.price, quantity: item.quantity, image: item.image })),
          paymentMethod: formData.paymentMethod === 'upi' ? 'upi' : 'cash_on_delivery',
          notes: formData.notes,
          marketingAccepted: formData.marketingAccepted,
          cartSessionId: getCartSessionId(),
        }),
      });
      if (result.guestAccessToken) {
        const references = JSON.parse(localStorage.getItem('guestOrderReferences') || '[]');
        localStorage.setItem('guestOrderReferences', JSON.stringify([
          { orderNumber: result.order.orderNumber, token: result.guestAccessToken },
          ...references.filter((ref: { orderNumber: string }) => ref.orderNumber !== result.order.orderNumber),
        ].slice(0, 20)));
      }
      setOrderNumber(result.order.orderNumber);
      dispatch({ type: 'CLEAR_CART' });
      setStep(4);
      toast({ title: 'Order placed successfully!', description: `Order ${result.order.orderNumber} is confirmed.` });
    } catch (orderError) {
      const message = orderError instanceof Error ? orderError.message : '';
      setError(message === 'Failed to fetch' || /network|fetch/i.test(message)
        ? 'We couldn’t connect to the order service. Check your internet connection and try again.'
        : message || 'Unable to place your order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const freeShippingThreshold = settings?.freeShippingThreshold ?? 699;
  const shipping = state.total >= freeShippingThreshold ? 0 : 79;
  const total = state.total + shipping;

  if (state.items.length === 0 && step < 4) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center px-3 py-10 sm:px-4 sm:py-16">
        <div className="section-shell w-full min-w-0 max-w-md text-center">
          <h1 className="mb-3 text-2xl font-semibold text-foreground">Your cart is empty</h1>
          <p className="mb-6 text-muted-foreground">Add some premium pickles to your cart before checking out.</p>
          <Button asChild className="min-h-12 w-full sm:w-auto">
            <Link to="/products">Continue shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-3 py-5 sm:px-4 sm:py-10">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6">
          <Link to="/cart" className="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to cart
          </Link>
        </div>
        <div className="mb-5 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-foreground">{user ? <>Checking out as <strong>{user.email}</strong>. You can still use the same streamlined checkout.</> : <>Guest checkout is active. Already registered? <Link className="font-semibold text-primary underline" to="/account">Sign in</Link> to prefill your contact details.</>}</div>

        <div className="mb-6 overflow-hidden rounded-2xl border border-border/70 bg-white/80 px-2 py-3 shadow-card sm:mb-8 sm:rounded-3xl sm:p-6">
          <div className="grid grid-cols-4 gap-1 sm:flex sm:items-center sm:justify-between sm:gap-4">
            {[
              { num: 1, title: 'Delivery' },
              { num: 2, title: 'Payment' },
              { num: 3, title: 'Review' },
              { num: 4, title: 'Done' },
            ].map((stepItem) => (
              <div key={stepItem.num} className="flex min-w-0 flex-col items-center gap-1.5 sm:flex-row sm:gap-3">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold sm:h-9 sm:w-9 sm:text-sm ${step >= stepItem.num ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {step > stepItem.num ? <CheckCircle className="h-4 w-4" /> : stepItem.num}
                </div>
                <span className="truncate text-[11px] font-medium text-foreground sm:text-sm">{stepItem.title}</span>
              </div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="grid gap-8 lg:grid-cols-[1.45fr_0.8fr]">
            <Card className="min-w-0 border-border/70 bg-white/90 shadow-card">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Truck className="h-5 w-5 text-primary" /> Delivery details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0 [&_input]:min-h-12 [&_input]:text-base">
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleInputChange} placeholder="your@email.com" />
                  <label className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><input name="marketingAccepted" type="checkbox" checked={formData.marketingAccepted} onChange={handleInputChange} /> Email me offers and new product updates</label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last name" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Street address</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="House no., street, locality" />
                </div>
                <div>
                  <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
                  <Input id="address2" name="address2" value={formData.address2} onChange={handleInputChange} placeholder="Apartment, landmark or floor" />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Pincode" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="Phone number" />
                </div>
                {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                <Button onClick={handleNext} size="lg" className="w-full">
                  Continue to payment
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-card">
              <CardHeader>
                <CardTitle>Order summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex min-w-0 items-start justify-between gap-3 text-sm">
                    <span className="min-w-0 break-words">{item.name} × {item.quantity}</span>
                    <span className="shrink-0 font-medium text-foreground">₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex items-center justify-between font-semibold text-foreground">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <div className="rounded-2xl border border-primary/15 bg-white/70 p-4 text-sm text-muted-foreground">
                  <div className="mb-2 flex items-center gap-2 font-medium text-foreground"><Sparkles className="h-4 w-4 text-accent" /> Fast delivery promise</div>
                  Your order ships within 24 hours and arrives in 2–5 business days.
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-8 lg:grid-cols-[1.45fr_0.8fr]">
            <Card className="border-border/70 bg-white/90 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CreditCard className="h-5 w-5 text-primary" /> Payment method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })} className="space-y-3">
                  {(settings?.acceptedPayments?.includes('upi') ?? true) && <div className="flex items-center gap-3 rounded-2xl border border-border p-4">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-1">UPI (payment link after confirmation)</Label>
                  </div>}
                  {(settings?.acceptedPayments?.includes('cod') ?? true) && <div className="flex items-center gap-3 rounded-2xl border border-border p-4">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1">Cash on delivery</Label>
                  </div>}
                </RadioGroup>
                <div className="mt-6 space-y-3">
                  <Button onClick={handleNext} size="lg" className="w-full">Review order</Button>
                  <Button onClick={() => setStep(1)} variant="outline" size="lg" className="w-full">Back</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-white/90 shadow-card">
              <CardHeader>
                <CardTitle>Payment summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">₹{state.total}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-medium text-foreground">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-lg font-semibold text-foreground">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 3 && (
          <Card className="min-w-0 border-border/70 bg-white/90 shadow-card">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" /> Review your order
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-4 pt-0 sm:space-y-6 sm:p-6 sm:pt-0 [&_input]:min-h-12 [&_input]:text-base">
              <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
                <h3 className="mb-2 font-semibold text-foreground">Delivery address</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {formData.firstName} {formData.lastName}<br />
                  {formData.address}<br />
                  {formData.city}, {formData.state} {formData.pincode}<br />
                  {formData.phone}
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
                <h3 className="mb-2 font-semibold text-foreground">Payment method</h3>
                <p className="text-sm text-muted-foreground">{formData.paymentMethod === 'upi' ? 'UPI' : 'Cash on delivery'}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
                <h3 className="mb-2 font-semibold text-foreground">Items</h3>
                {state.items.map((item) => (
                  <div key={item.id} className="flex min-w-0 items-start justify-between gap-3 py-1 text-sm text-muted-foreground">
                    <span className="min-w-0 break-words">{item.name} × {item.quantity}</span>
                    <span className="shrink-0 font-medium text-foreground">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div>
                <Label htmlFor="notes">Order notes (optional)</Label>
                <Input id="notes" name="notes" value={formData.notes} onChange={handleInputChange} placeholder="Delivery instructions or a gift note" />
              </div>
              <Separator />
              <div className="flex items-center justify-between text-lg font-semibold text-foreground">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={handlePlaceOrder} disabled={submitting} size="lg" className="min-h-12 flex-1">{submitting ? 'Placing order…' : `Place order · ₹${total}`}</Button>
                <Button onClick={() => setStep(2)} variant="outline" size="lg" className="min-h-12 flex-1">Back</Button>
              </div>
              {error && <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"><p>{error}</p><Button type="button" variant="outline" className="mt-3 min-h-11 w-full border-red-300 bg-white" onClick={handlePlaceOrder}>Try placing order again</Button></div>}
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card className="border-border/70 bg-white/90 shadow-card">
            <CardContent className="px-6 py-12 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h2 className="mb-3 text-3xl font-semibold text-foreground">Order confirmed</h2>
              <p className="mx-auto mb-3 max-w-xl text-muted-foreground">Thank you, {formData.firstName}. Your order has been received and can be tracked from your account page.</p>
              <div className="mx-auto mb-8 inline-flex rounded-full bg-muted px-4 py-2 font-mono text-sm font-semibold text-foreground">Order {orderNumber}</div>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild>
                  <Link to="/products">Continue shopping</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/account">Track order</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
