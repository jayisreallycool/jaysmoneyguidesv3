import type { Metadata } from 'next';
import { LegalPage } from '@/components/server/LegalPage';
import { UnsubscribeForm } from '@/components/client/UnsubscribeForm';

export const metadata: Metadata = {
  title: 'Unsubscribe',
  description: 'Remove your email address from the JaysMoneyGuides newsletter list.',
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <LegalPage title="Unsubscribe" accentColor="slate">
      <p>Enter the email address you signed up with and we&apos;ll remove it from our newsletter list straight away.</p>
      <UnsubscribeForm />
      <p>This only affects newsletter emails. If you bought an ebook, your purchase and your account are not changed.</p>
    </LegalPage>
  );
}
