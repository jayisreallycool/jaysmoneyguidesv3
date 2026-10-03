import type { Metadata } from 'next';
import { LegalPage } from '@/components/server/LegalPage';
import { ConsentLinks } from '@/components/client/ConsentBanner';

export const metadata: Metadata = {
  title: 'Cookie Policy & AdChoices',
  description: 'Which cookies and similar technologies JaysMoneyGuides uses, why, and how to change your choices.',
  alternates: { canonical: 'https://www.jaysmoneyguides.com/cookie-policy' },
};

export default function Page() {
  return (
    <LegalPage title="Cookie Policy & AdChoices" updated="October 2026" accentColor="violet">
      <p>
        This page explains the cookies and similar technologies (such as your browser&apos;s local storage) used on
        JaysMoneyGuides, what each group is for, and how to change your mind at any time.
      </p>

      <h2>Change your choices</h2>
      <p>
        You can accept, reject or fine-tune optional cookies whenever you like:{' '}
        <ConsentLinks />. The same links are in the footer of every page. Rejecting is as easy as accepting, and the
        site works either way.
      </p>

      <h2>How consent works here</h2>
      <ul>
        <li>
          <strong>In Europe (EEA, UK, Switzerland):</strong> analytics and advertising stay off until you choose
          &ldquo;Accept all&rdquo; or switch them on. No ads are requested before then.
        </li>
        <li>
          <strong>Elsewhere, including the United States:</strong> optional cookies are on by default and you can
          switch them off. If you reject advertising cookies, ads are non-personalised.
        </li>
        <li>
          <strong>Global Privacy Control:</strong> if your browser sends a GPC signal, we treat it as a request not to
          sell or share your personal information, and personalised advertising stays off.
        </li>
        <li>We ask again after 6 months, or sooner if this policy changes in a way that affects your choice.</li>
      </ul>

      <h2>Necessary (always on)</h2>
      <p>These make the site work and cannot be switched off here. They are not used for advertising.</p>
      <ul>
        <li><strong>Your cookie choice</strong> &mdash; remembers what you accepted or rejected (stored in your browser for 6 months).</li>
        <li><strong>Sign-in</strong> &mdash; Google Firebase Authentication keeps you signed in to your account.</li>
        <li><strong>Your purchases</strong> &mdash; a receipt reference stored in your browser so you can reopen an ebook you bought on this device.</li>
        <li><strong>Secure checkout</strong> &mdash; when you pay, Stripe sets its own cookies on its checkout page to process the payment and prevent fraud.</li>
        <li><strong>Small preferences</strong> &mdash; for example, remembering that you closed the newsletter prompt.</li>
      </ul>

      <h2>Page-view counting (no cookies)</h2>
      <p>
        Separately from the cookies on this page, our own server keeps simple daily totals: how many pages were opened,
        which pages, the site a visit came from, the country, and whether it was a phone, tablet or computer. This uses
        no cookies, stores nothing on your device, and does not record your IP address or anything that identifies you
        &mdash; only the totals are kept.
      </p>

      <h2>Analytics (optional)</h2>
      <p>
        Google Analytics helps us see how many people visit and which guides are useful. It uses cookies such as{' '}
        <code>_ga</code> and <code>_ga_*</code> (kept for up to 2 years). Google Analytics is only loaded when analytics
        is allowed.
      </p>

      <h2>Advertising (optional)</h2>
      <p>
        We show ads through Google AdSense to keep the guides free. When advertising cookies are allowed, Google and
        its partners may use cookies such as <code>__gads</code>, <code>__gpi</code> and <code>IDE</code> (typically
        kept for up to 13&ndash;24 months) to show and measure ads, limit how often you see an ad, and show ads based on
        your visits to this and other websites.
      </p>
      <ul>
        <li>
          Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or
          other websites.
        </li>
        <li>
          You can opt out of personalised advertising in{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>, or
          for many other ad companies at{' '}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info/choices</a>{' '}
          and <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer">youronlinechoices.eu</a>.
        </li>
        <li>
          More detail:{' '}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
            How Google uses information from sites that use its services
          </a>.
        </li>
      </ul>

      <h2>Affiliate links</h2>
      <p>
        Some links on this site are affiliate or referral links. When you follow one, the destination website may set
        its own cookies to record the referral. Those cookies are set by that website under its own policy. See our{' '}
        <a href="/disclaimer">Disclaimer &amp; FTC disclosure</a>.
      </p>

      <h2>Browser controls</h2>
      <p>
        You can also block or delete cookies in your browser settings. Blocking necessary cookies may stop sign-in and
        purchases from working.
      </p>

      <h2>Contact</h2>
      <p>Questions? Email <a href="mailto:jayisreallycool@gmail.com">jayisreallycool@gmail.com</a>.</p>
    </LegalPage>
  );
}
