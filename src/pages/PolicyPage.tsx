import { useLocation } from 'react-router-dom';
import { useStoreSettings } from '@/hooks/useStoreData';

const config:Record<string,{title:string;field:'termsContent'|'privacyContent'|'refundContent'|'shippingContent';fallback:string}>={
  '/terms-of-service':{title:'Terms & Conditions',field:'termsContent',fallback:'Terms are being updated. Contact support if you have a question before ordering.'},
  '/privacy-policy':{title:'Privacy Policy',field:'privacyContent',fallback:'We use customer details only to provide orders, support and store services.'},
  '/refund-policy':{title:'Refund & Return Policy',field:'refundContent',fallback:'Contact support within 7 days for damaged or incorrect orders.'},
  '/shipping-policy':{title:'Shipping Policy',field:'shippingContent',fallback:'Delivery timing depends on your serviceable pincode.'},
};
export default function PolicyPage(){const {pathname}=useLocation();const {data:settings,loading}=useStoreSettings();const page=config[pathname]||config['/terms-of-service'];const content=settings?.[page.field]||page.fallback;return <main className="min-h-[65vh] px-4 py-14"><article className="section-shell mx-auto max-w-4xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-primary">Store service</p><h1 className="mt-3 text-4xl font-bold">{page.title}</h1><p className="mt-3 text-sm text-muted-foreground">Last updated automatically from our store administration.</p><div className="mt-8 whitespace-pre-line text-base leading-8 text-muted-foreground">{loading?'Loading…':content}</div><div className="mt-10 border-t pt-6 text-sm">Questions? <a className="font-semibold text-primary" href={`mailto:${settings?.supportEmail||'aacharitiwari@gmail.com'}`}>{settings?.supportEmail||'aacharitiwari@gmail.com'}</a></div></article></main>}
