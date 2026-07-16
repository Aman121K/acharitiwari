import { FormEvent, useId, useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { apiRequest } from '@/lib/api';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

type NewsletterSignupProps = {
  source: 'footer' | 'blog';
  variant?: 'band' | 'card';
  title: string;
  description: string;
  className?: string;
};

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const NewsletterSignup = ({
  source,
  variant = 'card',
  title,
  description,
  className,
}: NewsletterSignupProps) => {
  const inputId = useId();
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [feedback, setFeedback] = useState('');

  const isBand = variant === 'band';
  const isSubmitting = formState === 'submitting';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setFormState('submitting');
    setFeedback('');

    try {
      const result = await apiRequest<{ message: string }>('/newsletter/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), source }),
      });
      setFormState('success');
      setFeedback(result.message || 'Please check your inbox to confirm your subscription.');
      void trackEvent('generate_lead', { lead_source: `newsletter_${source}` });
      void trackEvent('newsletter_signup', { source });
      setEmail('');
    } catch (error) {
      setFormState('error');
      setFeedback(error instanceof Error ? error.message : 'We could not save your subscription. Please try again.');
    }
  };

  return (
    <section
      className={cn(
        isBand
          ? 'mx-auto max-w-4xl text-center text-white'
          : 'relative overflow-hidden rounded-2xl border border-[#dbc7aa] bg-[#fffaf2] px-5 py-8 text-center shadow-card sm:px-10 sm:py-10',
        className,
      )}
      aria-labelledby={`${inputId}-title`}
    >
      {!isBand && <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#17320d] via-[#c88a2b] to-[#8f1715]" />}
      <p className={cn('mb-3 text-xs font-bold uppercase tracking-[0.2em]', isBand ? 'text-[#f2c982]' : 'text-[#8f1715]')}>
        From the Achari kitchen
      </p>
      <h2 id={`${inputId}-title`} className={cn('font-bold tracking-tight', isBand ? 'text-2xl text-white md:text-3xl' : 'text-2xl text-[#221b15] sm:text-3xl')}>
        {title}
      </h2>
      <p className={cn('mx-auto mt-3 max-w-2xl leading-7', isBand ? 'text-white/85' : 'text-[#67584a]')}>
        {description}
      </p>

      {formState === 'success' ? (
        <div className={cn('mx-auto mt-7 flex min-h-[112px] max-w-xl items-center justify-center gap-3 border px-4 py-4 text-left', isBand ? 'border-white/25 bg-white/10 text-white' : 'border-[#b9c9ae] bg-[#eff5ea] text-[#17320d]')} role="status" aria-live="polite">
          <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />
          <div>
            <strong className="block text-sm">You’re almost there.</strong>
            <span className={cn('mt-0.5 block text-sm leading-5', isBand ? 'text-white/80' : 'text-[#46603a]')}>{feedback}</span>
          </div>
        </div>
      ) : (
        <form className="mx-auto mt-7 max-w-2xl" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor={inputId}>Email address</label>
            <input
              id={inputId}
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (formState === 'error') {
                  setFormState('idle');
                  setFeedback('');
                }
              }}
              disabled={isSubmitting}
              placeholder="Enter your email address"
              aria-describedby={`${inputId}-consent ${inputId}-feedback`}
              className={cn(
                'min-h-[48px] min-w-0 flex-1 border px-4 text-base outline-none transition focus:ring-2 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-70',
                isBand
                  ? 'border-white/35 bg-white/10 text-white placeholder:text-white/65 focus:border-white focus:ring-white/70 focus:ring-offset-[#8f1715]'
                  : 'border-[#cdbb9e] bg-white text-[#221b15] placeholder:text-[#827264] focus:border-[#17320d] focus:ring-[#17320d]/40 focus:ring-offset-[#fffaf2]',
              )}
            />
            <button
              type="submit"
              disabled={isSubmitting || !email.trim()}
              className={cn(
                'inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 px-6 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
                isBand
                  ? 'bg-white text-[#17320d] hover:bg-[#fff3df] focus:ring-white focus:ring-offset-[#8f1715]'
                  : 'bg-[#17320d] text-white hover:bg-[#244a18] focus:ring-[#17320d] focus:ring-offset-[#fffaf2]',
              )}
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
              {isSubmitting ? 'Subscribing…' : 'Subscribe'}
            </button>
          </div>
          <p id={`${inputId}-consent`} className={cn('mt-3 text-xs leading-5', isBand ? 'text-white/70' : 'text-[#766757]')}>
            You’ll receive product launches, kitchen stories and occasional offers. Unsubscribe anytime.
          </p>
          <div id={`${inputId}-feedback`} className="min-h-[24px] pt-2" role="status" aria-live="polite" aria-atomic="true">
            {formState === 'error' && <p className={cn('text-sm font-medium', isBand ? 'text-[#ffe0a8]' : 'text-[#9b1c1c]')}>{feedback}</p>}
          </div>
        </form>
      )}
    </section>
  );
};

export default NewsletterSignup;
