import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, X, SortAsc } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from '@/components/ProductCard';
import { useBlogs, useProducts } from '@/hooks/useStoreData';
import { BlogGridSkeleton, LoadError, ProductGridSkeleton } from '@/components/StorefrontStates';
import { analyticsItem, safeSearchTerm, trackEvent } from '@/lib/analytics';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [activeTab, setActiveTab] = useState('all');
  const { products, loading: productsLoading, error: productsError, refetch: refetchProducts } = useProducts();
  const { posts: blogPosts, loading: blogsLoading, error: blogsError, refetch: refetchBlogs } = useBlogs();
  const loading = productsLoading || blogsLoading;
  const error = productsError || blogsError;
  const retry = () => { refetchProducts(); refetchBlogs(); };

  // Filter and search logic
  const filteredResults = useMemo(() => {
    const results = { products: [], blogs: [] };

    if (!searchQuery.trim()) {
      return results;
    }

    const query = searchQuery.toLowerCase();

    // Search products
    results.products = products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );

    // Search blog posts
    results.blogs = blogPosts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );

    // Apply category filter for products
    if (selectedCategory !== 'all') {
      results.products = results.products.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sort results
    if (sortBy === 'price-low') {
      results.products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      results.products.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      results.blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return results;
  }, [searchQuery, selectedCategory, sortBy, products, blogPosts]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      void trackEvent('search', { search_term: safeSearchTerm(searchQuery) });
      setSearchParams({ q: searchQuery });
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  const totalResults = filteredResults.products.length + filteredResults.blogs.length;

  const categories = ['all', ...new Set(products.map(p => p.category))];

  useEffect(() => {
    const submittedQuery = searchParams.get('q');
    if (loading || !submittedQuery || !filteredResults.products.length) return;
    void trackEvent('view_item_list', {
      item_list_id: 'site_search',
      item_list_name: 'Product search results',
      items: filteredResults.products.slice(0, 20).map((product, index) => analyticsItem(product, 1, index)),
    });
  }, [loading, searchParams, filteredResults.products]);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Search <span className="bg-gradient-spice bg-clip-text text-transparent">Results</span>
          </h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for products, recipes, articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button type="submit" variant="spice">
              Search
            </Button>
          </form>

          {/* Results Summary */}
          {searchQuery && !loading && !error && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {totalResults > 0 
                  ? `Found ${totalResults} results for "${searchQuery}"`
                  : `No results found for "${searchQuery}"`
                }
              </p>
              
              {totalResults > 0 && (
                <div className="flex items-center gap-4">
                  {/* Category Filter */}
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Sort By */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SortAsc className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        {searchQuery && loading && <div className="space-y-12" aria-label="Searching products and articles" aria-busy="true"><ProductGridSkeleton count={4}/><BlogGridSkeleton count={3}/></div>}

        {searchQuery && !loading && error && <LoadError title="Search is temporarily unavailable" message={error.message} onRetry={retry} className="mx-auto max-w-2xl" />}

        {searchQuery && !loading && !error && totalResults > 0 && (
          <>
            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b">
              <button
                onClick={() => setActiveTab('all')}
                className={`pb-2 px-1 border-b-2 transition-colors ${
                  activeTab === 'all' 
                    ? 'border-primary text-primary font-medium' 
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                All ({totalResults})
              </button>
              {filteredResults.products.length > 0 && (
                <button
                  onClick={() => setActiveTab('products')}
                  className={`pb-2 px-1 border-b-2 transition-colors ${
                    activeTab === 'products' 
                      ? 'border-primary text-primary font-medium' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Products ({filteredResults.products.length})
                </button>
              )}
              {filteredResults.blogs.length > 0 && (
                <button
                  onClick={() => setActiveTab('blogs')}
                  className={`pb-2 px-1 border-b-2 transition-colors ${
                    activeTab === 'blogs' 
                      ? 'border-primary text-primary font-medium' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Articles ({filteredResults.blogs.length})
                </button>
              )}
            </div>

            {/* Products Results */}
            {(activeTab === 'all' || activeTab === 'products') && filteredResults.products.length > 0 && (
              <section className="mb-12">
                {activeTab === 'all' && <h2 className="text-2xl font-bold mb-6">Products</h2>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredResults.products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Blog Results */}
            {(activeTab === 'all' || activeTab === 'blogs') && filteredResults.blogs.length > 0 && (
              <section>
                {activeTab === 'all' && <h2 className="text-2xl font-bold mb-6">Articles</h2>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResults.blogs.map(post => (
                    <Card key={post.id} className="group hover:shadow-lg transition-smooth">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                        />
                      </div>
                      <CardContent className="p-6">
                        <Badge variant="outline" className="mb-3">{post.category}</Badge>
                        <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-smooth">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{post.author}</span>
                          <span>{post.readTime}</span>
                        </div>
                        <Link to={`/blog/${post.id}`} className="absolute inset-0" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* No Results */}
        {searchQuery && !loading && !error && totalResults === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                No results found
              </h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find anything matching "{searchQuery}". Try adjusting your search or browse our categories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <Link to="/products">Browse Products</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/blog">Read Articles</Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Popular Searches */}
        {!searchQuery && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Popular Searches</h2>
            <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
              {['mango pickle', 'lime aachar', 'mixed pickle', 'garlic pickle', 'traditional recipes', 'health benefits'].map(term => (
                <Badge 
                  key={term}
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth"
                  onClick={() => {
                    setSearchQuery(term);
                    setSearchParams({ q: term });
                  }}
                >
                  {term}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
