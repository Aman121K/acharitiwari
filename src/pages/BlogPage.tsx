import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User, Heart, Search } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { blogPosts, categories } from '@/data/blogData';

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [likedPosts, setLikedPosts] = useState(() => {
    const saved = localStorage.getItem('likedPosts');
    return saved ? JSON.parse(saved) : [];
  });

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All Posts' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLike = (postId) => {
    const updatedLikes = likedPosts.includes(postId)
      ? likedPosts.filter(id => id !== postId)
      : [...likedPosts, postId];
    
    setLikedPosts(updatedLikes);
    localStorage.setItem('likedPosts', JSON.stringify(updatedLikes));
  };

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

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={selectedCategory === 'All Posts' ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => setSelectedCategory('All Posts')}
              >
                All Posts
              </Badge>
              {categories.map((category) => (
                <Badge 
                  key={category} 
                  variant={selectedCategory === category ? "default" : "outline"} 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-muted-foreground">
              Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} 
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
        )}

        {/* Featured Post */}
        {!searchQuery && (
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

                  <div className="flex items-center gap-4">
                    <Button variant="spice" asChild>
                      <Link to={`/blog/${blogPosts[0].id}`}>
                        Read Full Article
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLike(blogPosts[0].id)}
                      className="flex items-center gap-2"
                    >
                      <Heart className={`h-4 w-4 ${likedPosts.includes(blogPosts[0].id) ? 'fill-red-500 text-red-500' : ''}`} />
                      {blogPosts[0].likes + (likedPosts.includes(blogPosts[0].id) ? 1 : 0)}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(searchQuery ? filteredPosts : blogPosts.slice(1)).map((post) => (
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

                <div className="flex items-center gap-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to={`/blog/${post.id}`}>
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1"
                  >
                    <Heart className={`h-3 w-3 ${likedPosts.includes(post.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                  </Button>
                </div>
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