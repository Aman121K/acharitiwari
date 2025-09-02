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

  const stats = [
    { number: "50,000+", label: "Happy Customers", icon: Users },
    { number: "17+", label: "Pickle Varieties", icon: ShoppingBag },
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
      icon: Shield,
      title: "100% Natural",
      description: "No artificial preservatives or colors. Pure, traditional ingredients only.",
      gradient: "bg-gradient-secondary"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and secure delivery across India with proper packaging.",
      gradient: "bg-gradient-accent"
    },
    {
      icon: Clock,
      title: "Long Shelf Life",
      description: "Traditional preservation methods ensure freshness for months.",
      gradient: "bg-gradient-spice"
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
              <Button size="xl" className="bg-gradient-primary shadow-elegant hover:shadow-glow transition-all duration-300 px-8">
                <Link to="/products" className="flex items-center">
                  Shop Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" className="border-2 border-primary/30 hover:bg-primary/5 px-8">
                <Link to="/about" className="flex items-center">
                  Our Story
                  <Heart className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Updated Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-card">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
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
                    <benefit.icon className="h-10 w-10 text-white drop-shadow-sm" />
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

      {/* Enhanced Testimonials Section - Horizontal Scrollable */}
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
              Over 50,000 satisfied customers across India love our authentic pickles. Here's what they have to say about their experience.
            </p>
          </div>

          {/* Horizontal Scrollable Reviews */}
          <div className="relative">
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
          </div>

          {/* View All Reviews Button */}
          <div className="text-center mt-12">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              View All Reviews
              <ArrowRight className="h-4 w-4 ml-2" />
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