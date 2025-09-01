import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Truck, Award, Shield, Star, Users, Clock, Heart, CheckCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { featuredProducts } from '@/data/products';
import spiceMarketHero from '@/assets/spice-market-hero.jpg';

const Homepage = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "The mango pickle reminds me of my grandmother's recipe. Absolutely authentic and delicious!",
      avatar: "PS"
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi", 
      rating: 5,
      text: "Best quality pickles I've ever bought online. Fresh, spicy, and perfectly balanced flavors.",
      avatar: "RK"
    },
    {
      name: "Anita Patel",
      location: "Ahmedabad",
      rating: 5,
      text: "Fast delivery and excellent packaging. The garlic pickle is my new favorite!",
      avatar: "AP"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Happy Customers", icon: Users },
    { number: "10+", label: "Pickle Varieties", icon: ShoppingBag },
    { number: "4.8★", label: "Average Rating", icon: Star },
    { number: "98%", label: "Customer Satisfaction", icon: Heart }
  ];

  const benefits = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Made with finest ingredients and traditional recipes for authentic taste.",
      gradient: "bg-gradient-primary"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and secure delivery to your doorstep with proper packaging.",
      gradient: "bg-gradient-secondary"
    },
    {
      icon: Shield,
      title: "100% Natural",
      description: "No artificial preservatives or colors. Pure, natural ingredients only.",
      gradient: "bg-gradient-spice"
    },
    {
      icon: Clock,
      title: "Fresh Daily",
      description: "Made fresh daily using traditional methods and time-tested recipes.",
      gradient: "bg-gradient-primary"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={spiceMarketHero}
            alt="Spice Market"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur rounded-full px-4 py-2 mb-6 border border-primary/20">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Trusted by 50,000+ customers</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight">
              Authentic
              <span className="bg-gradient-spice bg-clip-text text-transparent block md:inline"> Aachar </span>
              & Pickles
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              Discover the rich flavors of traditional Indian pickles, made with love and authentic recipes passed down through generations. Taste the heritage in every bite.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="xl" className="bg-gradient-primary hover:opacity-90 text-white shadow-elegant hover:shadow-glow transition-all duration-300">
                <Link to="/products" className="flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Shop Now
                </Link>
              </Button>
              <Button variant="outline" size="xl" className="border-2 hover:bg-primary/5">
                <Link to="/blog" className="flex items-center">
                  Learn More
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center bg-white/80 backdrop-blur rounded-xl p-4 border border-white/20">
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-gradient-spice hover:opacity-90 text-white shadow-elegant px-8">
              <Link to="/products" className="flex items-center">
                View All Products
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose AachariTiwari?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're committed to bringing you the finest traditional Indian pickles with modern convenience and quality assurance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 ${benefit.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-elegant group-hover:shadow-glow transition-all duration-300 group-hover:scale-110`}>
                    <benefit.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              Customer Reviews
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our authentic pickles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 bg-white/80 backdrop-blur shadow-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </CardContent>
              </Card>
            ))}
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
            <Button size="xl" className="bg-white text-primary hover:bg-gray-100 shadow-elegant px-8">
              <Link to="/products" className="flex items-center">
                Start Shopping
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="border-2 border-white text-white hover:bg-white/10 px-8">
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