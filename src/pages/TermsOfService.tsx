import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: January 2024</p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using AachariTiwari, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please 
                do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Products and Services</h2>
              <p className="text-muted-foreground mb-4">
                AachariTiwari provides authentic Indian pickles and related products. We strive to 
                provide accurate product descriptions and pricing information.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>All products are subject to availability</li>
                <li>We reserve the right to modify or discontinue products</li>
                <li>Prices are subject to change without notice</li>
                <li>Product images are for illustration purposes only</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Ordering and Payment</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Orders are subject to acceptance and availability</li>
                <li>Payment must be made at the time of ordering</li>
                <li>We accept major credit cards and digital payment methods</li>
                <li>All prices include applicable taxes</li>
                <li>We reserve the right to cancel orders for any reason</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Shipping and Delivery</h2>
              <p className="text-muted-foreground mb-4">
                We ship throughout India. Delivery times may vary based on location and product availability.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Standard delivery: 3-7 business days</li>
                <li>Express delivery: 1-3 business days (where available)</li>
                <li>Free shipping on orders above ₹500</li>
                <li>Risk of loss passes to customer upon delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Returns and Refunds</h2>
              <p className="text-muted-foreground mb-4">
                We want you to be completely satisfied with your purchase. Please refer to our 
                Return Policy for detailed information about returns and refunds.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">User Conduct</h2>
              <p className="text-muted-foreground mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Use the service for any unlawful purpose</li>
                <li>Interfere with or disrupt the service</li>
                <li>Post false or misleading information</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                AachariTiwari shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages resulting from your use of our service or products.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p>Email: legal@aacharitiwari.com</p>
                <p>Phone: +91 98765 43210</p>
                <p>Address: Saket, New Delhi</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;