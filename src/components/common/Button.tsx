import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  className = '',
  style = {},
  disabled,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    borderRadius: '12px',
    border: 'none',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    opacity: disabled ? 0.5 : 1,
    whiteSpace: 'nowrap',
    outline: 'none',
    textDecoration: 'none',
    ...style,
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '6px 14px', fontSize: '0.825rem' },
    md: { padding: '9px 18px', fontSize: '0.925rem' },
    lg: { padding: '13px 26px', fontSize: '1.05rem', borderRadius: '16px' },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--primary-gradient)',
      color: '#ffffff',
      boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
    },
    secondary: {
      background: 'var(--bg-surface-elevated)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-subtle)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-subtle)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
    },
    danger: {
      background: 'var(--expense-btn, #e11d48)',
      color: '#ffffff',
      boxShadow: '0 4px 14px rgba(225, 29, 72, 0.35)',
    },
  };

  return (
    <button
      style={{
        ...baseStyle,
        ...sizeStyles[size],
        ...variantStyles[variant],
        opacity: disabled || loading ? 0.6 : 1,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
      }}
      disabled={disabled || loading}
      className={`btn-${variant} ${className}`}
      {...props}
    >
      {loading ? (
        <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
      ) : (
        icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
      )}
      {children}
    </button>
  );
};
