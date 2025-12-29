/**
 * SocialShareButtons Component
 * Provides social sharing functionality for Facebook, Twitter, and native share
 *
 * Story: 3.5 - Tour Page Layout with Social Sharing
 * Component Type: Client Component (uses browser APIs for sharing)
 *
 * Architecture Compliance:
 * - V11 Color System: Uses gold-champagne hover states
 * - Client Component: Uses "use client" for interactive sharing dialogs
 * - Norwegian Localization: All button text in Norwegian (nb-NO)
 * - WCAG 2.1 AA: Keyboard accessible, proper ARIA labels, 44x44px touch targets
 * - Responsive: Full button labels (desktop), icon-only (mobile)
 */

'use client';

import { useState } from 'react';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description: string;
  facebookLabel: string;
  twitterLabel: string;
  nativeLabel: string;
}

/**
 * SocialShareButtons Component
 * Displays share buttons for Facebook, Twitter, and native share API
 *
 * Features:
 * - Facebook share dialog with pre-filled text
 * - Twitter compose dialog with hashtags
 * - Native Share API support detection
 * - Responsive: full labels (desktop), icon-only (mobile)
 * - Touch-optimized: 44x44px minimum touch targets
 *
 * @param url - URL to share
 * @param title - Share title text (Norwegian)
 * @param description - Share description text (Norwegian)
 * @param facebookLabel - Facebook button label (Norwegian)
 * @param twitterLabel - Twitter button label (Norwegian)
 * @param nativeLabel - Native share button label (Norwegian)
 */
export function SocialShareButtons({
  url,
  title,
  description,
  facebookLabel,
  twitterLabel,
  nativeLabel,
}: SocialShareButtonsProps) {
  const [supportsNativeShare] = useState(
    typeof navigator !== 'undefined' && 'share' in navigator
  );

  /**
   * Open Facebook share dialog in popup window
   */
  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  /**
   * Open Twitter compose dialog with pre-filled text and hashtags
   */
  const handleTwitterShare = () => {
    const twitterText = `${title} #Breizaas #Konserter`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  /**
   * Use native Share API (mobile devices)
   * Falls back gracefully if not supported
   */
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url });
      } catch (error) {
        // User cancelled share dialog or error occurred
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* Facebook Share Button */}
      <button
        onClick={handleFacebookShare}
        className="bg-brown-dark border-2 border-gold-vintage text-gold-champagne font-semibold px-6 py-3 rounded-full hover:bg-gold-champagne hover:text-brown-dark hover:border-gold-champagne transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-champagne focus:ring-offset-2 focus:ring-offset-brown-medium min-h-[44px] min-w-[44px]"
        aria-label={facebookLabel}
      >
        <span className="hidden sm:inline">{facebookLabel}</span>
        <span className="sm:hidden" aria-hidden="true">
          FB
        </span>
      </button>

      {/* Twitter Share Button */}
      <button
        onClick={handleTwitterShare}
        className="bg-brown-dark border-2 border-gold-vintage text-gold-champagne font-semibold px-6 py-3 rounded-full hover:bg-gold-champagne hover:text-brown-dark hover:border-gold-champagne transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-champagne focus:ring-offset-2 focus:ring-offset-brown-medium min-h-[44px] min-w-[44px]"
        aria-label={twitterLabel}
      >
        <span className="hidden sm:inline">{twitterLabel}</span>
        <span className="sm:hidden" aria-hidden="true">
          X
        </span>
      </button>

      {/* Native Share Button (only shown if supported) */}
      {supportsNativeShare && (
        <button
          onClick={handleNativeShare}
          className="bg-gold-vintage text-brown-dark font-semibold px-6 py-3 rounded-full hover:bg-gold-champagne transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-champagne focus:ring-offset-2 focus:ring-offset-brown-medium min-h-[44px] min-w-[44px]"
          aria-label={nativeLabel}
        >
          <span className="hidden sm:inline">{nativeLabel}</span>
          <span className="sm:hidden" aria-hidden="true">
            📤
          </span>
        </button>
      )}
    </div>
  );
}
