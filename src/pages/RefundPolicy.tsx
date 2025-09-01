import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, Shield, Clock, CheckCircle } from 'lucide-react';

const RefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Refund Policy</h1>
          <p className="text-muted-foreground">Your satisfaction is our priority</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-6">
            <RefreshCw className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Easy Returns</h3>
            <p className="text-sm text-muted-foreground">7-day return window</p>
          </Card>
          <Card className="text-center p-6">
            <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Quality Guarantee</h3>
            <p className="text-sm text-muted-foreground">100% authentic products</p>
          </Card>
          <Card className="text-center p-6">
            <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Quick Processing</h3>
            <p className="text-sm text-muted-foreground">Refunds in 5-7 days</p>
          </Card>
          <Card className="text-center p-6">
            <CheckCircle className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">No Questions</h3>
            <p className="text-sm text-muted-foreground">Hassle-free process</p>
          </Card>
        </div>

        <Card>
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Return Eligibility</h2>
              <p className="text-muted-foreground mb-4">
                We accept returns for the following reasons:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Product damaged during shipping</li>
                <li>Wrong product delivered</li>
                <li>Quality issues (spoilage, contamination)</li>
                <li>Product does not match description</li>
                <li>Unsatisfactory taste (within 24 hours of delivery)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Return Timeline</h2>
              <div className="bg-muted/50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">1</div>
                    <h3 className="font-semibold mb-1">Contact Us</h3>
                    <p className="text-sm text-muted-foreground">Within 7 days of delivery</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">2</div>
                    <h3 className="font-semibold mb-1">Return Product</h3>
                    <p className="text-sm text-muted-foreground">We arrange pickup</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">3</div>
                    <h3 className="font-semibold mb-1">Refund Processed</h3>
                    <p className="text-sm text-muted-foreground">Within 5-7 business days</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Return Process</h2>
              <ol className="list-decimal list-inside text-muted-foreground space-y-3">
                <li>
                  <strong>Contact Customer Support:</strong> Email us at returns@aacharitiwari.com or call +91 98765 43210 
                  within 7 days of delivery.
                </li>
                <li>
                  <strong>Provide Order Details:</strong> Share your order number, reason for return, and photos 
                  (if applicable).
                </li>
                <li>
                  <strong>Return Authorization:</strong> We'll provide a return authorization number and 
                  pickup instructions.
                </li>
                <li>
                  <strong>Product Pickup:</strong> Our delivery partner will collect the product from your address 
                  (free of charge).
                </li>
                <li>
                  <strong>Quality Check:</strong> We'll inspect the returned product within 2 business days.
                </li>
                <li>
                  <strong>Refund Processing:</strong> Once approved, refund will be processed to your original 
                  payment method.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Refund Methods</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Payment Method</th>
                      <th className="text-left py-3 px-4">Refund Timeline</th>
                      <th className="text-left py-3 px-4">Processing Fee</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-4">Credit/Debit Card</td>
                      <td className="py-3 px-4">5-7 business days</td>
                      <td className="py-3 px-4">None</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Net Banking</td>
                      <td className="py-3 px-4">5-7 business days</td>
                      <td className="py-3 px-4">None</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">UPI/Digital Wallet</td>
                      <td className="py-3 px-4">3-5 business days</td>
                      <td className="py-3 px-4">None</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Cash on Delivery</td>
                      <td className="py-3 px-4">7-10 business days</td>
                      <td className="py-3 px-4">Bank transfer charges apply</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Non-Returnable Items</h2>
              <p className="text-muted-foreground mb-4">
                For hygiene and safety reasons, the following items cannot be returned:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Products consumed more than 50%</li>
                <li>Items returned after 7 days of delivery</li>
                <li>Products damaged due to mishandling by customer</li>
                <li>Custom or personalized products</li>
                <li>Products without original packaging</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Exchange Policy</h2>
              <p className="text-muted-foreground mb-4">
                We currently do not offer direct product exchanges. If you wish to exchange a product:
              </p>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                <li>Return the unwanted product following our return process</li>
                <li>Place a new order for the desired product</li>
                <li>Once the return is processed, the refund will be credited to your account</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Cancellation Policy</h2>
              <p className="text-muted-foreground mb-4">
                You can cancel your order before it's shipped:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Full refund if cancelled within 1 hour of placing order</li>
                <li>No cancellation allowed once the order is shipped</li>
                <li>Cancellation requests can be made through your account or by contacting support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="text-muted-foreground mb-4">
                  For any questions about returns or refunds, contact our customer support team:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><strong>Email:</strong> returns@aacharitiwari.com</p>
                    <p><strong>Phone:</strong> +91 98765 43210</p>
                  </div>
                  <div>
                    <p><strong>Hours:</strong> Monday to Saturday, 9 AM - 7 PM</p>
                    <p><strong>Response Time:</strong> Within 24 hours</p>
                  </div>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RefundPolicy;