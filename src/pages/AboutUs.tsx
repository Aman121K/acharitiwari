import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users, Award, Heart } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About <span className="bg-gradient-spice bg-clip-text text-transparent">Aachar Bazaar</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Preserving the authentic taste of traditional Indian pickles for over three generations. 
            From our family kitchen to your dining table, we bring you the finest aachar made with 
            love, tradition, and the freshest ingredients.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center p-6">
            <Users className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-1">50,000+</h3>
            <p className="text-sm text-muted-foreground">Happy Customers</p>
          </Card>
          <Card className="text-center p-6">
            <Award className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-1">25+</h3>
            <p className="text-sm text-muted-foreground">Unique Varieties</p>
          </Card>
          <Card className="text-center p-6">
            <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-1">3</h3>
            <p className="text-sm text-muted-foreground">Generations</p>
          </Card>
          <Card className="text-center p-6">
            <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-1">Pan</h3>
            <p className="text-sm text-muted-foreground">India Delivery</p>
          </Card>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Aachar Bazaar began as a small family business in the heart of Bihar, where our grandmother 
                first started making traditional pickles using recipes passed down through generations. 
                What started in a humble kitchen has now grown into a beloved brand that serves authentic 
                Indian pickles across the country.
              </p>
              <p>
                Our journey is rooted in the belief that food is not just sustenance, but a way to 
                connect with our heritage and traditions. Every jar of aachar we create carries the 
                love, care, and authenticity that has been the hallmark of our family for over 75 years.
              </p>
              <p>
                From traditional mango pickles to unique regional specialties, we use only the finest 
                ingredients sourced directly from local farmers. Our time-tested recipes, combined with 
                modern hygiene standards, ensure that every bite takes you on a journey to the flavors 
                of authentic India.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-muted-foreground">
                To preserve and share the authentic taste of traditional Indian pickles while 
                supporting local farmers and maintaining the highest quality standards.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <p className="text-muted-foreground">
                To become India's most trusted brand for authentic pickles, bringing families 
                together through the shared love of traditional flavors.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Our Values</h3>
              <p className="text-muted-foreground">
                Authenticity, Quality, Tradition, and Customer Satisfaction guide everything 
                we do at Aachar Bazaar.
              </p>
            </Card>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Locations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Corporate Office */}
            <Card className="p-8">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Corporate Office</h3>
              </div>
              <div className="space-y-2 text-muted-foreground mb-6">
                <p><strong>Address:</strong> Saket, New Delhi</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Email:</strong> corporate@aacharbazaar.com</p>
                <p><strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Our corporate headquarters handle business operations, customer service, 
                and strategic planning for nationwide expansion.
              </p>
            </Card>

            {/* Manufacturing Office */}
            <Card className="p-8">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Manufacturing Unit</h3>
              </div>
              <div className="space-y-2 text-muted-foreground mb-6">
                <p><strong>Address:</strong> VPO Maksudpur, P.O. Sasamusa, Gopalganj, Bihar</p>
                <p><strong>Phone:</strong> +91 87654 32109</p>
                <p><strong>Email:</strong> production@aacharbazaar.com</p>
                <p><strong>Hours:</strong> Monday - Saturday, 6:00 AM - 6:00 PM</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Our state-of-the-art manufacturing facility where traditional recipes meet 
                modern food safety standards to create authentic pickles.
              </p>
            </Card>
          </div>
        </div>

        {/* Manufacturing Location Map */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Visit Our Manufacturing Unit</h2>
          <Card className="p-6">
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57640.24913308049!2d84.11223!3d26.4687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec7f8d0000000f%3A0x0!2sGopalganj%2C%20Bihar!5e0!3m2!1sen!2sin!4v1234567890000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Manufacturing Unit Location - Gopalganj, Bihar"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-muted-foreground">
                Located in the heart of Bihar, our manufacturing unit is where the magic happens. 
                Visitors are welcome during business hours with prior appointment.
              </p>
            </div>
          </Card>
        </div>

        {/* Quality & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8">
            <h3 className="text-2xl font-semibold mb-4">Quality Assurance</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>• FSSAI certified manufacturing facility</li>
              <li>• ISO 22000 food safety management</li>
              <li>• Regular third-party quality audits</li>
              <li>• Hygiene and safety protocols</li>
              <li>• Fresh ingredient sourcing</li>
              <li>• Traditional recipe preservation</li>
            </ul>
          </Card>
          <Card className="p-8">
            <h3 className="text-2xl font-semibold mb-4">Sustainability</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>• Direct farmer partnerships</li>
              <li>• Organic ingredient preference</li>
              <li>• Eco-friendly packaging</li>
              <li>• Local community support</li>
              <li>• Waste reduction initiatives</li>
              <li>• Renewable energy usage</li>
            </ul>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-warm p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Taste the Tradition
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Experience the authentic flavors that have been cherished for generations. 
            Every jar tells a story of tradition, quality, and love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/products" 
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-smooth"
            >
              Shop Our Products
            </a>
            <a 
              href="/contact" 
              className="border border-border px-6 py-3 rounded-md hover:bg-muted transition-smooth"
            >
              Contact Us
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;