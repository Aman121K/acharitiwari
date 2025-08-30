import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Truck, Award, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { featuredProducts } from '@/data/products';
import spiceMarketHero from '@/assets/spice-market-hero.jpg';

const Homepage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative py-20 lg:py-32">
        <div className="absolute inset-0 z-0">
          <img
            src={spiceMarketHero}
            alt="Spice Market"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-secondary/20"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Authentic
              <span className="bg-gradient-spice bg-clip-text text-transparent"> Aachar </span>
              & Pickles
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Discover the rich flavors of traditional Indian pickles, made with love and authentic recipes passed down through generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/products">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Shop Now
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/blog">
                  Learn More
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked selection of our most popular pickles and aachar, crafted with premium ingredients and traditional methods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="spice" size="lg" asChild>
              <Link to="/products">
                View All Products
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-elegant group-hover:shadow-glow transition-smooth">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">
                Made with finest ingredients and traditional recipes for authentic taste.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-elegant group-hover:shadow-glow transition-smooth">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Quick and secure delivery to your doorstep with proper packaging.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-spice rounded-full flex items-center justify-center mx-auto mb-4 shadow-elegant group-hover:shadow-glow transition-smooth">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">100% Natural</h3>
              <p className="text-sm text-muted-foreground">
                No artificial preservatives or colors. Pure, natural ingredients only.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-elegant group-hover:shadow-glow transition-smooth">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Easy Ordering</h3>
              <p className="text-sm text-muted-foreground">
                Simple online ordering process with multiple payment options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Taste the Tradition
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made our pickles a part of their daily meals. Experience the authentic flavors today!
          </p>
          <Button variant="spice" size="xl" asChild>
            <Link to="/products">
              Start Shopping
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Homepage;