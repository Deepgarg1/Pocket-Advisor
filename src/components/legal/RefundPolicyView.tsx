import React, { useEffect } from 'react';
import {
  ArrowLeft,
  RotateCcw,
  AlertTriangle,
  Mail,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
  Smartphone,
  CreditCard,
  Landmark,
  Gift,
  CheckCircle2,
  Scale,
} from 'lucide-react';
import { Button } from '../common/Button';

interface RefundPolicyViewProps {
  onBack: () => void;
}

export const RefundPolicyView: React.FC<RefundPolicyViewProps> = ({ onBack }) => {
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '30px 24px 80px' }}>
      {/* Top Back Navigation & Breadcrumb */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
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

        <nav aria-label="Breadcrumb" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span style={{ cursor: 'pointer' }} onClick={onBack}>Home</span>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Refund Policy</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(99, 102, 241, 0.06) 100%)',
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
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            color: '#10b981',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '16px',
            border: '1px solid rgba(16, 185, 129, 0.25)',
          }}
        >
          <RotateCcw size={14} /> Official Customer Guarantee &amp; Policy
        </div>

        <h1
          style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '0 0 10px 0',
            color: 'var(--text-primary)',
          }}
        >
          Cancellation &amp; Refund Policy
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          <strong>Application:</strong> Pocket Advisor (Android) &bull; <strong>Effective Date:</strong> September 2026 &bull; <strong>Owner:</strong> Deepesh Garg
        </p>
      </div>

      {/* Quick Summary Highlights */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          marginBottom: '36px',
        }}
      >
        <div
          style={{
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 700, fontSize: '0.9rem', marginBottom: '8px' }}>
            <Sparkles size={16} /> 100% Free Core Tools
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
            All web utilities (Bill Splitter, Prepayment vs. SIP Calculator, EMI Amortization) and core Android tracker features are entirely free with zero charges.
          </p>
        </div>

        <div
          style={{
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6366f1', fontWeight: 700, fontSize: '0.9rem', marginBottom: '8px' }}>
            <Clock size={16} /> Cancel Anytime in 1 Tap
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
            Subscriptions can be cancelled at any moment via Google Play with immediate effect for subsequent renewal periods.
          </p>
        </div>

        <div
          style={{
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0ea5e9', fontWeight: 700, fontSize: '0.9rem', marginBottom: '8px' }}>
            <ShieldCheck size={16} /> Google Play Protected
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
            Purchases are safeguarded by Google Play's 48-hour consumer refund framework, plus direct developer support for billing errors.
          </p>
        </div>
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
            1. Overview &amp; Scope
          </h2>
          <p>
            At Pocket Advisor (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), operated by Deepesh Garg, we strive to build transparent, mathematically rigorous personal finance and bill-splitting software. This Cancellation &amp; Refund Policy outlines the terms governing digital purchases, subscription services, cancellation rights, and refund procedures for the Pocket Advisor Android mobile application (Package: <code style={{ color: 'var(--text-primary)' }}>com.pocketadvisor.app</code>) and associated online services.
          </p>
          <p style={{ marginTop: '10px' }}>
            Please review this policy before purchasing any paid digital features or subscriptions. By completing a transaction through the App or associated platforms, you agree to the terms laid out below.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            2. Free Services &amp; No Hidden Charges
          </h2>
          <p>
            The majority of Pocket Advisor&rsquo;s capabilities are offered completely free of charge, including:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>Our complete suite of interactive web spending tools (Quick Bill Splitter, Flatmates Rent Splitter, Home Loan Prepayment vs. SIP Calculator, Step-Up SIP Calculator, and Loan EMI Amortization);</li>
            <li>Core Android expense tracking, on-device bank SMS detection, category analytics, and greedy bipartite debt minimization splits;</li>
            <li>Educational personal finance and roommates problem-solving guides.</li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            We do not collect payment details, credit cards, or subscription fees to access these free features. No unexpected charges will ever be levied for standard use.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            3. Premium Subscriptions &amp; Google Play Billing
          </h2>
          <p>
            Pocket Advisor may offer optional paid subscriptions (&ldquo;Pocket Advisor Pro&rdquo; / &ldquo;Premium&rdquo;) that grant access to enhanced digital perks, such as an ad-free interface, advanced AI Copilot insights, and custom reporting capabilities.
          </p>
          <p style={{ marginTop: '10px' }}>
            All in-app purchases and subscriptions are processed exclusively through <strong>Google Play Billing</strong> (operated by Google LLC). Consequently:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>Pocket Advisor never sees, stores, or handles your payment credentials, credit/debit card numbers, UPI PINs, or bank account information;</li>
            <li>All transactions, recurring subscriptions, and payment methods are managed directly within your personal Google Play Account;</li>
            <li>Pricing, billing cycles (e.g., monthly, quarterly, annual), and applicable taxes (including Goods and Services Tax / GST) are clearly itemized on Google Play&rsquo;s confirmation screen prior to payment authorization.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            4. How to Cancel Your Subscription
          </h2>
          <p>
            You have full freedom to cancel your Pocket Advisor subscription at any time. Because billing is managed by Google Play, cancellations must be completed through your Google Account:
          </p>
          <div
            style={{
              padding: '20px',
              borderRadius: '16px',
              backgroundColor: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              marginTop: '12px',
              marginBottom: '12px',
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 10px 0' }}>
              Step-by-Step Cancellation via Android Device:
            </h3>
            <ol style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Open the <strong>Google Play Store</strong> application on your Android smartphone or tablet.</li>
              <li>Tap your <strong>Profile Icon</strong> located in the top-right corner.</li>
              <li>Select <strong>Payments &amp; subscriptions</strong>, then tap <strong>Subscriptions</strong>.</li>
              <li>Locate and select <strong>Pocket Advisor</strong>.</li>
              <li>Tap <strong>Cancel subscription</strong> at the bottom of the screen.</li>
              <li>Select a reason if prompted, then confirm by tapping <strong>Cancel subscription</strong>.</li>
            </ol>
          </div>
          <p style={{ marginTop: '10px' }}>
            You may also manage or cancel subscriptions online on your computer by visiting{' '}
            <a
              href="https://play.google.com/store/account/subscriptions"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              play.google.com/store/account/subscriptions <ExternalLink size={13} />
            </a>.
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '14px 16px',
              borderRadius: '12px',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              marginTop: '14px',
            }}
          >
            <AlertTriangle size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: '3px' }} />
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Important Notice:</strong> Simply uninstalling, removing, or deleting the Pocket Advisor mobile application from your phone does <em>not</em> cancel an active subscription. You must explicitly cancel it via Google Play Subscriptions to prevent subsequent automatic renewals.
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            5. Effect of Cancellation
          </h2>
          <p>
            When you cancel a subscription:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li><strong>No Future Charges:</strong> You will not be charged for any future recurring billing cycles;</li>
            <li><strong>Continuous Access:</strong> You will retain uninterrupted access to all paid Premium/Pro benefits until the end of your prepaid billing period;</li>
            <li><strong>Data Preservation:</strong> Your spending history, offline databases, and account records will remain intact. Your account will automatically revert to the standard free tier upon expiration.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            6. Refund Eligibility &amp; Windows
          </h2>
          <p>
            We adhere to the standard consumer protection terms established by Google Play, supplemented by our own fair-resolution commitment:
          </p>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '16px', marginBottom: '8px' }}>
            A. Standard 48-Hour Google Play Window
          </h3>
          <p>
            If less than 48 hours have passed since you were charged for an in-app purchase or subscription:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>You can request a direct automated refund via Google Play&rsquo;s Self-Service Portal at{' '}
              <a
                href="https://support.google.com/googleplay/workflow/9814051"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}
              >
                Google Play Refund Workflow
              </a>;
            </li>
            <li>Google typically delivers a decision within 1 to 4 business days.</li>
          </ul>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '20px', marginBottom: '8px' }}>
            B. Direct Developer Review (After 48 Hours)
          </h3>
          <p>
            If more than 48 hours have passed, Google Play may direct you to contact the developer. We review refund requests on a fair, case-by-case basis under the following eligible conditions:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li><strong>Technical Malfunction:</strong> The Pro features failed to activate or unlock despite verified payment deduction, and our support team is unable to resolve the defect within 48 hours;</li>
            <li><strong>Accidental Duplicate Purchases:</strong> Multiple charges were erroneously triggered for the identical billing interval on the same Google Play account;</li>
            <li><strong>Unauthorized Transactions:</strong> Fraudulent or unauthorized usage, provided the incident is verified with Google Play support and reported within 14 days of transaction occurrence.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            7. Non-Refundable Circumstances
          </h2>
          <p>
            Refunds will generally not be granted in the following situations:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>Requests submitted for a previous billing month where the subscription was fully active, accessed, and utilized without reported technical defects;</li>
            <li>Failure to cancel an unwanted recurring subscription prior to the scheduled auto-renewal date;</li>
            <li>Dissatisfaction with features that are freely available for testing or clearly documented prior to purchase;</li>
            <li>Accounts suspended or terminated due to violation of our Terms &amp; Conditions or fraudulent manipulation of app features.</li>
          </ul>
        </section>

        {/* Section 8: Formatted Settlement Timeline */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            8. Refund Processing Times &amp; Payout Methods
          </h2>
          <p>
            Once a refund is approved by Google Play or Pocket Advisor, the funds are automatically routed back to the original payment source utilized during the initial checkout.
          </p>
          <p style={{ marginTop: '10px', marginBottom: '16px' }}>
            Standard settlement timelines per payment method and banking clearing rules:
          </p>

          {/* Formatted Settlement Timeline Container */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderRadius: '18px',
              border: '1px solid var(--border-subtle)',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              marginBottom: '16px',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(220px, 1.4fr) minmax(180px, 1fr)',
                padding: '14px 20px',
                borderBottom: '1px solid var(--border-subtle)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              <div>Payment Method</div>
              <div>Typical Refund Processing Time</div>
            </div>

            {/* Row 1: UPI */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(220px, 1.4fr) minmax(180px, 1fr)',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: '1px solid var(--border-subtle)',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Smartphone size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.94rem' }}>
                    UPI (Google Pay, PhonePe, Paytm)
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Direct bank settlement via NPCI UPI network
                  </div>
                </div>
              </div>
              <div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    color: '#10b981',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                  }}
                >
                  <Clock size={13} /> 1 to 5 business days
                </span>
              </div>
            </div>

            {/* Row 2: Credit / Debit Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(220px, 1.4fr) minmax(180px, 1fr)',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: '1px solid var(--border-subtle)',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(99, 102, 241, 0.12)',
                    color: '#818cf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <CreditCard size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.94rem' }}>
                    Credit or Debit Cards
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Visa, Mastercard, RuPay &amp; American Express
                  </div>
                </div>
              </div>
              <div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(99, 102, 241, 0.12)',
                    color: '#818cf8',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    border: '1px solid rgba(99, 102, 241, 0.25)',
                    flexWrap: 'wrap',
                  }}
                >
                  <Clock size={13} /> 3 to 10 business days <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}>(varies by bank)</span>
                </span>
              </div>
            </div>

            {/* Row 3: Net Banking */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(220px, 1.4fr) minmax(180px, 1fr)',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: '1px solid var(--border-subtle)',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(14, 165, 233, 0.12)',
                    color: '#38bdf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Landmark size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.94rem' }}>
                    Net Banking
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    SBI, HDFC, ICICI, Axis &amp; major Indian scheduled banks
                  </div>
                </div>
              </div>
              <div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(14, 165, 233, 0.12)',
                    color: '#38bdf8',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    border: '1px solid rgba(14, 165, 233, 0.25)',
                  }}
                >
                  <Clock size={13} /> 4 to 10 business days
                </span>
              </div>
            </div>

            {/* Row 4: Google Play Balance */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(220px, 1.4fr) minmax(180px, 1fr)',
                alignItems: 'center',
                padding: '16px 20px',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(245, 158, 11, 0.12)',
                    color: '#fbbf24',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Gift size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.94rem' }}>
                    Google Play Balance / Gift Cards
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Instant Play balance credit &amp; gift card re-credit
                  </div>
                </div>
              </div>
              <div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(245, 158, 11, 0.12)',
                    color: '#fbbf24',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    border: '1px solid rgba(245, 158, 11, 0.25)',
                  }}
                >
                  <Sparkles size={13} /> Within 1 business day
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              fontSize: '0.84rem',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
            }}
          >
            <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>
              <strong>Bank Reference Tip:</strong> If your refund has been marked approved in Google Payments but has not appeared in your bank account after 10 business days, contact your bank and quote the ARN (Acquirer Reference Number) listed on your Google Play transaction invoice.
            </span>
          </div>
        </section>

        {/* Section 9 */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            9. Statutory Consumer Rights
          </h2>
          <p>
            Nothing contained in this Cancellation &amp; Refund Policy diminishes, limits, or overrides your statutory consumer rights under applicable Indian consumer laws, including the Consumer Protection Act, 2019 and the Consumer Protection (E-Commerce) Rules, 2020, or corresponding consumer protection statutes in your jurisdiction.
          </p>
        </section>

        {/* Section 10: How to Request Assistance */}
        <section
          style={{
            padding: '24px',
            borderRadius: '16px',
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={18} color="var(--primary)" /> 10. Contacting Customer Support for Refund Inquiries
          </h2>
          <p style={{ margin: '0 0 12px 0' }}>
            If you need assistance with an unexpected charge, billing discrepancy, or refund claim, our support team is available to assist you directly:
          </p>
          <ul style={{ paddingLeft: '20px', margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li><strong>Support Desk Email:</strong> <a href="mailto:support@pocketadvisor.in" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>support@pocketadvisor.in</a></li>
            <li><strong>Official Contact Form:</strong> <a href="/contact" onClick={(e) => { e.preventDefault(); onBack(); window.location.hash = '#/contact'; }} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>pocketadvisor.in/contact</a></li>
            <li><strong>Required Information for Fast Processing:</strong>
              <ul style={{ paddingLeft: '18px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>Your Google Play Order Number (e.g., <code style={{ color: 'var(--text-primary)' }}>GPA.1234-5678-9012-34567</code>);</li>
                <li>The Google account email address associated with the purchase;</li>
                <li>A concise description of the billing error or technical reason for the request.</li>
              </ul>
            </li>
          </ul>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            We typically respond to customer refund inquiries within <strong>24 business hours</strong>.
          </p>
        </section>

        {/* Section 11: Grievance Redressal Mechanism */}
        <section
          style={{
            padding: '24px',
            borderRadius: '16px',
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Scale size={18} color="var(--primary)" /> 11. Grievance Redressal Mechanism
          </h2>
          <p style={{ margin: '0 0 16px 0', lineHeight: 1.6 }}>
            In accordance with the <strong>Consumer Protection Act, 2019</strong> and the <strong>Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021</strong>, the contact details of the Grievance Officer for dispute resolution and policy escalation are provided below:
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>
                Grievance Officer
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Deepesh Garg
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Grievance Officer &amp; App Developer
              </div>
            </div>

            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>
                Email
              </div>
              <div>
                <a
                  href="mailto:support@pocketadvisor.in?subject=Grievance%20Redressal%20Escalation"
                  style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--primary)', textDecoration: 'none' }}
                >
                  support@pocketadvisor.in
                </a>
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Include &quot;Grievance Escalation&quot; in subject
              </div>
            </div>

            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>
                Address &amp; Jurisdiction
              </div>
              <div style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                New Delhi, Delhi - 110044, India
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Pocket Advisor Operations
              </div>
            </div>

            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>
                Turnaround Time
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#10b981' }}>
                Acknowledged within 48 hours
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Strive to resolve disputes within 30 days of formal receipt
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Back Button */}
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <Button variant="secondary" onClick={onBack}>
          <ArrowLeft size={16} /> Return to Homepage
        </Button>
      </div>
    </div>
  );
};
