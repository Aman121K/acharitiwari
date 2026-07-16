import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { blogPosts as fallbackPosts } from "@/data/blogData";
import { products as fallbackProducts } from "@/data/products";
import socialImage from "@/assets/spice-market-hero.jpg";
import { useBlogs, useProducts, useStoreSettings } from "@/hooks/useStoreData";

const SITE_NAME = "Achari Tiwari";
const SITE_URL = (import.meta.env.VITE_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "https://acharitiwari.vercel.app")).replace(/\/$/, "");
const DEFAULT_IMAGE = new URL(socialImage, `${SITE_URL}/`).href;

const pages: Record<string, { title: string; description: string; noindex?: boolean }> = {
  "/": {
    title: "Authentic Indian Pickles & Aachar Online | Achari Tiwari",
    description: "Shop authentic Indian aachar, including mango, lime, garlic and chilli pickles, made with traditional recipes and delivered across India.",
  },
  "/products": {
    title: "Buy Indian Pickles Online | Achari Tiwari",
    description: "Explore traditional Indian pickles made with quality ingredients, aromatic spices and time-honoured recipes. Order aachar online across India.",
  },
  "/blog": {
    title: "Aachar Recipes, Stories & Food Guides | Achari Tiwari",
    description: "Read traditional pickle recipes, Indian food stories, preservation tips and guides to enjoying authentic homemade aachar.",
  },
  "/about": {
    title: "About Achari Tiwari | Traditional Indian Aachar",
    description: "Learn how Achari Tiwari preserves regional Indian pickle-making traditions through authentic recipes, quality ingredients and careful preparation.",
  },
  "/contact": {
    title: "Contact Achari Tiwari",
    description: "Contact Achari Tiwari for product questions, order support, delivery information or feedback about our authentic Indian pickles.",
  },
  "/reviews": {
    title: "Customer Reviews | Achari Tiwari",
    description: "Read approved customer reviews and experiences with Achari Tiwari's traditional Indian pickles and aachar.",
  },
  "/privacy-policy": { title: "Privacy Policy | Achari Tiwari", description: "Read the Achari Tiwari privacy policy and learn how we collect, use and protect your personal information." },
  "/terms-of-service": { title: "Terms of Service | Achari Tiwari", description: "Read the terms that apply when using the Achari Tiwari website and purchasing our products." },
  "/shipping-policy": { title: "Shipping Policy | Achari Tiwari", description: "Learn about Achari Tiwari order processing, shipping coverage, delivery estimates and packaging." },
  "/refund-policy": { title: "Refund Policy | Achari Tiwari", description: "Review the Achari Tiwari refund and replacement policy for damaged, incorrect or quality-affected orders." },
  "/cart": { title: "Shopping Cart | Achari Tiwari", description: "Review the authentic Indian pickles in your Achari Tiwari shopping cart.", noindex: true },
  "/checkout": { title: "Secure Checkout | Achari Tiwari", description: "Complete your Achari Tiwari order securely.", noindex: true },
  "/search": { title: "Search | Achari Tiwari", description: "Search Achari Tiwari products and articles.", noindex: true },
  "/account": { title: "My Account | Achari Tiwari", description: "Manage your Achari Tiwari account and orders.", noindex: true },
};

function setMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element!.setAttribute(name, value));
}

function removeMeta(selector: string) {
  document.head.querySelector(selector)?.remove();
}

function absoluteUrl(value: string) {
  return new URL(value || "/", `${SITE_URL}/`).href;
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
    const socialTitle = (!product && !article && adminSeo?.ogTitle) || title;
    const socialDescription = (!product && !article && adminSeo?.ogDescription) || description;
    const rawImage = product?.image || article?.image || adminSeo?.ogImage || DEFAULT_IMAGE;
    const image = absoluteUrl(rawImage);
    const canonical = absoluteUrl(adminSeo?.canonical || (pathname === "/" ? "/" : pathname));
    const protectedPage = Boolean(pages[pathname]?.noindex);
    const noindex = protectedPage || routeLoading || (!staticPage && !product && !article) || adminSeo?.robots?.startsWith("noindex");
    const robots = noindex
      ? "noindex, follow"
      : adminSeo?.robots || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
    const type = product ? "product" : article ? "article" : "website";
    const articleKeywords = article ? [article.focusKeyword, ...(article.tags || [])].filter(Boolean) as string[] : [];
    const keywords = product?.seoKeywords?.length
      ? product.seoKeywords
      : articleKeywords.length
        ? articleKeywords
        : adminSeo?.keywords?.length
          ? adminSeo.keywords
          : storeSettings?.seoKeywords || [];

    document.title = title;
    setMeta('meta[name="description"]', { name: "description", content: description });
    setMeta('meta[name="robots"]', { name: "robots", content: robots });
    setMeta('meta[property="og:title"]', { property: "og:title", content: socialTitle });
    setMeta('meta[property="og:description"]', { property: "og:description", content: socialDescription });
    setMeta('meta[property="og:type"]', { property: "og:type", content: type });
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    setMeta('meta[property="og:image"]', { property: "og:image", content: image });
    setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    setMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_IN" });
    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: socialTitle });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: socialDescription });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });
    if (keywords.length) setMeta('meta[name="keywords"]', { name: "keywords", content: keywords.join(', ') });
    else removeMeta('meta[name="keywords"]');
    if (product) {
      setMeta('meta[property="product:price:amount"]', { property: "product:price:amount", content: String(product.price) });
      setMeta('meta[property="product:price:currency"]', { property: "product:price:currency", content: "INR" });
    } else {
      removeMeta('meta[property="product:price:amount"]');
      removeMeta('meta[property="product:price:currency"]');
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
