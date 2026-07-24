import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, Heart, Share2, ArrowLeft, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useBlogs } from '@/hooks/useStoreData';
import { ArticleSkeleton, LoadError } from '@/components/StorefrontStates';
import NewsletterSignup from '@/components/NewsletterSignup';
import ArticleListen from '@/components/ArticleListen';
import { trackEvent } from '@/lib/analytics';

const BlogPost = () => {
  const { posts: blogPosts, loading, error, refetch } = useBlogs();
  const { id } = useParams();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const post = blogPosts.find((candidate) => candidate.id === id);

  useEffect(() => {
    if (post) {
      setLikeCount(post.likes);
      // Check if post is liked from localStorage
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      setIsLiked(likedPosts.includes(id));
    }
  }, [id, post]);

  useEffect(() => {
    if (!post) return;
    void trackEvent('select_content', { content_type: 'article', item_id: post.id, content_category: post.category });
  }, [post]);

  const handleLike = () => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    
    if (isLiked) {
      // Unlike
      const updatedLikes = likedPosts.filter(postId => postId !== id);
      localStorage.setItem('likedPosts', JSON.stringify(updatedLikes));
      setIsLiked(false);
      setLikeCount(prev => prev - 1);
      void trackEvent('article_favorite', { item_id: post.id, action: 'remove' });
      toast({
        title: "Removed from favorites",
        description: "Post removed from your liked articles.",
      });
    } else {
      // Like
      const updatedLikes = [...likedPosts, id];
      localStorage.setItem('likedPosts', JSON.stringify(updatedLikes));
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
      void trackEvent('article_favorite', { item_id: post.id, action: 'add' });
      toast({
        title: "Added to favorites!",
        description: "Thank you for liking this article.",
      });
    }
  };

  const handleShare = async () => {
    void trackEvent('share', { method: navigator.share ? 'native' : 'clipboard', content_type: 'article', item_id: post.id });
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Article link has been copied to clipboard.",
      });
    }
  };

  if (loading) return <ArticleSkeleton />;

  if (error) return <main className="min-h-[65vh] px-4 py-16"><LoadError title="This story could not be loaded" message={error.message} onRetry={refetch} className="mx-auto max-w-xl"/></main>;

  if (!post) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post not found</h1>
          <Link to="/blog" className="text-primary hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <main className="blog-reading-page min-h-screen pb-16 pt-6 sm:pt-10">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Back Button */}
        <div className="mb-8 border-b border-border/70 pb-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            All pantry stories
          </Link>
        </div>

        {/* Article Header */}
        <header className="mx-auto mb-10 max-w-5xl text-center">
          <div className="mb-5">
            <Badge variant="outline" className="mb-5 border-secondary/60 bg-secondary/10 px-3 py-1 font-bold uppercase tracking-[0.16em] text-primary">{post.category}</Badge>
            <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            {post.excerpt && <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{post.excerpt}</p>}
          </div>

          {/* Author & Meta Info */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-9 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant={isLiked ? "default" : "outline"}
              size="sm"
              onClick={handleLike}
              className="flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={isLiked ? 'Remove article from favorites' : 'Add article to favorites'}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-white' : ''}`} />
              {likeCount}
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare} className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <ArticleListen
              articleId={post.id}
              title={post.title}
              excerpt={post.excerpt}
              content={post.content}
            />
          </div>

          {/* Featured Image */}
          <figure className="mb-10">
          <div className="aspect-[16/9] overflow-hidden rounded-sm border border-border/80 bg-[#f4eee3] p-2 shadow-elegant sm:p-3">
            <img
              src={post.image}
              alt={post.imageAlt || post.title}
              title={post.imageTitle}
              className="h-full w-full object-cover"
            />
          </div>
          {post.imageCaption && <figcaption className="mt-3 text-center text-sm italic text-muted-foreground">{post.imageCaption}</figcaption>}
          </figure>
        </header>

        {/* Article Content */}
        <article className="article-paper mx-auto mb-14 max-w-3xl">
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="article-content"
          />
        </article>

        {/* Tags */}
        <div className="mx-auto mb-8 max-w-3xl border-y border-border/70 py-6">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <div className="mb-8 flex items-center gap-4"><span className="h-px flex-1 bg-secondary/60" /><h2 className="text-2xl font-bold text-foreground sm:text-3xl">More from the pantry</h2><span className="h-px flex-1 bg-secondary/60" /></div>
            <div className={`grid grid-cols-1 gap-6 ${relatedPosts.length === 2 ? 'md:grid-cols-2' : relatedPosts.length >= 3 ? 'md:grid-cols-3' : ''}`}>
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="group relative overflow-hidden hover:shadow-lg transition-smooth">
                  <div className="aspect-[4/3] overflow-hidden bg-[#f4eee3] p-2">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2 text-xs">{relatedPost.category}</Badge>
                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-smooth">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{relatedPost.readTime}</span>
                    </div>
                    <Link to={`/blog/${relatedPost.id}`} className="absolute inset-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset" aria-label={`Read ${relatedPost.title}`} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter Signup */}
        <NewsletterSignup
          source="blog"
          variant="card"
          title="Enjoyed this story?"
          description="Join our pantry notes for new recipes, regional pickle stories and first access to every seasonal batch."
          className="mt-16"
        />
      </div>
    </main>
  );
};

export default BlogPost;
