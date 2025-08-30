import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Ancient Art of Pickle Making: A Journey Through Indian Traditions',
    excerpt: 'Discover the rich history and traditional methods of making authentic Indian pickles that have been passed down through generations.',
    content: 'Full blog content here...',
    author: 'Priya Sharma',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Traditional Recipes',
    image: '/api/placeholder/600/400'
  },
  {
    id: '2',
    title: 'Health Benefits of Fermented Foods: Why Pickles Are Good for You',
    excerpt: 'Learn about the amazing health benefits of fermented foods and how traditional Indian pickles can boost your gut health.',
    content: 'Full blog content here...',
    author: 'Dr. Amit Gupta',
    date: '2024-01-12',
    readTime: '7 min read',
    category: 'Health & Nutrition',
    image: '/api/placeholder/600/400'
  },
  {
    id: '3',
    title: '10 Creative Ways to Use Aachar in Modern Cooking',
    excerpt: 'Explore innovative ways to incorporate traditional pickles into contemporary dishes and fusion cuisine.',
    content: 'Full blog content here...',
    author: 'Chef Rakesh Kumar',
    date: '2024-01-10',
    readTime: '6 min read',
    category: 'Cooking Tips',
    image: '/api/placeholder/600/400'
  },
  {
    id: '4',
    title: 'Seasonal Pickles: Making the Most of Fresh Produce',
    excerpt: 'A guide to creating delicious seasonal pickles using fresh, locally sourced ingredients throughout the year.',
    content: 'Full blog content here...',
    author: 'Meera Patel',
    date: '2024-01-08',
    readTime: '4 min read',
    category: 'Seasonal Cooking',
    image: '/api/placeholder/600/400'
  },
  {
    id: '5',
    title: 'The Science Behind Pickling: Understanding Fermentation',
    excerpt: 'Dive deep into the scientific processes that make pickling possible and how to achieve perfect results every time.',
    content: 'Full blog content here...',
    author: 'Dr. Anjali Singh',
    date: '2024-01-05',
    readTime: '8 min read',
    category: 'Food Science',
    image: '/api/placeholder/600/400'
  },
  {
    id: '6',
    title: 'Regional Pickle Varieties: A Tour Across India',
    excerpt: 'Explore the diverse world of Indian pickles, from Gujarati sweet pickles to Bengali fish pickles.',
    content: 'Full blog content here...',
    author: 'Ravi Krishnan',
    date: '2024-01-03',
    readTime: '6 min read',
    category: 'Regional Cuisine',
    image: '/api/placeholder/600/400'
  }
];

const categories = Array.from(new Set(blogPosts.map(post => post.category)));

const BlogPage = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Aachar <span className="bg-gradient-spice bg-clip-text text-transparent">Chronicles</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the stories, traditions, and secrets behind India's most beloved pickles. 
            From ancient recipes to modern innovations, explore the world of aachar with us.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" className="cursor-pointer">All Posts</Badge>
            {categories.map((category) => (
              <Badge key={category} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <Badge className="mb-4">{blogPosts[0].category}</Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                
                <div className="flex items-center text-sm text-muted-foreground mb-6">
                  <div className="flex items-center mr-6">
                    <User className="h-4 w-4 mr-1" />
                    <span>{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center mr-6">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                </div>

                <Button variant="spice" asChild>
                  <Link to={`/blog/${blogPosts[0].id}`}>
                    Read Full Article
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="group product-card overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                />
              </div>
              
              <CardHeader className="pb-4">
                <Badge variant="outline" className="w-fit mb-2">{post.category}</Badge>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-smooth line-clamp-2">
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <div className="flex items-center mr-4">
                    <User className="h-3 w-3 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center mr-4">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/blog/${post.id}`}>
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card className="bg-gradient-warm p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Stay Updated with Aachar Chronicles
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get the latest recipes, tips, and stories about traditional Indian pickles delivered to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
              />
              <Button variant="spice">Subscribe</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;