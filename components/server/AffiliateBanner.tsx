import type { BannerOffer } from '@/lib/affiliate-banners';

/**
 * One affiliate banner inside a guide. Labelled as a referral link in real
 * text (not only inside the image), marked rel="sponsored", and sized up
 * front so the page doesn't jump while the image loads.
 */
export function AffiliateBanner({ offer }: { offer: BannerOffer }) {
  return (
    <aside aria-label="Referral offer" className="my-10 max-w-[44rem]">
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">Referral link</p>
      <a
        href={offer.href}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        className="block overflow-hidden rounded-2xl border border-slate-800 transition-colors hover:border-emerald-500/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
      >
        <picture>
          <source media="(min-width: 640px)" srcSet={offer.wide} width={1200} height={300} />
          <img src={offer.tall} alt={offer.alt} width={640} height={480} loading="lazy" decoding="async" className="block h-auto w-full" />
        </picture>
      </a>
      <p className="mt-2 text-xs leading-relaxed text-slate-500">{offer.disclosure}</p>
    </aside>
  );
}
