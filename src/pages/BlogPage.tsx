import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Heart, Search, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BlogGridSkeleton, LoadError } from '@/components/StorefrontStates';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlogs } from '@/hooks/useStoreData';
import { safeSearchTerm, trackEvent } from '@/lib/analytics';

const BlogPage = () => {
  const { posts: blogPosts, loading, error, refetch } = useBlogs();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [likedPosts, setLikedPosts] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem('likedPosts') || '[]'); } catch { return []; } });
  const trackedListKey = useRef('');
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const categories = useMemo(() => Array.from(new Set(blogPosts.map((post) => post.category))), [blogPosts]);
  const filteredPosts = useMemo(() => blogPosts.filter((post) => {
    const query=searchQuery.trim().toLowerCase();
    const matchesSearch=!query||post.title.toLowerCase().includes(query)||post.excerpt.toLowerCase().includes(query)||post.tags?.some((tag)=>tag.toLowerCase().includes(query));
    return matchesSearch&&(selectedCategory==='All Posts'||post.category===selectedCategory);
  }),[blogPosts,searchQuery,selectedCategory]);

  useEffect(() => {
    if (loading || !filteredPosts.length) return;
    const key = `${selectedCategory}|${safeSearchTerm(searchQuery)}|${filteredPosts.map((post) => post.id).join(',')}`;
    if (trackedListKey.current === key) return;
    const timer = window.setTimeout(() => {
      trackedListKey.current = key;
      void trackEvent('view_article_list', {
        article_category: selectedCategory,
        article_count: filteredPosts.length,
      });
      if (searchQuery.trim()) void trackEvent('search', { search_term: safeSearchTerm(searchQuery), content_type: 'article' });
    }, 500);
    return () => window.clearTimeout(timer);
  }, [filteredPosts, loading, searchQuery, selectedCategory]);

  const handleLike = (postId:string) => {
    const updated=likedPosts.includes(postId)?likedPosts.filter((id)=>id!==postId):[...likedPosts,postId];
    setLikedPosts(updated);localStorage.setItem('likedPosts',JSON.stringify(updated));
    void trackEvent('article_favorite', { item_id: postId, action: likedPosts.includes(postId) ? 'remove' : 'add' });
  };

  const articleCard=(post:typeof blogPosts[number])=><Card key={post.id} className="group product-card overflow-hidden">
    <div className="aspect-video overflow-hidden"><img src={post.image} alt={post.title} className="h-full w-full object-cover transition-smooth group-hover:scale-105" /></div>
    <CardHeader className="pb-4"><Badge variant="outline" className="mb-2 w-fit">{post.category}</Badge><h3 className="line-clamp-2 text-lg font-semibold transition-smooth group-hover:text-primary">{post.title}</h3></CardHeader>
    <CardContent className="pt-0"><p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p><div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground"><span className="flex items-center"><User className="mr-1 h-3 w-3"/>{post.author}</span><span className="flex items-center"><Calendar className="mr-1 h-3 w-3"/>{new Date(post.date).toLocaleDateString('en-IN')}</span><span className="flex items-center"><Clock className="mr-1 h-3 w-3"/>{post.readTime}</span></div><div className="flex items-center gap-2"><Button variant="outline" className="min-h-11 flex-1" asChild><Link to={`/blog/${post.id}`}>Read more<ArrowRight className="ml-2 h-4 w-4"/></Link></Button><Button aria-label={likedPosts.includes(post.id)?'Unlike article':'Like article'} variant="outline" className="min-h-11" onClick={()=>handleLike(post.id)}><Heart className={`h-4 w-4 ${likedPosts.includes(post.id)?'fill-accent text-accent':''}`}/></Button></div></CardContent>
  </Card>;

  return <main className="min-h-screen py-8 sm:py-12"><div className="container mx-auto px-4">
    <header className="mx-auto mb-12 max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[.22em] text-accent">Stories from the pantry</p><h1 className="mt-3 text-4xl font-bold md:text-5xl">Aachar <span className="text-primary">Chronicles</span></h1><p className="mt-4 text-lg leading-7 text-muted-foreground">Discover the stories, traditions and recipes behind India's most loved pickles.</p></header>

    <section aria-label="Article filters" className="mb-8 border-y border-border/70 py-5"><div className="grid gap-5 lg:grid-cols-[minmax(240px,390px)_1fr] lg:items-end"><label className="relative"><span className="sr-only">Search articles</span><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/><Input value={searchQuery} onChange={(event)=>setSearchQuery(event.target.value)} placeholder="Search stories, recipes and traditions…" className="min-h-12 bg-white pl-10 text-base"/></label><div><p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Categories</p><div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">{loading?Array.from({length:4}).map((_,index)=><Skeleton key={index} className="h-10 w-28 shrink-0"/>):['All Posts',...categories].map((category)=><button key={category} onClick={()=>setSelectedCategory(category)} className={`min-h-11 shrink-0 border px-4 text-sm font-semibold ${selectedCategory===category?'border-primary bg-primary text-white':'border-border bg-white hover:border-primary'}`}>{category}</button>)}</div></div></div></section>

    {loading ? <><div className="mb-12 grid overflow-hidden border border-border/60 bg-white/70 lg:grid-cols-2"><Skeleton className="aspect-video rounded-none lg:aspect-auto"/><div className="p-8"><Skeleton className="h-5 w-24"/><Skeleton className="mt-5 h-9 w-full"/><Skeleton className="mt-3 h-9 w-4/5"/><Skeleton className="mt-6 h-4 w-full"/><Skeleton className="mt-2 h-4 w-3/4"/><Skeleton className="mt-7 h-11 w-40 rounded-none"/></div></div><BlogGridSkeleton /></> : error ? <LoadError title="The chronicles could not be loaded" message={error.message} onRetry={refetch} className="mx-auto max-w-2xl"/> : blogPosts.length===0 ? <div className="border-y py-16 text-center"><p className="text-xs font-bold uppercase tracking-[.2em] text-accent">No stories published yet</p><h2 className="mt-3 text-2xl font-bold">Fresh notes from our kitchen are coming soon.</h2><p className="mt-2 text-muted-foreground">In the meantime, explore the jars in our pantry.</p><Button asChild className="mt-6 min-h-11 rounded-none"><Link to="/products">Browse products</Link></Button></div> : <>
      {!searchQuery&&selectedCategory==='All Posts'&&<section className="mb-12 overflow-hidden border border-border bg-white shadow-card"><div className="grid lg:grid-cols-2"><div className="aspect-video lg:aspect-auto"><img src={blogPosts[0].image} alt={blogPosts[0].title} className="h-full w-full object-cover"/></div><div className="p-6 sm:p-8"><Badge className="mb-4">{blogPosts[0].category}</Badge><h2 className="text-2xl font-bold md:text-3xl">{blogPosts[0].title}</h2><p className="mt-4 leading-7 text-muted-foreground">{blogPosts[0].excerpt}</p><div className="mt-5 flex flex-wrap gap-4 text-sm text-muted-foreground"><span>{blogPosts[0].author}</span><span>{new Date(blogPosts[0].date).toLocaleDateString('en-IN')}</span><span>{blogPosts[0].readTime}</span></div><Button variant="spice" asChild className="mt-6 min-h-11"><Link to={`/blog/${blogPosts[0].id}`}>Read full article<ArrowRight className="ml-2 h-4 w-4"/></Link></Button></div></div></section>}
      {filteredPosts.length?<><p className="mb-5 text-sm text-muted-foreground"><strong className="text-foreground">{filteredPosts.length}</strong> {filteredPosts.length===1?'story':'stories'} found</p><div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">{(searchQuery||selectedCategory!=='All Posts'?filteredPosts:blogPosts.slice(1)).map(articleCard)}</div></>:<div className="border-y py-14 text-center"><h2 className="text-2xl font-bold">No stories match your search.</h2><p className="mt-2 text-muted-foreground">Try a different phrase or category.</p><button onClick={()=>{setSearchQuery('');setSelectedCategory('All Posts')}} className="mt-5 min-h-11 font-bold text-primary underline underline-offset-4">Clear filters</button></div>}
    </>}
  </div></main>;
};

export default BlogPage;
