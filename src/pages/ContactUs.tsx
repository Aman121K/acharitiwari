import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/lib/analytics';

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void trackEvent('contact_form_attempt', { form_name: 'contact' });
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact <span className="bg-gradient-spice bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-lg font-semibold">Corporate Office</h3>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <p>Saket, New Delhi</p>
                <p>India</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-lg font-semibold">Manufacturing Unit</h3>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <p>VPO Maksudpur</p>
                <p>P.O. Sasamusa</p>
                <p>Gopalganj, Bihar</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Phone className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-lg font-semibold">Phone</h3>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <p>+91 70704 14390</p>
                <p>+91 9801232419</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Mail className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-lg font-semibold">Email</h3>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <p>aacharitiwari@gmail.com</p>
                <p>aacharitiwari@gmail.com</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-lg font-semibold">Business Hours</h3>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <p>Monday - Saturday</p>
                <p>9:00 AM - 7:00 PM</p>
                <p className="text-sm">Sunday: 10:00 AM - 6:00 PM</p>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="h-5 w-5 mr-2" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this regarding?"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button type="submit" className="w-full" variant="spice">
                    Send Message
                    <Send className="h-4 w-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">How can I track my order?</h4>
                  <p className="text-sm text-muted-foreground">
                    You'll receive a tracking number via email/SMS once your order is shipped. 
                    You can also track your order from your account dashboard.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What is your return policy?</h4>
                  <p className="text-sm text-muted-foreground">
                    We offer a 7-day return policy for quality issues or damaged products. 
                    Please refer to our Return Policy page for detailed information.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Do you offer bulk orders?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, we provide special pricing for bulk orders. Please contact us directly 
                    for custom quotes and wholesale pricing.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Are your products preservative-free?</h4>
                  <p className="text-sm text-muted-foreground">
                    Most of our traditional pickles use natural preservation methods. However, 
                    some products may contain minimal preservatives for extended shelf life. 
                    Check individual product descriptions for details.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
