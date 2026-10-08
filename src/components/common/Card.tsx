import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  glass = true,
  hoverable = false,
  style = {},
  className = '',
  ...props
}) => {
  return (
    <div
      style={{
        background: glass ? 'var(--bg-surface-glass)' : 'var(--bg-surface)',
        backdropFilter: glass ? 'var(--backdrop-blur)' : undefined,
        WebkitBackdropFilter: glass ? 'var(--backdrop-blur)' : undefined,
        border: '1px solid var(--border-glass)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)',
        transition: 'var(--transition-smooth)',
        ...style,
      }}
      className={`card ${hoverable ? 'hoverable-card' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
