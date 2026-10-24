import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in UI component tree:', error, errorInfo);
  }

  private handleReload = () => {
    if (this.props.onReset) {
      this.setState({ hasError: false, error: undefined });
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            padding: '40px 24px',
            textAlign: 'center',
            color: 'var(--text-primary)',
          }}
        >
          <div
            style={{
              padding: '12px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              color: '#f87171',
              marginBottom: '16px',
            }}
          >
            <AlertCircle size={32} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 8px' }}>Something went wrong</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', fontSize: '0.95rem', margin: '0 0 24px', lineHeight: 1.5 }}>
            This page could not load correctly. You can still reach our team directly by email, or reload the page to try again.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '20px', lineHeight: 1.5 }}>
            <a href="mailto:support@pocketadvisor.in" style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}>support@pocketadvisor.in</a>
            <span aria-hidden="true">·</span>
            <a href="mailto:privacy@pocketadvisor.in" style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}>privacy@pocketadvisor.in</a>
          </div>
          <button
            onClick={this.handleReload}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '12px',
              backgroundColor: 'var(--primary-btn)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={16} />
            <span>Reload Page</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
