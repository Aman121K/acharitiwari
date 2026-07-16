import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function LoadError({
  title = 'We could not load this section',
  message = 'Please check your connection and try again.',
  onRetry,
  className,
}: { title?:string; message?:string; onRetry:()=>void; className?:string }) {
  return <div role="alert" className={cn('border border-accent/20 bg-white/75 px-5 py-8 text-center shadow-[0_14px_36px_-28px_rgba(82,34,18,.45)]',className)}>
    <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-accent/10 text-accent"><AlertCircle className="h-5 w-5" /></span>
    <h2 className="mt-4 text-lg font-bold text-foreground">{title}</h2>
    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">{message}</p>
    <Button type="button" variant="outline" onClick={onRetry} className="mt-5 min-h-11 border-primary text-primary"><RefreshCw className="mr-2 h-4 w-4" />Try again</Button>
  </div>;
}

export function ProductGridSkeleton({count=8}:{count?:number}) {
  return <div className="grid grid-cols-1 gap-x-5 gap-y-8 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Loading products" aria-busy="true">
    {Array.from({length:count}).map((_,index)=><div key={index} className="overflow-hidden border border-border/60 bg-white/65">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="p-4"><Skeleton className="h-3 w-24"/><Skeleton className="mt-3 h-6 w-3/4"/><Skeleton className="mt-2 h-4 w-full"/><div className="mt-5 flex items-center justify-between"><Skeleton className="h-7 w-20"/><Skeleton className="h-11 w-28 rounded-none"/></div></div>
    </div>)}
  </div>;
}

export function BlogGridSkeleton({count=6}:{count?:number}) {
  return <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading articles" aria-busy="true">
    {Array.from({length:count}).map((_,index)=><div key={index} className="overflow-hidden border border-border/60 bg-white/70"><Skeleton className="aspect-video rounded-none"/><div className="p-5"><Skeleton className="h-5 w-24"/><Skeleton className="mt-4 h-7 w-5/6"/><Skeleton className="mt-3 h-4 w-full"/><Skeleton className="mt-2 h-4 w-4/5"/><Skeleton className="mt-6 h-11 w-full rounded-none"/></div></div>)}
  </div>;
}

export function ArticleSkeleton() {
  return <main className="min-h-screen py-8" aria-label="Loading article" aria-busy="true"><div className="container mx-auto max-w-4xl px-4"><Skeleton className="h-11 w-32"/><Skeleton className="mt-8 h-6 w-28"/><Skeleton className="mt-5 h-12 w-full"/><Skeleton className="mt-3 h-12 w-4/5"/><div className="mt-6 flex gap-4"><Skeleton className="h-5 w-28"/><Skeleton className="h-5 w-36"/></div><Skeleton className="mt-8 aspect-video w-full rounded-none"/><div className="mt-9 space-y-4"><Skeleton className="h-4 w-full"/><Skeleton className="h-4 w-full"/><Skeleton className="h-4 w-11/12"/><Skeleton className="h-4 w-full"/><Skeleton className="h-4 w-3/4"/></div></div></main>;
}
