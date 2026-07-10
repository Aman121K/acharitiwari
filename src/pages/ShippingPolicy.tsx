import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Clock, MapPin, Package } from 'lucide-react';

const ShippingPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Shipping Policy</h1>
          <p className="text-muted-foreground">Fast, secure delivery of authentic aachar to your doorstep</p>
        </div>

        <div className="grid gap-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="text-center p-6">
              <Truck className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">On orders above ₹500</p>
            </Card>
            <Card className="text-center p-6">
              <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">3-7 business days</p>
            </Card>
            <Card className="text-center p-6">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Pan India</h3>
              <p className="text-sm text-muted-foreground">We deliver everywhere</p>
            </Card>
            <Card className="text-center p-6">
              <Package className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Safe Packaging</h3>
              <p className="text-sm text-muted-foreground">Secure & hygienic</p>
            </Card>
          </div>
        </div>

        <Card>
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Shipping Methods & Timeframes</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Shipping Method</th>
                      <th className="text-left py-3 px-4">Delivery Time</th>
                      <th className="text-left py-3 px-4">Shipping Cost</th>
                      <th className="text-left py-3 px-4">Tracking</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-4">Standard Delivery</td>
                      <td className="py-3 px-4">3-7 business days</td>
                      <td className="py-3 px-4">₹50 (Free above ₹500)</td>
                      <td className="py-3 px-4">Yes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Express Delivery</td>
                      <td className="py-3 px-4">1-3 business days</td>
                      <td className="py-3 px-4">₹100</td>
                      <td className="py-3 px-4">Yes</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Same Day Delivery*</td>
                      <td className="py-3 px-4">Within 24 hours</td>
                      <td className="py-3 px-4">₹200</td>
                      <td className="py-3 px-4">Yes</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-muted-foreground mt-2">*Same day delivery available in Delhi NCR only</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Shipping Locations</h2>
              <p className="text-muted-foreground mb-4">
                We deliver to all major cities and towns across India. Some remote locations may have 
                extended delivery times.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Metro Cities (1-3 days)</h3>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Delhi NCR, Mumbai, Bangalore</li>
                    <li>• Chennai, Kolkata, Hyderabad</li>
                    <li>• Pune, Ahmedabad, Surat</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Other Cities (3-7 days)</h3>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Tier 2 & 3 cities</li>
                    <li>• Rural areas</li>
                    <li>• Remote locations</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Order Processing</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Orders placed before 12 PM are processed the same day</li>
                <li>Orders placed after 12 PM are processed the next business day</li>
                <li>We do not ship on Sundays and public holidays</li>
                <li>You will receive order confirmation and tracking details via email/SMS</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Packaging</h2>
              <p className="text-muted-foreground mb-4">
                All our products are packaged with utmost care to ensure freshness and quality:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Food-grade packaging materials</li>
                <li>Leak-proof containers for liquid products</li>
                <li>Temperature-controlled packaging when required</li>
                <li>Eco-friendly packaging materials wherever possible</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Shipping Restrictions</h2>
              <p className="text-muted-foreground mb-4">
                Due to food safety regulations, we cannot ship certain products to specific locations:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>International shipping is currently not available</li>
                <li>Some perishable items may not be available in remote areas</li>
                <li>Military and diplomatic addresses require special clearance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Delivery Issues</h2>
              <p className="text-muted-foreground mb-4">
                If you face any delivery issues, please contact us immediately:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-muted-foreground">
                  <strong>Customer Support:</strong><br />
                  Email: aacharitiwari@gmail.com<br />
                  Phone: +919877031481<br />
                  Hours: Monday to Saturday, 9 AM - 7 PM
                </p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShippingPolicy;