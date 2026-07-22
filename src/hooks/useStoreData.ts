/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/api';
import type { Product } from '@/contexts/CartContext';
import type { BlogPost } from '@/data/blogData';

export type PageSeoSettings = {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  robots?: 'index, follow' | 'noindex, follow' | 'index, nofollow' | 'noindex, nofollow';
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
};
export type StoreSettings = { storeName:string; supportEmail:string; supportPhone:string; announcement:string; heroTitle:string; heroDescription:string; seoTitle:string; seoDescription:string; seoKeywords:string[]; pageSeo?:Record<string,PageSeoSettings>; termsContent:string; privacyContent:string; refundContent:string; shippingContent:string; acceptedPayments:string[]; freeShippingThreshold:number };
export type StoreBanner = { _id:string; title:string; description?:string; image:string; mobileImage?:string; link?:string; displayLocation:string };
export type StoreReview = { _id:string; name:string; rating:number; comment:string; product:string; createdAt:string };
export type StoreCategory = { _id:string; name:string; slug:string; description?:string; image?:string; icon?:string; productCount:number };

type RemoteState<T> = {
  data: T;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
};

async function fetchRemoteField<T>(path:string, key:string): Promise<T> {
  const body=await apiRequest<Record<string,unknown>>(path);
  if(!Object.prototype.hasOwnProperty.call(body,key)) throw new Error('The server returned an unexpected response.');
  return body[key] as T;
}

function useRemote<T>(path:string, key:string, initialData:T): RemoteState<T> {
  const query=useQuery<T,Error>({
    queryKey:['store-data',path,key],
    queryFn:()=>fetchRemoteField<T>(path,key),
  });

  return {
    data:query.data??initialData,
    loading:query.isPending,
    error:query.error,
    refetch:()=>{void query.refetch()},
  };
}

const mapProduct=(raw:any):Product=>{const variant=raw.variants?.find((item:any)=>item.isActive!==false)||raw.variants?.[0]||{};return{id:String(raw._id),slug:raw.slug,name:raw.title||raw.name,price:Number(variant.price||0),image:raw.images?.[0]||'/placeholder.svg',images:raw.images||[],description:raw.shortDescription||raw.description,category:raw.category?.name||raw.productType||'Aachar',categoryId:raw.category?._id?String(raw.category._id):undefined,categorySlug:raw.category?.slug,subCategory:raw.subCategory?.name,subCategoryId:raw.subCategory?._id?String(raw.subCategory._id):undefined,subCategorySlug:raw.subCategory?.slug,weight:variant.size||`${raw.shipping?.weightKg||''} kg`,ingredients:raw.ingredients||[],shelfLife:raw.shipping?.shelfLife||'See label',inStock:Number(variant.inventory||0)>0,sku:variant.sku,seoTitle:raw.seoTitle||raw.searchEngine?.title,seoDescription:raw.seoDescription||raw.searchEngine?.description,seoKeywords:raw.seoKeywords||raw.searchEngine?.keywords||[]}};
const mapPost=(raw:any):BlogPost=>({id:String(raw.slug||raw._id),title:raw.title,excerpt:raw.excerpt,content:raw.content,author:raw.author,date:raw.publishedAt||raw.createdAt,readTime:`${raw.readingTime||Math.max(3,Math.ceil(String(raw.content||'').split(/\s+/).length/200))} min read`,category:raw.category,image:raw.coverImage||'/brand/achari-tiwari-logo.png',likes:0,tags:raw.tags||[],seoTitle:raw.seoTitle,seoDescription:raw.seoDescription,focusKeyword:raw.focusKeyword,secondaryKeywords:raw.secondaryKeywords||[],relatedProductSlugs:raw.relatedProductSlugs||[],relatedBlogSlugs:raw.relatedBlogSlugs||[],faq:raw.faq||[],imageAlt:raw.imageAlt,imageCaption:raw.imageCaption,imageTitle:raw.imageTitle,schemaMarkup:raw.schemaMarkup});

// The optional arguments remain for backwards compatibility, but remote empty results are
// intentionally preserved. Static demo data must never replace pending or valid empty data.
export function useProducts(_fallback:Product[]=[]){const remote=useRemote<any[]>('/products?status=active','products',[]);const products=useMemo(()=>remote.data.map(mapProduct),[remote.data]);return{products,loading:remote.loading,error:remote.error,refetch:remote.refetch};}
export function useCategories(){
  const queryClient=useQueryClient();
  const query=useQuery<StoreCategory[],Error>({
    queryKey:['store-data','/products/categories','categories'],
    queryFn:async()=>{
      try{return await fetchRemoteField<StoreCategory[]>('/products/categories','categories');}
      catch{
        const products=await queryClient.fetchQuery<any[]>({queryKey:['store-data','/products?status=active','products'],queryFn:()=>fetchRemoteField<any[]>('/products?status=active','products')});
        const categories=new Map<string,StoreCategory>();
        products.forEach((product)=>{
          const category=product.category;
          if(!category?._id||!category.name||!category.slug)return;
          const id=String(category._id);
          const current=categories.get(id);
          if(current){current.productCount+=1;return;}
          categories.set(id,{_id:id,name:category.name,slug:category.slug,description:category.description,image:category.image,icon:category.icon,productCount:1});
        });
        return Array.from(categories.values()).sort((a,b)=>a.name.localeCompare(b.name));
      }
    },
  });
  return{categories:query.data??[],loading:query.isPending,error:query.error,refetch:()=>{void query.refetch()}};
}
export function useBlogs(_fallback:BlogPost[]=[]){const remote=useRemote<any[]>('/blog','posts',[]);const posts=useMemo(()=>remote.data.map(mapPost),[remote.data]);return{posts,loading:remote.loading,error:remote.error,refetch:remote.refetch};}
export const useBanners=()=>{const remote=useRemote<StoreBanner[]>('/store/banners','banners',[]);return{banners:remote.data,loading:remote.loading,error:remote.error,refetch:remote.refetch};};
export const useReviews=(_fallback:StoreReview[]=[] )=>{const remote=useRemote<StoreReview[]>('/store/reviews','reviews',[]);return{reviews:remote.data,loading:remote.loading,error:remote.error,refetch:remote.refetch};};
export const useStoreSettings=()=>useRemote<StoreSettings|null>('/store/settings','settings',null);

export function useProductReviews(productId?:string){
  const [reviews,setReviews]=useState<any[]>([]);
  const [rating,setRating]=useState(0);
  const [loading,setLoading]=useState(Boolean(productId));
  const [error,setError]=useState<Error|null>(null);
  const [requestVersion,setRequestVersion]=useState(0);
  const refresh=useCallback(()=>setRequestVersion((version)=>version+1),[]);

  useEffect(()=>{
    let active=true;
    if(!productId){setReviews([]);setRating(0);setLoading(false);setError(null);return()=>{active=false};}
    setLoading(true);setError(null);
    apiRequest<any>(`/products/${productId}/reviews`)
      .then((body)=>{if(active){setReviews(body.reviews||[]);setRating(Number(body.rating||0));}})
      .catch((cause)=>{if(active)setError(cause instanceof Error?cause:new Error('Unable to load reviews.'));})
      .finally(()=>{if(active)setLoading(false);});
    return()=>{active=false};
  },[productId,requestVersion]);

  return{reviews,rating,loading,error,refresh};
}
