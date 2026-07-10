import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, Users, Award, Heart, Star, Factory, 
  Handshake, Shield, Truck, TrendingUp, Package,
  Clock, Leaf, Building, Phone, Mail, ArrowRight 
} from 'lucide-react';
import spiceMarketHero from '@/assets/spice-market-hero.jpg';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const metrics = [
    { value: "₹25,00,000+", label: "Revenue Target", icon: TrendingUp },
    { value: "2,000+", label: "Customers Served", icon: Users },
    { value: "200+", label: "Pin Codes Served", icon: MapPin },
    { value: "17+", label: "Pickle Varieties", icon: Package }
  ];

  const achievements = [
    { value: "₹15,00,000+", label: "Investment in Infrastructure" },
    { value: "30+", label: "Local Jobs Created" },
    { value: "₹50,00,000+", label: "Purchases from Local Farmers" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={spiceMarketHero}
            alt="AachariTiwari Story - From Bihar to Your Home"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur">
              Our Story
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              A Friendship That Created Magic
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
              From the heart of Gopalganj, Purwanchal Bihar to the vibrant fields of Punjab - 
              our story is one of friendship, tradition, and the beautiful fusion of two India's greatest food cultures.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Founder Story */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Meet the Cross-Cultural Partners Behind AachariTiwari
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A beautiful friendship between Gopalganj, Purwanchal Bihar and Punjab that created India's most 
              unique pickle fusion. Where traditional Bihari recipes meet Punjabi culinary techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border border-primary/20">
                <h3 className="text-2xl font-bold text-foreground mb-4">दो दोस्त, दो संस्कृति, एक स्वाद</h3>
                <p className="text-muted-foreground leading-relaxed">
                  He grew up in Gopalganj, Purwanchal Bihar, learning traditional pickle-making from his grandmother. 
                  She brought the rich culinary heritage of Punjab with its unique spicing techniques and flavors. 
                  When they decided to start a business together, their kitchen became a beautiful fusion laboratory.
                </p>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                What started as experimenting with family recipes became something extraordinary. His Bihar's 
                mustard oil techniques combined with her Punjab's spice layering created flavors that friends 
                and family couldn't stop talking about. The Purwanchal authenticity enhanced by Punjabi perfection.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Today, our kitchen facility in Gopalganj employs 30+ local women who bring generations of 
                pickle-making wisdom, while incorporating the cross-cultural innovations that make our products 
                truly unique. Each jar tells the story of two regions, united by love.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Customer Testimonial</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "As a fellow Bihari living in Mumbai, AachariTiwari brings back memories of my mother's 
                  kitchen. The kaddu ka aachar tastes exactly like home!"
                </p>
                <p className="text-sm text-primary mt-2 font-medium">- Sunita Devi, Mumbai</p>
              </Card>

              <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Quality Promise</h4>
                    <p className="text-sm text-muted-foreground">FSSAI Certified</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Every jar is crafted with the finest ingredients sourced directly from Bihar's local farmers, 
                  ensuring authenticity and supporting our community.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-16 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 rounded-2xl mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Journey in Numbers
            </h2>
            <p className="text-lg text-muted-foreground">
              From a small family kitchen to serving customers across India
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-md bg-white/80 backdrop-blur">
                <metric.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-foreground mb-1">{metric.value}</h3>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Infrastructure & Investment */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              From Investment to Impact: Building for the Future
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We've invested heavily in infrastructure and community development to ensure 
              sustainable growth and authentic quality for generations to come.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Factory className="h-6 w-6 text-primary mr-3" />
                Our Kitchen Facility - Where Magic Happens
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Unable to find a local facility that met our standards, we built it from scratch, 
                  nestled amid green farms of Bihar. Close to our team's homes, the facility has 
                  tripled our production capacity.
                </p>
                <p>
                  With leveled land and a spacious facility, it's a big upgrade from traditional 
                  backyard operations. Now, we're gearing up to meet international food processing 
                  standards, ensuring the best for our pickle lovers!
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Truck className="h-6 w-6 text-primary mr-3" />
                Reaching Customers: Strategic Distribution
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Previously shipping all orders from Bihar, we've now strategically positioned our 
                  distribution network across key Indian cities. This regional approach minimizes 
                  costs and delivers faster to our customers.
                </p>
                <p>
                  Our team operates efficiently from Bihar while partnering with trusted logistics 
                  providers for nationwide reach. With this network, we now fulfill thousands of 
                  monthly orders across India.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center p-6 border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <h4 className="text-2xl font-bold text-primary mb-2">{achievement.value}</h4>
                <p className="text-sm text-muted-foreground">{achievement.label}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Product Quality & Innovation */}
        <section className="py-16 bg-gray-50 rounded-2xl mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Fresh, Flavorful, Forever: Our Quality Promise
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                <Leaf className="h-5 w-5 text-green-600 mr-2" />
                Farm-to-Jar Freshness
              </h3>
              <p className="text-muted-foreground mb-6">
                We got closer to Bihar's farmers, handpicking the best ingredients for our pickles. 
                Taste upgraded! Plus, we worked on making them last longer—now, our pickles stay 
                delicious for over 18 months on your shelf.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Direct farmer partnerships in Bihar</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Traditional sun-drying methods</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">No artificial preservatives</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Extended shelf life up to 24 months</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                <Package className="h-5 w-5 text-primary mr-2" />
                Product Innovation
              </h3>
              <p className="text-muted-foreground mb-6">
                We continuously innovate while preserving traditional flavors. From classic mango 
                aachar to unique Bihar specialties like kaddu ka aachar, each product tells a story 
                of our heritage.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-foreground mb-2">17+ Varieties</h4>
                  <p className="text-xs text-muted-foreground">From traditional to unique Bihar specialties</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-foreground mb-2">Glass & Plastic</h4>
                  <p className="text-xs text-muted-foreground">Multiple packaging options available</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-foreground mb-2">Sample Packs</h4>
                  <p className="text-xs text-muted-foreground">Try before you buy options</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-foreground mb-2">Custom Orders</h4>
                  <p className="text-xs text-muted-foreground">Bulk orders for events & gifts</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Impact */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              From Hardship to Hope: Our Mission for Local Prosperity
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                When economic challenges hit, many lost jobs. People coming back to Bihar had no work. 
                AachariTiwari stepped in, offering jobs and hope in tough times.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We pay fairly and support hiring multiple members from the same family. As a result, 
                household incomes increase significantly. Families can then invest in children's education 
                and improve their quality of life.
              </p>
              <p className="text-lg text-foreground font-medium">
                It's more than just selling pickles for us; it's about making our community stronger.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-foreground">Community Impact</h4>
                  <Handshake className="h-6 w-6 text-green-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Local Jobs Created</span>
                    <span className="font-bold text-foreground">30+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Families Supported</span>
                    <span className="font-bold text-foreground">20+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Farmer Partnerships</span>
                    <span className="font-bold text-foreground">12+</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-foreground">Economic Impact</h4>
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Salary Disbursed</span>
                    <span className="font-bold text-foreground">₹25,00,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Farmer Purchases</span>
                    <span className="font-bold text-foreground">₹50,00,000+</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact & Location */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-foreground mb-2 flex items-center">
                    <Building className="h-5 w-5 text-primary mr-2" />
                    Manufacturing Address
                  </h3>
                  <p className="text-muted-foreground">
                    VPO Maksudpur, P.O. Sasamusa<br />
                    Gopalganj, Bihar 841428
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground mb-2 flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    Store Hours
                  </h3>
                  <p className="text-muted-foreground">
                    Monday to Saturday<br />
                    10 AM to 6 PM
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">+919877031481</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">aacharitiwari@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Visit Our Facility</h2>
              <Card className="p-4 mb-6">
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57640.24913308049!2d84.11223!3d26.4687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec7f8d0000000f%3A0x0!2sGopalganj%2C%20Bihar!5e0!3m2!1sen!2sin!4v1234567890000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="AachariTiwari Manufacturing Unit - Bihar"
                  />
                </div>
              </Card>
              <p className="text-sm text-muted-foreground text-center">
                Located in the heart of Bihar, our facility is where tradition meets modern food processing. 
                Visitors welcome with prior appointment.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Taste Authentic Bihar Flavors?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of satisfied customers who have made our pickles a part of their daily meals. 
              Experience the authentic flavors and traditional recipes that have been cherished for generations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="bg-gradient-primary shadow-lg hover:shadow-xl px-8">
                  Shop Our Products
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-2 border-primary px-8">
                  Contact Us
                  <Phone className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;