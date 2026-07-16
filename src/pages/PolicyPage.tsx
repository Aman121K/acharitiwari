import { useLocation } from 'react-router-dom';
import { useStoreSettings } from '@/hooks/useStoreData';
import { LoadError } from '@/components/StorefrontStates';
import { Skeleton } from '@/components/ui/skeleton';

const config:Record<string,{title:string;field:'termsContent'|'privacyContent'|'refundContent'|'shippingContent';fallback:string}>={
  '/terms-of-service':{title:'Terms & Conditions',field:'termsContent',fallback:'Terms are being updated. Contact support if you have a question before ordering.'},
  '/privacy-policy':{title:'Privacy Policy',field:'privacyContent',fallback:'We use customer details only to provide orders, support and store services.'},
  '/refund-policy':{title:'Refund & Return Policy',field:'refundContent',fallback:'Contact support within 7 days for damaged or incorrect orders.'},
  '/shipping-policy':{title:'Shipping Policy',field:'shippingContent',fallback:'Delivery timing depends on your serviceable pincode.'},
};

export default function PolicyPage(){
  const {pathname}=useLocation();
  const {data:settings,loading,error,refetch}=useStoreSettings();
  const page=config[pathname]||config['/terms-of-service'];
  const content=settings?.[page.field]||page.fallback;
  const needsAnalyticsDisclosure = pathname === '/privacy-policy' && !/firebase|google analytics|ga4/i.test(content);
  return <main className="min-h-[65vh] px-4 py-14"><article className="section-shell mx-auto max-w-4xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-primary">Store service</p><h1 className="mt-3 text-4xl font-bold">{page.title}</h1><p className="mt-3 text-sm text-muted-foreground">Last updated automatically from our store administration.</p>{loading?<div className="mt-8 space-y-4" aria-label="Loading policy" aria-busy="true"><Skeleton className="h-4 w-full"/><Skeleton className="h-4 w-full"/><Skeleton className="h-4 w-11/12"/><Skeleton className="mt-7 h-4 w-full"/><Skeleton className="h-4 w-4/5"/></div>:error?<LoadError title="This policy could not be loaded" message={error.message} onRetry={refetch} className="mt-8"/>:<><div className="mt-8 whitespace-pre-line text-base leading-8 text-muted-foreground">{content}</div>{needsAnalyticsDisclosure&&<section className="mt-8 border-t border-border pt-7"><h2 className="text-xl font-bold text-foreground">Optional website analytics</h2><p className="mt-3 text-base leading-8 text-muted-foreground">If you choose “Accept analytics,” we use Firebase Analytics connected to Google Analytics 4 to understand page visits, product and article engagement, shopping activity and site performance. Analytics remains off when you choose “Only necessary.” We do not intentionally include names, email addresses, phone numbers, delivery addresses or form messages in analytics events. You can change this choice at any time using “Privacy choices” in the footer.</p></section>}</>}{!loading&&!error&&<div className="mt-10 border-t pt-6 text-sm">Questions? <a className="font-semibold text-primary" href={`mailto:${settings?.supportEmail||'aacharitiwari@gmail.com'}`}>{settings?.supportEmail||'aacharitiwari@gmail.com'}</a></div>}</article></main>;
}
