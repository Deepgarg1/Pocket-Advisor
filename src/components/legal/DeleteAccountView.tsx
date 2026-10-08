import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trash2, AlertTriangle, CheckCircle2, Mail, Users, AlertOctagon, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../common/Button';
import { supabase, isSupabaseConfigured } from '../../config/supabase';

interface DeleteAccountViewProps {
  onBack: () => void;
}

type DeletionStep = 'email' | 'otp' | 'success';

export const DeleteAccountView: React.FC<DeleteAccountViewProps> = ({ onBack }) => {
  const [step, setStep] = useState<DeletionStep>('email');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    return () => cancelAnimationFrame(handle);
  }, [step]);

  // Step 1: Send OTP to genuine email address
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      if (!isSupabaseConfigured) {
        setErrorMsg('Account deletion portal is temporarily unavailable. Please delete your account in the Android app (Settings → Danger Zone) or contact support@pocketadvisor.in');
        setLoading(false);
        return;
      }

      // Attempt to send OTP only to existing accounts
      const { error } = await supabase.auth.signInWithOtp({
        email: cleanEmail,
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) {
        if (error.message.toLowerCase().includes('user not found') || error.message.toLowerCase().includes('signups not allowed')) {
          setErrorMsg('No Pocket Advisor account found with this email address.');
          setLoading(false);
          return;
        }
        throw error;
      }

      // Advance to OTP verification
      setStep('otp');
    } catch (err: any) {
      console.error('Failed to send deletion OTP:', err);
      setErrorMsg(err.message || 'Unable to send verification code. Please check your email or try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify genuine ownership with OTP & execute deletion
  const handleVerifyAndDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (confirmText.trim().toUpperCase() !== 'DELETE') {
      setErrorMsg('Please type "DELETE" to confirm your request.');
      return;
    }

    if (!otpCode.trim() || otpCode.trim().length < 6) {
      setErrorMsg('Please enter the 6-digit verification code sent to your email.');
      return;
    }

    setLoading(true);

    try {
      if (!isSupabaseConfigured) {
        setErrorMsg('Account deletion portal is temporarily unavailable. Please delete your account in the Android app or contact support@pocketadvisor.in');
        setLoading(false);
        return;
      }

      // 1. Verify OTP with Supabase Auth
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: otpCode.trim(),
        type: 'email',
      });

      if (error || !data.session) {
        setErrorMsg('Invalid or expired verification code. Please check your inbox or request a new code.');
        setLoading(false);
        return;
      }

      // 2. Call the server-side delete-account edge function with the authenticated JWT
      const { error: funcError } = await supabase.functions.invoke('delete-account');
      if (funcError) {
        let errorMessage = funcError.message || 'Account deletion could not be completed.';
        if ('context' in funcError && (funcError as any).context instanceof Response) {
          try {
            const errJson = await (funcError as any).context.clone().json();
            if (errJson?.error) {
              errorMessage = errJson.error;
            }
          } catch {
            // Keep existing errorMessage
          }
        }
        throw new Error(errorMessage);
      }

      // Sign out any active session
      await supabase.auth.signOut();

      setStep('success');
    } catch (err: any) {
      console.error('Failed to verify deletion request:', err);
      setErrorMsg(err.message || 'Verification failed. Please check the code and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      if (!isSupabaseConfigured) {
        setErrorMsg('Account deletion portal is temporarily unavailable.');
        return;
      }
      await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: { shouldCreateUser: false },
      });
      alert(`A new verification code has been dispatched to ${email}.`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to resend code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '30px 24px 80px' }}>
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
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(244, 63, 94, 0.05) 100%)',
          borderRadius: '24px',
          border: '1px solid rgba(239, 68, 68, 0.25)',
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
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            color: '#ef4444',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '16px',
          }}
        >
          <AlertTriangle size={14} /> Official Account & Data Deletion Portal
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 10px 0', color: 'var(--text-primary)' }}>
          Account &amp; Data Deletion
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '0 0 8px 0', lineHeight: 1.6 }}>
          <strong>Application:</strong> Pocket Advisor (Android) &bull; <strong>Developer:</strong> Deepesh Garg &bull; <strong>Contact:</strong> <a href="mailto:privacy@pocketadvisor.in" style={{ color: 'var(--primary)', fontWeight: 600 }}>privacy@pocketadvisor.in</a>
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
          Request permanent deletion of your Pocket Advisor account and associated personal data stored on our servers.
        </p>
      </div>

      {/* Main Container */}
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
        {/* What Happens When You Delete Your Account */}
        <section>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
            What Happens When You Delete Your Account
          </h2>
          <p>
            When you request account deletion, Pocket Advisor permanently deletes the personal and expense information associated with your account from our systems, subject to any limited retention required by applicable law.
          </p>
          <p style={{ marginTop: '10px' }}>This includes:</p>
          <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            <li>Your Supabase authentication record and associated email address.</li>
            <li>Your personal expense transactions.</li>
            <li>Your category budgets and spending limits.</li>
            <li>Your salary and other personal budget information.</li>
            <li>Your shopping items.</li>
            <li>Your AI Copilot chat history and associated conversation data.</li>
            <li>Other personal records associated with your Pocket Advisor account.</li>
          </ul>

          {/* Shared Bill-Splitting Data */}
          <div style={{ marginTop: '20px', padding: '18px 22px', borderRadius: '14px', backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} color="var(--primary)" /> Shared Bill-Splitting Data
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
              Information belonging to shared groups may require different handling because it can also belong to other group members. Your membership and personal association with shared groups will be <strong>decoupled and anonymized where necessary</strong>, while information that belongs to or is required by other group members may remain available to those members. Your deleted account will no longer have access to the associated groups or their data.
            </p>
          </div>

          {/* Irreversible Deletion */}
          <div style={{ marginTop: '14px', padding: '18px 22px', borderRadius: '14px', backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ef4444', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertOctagon size={18} /> Irreversible Deletion
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Account deletion is <strong>permanent and irreversible</strong>. Once the deletion process has been completed, your deleted account and associated personal data cannot be recovered. You should export any information you wish to retain before requesting deletion.
            </p>
          </div>
        </section>

        {/* Option 1: Instant In-App Deletion */}
        <section style={{ backgroundColor: 'var(--bg-surface-elevated)', padding: '24px 28px', borderRadius: '18px', border: '1px solid var(--border-subtle)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 10px 0' }}>
            Option 1: Instant In-App Deletion
          </h2>
          <p style={{ margin: '0 0 14px 0', fontSize: '0.92rem' }}>
            You can delete your account directly inside the Pocket Advisor Android app without submitting a web ticket.
          </p>
          <div style={{ padding: '14px 18px', borderRadius: '12px', backgroundColor: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', fontSize: '0.9rem', lineHeight: 1.7 }}>
            <p style={{ margin: 0 }}>
              Navigate to: <strong>Settings &rarr; Danger Zone &rarr; Reset &amp; Delete Account</strong>
            </p>
            <p style={{ margin: '6px 0 0' }}>
              You will be asked to enter: <strong>DELETE</strong> and confirm the deletion request.
            </p>
            <p style={{ margin: '6px 0 0', color: 'var(--text-secondary)' }}>
              Once confirmed, the account-deletion process will begin immediately.
            </p>
          </div>
        </section>

        {/* Option 2: Web Deletion Request Portal with Ownership Verification */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <ShieldCheck size={22} color="var(--primary)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Option 2: Verified Web Deletion Portal
            </h2>
          </div>
          <p style={{ marginBottom: '18px', fontSize: '0.92rem' }}>
            To protect your data against unauthorized requests by third parties, we verify account ownership via a secure 6-digit one-time passcode (OTP) delivered to your registered inbox before purging records.
          </p>

          {/* Error Banner */}
          {errorMsg && (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '14px 16px',
                borderRadius: '12px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                fontSize: '0.9rem',
                marginBottom: '18px',
              }}
            >
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Enter Email & Send OTP */}
          {step === 'email' && (
            <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Registered Email Address
                </label>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 8px 0' }}>
                  Enter the email address associated with your Pocket Advisor account.
                </p>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    required
                    placeholder="your-email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontSize: '0.95rem',
                    }}
                  />
                  <Mail
                    size={18}
                    color="var(--text-secondary)"
                    style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                </div>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
                * We will send a 6-digit confirmation passcode to verify that you are the genuine account owner.
              </p>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading || !email.includes('@')}
                style={{ marginTop: '4px' }}
              >
                {loading ? 'Sending Verification Code...' : 'Send Verification Code (OTP)'}
              </Button>
            </form>
          )}

          {/* STEP 2: Enter OTP & Confirm DELETE */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyAndDelete} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  A 6-digit security code was dispatched to <strong>{email}</strong>. Please check your inbox and spam folder.
                </p>
                <div style={{ marginTop: '8px', display: 'flex', gap: '12px', fontSize: '0.82rem' }}>
                  <button
                    type="button"
                    onClick={() => { setStep('email'); setErrorMsg(null); }}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: 0, fontWeight: 600 }}
                  >
                    Change Email
                  </button>
                  <span style={{ color: 'var(--text-secondary)' }}>•</span>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={loading}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: 0, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <RefreshCw size={12} /> Resend Code
                  </button>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  6-Digit Verification Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="e.g. 123456"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '1.2rem',
                    letterSpacing: '0.3em',
                    fontWeight: 700,
                    textAlign: 'center',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Final Confirmation
                </label>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 8px 0' }}>
                  Type <strong>DELETE</strong> to confirm that you want to permanently delete your account.
                </p>
                <input
                  type="text"
                  required
                  placeholder="DELETE"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                  }}
                />
              </div>

              <Button
                type="submit"
                variant="danger"
                size="lg"
                disabled={loading || otpCode.length < 6 || confirmText.trim().toUpperCase() !== 'DELETE'}
                style={{ marginTop: '4px' }}
              >
                <Trash2 size={18} /> {loading ? 'Verifying & Purging...' : 'Verify Code & Permanently Delete Account'}
              </Button>
            </form>
          )}

          {/* STEP 3: Successful Deletion */}
          {step === 'success' && (
            <div
              style={{
                padding: '32px 24px',
                borderRadius: '18px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                textAlign: 'center',
              }}
            >
              <CheckCircle2 size={48} color="#10b981" style={{ marginBottom: '14px' }} />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#10b981', margin: '0 0 10px 0' }}>
                Account &amp; Data Permanently Deleted
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '0 0 16px 0', lineHeight: 1.6 }}>
                Ownership of <strong>{email}</strong> was successfully verified. Your Supabase authentication record, cloud expense records, budgets, shopping items, and AI Copilot history have been permanently purged from our servers.
              </p>
              <Button variant="secondary" size="md" onClick={onBack}>
                Return to Home
              </Button>
            </div>
          )}
        </section>

        {/* After You Submit a Deletion Request & Remote Device Wipe */}
        <section style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            After You Submit a Deletion Request &amp; Remote Device Wipe
          </h2>
          <p>
            Deleting your account through the Verified Web Deletion Portal protects both your cloud records and the local data stored on your phone (such as in the event of a lost or stolen device):
          </p>
          <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
            <li>
              <strong>Real-Time Cloud &amp; Server Purge:</strong> Your Supabase authentication record, Cloud Backups, and AI Advisor history are permanently deleted from active databases in real time upon verified OTP authentication. Any residual copies in encrypted service caches and system backups are automatically purged within 30 days.
            </li>
            <li>
              <strong>Automatic On-Device Data Wipe:</strong> Upon web deletion, your active device sessions are immediately revoked and a remote local-wipe signal is triggered. As soon as the Pocket Advisor app on your Android device connects to the internet, it automatically destroys the local SQLCipher database, clears cached encryption keys, and resets the application.
            </li>
            <li>
              <strong>Offline Encryption Protection:</strong> If a lost or stolen device is kept offline, your local expense and budget records remain inaccessible behind SQLCipher AES-256 database encryption and will be wiped automatically the next time the app connects to the internet.
            </li>
          </ul>
          <p style={{ marginTop: '14px' }}>
            For information about how Pocket Advisor collects, uses, stores, and deletes personal information, please refer to our <a href="/privacy" style={{ color: 'var(--primary)', fontWeight: 600 }}>Privacy Policy</a>.
          </p>
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
