import { useEffect, useMemo, useState } from 'react';
import { apiRequest } from '@/lib/api';
import type { Product } from '@/contexts/CartContext';
import type { BlogPost } from '@/data/blogData';

export type StoreSettings = { storeName:string; supportEmail:string; supportPhone:string; announcement:string; heroTitle:string; heroDescription:string; seoTitle:string; seoDescription:string; seoKeywords:string[]; pageSeo?:Record<string,{title:string;description:string}>; termsContent:string; privacyContent:string; refundContent:string; shippingContent:string; acceptedPayments:string[]; freeShippingThreshold:number };
export type StoreBanner = { _id:string; title:string; description?:string; image:string; mobileImage?:string; link?:string; displayLocation:string };
export type StoreReview = { _id:string; name:string; rating:number; comment:string; product:string; createdAt:string };

function useRemote<T>(path:string, key:string, fallback:T) {
  const [data,setData]=useState<T>(fallback); const [loading,setLoading]=useState(true);
  useEffect(()=>{let active=true;apiRequest<any>(path).then(body=>{if(active&&body[key]!=null)setData(body[key])}).catch(()=>{}).finally(()=>active&&setLoading(false));return()=>{active=false}},[path,key]);
  return {data,loading};
}

const mapProduct=(raw:any):Product=>{const variant=raw.variants?.find((item:any)=>item.isActive!==false)||raw.variants?.[0]||{};return{id:String(raw._id),slug:raw.slug,name:raw.title||raw.name,price:Number(variant.price||0),image:raw.images?.[0]||'/placeholder.svg',images:raw.images||[],description:raw.shortDescription||raw.description,category:raw.category?.name||raw.productType||'Aachar',subCategory:raw.subCategory?.name,weight:variant.size||`${raw.shipping?.weightKg||''} kg`,ingredients:raw.ingredients||[],shelfLife:raw.shipping?.shelfLife||'See label',inStock:Number(variant.inventory||0)>0,sku:variant.sku,seoTitle:raw.seoTitle||raw.searchEngine?.title,seoDescription:raw.seoDescription||raw.searchEngine?.description,seoKeywords:raw.seoKeywords||raw.searchEngine?.keywords||[]}};
const mapPost=(raw:any):BlogPost=>({id:String(raw.slug||raw._id),title:raw.title,excerpt:raw.excerpt,content:raw.content,author:raw.author,date:raw.publishedAt||raw.createdAt,readTime:`${Math.max(3,Math.ceil(String(raw.content||'').split(/\s+/).length/200))} min read`,category:raw.category,image:raw.coverImage||'/brand/achari-tiwari-logo.png',likes:0,tags:raw.tags||[],seoTitle:raw.seoTitle,seoDescription:raw.seoDescription});

export function useProducts(fallback:Product[]=[]){const remote=useRemote<any[]>('/products?status=active','products',[]);const products=useMemo(()=>remote.data.length?remote.data.map(mapProduct):fallback,[remote.data,fallback]);return{products,loading:remote.loading};}
export function useBlogs(fallback:BlogPost[]=[]){const remote=useRemote<any[]>('/blog','posts',[]);const posts=useMemo(()=>remote.data.length?remote.data.map(mapPost):fallback,[remote.data,fallback]);return{posts,loading:remote.loading};}
export const useBanners=()=>{const remote=useRemote<StoreBanner[]>('/store/banners','banners',[]);return{banners:remote.data,loading:remote.loading};};
export const useReviews=(fallback:StoreReview[]=[] )=>{const remote=useRemote<StoreReview[]>('/store/reviews','reviews',[]);return{reviews:remote.data.length?remote.data:fallback,loading:remote.loading};};
export const useStoreSettings=()=>useRemote<StoreSettings|null>('/store/settings','settings',null);
export function useProductReviews(productId?:string){const [reviews,setReviews]=useState<any[]>([]);const [rating,setRating]=useState(0);const load=()=>productId?apiRequest<any>(`/products/${productId}/reviews`).then(body=>{setReviews(body.reviews||[]);setRating(Number(body.rating||0))}).catch(()=>{}):Promise.resolve();useEffect(()=>{void load()},[productId]);return{reviews,rating,refresh:load};}
