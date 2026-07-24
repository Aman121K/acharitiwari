import { useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play, Square, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

type PlaybackState = 'idle' | 'reading' | 'paused' | 'unsupported' | 'error';

interface ArticleListenProps {
  articleId: string;
  title: string;
  excerpt?: string;
  content: string;
}

const MAX_CHUNK_LENGTH = 220;

const splitForSpeech = (text: string) => {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [text];
  const chunks: string[] = [];

  sentences.forEach((sentence) => {
    const cleanSentence = sentence.replace(/\s+/g, ' ').trim();
    if (!cleanSentence) return;
    if (cleanSentence.length <= MAX_CHUNK_LENGTH) {
      chunks.push(cleanSentence);
      return;
    }

    const words = cleanSentence.split(' ');
    let current = '';
    words.forEach((word) => {
      const candidate = current ? `${current} ${word}` : word;
      if (candidate.length > MAX_CHUNK_LENGTH && current) {
        chunks.push(current);
        current = word;
      } else {
        current = candidate;
      }
    });
    if (current) chunks.push(current);
  });

  return chunks;
};

const getArticleChunks = (title: string, excerpt: string | undefined, html: string) => {
  const document = new DOMParser().parseFromString(html, 'text/html');
  const blocks = Array.from(document.body.querySelectorAll('p, li, h2, h3, h4, blockquote'))
    .map((element) => element.textContent?.replace(/\s+/g, ' ').trim() ?? '')
    .filter(Boolean);
  const bodyText = blocks.length ? blocks : [document.body.textContent?.trim() ?? ''];

  return [title, excerpt ?? '', ...bodyText].filter(Boolean).flatMap(splitForSpeech);
};

const ArticleListen = ({ articleId, title, excerpt, content }: ArticleListenProps) => {
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');
  const queueRef = useRef<string[]>([]);
  const chunkIndexRef = useRef(0);
  const sessionRef = useRef(0);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  const cancelSpeech = useCallback((nextState: PlaybackState = 'idle') => {
    sessionRef.current += 1;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    queueRef.current = [];
    chunkIndexRef.current = 0;
    setPlaybackState(nextState);
  }, []);

  useEffect(() => {
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      setPlaybackState('unsupported');
      return;
    }

    const selectVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      voiceRef.current = voices.find((voice) => voice.lang.toLowerCase() === 'en-in')
        ?? voices.find((voice) => voice.lang.toLowerCase().startsWith('en-in'))
        ?? null;
    };

    selectVoice();
    window.speechSynthesis.addEventListener('voiceschanged', selectVoice);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', selectVoice);
      cancelSpeech();
    };
  }, [articleId, cancelSpeech]);

  const speakNext = useCallback((session: number) => {
    if (session !== sessionRef.current) return;
    const text = queueRef.current[chunkIndexRef.current];
    if (!text) {
      queueRef.current = [];
      chunkIndexRef.current = 0;
      setPlaybackState('idle');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    if (voiceRef.current) utterance.voice = voiceRef.current;
    utterance.rate = 0.95;
    utterance.onend = () => {
      if (session !== sessionRef.current) return;
      chunkIndexRef.current += 1;
      speakNext(session);
    };
    utterance.onerror = (event) => {
      if (session !== sessionRef.current || event.error === 'canceled' || event.error === 'interrupted') return;
      queueRef.current = [];
      setPlaybackState('error');
    };
    window.speechSynthesis.speak(utterance);
  }, []);

  const start = () => {
    if (playbackState === 'unsupported') return;
    cancelSpeech('idle');
    queueRef.current = getArticleChunks(title, excerpt, content);
    const session = sessionRef.current;
    setPlaybackState('reading');
    void trackEvent('article_listen', { item_id: articleId, action: 'start' });
    speakNext(session);
  };

  const togglePause = () => {
    if (playbackState === 'reading') {
      window.speechSynthesis.pause();
      setPlaybackState('paused');
    } else if (playbackState === 'paused') {
      window.speechSynthesis.resume();
      setPlaybackState('reading');
    }
  };

  const isActive = playbackState === 'reading' || playbackState === 'paused';
  const status = playbackState === 'reading'
    ? 'Reading article'
    : playbackState === 'paused'
      ? 'Paused'
      : playbackState === 'unsupported'
        ? 'Read aloud is not supported by this browser'
        : playbackState === 'error'
          ? 'Could not read this article aloud'
          : '';

  return (
    <div className="flex min-h-11 flex-wrap items-center justify-center gap-2" aria-label="Article audio controls">
      {isActive ? (
        <>
          <Button
            type="button"
            size="sm"
            onClick={togglePause}
            className="h-11 gap-2 bg-primary px-4 text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={playbackState === 'paused' ? 'Resume reading article aloud' : 'Pause reading article aloud'}
          >
            {playbackState === 'paused' ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            {playbackState === 'paused' ? 'Resume' : 'Pause'}
            {playbackState === 'reading' && (
              <span className="flex h-4 items-end gap-0.5" aria-hidden="true">
                {[10, 16, 12].map((height, index) => (
                  <span
                    key={height}
                    className="w-0.5 animate-pulse bg-secondary motion-reduce:animate-none"
                    style={{ height, animationDelay: `${index * 160}ms` }}
                  />
                ))}
              </span>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => cancelSpeech()}
            className="h-11 gap-2 border-accent/50 px-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Stop reading article aloud"
          >
            <Square className="h-3.5 w-3.5 fill-current" />
            Stop
          </Button>
        </>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={start}
          disabled={playbackState === 'unsupported'}
          className="h-11 gap-2 border-primary/35 px-4 hover:border-primary hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Listen to this article"
          title={playbackState === 'unsupported' ? status : undefined}
        >
          <Volume2 className="h-4 w-4 text-accent" />
          Listen
        </Button>
      )}
      <span className="text-xs font-medium text-muted-foreground" aria-live="polite" aria-atomic="true">
        {status}
      </span>
    </div>
  );
};

export default ArticleListen;
