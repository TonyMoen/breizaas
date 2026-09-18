'use client';

import { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';

interface SongShareButtonsProps {
  /** Full address of the song page */
  url: string;
  /** Title passed to the phone's share sheet */
  title: string;
}

const BUTTON =
  'inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-purple-playful px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-purple-playful transition-all duration-300 hover:bg-purple-playful hover:text-brown-dark md:flex-none md:px-5 md:text-sm';

/**
 * "Kopier lenke" and "Del" for a song page. Del opens the share sheet on
 * phones and falls back to copying where the browser has none.
 */
export function SongShareButtons({ url, title }: SongShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('Kopier lenken:', url);
    }
  };

  const share = async () => {
    if (!navigator.share) {
      await copy();
      return;
    }
    try {
      await navigator.share({ title, url });
    } catch {
      // The share sheet was closed
    }
  };

  return (
    <div className="flex justify-center gap-3 md:justify-start">
      <button type="button" onClick={copy} className={BUTTON}>
        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        <span aria-live="polite">{copied ? 'Kopiert' : 'Kopier lenke'}</span>
      </button>
      <button type="button" onClick={share} className={BUTTON}>
        <Share2 className="h-4 w-4" aria-hidden="true" />
        Del
      </button>
    </div>
  );
}
