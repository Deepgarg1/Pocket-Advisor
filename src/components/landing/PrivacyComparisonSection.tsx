import React from 'react';
import { ShieldCheck, XCircle, CheckCircle2, Lock, Smartphone, WifiOff, FileSpreadsheet, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import './PrivacyComparisonSection.css';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.pocketadvisor.app';

interface ComparisonRow {
  feature: string;
  pocketAdvisor: string;
  cloudTrackers: string;
  icon: React.ElementType;
}

const comparisonRows: ComparisonRow[] = [
  {
    feature: 'Unsolicited Loan Calls & Spam',
    pocketAdvisor: 'ZERO loan funnels. We have no lending partners and never sell your profile to loan brokers or telemarketers.',
    cloudTrackers: 'Inundates users with pre-approved loan calls, credit card pushes, and predatory BNPL offers.',
    icon: ShieldCheck,
  },
  {
    feature: 'Where Is Your Financial Data?',
    pocketAdvisor: '100% On-Device hardware-encrypted vault. Offline-first by default with optional private cloud backup.',
    cloudTrackers: 'Mandatory upload of your complete banking history to third-party cloud servers.',
    icon: Lock,
  },
  {
    feature: 'Bank & UPI SMS Tracking',
    pocketAdvisor: 'Parsed 100% on-device in milliseconds (SBI, HDFC, ICICI, Axis, Kotak & 50+ banks). Zero SMS bytes uploaded.',
    cloudTrackers: 'Raw financial SMS feeds transmitted over external APIs and stored remotely.',
    icon: Smartphone,
  },
  {
    feature: 'Personal OTP & 2FA Codes',
    pocketAdvisor: 'Strict privacy filter drops all OTPs, personal texts & verification codes instantly in volatile memory. Never saved.',
    cloudTrackers: 'Broad inbox permissions often read and harvest non-financial messages.',
    icon: EyeOff,
  },
  {
    feature: 'Group Bill Splitting & UPI QR',
    pocketAdvisor: 'Built-in Splitwise alternative. Simplifies group debt and generates instant on-screen UPI QR codes for 1-tap settlement.',
    cloudTrackers: 'Requires separate apps (with daily limits) and tedious manual switching between UPI apps.',
    icon: FileSpreadsheet,
  },
  {
    feature: 'AI Financial Intelligence',
    pocketAdvisor: 'Smart AI Copilot monitors daily burn rate velocity and alerts you before budget overruns occur.',
    cloudTrackers: 'Static charts or credit-scoring algorithms designed to sell loan products.',
    icon: Sparkles,
  },
  {
    feature: 'Works 100% Offline',
    pocketAdvisor: 'Yes! Full expense tracking, calculators, and budgets work without internet. Syncs on sign-in.',
    cloudTrackers: 'No, requires constant internet and cloud connectivity.',
    icon: WifiOff,
  },
];

export const PrivacyComparisonSection: React.FC = () => {
  return (
    <section className="pa-comparison-section" aria-labelledby="pa-comp-heading">
      <div className="pa-comparison-container">
        <div className="pa-comparison-header">
          <div className="pa-comp-eyebrow">
            <ShieldCheck size={14} />
            <span>THE ANTI-LOAN SPYWARE PROMISE</span>
          </div>
          <h2 id="pa-comp-heading">
            Why Pocket Advisor vs. <span className="pa-gradient-text">Traditional Trackers</span>
          </h2>
          <p className="pa-comp-subtext">
            Most popular Indian expense trackers upload your banking messages, profile your spending, and sell your data
            to loan brokers. Pocket Advisor was engineered with an uncompromising promise: 100% on-device privacy, zero loan spam.
          </p>
        </div>

        <div className="pa-comparison-table-wrapper">
          <table className="pa-comparison-table">
            <thead>
              <tr>
                <th className="pa-th-feature">Privacy &amp; Security Architecture</th>
                <th className="pa-th-pocket">
                  <div className="pa-badge-highlight">
                    <Sparkles size={13} /> RECOMMENDED
                  </div>
                  <strong>Pocket Advisor</strong>
                  <small>Offline • AES-256 Room DB</small>
                </th>
                <th className="pa-th-cloud">
                  <strong>Other Expense Trackers</strong>
                  <small>Axio, Walnut, Cloud Apps</small>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => {
                const IconComponent = row.icon;
                return (
                  <tr key={idx} className={idx % 2 === 0 ? 'pa-row-even' : 'pa-row-odd'}>
                    <td className="pa-td-feature">
                      <div className="pa-feature-name">
                        <span className="pa-feature-row-icon"><IconComponent size={16} /></span>
                        <span>{row.feature}</span>
                      </div>
                    </td>
                    <td className="pa-td-pocket">
                      <div className="pa-cell-content pa-cell-check">
                        <CheckCircle2 size={18} className="pa-icon-success" />
                        <span>{row.pocketAdvisor}</span>
                      </div>
                    </td>
                    <td className="pa-td-cloud">
                      <div className="pa-cell-content pa-cell-cross">
                        <XCircle size={18} className="pa-icon-danger" />
                        <span>{row.cloudTrackers}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="pa-comparison-cta-box">
          <div className="pa-comp-cta-copy">
            <h3>Keep your finances 100% private.</h3>
            <p>Download Pocket Advisor on Google Play and automate your expense tracking today.</p>
          </div>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pa-comp-install-btn"
            aria-label="Get Pocket Advisor on Google Play"
          >
            <ShieldCheck size={17} />
            <span>Install Pocket Advisor Free</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
