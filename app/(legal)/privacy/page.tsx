import type { Metadata } from 'next';
import { LegalPage } from '@/components/server/LegalPage';
import { ConsentLinks } from '@/components/client/ConsentBanner';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How JaysMoneyGuides collects, uses, shares and protects your information, and the choices and rights you have.',
  alternates: { canonical: 'https://www.jaysmoneyguides.com/privacy' },
};

export default function Page() {
  return (
    <LegalPage title="Privacy Policy" updated="October 2026" accentColor="blue">
      <p>
        This Privacy Policy explains what information JaysMoneyGuides (&ldquo;we&rdquo;, &ldquo;us&rdquo;), operated by
        Jay Lopez, collects when you use www.jaysmoneyguides.com, why, who it is shared with, and the choices and rights
        you have. To reach us about anything here, email{' '}
        <a href="mailto:jayisreallycool@gmail.com">jayisreallycool@gmail.com</a>.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li><strong>Account:</strong> your email address and, if you sign in with Google, your name and profile picture.</li>
        <li><strong>Purchases:</strong> the email you use at checkout, what you bought and when. Card details go directly to Stripe; we never see or store them.</li>
        <li><strong>Newsletter:</strong> your email address if you subscribe.</li>
        <li><strong>Messages and reviews:</strong> what you send through the contact form, and the name, role, rating and text of any review you submit. Your IP address is recorded with a review to prevent spam.</li>
        <li><strong>Usage:</strong> pages viewed, approximate location from your IP address, device and browser type, and the site you came from.</li>
        <li><strong>Cookies and similar technologies:</strong> see our <a href="/cookie-policy">Cookie Policy</a>.</li>
      </ul>

      <h2>How we use it, and why we are allowed to</h2>
      <ul>
        <li><strong>To provide what you asked for</strong> (performing our contract with you): your account, ebook delivery, and support.</li>
        <li><strong>To send the newsletter</strong> (your consent): you can unsubscribe from any email.</li>
        <li><strong>To measure and improve the site, and to show ads</strong> (your consent where the law requires it, otherwise our legitimate interest in running a free site).</li>
        <li><strong>To keep the site secure and prevent fraud or spam</strong> (our legitimate interest).</li>
        <li><strong>To meet legal obligations</strong>, such as keeping records of sales.</li>
      </ul>

      <h2>Who we share it with</h2>
      <p>We do not sell your personal information for money. We use these service providers, which process data on our behalf or as independent controllers under their own policies:</p>
      <ul>
        <li><strong>Google Firebase</strong> &mdash; sign-in, database and file storage.</li>
        <li><strong>Stripe</strong> &mdash; payments.</li>
        <li><strong>Vercel</strong> &mdash; website hosting.</li>
        <li><strong>Google Analytics</strong> &mdash; visit statistics, only when analytics cookies are allowed.</li>
        <li><strong>Google AdSense</strong> &mdash; advertising.</li>
      </ul>
      <p>We may also disclose information if the law requires it, or to protect our rights or other people&apos;s safety.</p>

      <h2>Advertising</h2>
      <p>
        Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or
        other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your
        visits to this and other sites. You can opt out of personalised advertising in{' '}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a> or at{' '}
        <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info/choices</a>.
        See{' '}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
          how Google uses information from sites that use its services
        </a>.
      </p>
      <p>
        Under some US state laws, letting ad partners use cookies for personalised advertising can count as
        &ldquo;sharing&rdquo; or &ldquo;selling&rdquo; personal information. You can turn this off at any time:{' '}
        <ConsentLinks />. We also honour the Global Privacy Control signal from your browser.
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>Account and purchase records: for as long as your account exists, and purchase records for as long as tax and accounting rules require.</li>
        <li>Newsletter email: until you unsubscribe.</li>
        <li>Contact messages and reviews: until they are no longer needed, or until you ask us to delete them.</li>
        <li>Cookies: as described in the <a href="/cookie-policy">Cookie Policy</a>.</li>
      </ul>

      <h2>International transfers</h2>
      <p>
        We are based in the United States, and our service providers process data in the United States and other
        countries. Where required, they rely on safeguards such as the EU&ndash;US Data Privacy Framework or standard
        contractual clauses.
      </p>

      <h2>Your rights</h2>
      <p>Depending on where you live, you may have the right to:</p>
      <ul>
        <li>know what personal information we hold about you and get a copy of it;</li>
        <li>have it corrected or deleted (you can delete your account from your profile);</li>
        <li>object to or restrict certain uses, and withdraw consent at any time;</li>
        <li>opt out of the sale or sharing of personal information and of targeted advertising;</li>
        <li>not be treated differently for using these rights;</li>
        <li>complain to your local data protection authority.</li>
      </ul>
      <p>
        To use any of these rights, email <a href="mailto:jayisreallycool@gmail.com">jayisreallycool@gmail.com</a> from
        the address linked to your account. We reply within 30 days. If we refuse a request, you can reply to appeal.
      </p>

      <h2>Children</h2>
      <p>
        This site is not directed to children under 16, and we do not knowingly collect their personal information. If
        you believe a child has given us information, email us and we will delete it.
      </p>

      <h2>Security</h2>
      <p>
        We use reputable providers, encrypted connections (HTTPS) and access controls. No website can guarantee absolute
        security, so please use a strong, unique password.
      </p>

      <h2>Changes to this policy</h2>
      <p>We will update this page when our practices change and revise the date at the top.</p>
    </LegalPage>
  );
}
