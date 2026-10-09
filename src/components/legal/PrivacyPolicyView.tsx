import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Mail } from 'lucide-react';
import { Button } from '../common/Button';

interface PrivacyPolicyViewProps {
  onBack: () => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onBack }) => {
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
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
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
          <ShieldCheck size={14} /> Official Privacy & Data Policy
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 10px 0', color: 'var(--text-primary)' }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          <strong>Application:</strong> Pocket Advisor (Android) &bull; <strong>Package:</strong> <code>com.pocketadvisor.app</code> &bull; <strong>Developer/Owner:</strong> Deepesh Garg &bull; <strong>Effective Date:</strong> September 2026 &bull; <strong>Last Updated:</strong> September 2026
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
        {/* 1. Overview */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            1. Overview
          </h2>
          <p>
            Pocket Advisor (&ldquo;Pocket Advisor&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;, or the &ldquo;App&rdquo;) is an Android application developed and operated by <strong>Deepesh Garg</strong>.
          </p>
          <p style={{ marginTop: '10px' }}>
            Pocket Advisor provides personal expense tracking, budgeting, automatic transaction detection from incoming banking and payment SMS alerts, bill splitting and debt minimization, and AI-powered spending insights.
          </p>
          <p style={{ marginTop: '10px' }}>
            We follow a privacy-by-design approach and aim to minimize the collection and transmission of personal and spending information to what is reasonably necessary to provide the features you choose to use.
          </p>
          <p style={{ marginTop: '10px', color: 'var(--primary)', fontWeight: 600 }}>
            We do not sell your personal or spending information to data brokers.
          </p>
          <p style={{ marginTop: '10px' }}>
            This Privacy Policy explains what information Pocket Advisor processes, where it is processed, when it may leave your device, and how you can control or delete your information.
          </p>
          <p style={{ marginTop: '10px' }}>
            When you visit the Pocket Advisor website, Google Analytics 4 may be used to measure page views and general website usage only after you choose <strong>Accept analytics</strong>. If you reject analytics, the Google Analytics script is not loaded. Website analytics is not given access to your Pocket Advisor expense ledger, bank SMS messages, or app transaction database. You can change your choice using the website&apos;s <strong>Privacy settings</strong> control.
          </p>
        </section>

        {/* 2. Information We Process */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            2. Information We Process
          </h2>
          
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '14px 0 8px' }}>
            2.1 Account Information
          </h3>
          <p>When you create or access a Pocket Advisor account, we may process information associated with your account, including:</p>
          <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            <li>Email address</li>
            <li>Supabase authentication identifier</li>
            <li>Authentication information required to maintain your account</li>
            <li>Information associated with Google Sign-In, when you choose to use it</li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            Your authentication credentials are handled through the applicable authentication provider. Pocket Advisor does not receive or store your Google account password.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '18px 0 8px' }}>
            2.2 Spending and Expense Information
          </h3>
          <p>Pocket Advisor may process information that you enter, generate, detect, or approve within the App, including:</p>
          <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            <li>Transaction amounts</li>
            <li>Transaction dates</li>
            <li>Categories</li>
            <li>Merchant information</li>
            <li>Transaction type</li>
            <li>Notes</li>
            <li>Salary information</li>
            <li>Category spending limits and budgets</li>
            <li>Shared expenses</li>
            <li>Group information</li>
            <li>Member names</li>
            <li>Balances and calculated settlement amounts</li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            Spending information is designed to remain on your device unless you choose a feature that requires it to be uploaded or processed remotely.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '18px 0 8px' }}>
            2.3 AI Copilot Chat History
          </h3>
          <p>
            When you use the AI Copilot, Pocket Advisor may store your AI conversation history, including your questions and the AI-generated responses, in your Pocket Advisor account using Supabase.
          </p>
          <p style={{ marginTop: '10px' }}>
            Chat history may be used to provide continuity between conversations and to help generate more relevant and personalized budgeting and spending insights based on previous interactions.
          </p>
          <p style={{ marginTop: '10px' }}>
            Depending on what you ask the AI Copilot, your conversation history may contain spending, budget, or other information that you voluntarily provide. You should avoid entering sensitive information that is not necessary to receive the requested assistance.
          </p>
        </section>

        {/* 3. Local-First Storage */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            3. Local-First Storage
          </h2>
          <p>
            Pocket Advisor is designed with local-first data handling. Spending and transaction information may be stored locally on your Android device in an encrypted database.
          </p>
          <p style={{ marginTop: '10px' }}>
            Where applicable, local application data is protected using <strong>SQLCipher AES-256 database encryption</strong>.
          </p>
          <p style={{ marginTop: '10px' }}>
            Local storage allows core expense-management functionality to operate without automatically sending your spending records to our servers. However, no security measure can guarantee absolute protection against every possible security threat, device compromise, malware, unauthorized access, or data loss.
          </p>
        </section>

        {/* 4. Automatic Expense Tracking and SMS Access */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            4. Automatic Expense Tracking and SMS Access
          </h2>
          <p>
            Pocket Advisor provides an optional automatic expense-tracking feature that detects transactions directly from incoming banking, card, and UPI transaction SMS alerts on your device using Android&apos;s SMS permissions (<code>RECEIVE_SMS</code>).
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '14px 0 8px' }}>
            Explicit Permission and Control
          </h3>
          <p>
            To use this optional feature, you must explicitly grant SMS permission after reviewing our prominent in-app disclosure dialog. SMS tracking is completely optional and disabled by default. You can enable, disable, or revoke this permission at any time through the App settings or Android <strong>Settings &rarr; Apps &rarr; Pocket Advisor &rarr; Permissions</strong>.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '14px 0 8px' }}>
            100% On-Device SMS Parsing
          </h3>
          <p>
            All SMS text inspection and parsing occurs strictly locally on your Android device using an on-device rule-based parsing engine. Raw incoming SMS message text is never transmitted to, stored on, or shared with Pocket Advisor&apos;s servers, backend infrastructure, or any third party. Only the structured transaction details extracted from a bank alert (such as amount, merchant, and category) are synced or analyzed if you explicitly enable Cloud Backup (Section 5) or query the AI Advisor (Section 8).
          </p>
          <p style={{ marginTop: '10px' }}>
            Pocket Advisor only logs transaction alerts from recognized banking institutions and payment services. Personal messages, private conversations, and one-time passwords (OTPs) are immediately ignored and never stored. You can review, edit, or delete automatically detected transactions at any time within the App.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '14px 0 8px' }}>
            No Bank Credentials
          </h3>
          <div style={{ padding: '16px 20px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', color: 'var(--text-primary)', marginTop: '8px' }}>
            Pocket Advisor does <strong>NOT</strong> require or request your bank username, password, UPI PIN, ATM PIN, debit/credit card numbers, or any other banking credentials.
          </div>
        </section>

        {/* 5. Cloud Backup */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            5. Cloud Backup
          </h2>
          <p>Pocket Advisor provides an optional Cloud Backup feature. Your transaction and spending data is not automatically uploaded to our servers simply because you have an account.</p>
          <p style={{ marginTop: '10px' }}>
            Data is uploaded for Cloud Backup only when:
          </p>
          <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            <li>you are logged into your Pocket Advisor account; and</li>
            <li>you have explicitly enabled Cloud Backup.</li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            When Cloud Backup is enabled, applicable information may be uploaded to and stored using Supabase, our cloud database and infrastructure provider. Depending on the information you use within the App, this may include:
          </p>
          <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            <li>Transaction amount, category, merchant, transaction date, and transaction type</li>
            <li>Notes</li>
            <li>Salary</li>
            <li>Budget and category spending limits</li>
            <li>Other spending or budget information associated with your Pocket Advisor account</li>
          </ul>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '14px 0 8px' }}>
            Disabling Cloud Backup
          </h3>
          <p>
            You can disable Cloud Backup from the App. When you disable Cloud Backup, Pocket Advisor will stop using Cloud Backup for future synchronization. Existing cloud-backed-up data will also be deleted when Cloud Backup is disabled, according to the App&apos;s implemented deletion process.
          </p>
          <p style={{ marginTop: '10px' }}>
            Because cloud data is deleted when Cloud Backup is disabled, you should ensure that you retain any information you need on your device or through an available export before disabling the feature.
          </p>
        </section>

        {/* 6. Data Synchronization and Security */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            6. Data Synchronization and Security
          </h2>
          <p>
            When information is transmitted between Pocket Advisor and our servers, communication is protected using encrypted HTTPS/TLS connections.
          </p>
          <p style={{ marginTop: '10px' }}>
            Our backend uses Supabase and PostgreSQL security controls, including <strong>Row Level Security (RLS)</strong>, to restrict access to user records. We design our database access policies so that users cannot ordinarily access another user&apos;s private spending records.
          </p>
          <p style={{ marginTop: '10px' }}>
            Despite these measures, no internet transmission, cloud service, database, or electronic storage system can be guaranteed to be completely secure.
          </p>
        </section>

        {/* 7. Bill Splitting and Group Data */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            7. Bill Splitting and Group Data
          </h2>
          <p>
            Pocket Advisor allows users to create or participate in groups for shared expenses and debt settlement. When you participate in a group, information relevant to that group may be visible to other members of the same group. This may include:
          </p>
          <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            <li>Group name</li>
            <li>Member names</li>
            <li>Shared expenses &amp; expense amounts</li>
            <li>Balances</li>
            <li>Calculated amounts owed &amp; suggested debt settlements</li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            This information is intended to be accessible only to members of the applicable group through Pocket Advisor&apos;s access controls. You should not enter information into a group that you do not want other members of that group to see. Pocket Advisor does not guarantee the accuracy of information entered by other group members.
          </p>
        </section>

        {/* 8. AI Advisor (AI Budget Copilot) */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            8. AI Advisor (AI Budget Copilot)
          </h2>
          <p>
            Pocket Advisor provides an AI Copilot that can generate spending insights and responses. Depending on the question or feature being used, information processed by the AI Copilot may include:
          </p>
          <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            <li>Spending information &amp; category spending</li>
            <li>Monthly spending trends</li>
            <li>Budget information</li>
            <li>Expense information</li>
            <li>Debt and bill-splitting information</li>
            <li>Relevant AI Copilot chat history</li>
            <li>Other spending or budget information relevant to the user&apos;s request</li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            The information sent to the AI service may vary depending on the question. In some cases, Pocket Advisor may send transaction-level information; in other cases, it may send aggregated or high-level spending summaries.
          </p>
          <p style={{ marginTop: '10px' }}>
            Pocket Advisor uses <strong>Google Gemini</strong> for AI processing. Your AI request is processed through Pocket Advisor&apos;s backend infrastructure, including a Deno Edge Function, before being sent to Google Gemini where required.
          </p>
          <p style={{ marginTop: '10px' }}>
            We do not intentionally send bank passwords, UPI PINs, authentication passwords, or personal identity documents to the AI model. However, information necessary to answer your request may be transmitted to Google Gemini.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '14px 0 8px' }}>
            AI provider data handling
          </h3>
          <p>
            Google&apos;s handling of Gemini API data is governed by the applicable Google terms, policies, and configuration of the AI service used by Pocket Advisor. Because third-party service retention and processing practices can change, we do not promise that information sent to an AI provider is subject to a particular retention period unless expressly stated in this Privacy Policy.
          </p>
          <p style={{ marginTop: '10px' }}>
            You should therefore avoid submitting information to the AI Copilot that you do not want processed by an external AI service. For information about Google&apos;s current Gemini API data handling, users should review Google&apos;s applicable documentation and privacy terms.
          </p>
          <p style={{ marginTop: '10px', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
            The AI Advisor provides informational budgeting and spending summaries only and does not provide regulated investment, tax, or loan advice.
          </p>
        </section>

        {/* 9. Advertising and Google AdMob */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            9. Advertising and Google AdMob
          </h2>
          <p>
            The free/freemium version of Pocket Advisor displays advertisements through <strong>Google AdMob</strong>. Pocket Advisor may use multiple supported advertising formats, depending on the current version of the App.
          </p>
          <p style={{ marginTop: '10px' }}>
            AdMob and related Google advertising technologies may process information such as advertising identifiers, device information, IP address, diagnostic information, and interaction information for purposes including advertising, measurement, fraud prevention, and related services.
          </p>
          <p style={{ marginTop: '10px' }}>
            Pocket Advisor does not intentionally provide your bank account numbers, transaction notes, or private spending ledger records to AdMob or another advertising network for advertising purposes. Advertising-related data is handled by Google according to Google&apos;s applicable policies and technologies.
          </p>
          <p style={{ marginTop: '10px' }}>
            Where applicable, Pocket Advisor provides users with choices regarding personalized advertising and consent. Users may choose to receive non-personalized advertising or manage applicable advertising preferences where those choices are available. For users in jurisdictions requiring consent for personalized advertising, Pocket Advisor uses the applicable consent mechanism required for the advertising service.
          </p>
        </section>

        {/* 10. Pocket Advisor Pro */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            10. Pocket Advisor Pro
          </h2>
          <p>
            Pocket Advisor may offer a paid Premium subscription known as <strong>Pocket Advisor Pro</strong>. Pocket Advisor Pro is provided through <strong>Google Play Billing</strong>.
          </p>
          <p style={{ marginTop: '10px' }}>
            Premium users receive an ad-free experience and other Premium features identified within the App. Pocket Advisor does not directly receive or store your full Google Play payment credentials. Payment and subscription transactions are handled through Google Play and are subject to Google&apos;s applicable terms and policies.
          </p>
          <p style={{ marginTop: '10px' }}>
            You may cancel your subscription through Google Play. Cancellation generally prevents future renewal but does not necessarily provide a refund for the unused portion of a billing period. Refunds are subject to applicable law and Google Play&apos;s applicable policies and procedures.
          </p>
        </section>

        {/* 11. Third-Party Services */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            11. Third-Party Services
          </h2>
          <p>Pocket Advisor relies on certain third-party services to provide and operate parts of the application. These may include:</p>
          <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            <li><strong>Supabase</strong> &mdash; authentication, database, and Cloud Backup infrastructure</li>
            <li><strong>Google Gemini</strong> &mdash; AI Copilot processing</li>
            <li><strong>Google Firebase Analytics &amp; Crashlytics</strong> &mdash; application performance monitoring, crash reporting, and anonymous usage statistics to improve the App</li>
            <li><strong>Google AdMob</strong> &mdash; advertising for free/freemium users</li>
            <li><strong>Google Play</strong> &mdash; application distribution and Premium subscription billing</li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            These providers may process information necessary to provide their respective services. Pocket Advisor does not control the independent privacy practices of third-party providers. Their processing may be subject to their own terms, privacy policies, and applicable legal requirements. You should review the privacy policies of relevant third-party providers for more information about their processing practices.
          </p>
        </section>

        {/* 12. How We Use Information */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            12. How We Use Information
          </h2>
          <p>We may use information processed through Pocket Advisor to:</p>
          <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            <li>create and authenticate user accounts;</li>
            <li>provide expense tracking and budgeting functionality;</li>
            <li>detect and organize supported payment transactions;</li>
            <li>synchronize information when Cloud Backup is enabled;</li>
            <li>provide bill splitting and debt calculations;</li>
            <li>generate AI Copilot responses and spending insights;</li>
            <li>use relevant AI conversation history to provide continuity and personalized budgeting and spending insights;</li>
            <li>provide Premium features;</li>
            <li>display advertisements to free/freemium users;</li>
            <li>maintain and secure the App;</li>
            <li>detect and prevent abuse, fraud, or unauthorized access;</li>
            <li>troubleshoot technical problems;</li>
            <li>improve reliability and functionality; and</li>
            <li>comply with applicable legal obligations.</li>
          </ul>
          <p style={{ marginTop: '10px', fontWeight: 600 }}>
            We do not sell your personal or spending information to data brokers.
          </p>
        </section>

        {/* 13. Data Retention */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            13. Data Retention
          </h2>
          <p>
            We retain information for as long as reasonably necessary to provide the services you use, maintain your account, comply with legal obligations, resolve disputes, enforce our agreements, and protect the security of our services.
          </p>
          <p style={{ marginTop: '10px' }}>
            Data stored through Cloud Backup and AI Copilot chat history is associated with your Pocket Advisor account. If you delete your Pocket Advisor account, we intend to permanently delete the personal and spending information associated with that account, including applicable Cloud Backup data and AI Copilot chat history.
          </p>
          <p style={{ marginTop: '10px' }}>
            Some deletion processes may require a reasonable period to complete across systems and backups. Where information must be retained to satisfy a legal obligation, prevent fraud, resolve a dispute, or protect our legal rights, that information may be retained only for the period reasonably necessary for that purpose.
          </p>
        </section>

        {/* 14. Account and Data Deletion */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            14. Account and Data Deletion
          </h2>
          <p>
            You can delete your Pocket Advisor account from within the App. If you have uninstalled the App, you can also permanently delete your account and associated data via our Verified Web Deletion Portal or by contacting <a href="mailto:privacy@pocketadvisor.in" style={{ color: 'var(--primary)', fontWeight: 600 }}>privacy@pocketadvisor.in</a>. When your account deletion request is completed, we intend to permanently delete your associated personal and spending data, including:
          </p>
          <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            <li>Account information</li>
            <li>Cloud-backed transactions</li>
            <li>Salary information</li>
            <li>Budget information</li>
            <li>Applicable group-related information associated with your account</li>
            <li>AI Copilot conversation history</li>
            <li>Other personal spending records associated with the account</li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            Account deletion may be irreversible. You should export any information you wish to retain before requesting account deletion.
          </p>
        </section>

        {/* 15. Data Export and Access */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            15. Data Export and Access
          </h2>
          <p>
            Pocket Advisor provides functionality allowing users to export applicable account and spending information. You may use the available export functionality to obtain a copy of your records.
          </p>
          <p style={{ marginTop: '10px' }}>
            You may also contact us regarding questions or requests concerning your personal information, subject to applicable law and reasonable verification requirements.
          </p>
        </section>

        {/* 16. Your Privacy Choices */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            16. Your Privacy Choices
          </h2>
          <p>Depending on the features you use, you may have control over your information through the App, including the ability to:</p>
          <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            <li>choose whether to enable SMS Access for automatic transaction detection;</li>
            <li>use Pocket Advisor without enabling Cloud Backup;</li>
            <li>enable or disable Cloud Backup;</li>
            <li>review, edit, or delete detected transactions;</li>
            <li>export applicable data;</li>
            <li>delete your account;</li>
            <li>manage applicable advertising preferences; and</li>
            <li>choose whether to use the AI Copilot.</li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            Some features may not function if the information or permission required for that feature is unavailable.
          </p>
        </section>

        {/* 17. Children's Privacy */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            17. Children&apos;s Privacy
          </h2>
          <p>
            Pocket Advisor is intended for individuals <strong>18 years of age or older</strong>. We do not knowingly provide the service to children under 18. If you believe that a person under 18 has provided personal information to Pocket Advisor, please contact us so that appropriate action can be considered.
          </p>
        </section>

        {/* 18. International Availability */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            18. International Availability
          </h2>
          <p>
            Pocket Advisor is initially intended primarily for users in <strong>India</strong> but may be made available to users in other countries or regions. If you access Pocket Advisor from outside India, you are responsible for ensuring that your use of the App complies with applicable local laws.
          </p>
          <p style={{ marginTop: '10px' }}>
            Privacy rights and requirements may differ depending on your location. Where applicable law provides additional privacy rights, we will handle applicable requests in accordance with those requirements.
          </p>
        </section>

        {/* 19. Security */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            19. Security
          </h2>
          <p>
            We take reasonable technical and organizational measures designed to protect personal and spending information against unauthorized access, alteration, disclosure, or destruction. These measures include, where applicable:
          </p>
          <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            <li>encrypted local database storage (SQLCipher AES-256);</li>
            <li>encrypted HTTPS/TLS communication;</li>
            <li>authentication controls;</li>
            <li>Supabase/PostgreSQL Row Level Security;</li>
            <li>restricted backend access; and</li>
            <li>access controls for account and group information.</li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            However, no security system is completely immune from unauthorized access, technical failures, malware, device compromise, or other security incidents.
          </p>
        </section>

        {/* 20. Changes to This Privacy Policy */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            20. Changes to This Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes to Pocket Advisor, our data-processing practices, third-party services, legal requirements, or other operational changes.
          </p>
          <p style={{ marginTop: '10px' }}>
            When material changes are made, we may provide notice through the App, our website, or another appropriate method. The updated Privacy Policy will become effective on the date stated at the beginning of the revised policy.
          </p>
        </section>

        {/* 21. Contact Us */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            21. Contact Us
          </h2>
          <p>
            If you have questions, concerns, or requests regarding this Privacy Policy or the handling of your personal information, contact:
          </p>
          <div style={{ marginTop: '14px', padding: '16px 20px', borderRadius: '12px', backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', display: 'inline-block' }}>
            <p style={{ margin: 0, fontWeight: 700, color: 'var(--text-primary)' }}>
              Deepesh Garg
            </p>
            <p style={{ margin: '2px 0 0', color: 'var(--text-secondary)' }}>
              Pocket Advisor
            </p>
            <p style={{ margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} color="var(--primary)" />
              <a href="mailto:privacy@pocketadvisor.in" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                privacy@pocketadvisor.in
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
