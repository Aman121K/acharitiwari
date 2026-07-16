import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { blogPosts as fallbackPosts } from "@/data/blogData";
import { products as fallbackProducts } from "@/data/products";
import socialImage from "@/assets/spice-market-hero.jpg";
import { useBlogs, useProducts, useStoreSettings } from "@/hooks/useStoreData";

const SITE_NAME = "AachariTiwari";
const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://www.aacharitiwari.com").replace(/\/$/, "");
const DEFAULT_IMAGE = new URL(socialImage, `${SITE_URL}/`).href;

const pages: Record<string, { title: string; description: string; noindex?: boolean }> = {
  "/": {
    title: "Authentic Indian Pickles & Aachar Online | AachariTiwari",
    description: "Shop 17+ varieties of authentic Indian aachar, including mango, lime, garlic and chilli pickles, made with traditional recipes and delivered across India.",
  },
  "/products": {
    title: "Buy Indian Pickles Online | AachariTiwari",
    description: "Explore traditional Indian pickles made with quality ingredients, aromatic spices and time-honoured recipes. Order aachar online across India.",
  },
  "/blog": {
    title: "Aachar Recipes, Stories & Food Guides | AachariTiwari",
    description: "Read traditional pickle recipes, Indian food stories, preservation tips and guides to enjoying authentic homemade aachar.",
  },
  "/about": {
    title: "About AachariTiwari | Traditional Indian Aachar",
    description: "Learn how AachariTiwari preserves regional Indian pickle-making traditions through authentic recipes, quality ingredients and careful preparation.",
  },
  "/contact": {
    title: "Contact AachariTiwari",
    description: "Contact AachariTiwari for product questions, order support, delivery information or feedback about our authentic Indian pickles.",
  },
  "/privacy-policy": { title: "Privacy Policy | AachariTiwari", description: "Read the AachariTiwari privacy policy and learn how we collect, use and protect your personal information." },
  "/terms-of-service": { title: "Terms of Service | AachariTiwari", description: "Read the terms that apply when using the AachariTiwari website and purchasing our products." },
  "/shipping-policy": { title: "Shipping Policy | AachariTiwari", description: "Learn about AachariTiwari order processing, shipping coverage, delivery estimates and packaging." },
  "/refund-policy": { title: "Refund Policy | AachariTiwari", description: "Review the AachariTiwari refund and replacement policy for damaged, incorrect or quality-affected orders." },
  "/cart": { title: "Shopping Cart | AachariTiwari", description: "Review the authentic Indian pickles in your AachariTiwari shopping cart.", noindex: true },
  "/checkout": { title: "Secure Checkout | AachariTiwari", description: "Complete your AachariTiwari order securely.", noindex: true },
  "/search": { title: "Search | AachariTiwari", description: "Search AachariTiwari products and articles.", noindex: true },
  "/account": { title: "My Account | AachariTiwari", description: "Manage your AachariTiwari account and orders.", noindex: true },
};

function setMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element!.setAttribute(name, value));
}

export default function Seo() {
  const { pathname } = useLocation();
  const { data: storeSettings } = useStoreSettings();
  const { products, loading: productsLoading } = useProducts(fallbackProducts);
  const { posts: blogPosts, loading: blogsLoading } = useBlogs(fallbackPosts);

  useEffect(() => {
    const productMatch = pathname.match(/^\/product\/([^/]+)$/);
    const articleMatch = pathname.match(/^\/blog\/([^/]+)$/);
    const routeValue = productMatch?.[1] || articleMatch?.[1];
    let routeId = routeValue;
    try {
      routeId = routeValue ? decodeURIComponent(routeValue) : routeValue;
    } catch {
      // Keep the original route value when it contains malformed URI encoding.
    }
    const product = productMatch
      ? products.find((item) => item.id === routeId || item.slug === routeId)
      : undefined;
    const article = articleMatch ? blogPosts.find((post) => post.id === routeId) : undefined;
    const routeLoading = Boolean((productMatch && productsLoading) || (articleMatch && blogsLoading));
    const adminSeo = storeSettings?.pageSeo?.[pathname];
    const staticPage = adminSeo || (pathname === "/" && storeSettings ? { title: storeSettings.seoTitle, description: storeSettings.seoDescription } : pages[pathname]);
    const title = product
      ? product.seoTitle || `${product.name} – Buy Online | ${SITE_NAME}`
      : article
        ? article.seoTitle || `${article.title} | ${SITE_NAME}`
        : staticPage?.title || (routeLoading ? `Loading | ${SITE_NAME}` : `Page Not Found | ${SITE_NAME}`);
    const description = product?.seoDescription || product?.description || article?.seoDescription || article?.excerpt || staticPage?.description || (routeLoading ? `Loading content from ${SITE_NAME}.` : "The requested page could not be found.");
    const rawImage = product?.image || article?.image || DEFAULT_IMAGE;
    const image = new URL(rawImage, `${SITE_URL}/`).href;
    const canonical = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
    const noindex = staticPage?.noindex || routeLoading || (!staticPage && !product && !article);
    const type = product ? "product" : article ? "article" : "website";

    document.title = title;
    setMeta('meta[name="description"]', { name: "description", content: description });
    setMeta('meta[name="robots"]', { name: "robots", content: noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" });
    setMeta('meta[property="og:title"]', { property: "og:title", content: title });
    setMeta('meta[property="og:description"]', { property: "og:description", content: description });
    setMeta('meta[property="og:type"]', { property: "og:type", content: type });
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    setMeta('meta[property="og:image"]', { property: "og:image", content: image });
    setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    setMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_IN" });
    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });
    if (product?.seoKeywords?.length || storeSettings?.seoKeywords?.length) setMeta('meta[name="keywords"]', { name: "keywords", content: (product?.seoKeywords || storeSettings?.seoKeywords || []).join(', ') });
    if (product) {
      setMeta('meta[property="product:price:amount"]', { property: "product:price:amount", content: String(product.price) });
      setMeta('meta[property="product:price:currency"]', { property: "product:price:currency", content: "INR" });
    }

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    document.getElementById("route-structured-data")?.remove();
    if (product || article) {
      const schema = product
        ? {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: [image],
            description: product.description,
            sku: product.sku || product.id,
            brand: { "@type": "Brand", name: SITE_NAME },
            offers: { "@type": "Offer", url: canonical, priceCurrency: "INR", price: product.price, availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" },
          }
        : {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: article!.title,
            description: article!.excerpt,
            image: [image],
            datePublished: article!.date,
            author: { "@type": "Person", name: article!.author },
            publisher: { "@type": "Organization", name: SITE_NAME },
            mainEntityOfPage: canonical,
          };
      const script = document.createElement("script");
      script.id = "route-structured-data";
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [pathname, storeSettings, products, blogPosts, productsLoading, blogsLoading]);

  return null;
}
