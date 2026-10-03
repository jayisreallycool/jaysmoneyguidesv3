'use client';
import { useEffect, useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { getReceipt, startCheckout } from '@/lib/checkout-client';

export function CheckoutButton({
  productId, isFree, className,
}: { productId: string; isFree: boolean; className?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  // Already bought on this device? Offer to read instead of buying again.
  const [owned, setOwned] = useState(false);
  useEffect(() => { if (!isFree) setOwned(Boolean(getReceipt(productId))); }, [productId, isFree]);

  async function handleClick() {
    setError(null);
    setShowError(false);
    
    // Free book: open the reader — no account, no email. (The reader shows a
    // clear message if the file can't be served, instead of a raw error tab.)
    if (isFree) {
      window.location.assign(`/?read=${encodeURIComponent(productId)}`);
      return;
    }

    if (owned) {
      // The home page opens the reader for ?read=<productId>
      window.location.assign(`/?read=${encodeURIComponent(productId)}`);
      return;
    }

    // Paid book: straight to Stripe (Stripe collects the email; a signed-in
    // buyer's account email is attached automatically).
    setLoading(true);
    const result = await startCheckout(productId);
    setError(result.error);
    setShowError(true);
    setLoading(false);
  }

  return (
    <div className="w-full">
      <button 
        onClick={handleClick} 
        disabled={loading} 
        className={className}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
            <span className="hidden sm:inline">Redirecting to checkout...</span>
            <span className="sm:hidden">Loading...</span>
          </>
        ) : isFree ? (
          'Read free guide'
        ) : owned ? (
          'Read your ebook'
        ) : (
          'Get access now'
        )}
      </button>
      {showError && error && (
        <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-2.5 text-sm text-red-300">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
