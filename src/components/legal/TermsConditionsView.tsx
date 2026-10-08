import React, { useEffect } from 'react';
import { ArrowLeft, FileText, ShieldAlert, Mail } from 'lucide-react';
import { Button } from '../common/Button';

interface TermsConditionsViewProps {
  onBack: () => void;
}

export const TermsConditionsView: React.FC<TermsConditionsViewProps> = ({ onBack }) => {
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '30px 24px 80px' }}>
      {/* Top Back Navigation */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-start' }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.95rem',
            padding: '4px 0',
            transition: 'var(--transition-smooth)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <ArrowLeft size={18} /> Back to Overview
        </button>
      </div>

      {/* Hero Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(56, 189, 248, 0.05) 100%)',
          borderRadius: '24px',
          border: '1px solid var(--border-subtle)',
          padding: '36px',
          marginBottom: '40px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 12px',
            borderRadius: '9999px',
            backgroundColor: 'var(--primary-surface)',
            color: 'var(--primary)',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '16px',
          }}
        >
          <FileText size={14} /> Official Legal Agreement
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 10px 0', color: 'var(--text-primary)' }}>
          Terms &amp; Conditions
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          <strong>Application:</strong> Pocket Advisor (Android) &bull; <strong>Effective Date:</strong> September 2026 &bull; <strong>Last Updated:</strong> September 2026 &bull; <strong>Owner:</strong> Deepesh Garg
        </p>
      </div>

      {/* Legal Content Sections */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderRadius: '24px',
          border: '1px solid var(--border-subtle)',
          padding: '40px',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          fontSize: '0.95rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        {/* Section 1 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            1. Acceptance of These Terms
          </h2>
          <p>
            By downloading, installing, accessing, or using Pocket Advisor (&ldquo;App&rdquo;, &ldquo;Pocket Advisor&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), you acknowledge that you have read, understood, and agree to these Terms &amp; Conditions (&ldquo;Terms&rdquo;).
          </p>
          <p style={{ marginTop: '10px' }}>
            If you do not agree to these Terms, you must not use the App and should uninstall it from your device.
          </p>
          <p style={{ marginTop: '10px' }}>
            Pocket Advisor is intended for individuals who are <strong>18 years of age or older</strong>. By using the App, you represent that you meet this requirement.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            2. Description of the Service
          </h2>
          <p>Pocket Advisor is a personal spending, budget, and expense-management application designed to help users:</p>
          <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
            <li>record and organize expenses;</li>
            <li>automatically identify certain transactions from bank and payment SMS messages;</li>
            <li>manage budgets and spending;</li>
            <li>analyze spending patterns and trends;</li>
            <li>manage shared expenses and balances between users;</li>
            <li>calculate suggested debt settlements using a debt-minimization algorithm; and</li>
            <li>receive AI-generated spending information and insights through the AI Copilot.</li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            The specific features available to you may depend on your account type, device, operating system, subscription status, region, and future changes to the App.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            3. Informational and Spending &amp; Budget Disclaimer
          </h2>
          <div style={{ padding: '18px', borderRadius: '14px', backgroundColor: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', color: 'var(--text-primary)', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#f59e0b', fontWeight: 700 }}>
              <ShieldAlert size={18} /> Important Disclaimer
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Pocket Advisor is a <strong>spending and budget tracking tool</strong>, not a professional advisory or consulting service. <strong>Pocket Advisor does not provide professional investment, lending, legal, accounting, tax, or other regulated professional advice.</strong>
            </p>
          </div>
          <p>
            The App, including its AI Copilot, provides information, calculations, budgeting assistance, spending analysis, and general budgeting insights for informational purposes only.
          </p>
          <p style={{ marginTop: '10px' }}>
            AI-generated information may contain errors, omissions, assumptions, or outdated information. You should independently verify important information before relying on it, particularly when making spending, investment, tax, legal, borrowing, or other significant budget decisions.
          </p>
          <p style={{ marginTop: '10px' }}>
            Pocket Advisor does not guarantee that any recommendation, analysis, calculation, projection, or other information provided through the App will be accurate, complete, suitable, or appropriate for your particular circumstances. You remain solely responsible for your spending, budgeting, and transaction decisions and actions.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            4. AI Advisor (AI Copilot)
          </h2>
          <p>
            Pocket Advisor&apos;s AI Advisor (also referred to as AI Copilot) may analyze information provided by you or available through your Pocket Advisor account to generate informational responses and insights, including spending analysis, monthly spending trends, budget tracking summaries, debt and expense analysis, and responses to questions regarding your logged personal budget and expenses.
          </p>
          <p style={{ marginTop: '10px' }}>
            AI responses are generated automatically for informational spending and budgeting purposes only and should not be interpreted as professional investment, loan, tax, or legal advice. You acknowledge that:
          </p>
          <ol style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
            <li>AI systems can make mistakes.</li>
            <li>AI-generated information may not reflect your complete budget or spending circumstances.</li>
            <li>AI-generated information should not be treated as guaranteed facts or predictions.</li>
            <li>You should verify material information independently before acting on it.</li>
          </ol>
          <p style={{ marginTop: '10px' }}>
            Pocket Advisor does not guarantee the availability, accuracy, or completeness of AI-generated responses.
          </p>
          <p style={{ marginTop: '10px', color: 'var(--text-secondary)' }}>
            If you encounter an inaccurate, inappropriate, or unexpected AI-generated response, you may report it directly within the App using the report flag icon next to the response.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            5. SMS Transaction Detection
          </h2>
          <p>
            Pocket Advisor may provide a feature that analyzes relevant SMS messages on your Android device to identify potential spending and payment transactions.
          </p>
          <p style={{ marginTop: '10px' }}>
            Where supported, the SMS processing used to identify transactions is performed <strong>locally on your device</strong>. Pocket Advisor does not send the original SMS message text to its servers merely because the SMS parsing feature is enabled.
          </p>
          <p style={{ marginTop: '10px' }}>
            Automatically detected transactions may be incomplete or incorrect. You are responsible for reviewing automatically detected transactions and correcting, editing, or deleting them where necessary before relying on them.
          </p>
          <p style={{ marginTop: '10px' }}>
            Pocket Advisor does not guarantee that every eligible transaction will be detected or that every detected transaction will be correctly interpreted.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            6. Cloud Backup
          </h2>
          <p>
            Pocket Advisor may offer an optional Cloud Backup feature. Extracted transaction and spending data is uploaded to our server <strong>only when you are logged in and have chosen to enable Cloud Backup</strong>, subject to the App&apos;s functionality and Privacy Policy.
          </p>
          <p style={{ marginTop: '10px' }}>
            When Cloud Backup is enabled, applicable data is stored using our cloud infrastructure and database service providers.
          </p>
          <p style={{ marginTop: '10px' }}>
            If Cloud Backup is not enabled, the applicable transaction data is intended to remain stored locally on your device rather than being uploaded for cloud backup. You are responsible for understanding that disabling or not using Cloud Backup may mean that locally stored data cannot be recovered if your device, application data, or storage is lost or damaged.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            7. Account Registration and Security
          </h2>
          <p>
            Certain Pocket Advisor features require an account. You may register or access your account using supported authentication methods, including:
          </p>
          <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
            <li>email and password; and</li>
            <li>Google Sign-In.</li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            You agree to provide accurate information when creating and using your account. You are responsible for maintaining the security of your account credentials and for activity performed through your account. If you believe that your account has been accessed without authorization, you should take appropriate steps to secure your account and contact us.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            8. Account Deletion
          </h2>
          <p>
            You may delete your Pocket Advisor account using the account-deletion functionality provided within the App, or if you have uninstalled the App, by submitting a verified deletion request through our web deletion portal or by contacting <a href="mailto:support@pocketadvisor.in" style={{ color: 'var(--primary)', fontWeight: 600 }}>support@pocketadvisor.in</a>.
          </p>
          <p style={{ marginTop: '10px' }}>
            When an account deletion request is completed, we intend to permanently delete the personal and spending data associated with that account, subject to technical processing requirements and any retention that may be required by applicable law.
          </p>
          <p style={{ marginTop: '10px' }}>
            Account deletion may be irreversible. Data that has been deleted may not be recoverable. Deleting the account may also result in the loss of cloud-backed-up transactions and other account-associated information.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            9. Expense and Data Accuracy
          </h2>
          <p>
            Pocket Advisor is dependent on information entered, imported, detected, or otherwise provided by users. You are responsible for:
          </p>
          <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
            <li>reviewing automatically detected transactions;</li>
            <li>ensuring that manually entered information is accurate;</li>
            <li>correcting incorrect transaction information;</li>
            <li>verifying balances and expense records;</li>
            <li>reviewing shared-expense information before using it to settle obligations; and</li>
            <li>maintaining appropriate independent records of important spending and transaction information.</li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            Pocket Advisor is not responsible for monetary or budget loss arising solely from your failure to review or verify information displayed by the App, to the extent permitted by applicable law.
          </p>
        </section>

        {/* Section 10 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            10. Bill Splitting and Debt Settlement Calculations
          </h2>
          <p>
            Pocket Advisor may provide tools for recording shared expenses and calculating amounts owed between users. Our debt-minimization functionality is designed to reduce the number of peer-to-peer transfers required to settle recorded balances.
          </p>
          <p style={{ marginTop: '10px' }}>
            Pocket Advisor is a <strong>calculation and ledger tool only</strong>. The App does not:
          </p>
          <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
            <li>hold user funds;</li>
            <li>operate an escrow account;</li>
            <li>execute bank transfers;</li>
            <li>execute UPI payments;</li>
            <li>act as a bank or payment institution; or</li>
            <li>guarantee that another user will pay an amount they owe.</li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            Users are responsible for settling their actual payment obligations through their chosen payment method, including UPI, bank transfer, cash, or another method agreed between the parties. Pocket Advisor is not responsible for disputes between users regarding the underlying expense, amount owed, payment, or settlement.
          </p>
        </section>

        {/* Section 11 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            11. Premium Subscriptions
          </h2>
          <p>
            Pocket Advisor may provide paid Premium features through subscriptions offered through <strong>Google Play Billing</strong>.
          </p>
          <p style={{ marginTop: '10px' }}>
            Premium users may receive benefits such as an ad-free experience and other features designated as Premium within the App. Subscription prices, billing periods, renewal terms, and available plans are displayed through Google Play at the time of purchase.
          </p>
          <p style={{ marginTop: '10px' }}>
            Subscriptions generally renew according to the terms presented by Google Play unless cancelled in accordance with the applicable subscription terms. You may cancel a subscription through the applicable Google Play subscription-management functionality. Cancelling a subscription generally prevents future renewals but does not necessarily provide a refund for the unused portion of a billing period.
          </p>
          <p style={{ marginTop: '10px' }}>
            Refunds are subject to applicable law and the applicable Google Play policies and procedures. We do not directly process or hold subscription payments made through Google Play Billing.
          </p>
        </section>

        {/* Section 12 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            12. Advertising
          </h2>
          <p>
            The free or freemium version of Pocket Advisor may display advertisements provided through third-party advertising services, including <strong>Google AdMob</strong>.
          </p>
          <p style={{ marginTop: '10px' }}>
            Premium users may receive an ad-free experience where specified by the applicable Premium plan. The content, targeting, availability, and presentation of third-party advertisements may be controlled by the relevant advertising provider. Pocket Advisor does not endorse every product, service, or claim appearing in third-party advertisements.
          </p>
          <p style={{ marginTop: '10px' }}>
            The collection and use of information for advertising purposes is described in our Privacy Policy.
          </p>
        </section>

        {/* Section 13 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            13. Third-Party Services
          </h2>
          <p>
            Pocket Advisor may use third-party services to provide, operate, secure, authenticate, store, analyze, or support portions of the App. These services may include cloud infrastructure, authentication services, AI services, advertising services, payment infrastructure, and other technical providers.
          </p>
          <p style={{ marginTop: '10px' }}>
            Depending on the feature being used, relevant information may be processed by third-party providers, including services used for:
          </p>
          <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
            <li>account authentication;</li>
            <li>Cloud Backup;</li>
            <li>AI Copilot functionality;</li>
            <li>advertising; and</li>
            <li>subscription billing.</li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            Your use of Pocket Advisor is also subject to the applicable terms and policies of relevant third-party platforms where appropriate. Our Privacy Policy explains the categories of information we collect, use, share, and process in connection with these services.
          </p>
        </section>

        {/* Section 14 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            14. Privacy
          </h2>
          <p>
            Your privacy is important to us. Our collection, use, storage, and disclosure of personal and spending information are described in the <strong>Pocket Advisor Privacy Policy</strong>.
          </p>
          <p style={{ marginTop: '10px' }}>
            The Privacy Policy forms part of the overall terms governing your use of the App with respect to the processing of personal information. Where Cloud Backup is enabled, relevant transaction and spending data may be stored on our cloud infrastructure. Where AI Copilot functionality requires user spending or budget information to generate a response, relevant information may be transmitted to the applicable AI service provider. Please review the Privacy Policy before using Pocket Advisor.
          </p>
        </section>

        {/* Section 15 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            15. App Availability and Changes
          </h2>
          <p>We may modify, update, suspend, restrict, or discontinue all or part of Pocket Advisor at any time. We do not guarantee that:</p>
          <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
            <li>the App will always be available;</li>
            <li>the App will operate without interruption;</li>
            <li>every feature will always be available;</li>
            <li>the App will be compatible with every Android device or operating-system version; or</li>
            <li>information stored locally or through Cloud Backup will never be lost, corrupted, or inaccessible.</li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            We may release updates, security patches, bug fixes, feature changes, or other modifications to the App. You are responsible for maintaining a compatible device and appropriate software environment for using Pocket Advisor.
          </p>
        </section>

        {/* Section 16 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            16. No Guarantee of Data Preservation
          </h2>
          <p>
            Pocket Advisor is intended to assist with personal spending and budget management but should not be treated as your sole or authoritative record of transaction information.
          </p>
          <p style={{ marginTop: '10px' }}>
            You should maintain independent records of important spending and transaction information, particularly where the information has legal, tax, accounting, contractual, or other significant consequences. We take reasonable measures appropriate to the service to maintain and protect stored information, but we cannot guarantee absolute preservation or recovery of all data in every circumstance.
          </p>
        </section>

        {/* Section 17 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            17. Acceptable Use
          </h2>
          <p>You agree not to:</p>
          <ol style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
            <li>use Pocket Advisor for unlawful, fraudulent, deceptive, or abusive purposes;</li>
            <li>attempt to gain unauthorized access to another user&apos;s account or data;</li>
            <li>interfere with or disrupt the App or its infrastructure;</li>
            <li>introduce malware, malicious code, or other harmful material;</li>
            <li>attempt to circumvent security or access controls;</li>
            <li>reverse engineer, decompile, disassemble, or attempt to derive the source code of the App except where such restriction is prohibited by applicable law;</li>
            <li>copy, reproduce, modify, distribute, sell, sublicense, or commercially exploit the App without permission;</li>
            <li>use the App to violate another person&apos;s privacy or rights; or</li>
            <li>use the App in a manner that could damage, disable, overburden, or impair the service.</li>
          </ol>
          <p style={{ marginTop: '10px' }}>
            We reserve the right to restrict or terminate access where we reasonably believe that these Terms have been violated or that continued use presents a security, legal, or operational risk.
          </p>
        </section>

        {/* Section 18 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            18. Intellectual Property
          </h2>
          <p>
            Pocket Advisor, including its software, source code, object code, branding, logos, trademarks, user interface designs, visual elements, documentation, algorithms, and other original materials, is owned by or licensed to <strong>Deepesh Garg</strong> and is protected by applicable intellectual-property laws.
          </p>
          <p style={{ marginTop: '10px' }}>
            Subject to these Terms, we grant you a limited, revocable, non-exclusive, non-transferable license to use Pocket Advisor for your personal, lawful purposes on compatible Android devices. No ownership rights are transferred to you through your use of the App.
          </p>
        </section>

        {/* Section 19 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            19. User Content and Information
          </h2>
          <p>
            You retain ownership of information and content that you provide to Pocket Advisor, subject to the rights necessary for us to operate the service. You grant us the permissions reasonably necessary to process, store, transmit, and display such information for the purpose of providing the features you have requested, including Cloud Backup and AI Copilot functionality where applicable.
          </p>
          <p style={{ marginTop: '10px' }}>
            You are responsible for ensuring that information you provide does not unlawfully infringe the rights of another person.
          </p>
        </section>

        {/* Section 20 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            20. Disclaimer of Warranties
          </h2>
          <p>
            To the maximum extent permitted by applicable law, Pocket Advisor is provided on an <strong>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</strong> basis.
          </p>
          <p style={{ marginTop: '10px' }}>
            We make no guarantee that the App or its information will be uninterrupted, error-free, completely accurate, complete, secure against every possible threat, or suitable for your particular budgeting or spending circumstances.
          </p>
          <p style={{ marginTop: '10px' }}>
            Nothing in these Terms excludes or limits any warranty, right, remedy, or protection that cannot lawfully be excluded or limited under applicable law.
          </p>
        </section>

        {/* Section 21 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            21. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, <strong>Deepesh Garg</strong> and Pocket Advisor shall not be liable for indirect, incidental, special, consequential, exemplary, or punitive losses arising from or relating to your use of, or inability to use, the App. This may include losses resulting from reliance on:
          </p>
          <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
            <li>automatically detected transaction information;</li>
            <li>budgeting calculations;</li>
            <li>debt-settlement calculations;</li>
            <li>AI-generated information;</li>
            <li>inaccurate or incomplete user-entered information;</li>
            <li>service interruptions;</li>
            <li>device failure or loss;</li>
            <li>loss of locally stored information; or</li>
            <li>third-party services.</li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            Nothing in these Terms excludes or limits liability where such exclusion or limitation is prohibited by applicable law.
          </p>
        </section>

        {/* Section 22 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            22. Indemnification
          </h2>
          <p>
            To the extent permitted by applicable law, you agree to be responsible for claims, losses, liabilities, damages, and reasonable expenses arising from your unlawful use of Pocket Advisor, your violation of these Terms, or your infringement of another person&apos;s rights.
          </p>
        </section>

        {/* Section 23 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            23. Suspension and Termination
          </h2>
          <p>
            We may suspend or terminate your access to Pocket Advisor if you materially violate these Terms, misuse the service, engage in fraudulent or unlawful activity, or create a security or operational risk.
          </p>
          <p style={{ marginTop: '10px' }}>
            You may stop using the App at any time and may delete your account in accordance with the account-deletion functionality provided in the App. Termination of access does not automatically eliminate obligations or rights that are intended to survive termination.
          </p>
        </section>

        {/* Section 24 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            24. Changes to These Terms
          </h2>
          <p>
            We may update these Terms from time to time to reflect changes to Pocket Advisor, our services, legal requirements, or other operational considerations. When we make material changes, we may provide notice through the App or another appropriate method.
          </p>
          <p style={{ marginTop: '10px' }}>
            Your continued use of Pocket Advisor after the updated Terms become effective constitutes acceptance of the revised Terms, to the extent permitted by applicable law. If you do not agree to revised Terms, you must stop using the App.
          </p>
        </section>

        {/* Section 25 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            25. Governing Law and Jurisdiction
          </h2>
          <p>
            These Terms shall be governed by and interpreted in accordance with the laws of <strong>India</strong>, subject to applicable consumer-protection and other mandatory legal rights.
          </p>
          <p style={{ marginTop: '10px' }}>
            Subject to applicable law, courts located in <strong>Delhi, India</strong> shall have jurisdiction over disputes arising out of or relating to these Terms or your use of Pocket Advisor.
          </p>
        </section>

        {/* Section 26 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            26. Severability
          </h2>
          <p>
            If any provision of these Terms is found to be invalid, unlawful, or unenforceable, that provision shall be modified or limited to the minimum extent necessary to make it enforceable, where legally permitted. The remaining provisions shall continue in full force and effect.
          </p>
        </section>

        {/* Section 27 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            27. Entire Agreement
          </h2>
          <p>
            These Terms, together with the Pocket Advisor Privacy Policy and any other terms expressly incorporated into the App, constitute the agreement between you and Pocket Advisor regarding your use of the App. If there is a conflict between these Terms and a mandatory legal requirement, the mandatory legal requirement will apply.
          </p>
        </section>

        {/* Section 28 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            28. Contact
          </h2>
          <p>
            If you have questions, concerns, or requests regarding these Terms, please contact:
          </p>
          <div style={{ marginTop: '14px', padding: '16px 20px', borderRadius: '12px', backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', display: 'inline-block' }}>
            <p style={{ margin: 0, fontWeight: 700, color: 'var(--text-primary)' }}>
              Pocket Advisor / Deepesh Garg
            </p>
            <p style={{ margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} color="var(--primary)" />
              <a href="mailto:support@pocketadvisor.in" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                support@pocketadvisor.in
              </a>
            </p>
          </div>
        </section>
      </div>

      {/* Bottom Back Action */}
      <div style={{ marginTop: '36px', textAlign: 'center' }}>
        <Button variant="secondary" size="md" onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={16} /> Back to Home
        </Button>
      </div>
    </div>
  );
};
