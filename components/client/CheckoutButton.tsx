'use client';
import { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';

export function CheckoutButton({
  productId, isFree, className,
}: { productId: string; isFree: boolean; className?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  async function handleClick() {
    setError(null);
    setShowError(false);
    
    // Free book: hit the download route directly, no email needed.
    if (isFree) {
      try {
        window.open(`/api/download-ebook?productId=${encodeURIComponent(productId)}&redirect=1`, '_blank');
      } catch (err) {
        setError('Failed to open download. Please try again.');
        setShowError(true);
      }
      return;
    }
    
    // Paid book: Go straight to Stripe checkout without email prompt.
    // Stripe will collect email at checkout instead (better UX).
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, origin: window.location.origin }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.url) {
        // Use location.href for better mobile compatibility
        window.location.href = data.url;
        return;
      }
      throw new Error(data.error || 'No checkout URL returned');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Checkout failed. Please try again.';
      setError(errorMsg);
      setShowError(true);
      console.error('[CheckoutButton] error:', err);
    } finally {
      setLoading(false);
    }
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
          'Download free guide'
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
