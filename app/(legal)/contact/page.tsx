import type { Metadata } from 'next';
import { LegalPage } from '@/components/server/LegalPage';
import { ContactForm } from '@/components/client/ContactForm';
export const metadata: Metadata = { title: 'Contact', description: 'Contact JaysMoneyGuides.', alternates: { canonical: 'https://www.jaysmoneyguides.com/contact' } };
export default function Page() {
  return (
    <LegalPage title="Contact Us" accentColor="emerald">
      <p>Questions, feedback, corrections or partnership ideas — send a message here and we&apos;ll reply by email.</p>
      <ContactForm />
      <h2>Prefer email?</h2>
      <p><a href="mailto:jayisreallycool@gmail.com">jayisreallycool@gmail.com</a></p>
      <h2>Response time</h2>
      <p>We typically respond within 2–3 business days. For questions about a specific ebook purchase, please include the email address you used at checkout.</p>
    </LegalPage>
  );
}
