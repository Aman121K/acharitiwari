import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Truck, Award, Shield, Star, Users, Clock, Heart, CheckCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { useBanners, useProducts, useReviews, useStoreSettings } from '@/hooks/useStoreData';
import spiceMarketHero from '@/assets/spice-market-hero.jpg';
import { LoadError, ProductGridSkeleton } from '@/components/StorefrontStates';
import { Skeleton } from '@/components/ui/skeleton';
import { analyticsItem, trackEvent } from '@/lib/analytics';

const Homepage = () => {
  const fallbackTestimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      rating: 5,
      text: "The mango pickle reminds me of my grandmother's recipe. Absolutely authentic and delicious! The texture and spice level are perfect.",
      avatar: "PS",
      product: "Traditional Mango Aachar",
      verified: true
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi, NCR", 
      rating: 5,
      text: "Best quality pickles I've ever bought online. Fresh, spicy, and perfectly balanced flavors. The garlic pickle is outstanding!",
      avatar: "RK",
      product: "Garlic Pickle Delight",
      verified: true
    },
    {
      name: "Anita Patel",
      location: "Ahmedabad, Gujarat",
      rating: 5,
      text: "Fast delivery and excellent packaging. The garlic pickle is my new favorite! Quality is consistently amazing.",
      avatar: "AP",
      product: "Premium Red Chili Aachar",
      verified: true
    },
    {
      name: "Vikram Singh",
      location: "Jaipur, Rajasthan",
      rating: 5,
      text: "Being from Rajasthan, I'm very particular about spice levels. This red chili aachar is perfect - authentic taste with the right amount of heat!",
      avatar: "VS",
      product: "Premium Red Chili Aachar",
      verified: true
    },
    {
      name: "Sunita Devi",
      location: "Patna, Bihar",
      rating: 5,
      text: "As a fellow Bihari, I can confirm this is the real deal! The kaddu ka aachar tastes exactly like my mother used to make. Excellent quality!",
      avatar: "SD",
      product: "Kaddu Ka Aachar",
      verified: true
    },
    {
      name: "Mohammad Rashid",
      location: "Lucknow, UP",
      rating: 5,
      text: "The amla pickle is fantastic! Perfect for boosting immunity during winters. My whole family loves it. Great job AachariTiwari!",
      avatar: "MR",
      product: "Amla Aachar",
      verified: true
    },
    {
      name: "Deepika Menon",
      location: "Kochi, Kerala",
      rating: 4,
      text: "Amazing variety of pickles! The lime pickle has the perfect tangy flavor. Delivery to Kerala was quick and packaging was excellent.",
      avatar: "DM",
      product: "Fresh Lime Pickle",
      verified: true
    },
    {
      name: "Arjun Reddy",
      location: "Hyderabad, Telangana",
      rating: 5,
      text: "The mixed vegetable aachar is incredible! So many different vegetables with perfect spicing. Reminds me of my grandmother's cooking.",
      avatar: "AR",
      product: "Mixed Vegetable Aachar",
      verified: true
    },
    {
      name: "Kavita Joshi",
      location: "Pune, Maharashtra",
      rating: 5,
      text: "I ordered 5 different varieties and loved them all! The ginger pickle is especially good for digestion. Premium quality at reasonable prices.",
      avatar: "KJ",
      product: "Spicy Ginger Pickle",
      verified: true
    },
    {
      name: "Ravi Gupta",
      location: "Kanpur, UP",
      rating: 5,
      text: "The til gud aam aachar is a masterpiece! Sweet, spicy, and aromatic - perfect for festivals. Worth every rupee!",
      avatar: "RG",
      product: "Til Gud Aam Aachar",
      verified: true
    },
    {
      name: "Meera Agarwal",
      location: "Indore, MP",
      rating: 4,
      text: "Love the authentic taste! The instant tadka aachar is perfect for quick meals. Great innovation while keeping traditional flavors.",
      avatar: "MA",
      product: "Instant Tadka Aachar",
      verified: true
    },
    {
      name: "Santosh Yadav",
      location: "Ranchi, Jharkhand",
      rating: 5,
      text: "Being from a neighboring state to Bihar, I appreciate authentic flavors. This is the real deal! My family orders regularly now.",
      avatar: "SY",
      product: "Khatta Meetha Aam",
      verified: true
    }
  ];

  const { products: featuredProducts, loading: productsLoading, error: productsError, refetch: refetchProducts } = useProducts();
  const { banners } = useBanners();
  const { data: settings, loading: settingsLoading } = useStoreSettings();
  const { reviews: apiReviews, loading: reviewsLoading, error: reviewsError, refetch: refetchReviews } = useReviews();
  const testimonials = apiReviews.map((review) => ({ name: review.name, location: 'Verified customer', rating: review.rating, text: review.comment, avatar: review.name.split(/\s+/).map((part) => part[0]).join('').slice(0,2).toUpperCase(), product: review.product, verified: true }));
  const heroBanner = banners.find((banner) => banner.displayLocation === 'home');

  useEffect(() => {
    if (heroBanner) void trackEvent('view_promotion', { promotion_id: heroBanner._id, promotion_name: heroBanner.title, creative_slot: 'homepage_hero' });
  }, [heroBanner]);

  useEffect(() => {
    if (!productsLoading && featuredProducts.length) {
      void trackEvent('view_item_list', { item_list_id: 'homepage_featured', item_list_name: 'Homepage featured products', items: featuredProducts.slice(0, 8).map((product, index) => analyticsItem(product, 1, index)) });
    }
  }, [featuredProducts, productsLoading]);

  const averageRating = apiReviews.length ? (apiReviews.reduce((sum, review) => sum + review.rating, 0) / apiReviews.length).toFixed(1) : null;
  const stats = [
    { number: 'Small-batch', label: 'Careful preparation', icon: Users },
    { number: String(featuredProducts.length), label: 'Available varieties', icon: ShoppingBag },
    { number: averageRating ? `${averageRating}★` : 'Verified', label: 'Customer reviews', icon: Star },
    { number: 'Pan-India', label: 'Delivery coverage', icon: Heart }
  ];

  const benefits = [
    {
      icon: Award,
      step: "01",
      title: "Premium Quality",
      description: "Made with finest ingredients and traditional recipes for authentic taste.",
      iconStyle: "bg-primary text-primary-foreground",
      nodeStyle: "bg-primary"
    },
    {
      icon: Shield,
      step: "02",
      title: "100% Natural",
      description: "No artificial preservatives or colors. Pure, traditional ingredients only.",
      iconStyle: "bg-secondary text-secondary-foreground",
      nodeStyle: "bg-secondary"
    },
    {
      icon: Truck,
      step: "03",
      title: "Fast Delivery",
      description: "Quick and secure delivery across India with proper packaging.",
      iconStyle: "bg-accent text-accent-foreground",
      nodeStyle: "bg-accent"
    },
    {
      icon: Clock,
      step: "04",
      title: "Long Shelf Life",
      description: "Traditional preservation methods ensure freshness for months.",
      iconStyle: "bg-red-800 text-white",
      nodeStyle: "bg-red-800"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative w-full overflow-hidden py-8 sm:py-14 lg:py-20">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBanner?.image || spiceMarketHero}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
        </div>
        
        <div className="container relative z-10 mx-auto w-full min-w-0 px-3 sm:px-4">
          <div className="mx-auto grid min-w-0 max-w-6xl items-center gap-7 sm:gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:text-left">
            <div className="mx-auto aspect-square w-full max-w-[280px] border-y border-secondary/50 py-3 sm:max-w-[390px] sm:py-5">
              <img src="/brand/achari-tiwari-logo.png" alt="Achari Tiwari — Taste of Tradition" className="h-full w-full object-contain drop-shadow-[0_20px_26px_rgba(90,43,12,0.22)]" />
            </div>
            <div className="min-w-0 text-center lg:text-left">
            {/* Trust Badge */}
            <div className="mb-5 inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-xl border border-primary/20 bg-white/90 px-3 py-2 backdrop-blur sm:mb-6 sm:rounded-full">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Traditional recipes, packed with care</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>

            {settingsLoading ? <div className="mb-7 space-y-4" aria-label="Loading store introduction" aria-busy="true"><Skeleton className="mx-auto h-14 w-full max-w-2xl lg:mx-0"/><Skeleton className="mx-auto h-14 w-4/5 max-w-xl lg:mx-0"/><Skeleton className="mx-auto h-6 w-full max-w-2xl lg:mx-0"/><Skeleton className="mx-auto h-6 w-3/4 max-w-xl lg:mx-0"/></div> : <><h1 className="mb-5 text-[clamp(2.1rem,11vw,3rem)] font-bold leading-[1.02] text-foreground sm:mb-6 md:text-7xl">{settings?.heroTitle || 'Ghar ka swaad, har bite mein pyaar.'}</h1><p className="mx-auto mb-7 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-xl md:text-2xl">{settings?.heroDescription || 'Discover the rich flavors of traditional Indian pickles, made with love and authentic recipes passed down through generations. Taste the heritage in every bite.'}</p></>}
            
            <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button asChild size="xl" className="w-full bg-gradient-primary px-5 shadow-elegant transition-all duration-300 hover:shadow-glow sm:w-auto sm:px-8">
                <Link to="/products" onClick={() => { if (heroBanner) void trackEvent('select_promotion', { promotion_id: heroBanner._id, promotion_name: heroBanner.title, creative_slot: 'homepage_hero' }); }} className="flex items-center">
                  Shop Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="w-full border-2 border-primary/30 px-5 text-foreground hover:bg-primary/5 hover:text-primary sm:w-auto sm:px-8">
                <Link to="/about" className="flex items-center">
                  Our Story
                  <Heart className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Updated Stats */}
            <div className="grid max-w-4xl grid-cols-2 gap-px overflow-hidden border border-secondary/30 bg-secondary/30 md:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-[#fff8ed]/95 p-5">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <TrendingUp className="h-3 w-3 mr-1" />
              Best Sellers
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Featured Products
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Handpicked selection of our most popular pickles and aachar, crafted with premium ingredients and traditional methods that have been perfected over generations.
            </p>
          </div>

          <div className="mb-16">{productsLoading ? <ProductGridSkeleton count={8}/> : productsError ? <LoadError title="Featured jars could not be loaded" message={productsError.message} onRetry={refetchProducts} className="mx-auto max-w-2xl"/> : featuredProducts.length ? <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">{featuredProducts.slice(0,8).map((product)=><ProductCard key={product.id} product={product}/>)}</div> : <div className="border-y py-12 text-center"><h3 className="text-xl font-bold">Fresh batches are coming soon.</h3><p className="mt-2 text-muted-foreground">Please check back for the next pantry release.</p></div>}</div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-gradient-spice hover:opacity-90 text-white shadow-elegant px-8">
              <Link to="/products" className="flex items-center">
                View All Products
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden border-y border-border/60 bg-gradient-to-b from-background via-secondary/[0.06] to-primary/[0.04] py-12 md:py-14">
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto mb-9 max-w-3xl text-center md:mb-10">
            <Badge className="mb-4 border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
              Our quality promise
            </Badge>
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
              Why Choose AachariTiwari?
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              We're committed to bringing you the finest traditional Indian pickles with modern convenience and quality assurance.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-card/60 px-4 py-5 shadow-[0_18px_50px_-36px_hsl(var(--primary))] backdrop-blur-sm sm:px-6 md:px-3 md:py-7 lg:px-6">
            <div aria-hidden="true" className="absolute bottom-12 left-[2.15rem] top-12 w-px bg-gradient-to-b from-primary via-secondary to-red-800 md:hidden" />
            <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[3.35rem] hidden h-px bg-gradient-to-r from-primary via-secondary to-red-800 md:block" />
            <div className="relative grid grid-cols-1 gap-1 md:grid-cols-4 md:gap-0">
              {benefits.map((benefit, index) => (
                <Card key={benefit.title} className="group h-full border-0 bg-transparent shadow-none">
                  <CardContent className="relative flex h-full gap-4 px-2 py-4 text-left md:flex-col md:items-center md:gap-0 md:px-3 md:py-0 md:text-center lg:px-6">
                    <div className="relative z-10 shrink-0 md:mb-5">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ring-4 ring-card transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none ${benefit.iconStyle}`}>
                        <benefit.icon aria-hidden="true" strokeWidth={2.25} className="h-6 w-6" />
                      </div>
                      <span aria-hidden="true" className={`absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-card ${benefit.nodeStyle}`} />
                    </div>
                    <div className="min-w-0 pt-0.5 md:pt-0">
                      <span className="mb-1.5 block font-mono text-[10px] font-bold tracking-[0.2em] text-muted-foreground/70 md:mb-2">
                        PROMISE {benefit.step}
                      </span>
                      <h3 className="mb-1.5 text-base font-bold text-foreground transition-colors group-hover:text-primary lg:text-lg">
                        {benefit.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground md:text-xs lg:text-sm">
                        {benefit.description}
                      </p>
                    </div>
                    {index < benefits.length - 1 && (
                      <span aria-hidden="true" className="absolute bottom-2 right-0 top-2 hidden w-px bg-border/70 md:block" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground md:mt-7 md:text-xs">
            <span className="h-px w-8 bg-primary/30" />
            From our kitchen to your table
            <span className="h-px w-8 bg-primary/30" />
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section - Horizontal Scrollable */}
      <section id="reviews" className="scroll-mt-24 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-14 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              Customer Reviews
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Read verified customer notes about our pickles, packaging and delivery experience.
            </p>
          </div>

          {/* Horizontal Scrollable Reviews */}
          <div className="relative">
            {reviewsLoading ? <div className="flex gap-6 overflow-hidden" aria-label="Loading customer reviews" aria-busy="true">{Array.from({length:3}).map((_,index)=><div key={index} className="min-w-[300px] flex-1 border bg-white/80 p-6 sm:min-w-[350px]"><div className="flex gap-3"><Skeleton className="h-12 w-12 rounded-full"/><div className="flex-1"><Skeleton className="h-5 w-32"/><Skeleton className="mt-2 h-4 w-24"/></div></div><Skeleton className="mt-5 h-4 w-24"/><Skeleton className="mt-4 h-4 w-full"/><Skeleton className="mt-2 h-4 w-5/6"/><Skeleton className="mt-5 h-6 w-32"/></div>)}</div> : reviewsError ? <LoadError title="Customer reviews could not be loaded" message={reviewsError.message} onRetry={refetchReviews} className="mx-auto max-w-2xl"/> : testimonials.length ? <>
            <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="min-w-[350px] md:min-w-[400px] flex-shrink-0 border-0 bg-white/90 backdrop-blur shadow-card hover:shadow-elegant transition-all duration-300 snap-start">
                  <CardContent className="p-6">
                    {/* Header with Avatar and Info */}
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {testimonial.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                          {testimonial.verified && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">({testimonial.rating}/5)</span>
                    </div>

                    {/* Review Text */}
                    <p className="text-muted-foreground italic leading-relaxed mb-3">
                      "{testimonial.text}"
                    </p>

                    {/* Product Badge */}
                    <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
                      {testimonial.product}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Scroll Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
                <div key={index} className="w-2 h-2 rounded-full bg-primary/20"></div>
              ))}
            </div>
            </> : <div className="border-y py-12 text-center"><h3 className="text-xl font-bold">Customer stories are coming soon.</h3><p className="mt-2 text-muted-foreground">Be the first to share your experience with our aachar.</p></div>}
          </div>

          {/* View All Reviews Button */}
          <div className="text-center mt-12">
            <Button asChild variant="outline" className="min-h-11 border-primary text-primary hover:bg-primary hover:text-white">
              <Link to="/reviews">
                View All Reviews
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary via-accent to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Taste the Tradition Today
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who have made our pickles a part of their daily meals. Experience the authentic flavors and traditional recipes that have been cherished for generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="xl" className="bg-white text-primary hover:bg-gray-100 shadow-elegant px-8">
              <Link to="/products" className="flex items-center">
                Start Shopping
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="border-2 border-white bg-transparent px-8 text-white hover:bg-white/10 hover:text-white">
              <Link to="/about" className="flex items-center">
                Our Story
                <Heart className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
