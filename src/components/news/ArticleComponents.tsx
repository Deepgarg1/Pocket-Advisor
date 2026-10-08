import React, { useState } from 'react';
import {
  Lightbulb,
  AlertTriangle,
  Info,
  CheckCircle2,
  Share2,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import {
  TableCell,
  MetricItem,
  ArticleStep,
  ArticleFaqItem,
} from '../../types/article';
import { Button } from '../common/Button';
import { useSettings } from '../../context/SettingsContext';

// -------------------------------------------------------------
// Helper: Inline Markdown & Rich Text Formatter
// -------------------------------------------------------------
export const renderFormattedText = (text: string): React.ReactNode => {
  if (!text) return '';
  const regex = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(`([^`]+)`)/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }

    if (match[1]) {
      // Link: [text](url)
      const linkText = match[2];
      const linkUrl = match[3];
      const isExternal = linkUrl.startsWith('http://') || linkUrl.startsWith('https://');
      elements.push(
        <a
          key={match.index}
          href={linkUrl}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          style={{
            color: 'var(--primary)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            fontWeight: 600,
          }}
        >
          {linkText}
        </a>
      );
    } else if (match[4]) {
      // Bold: **text**
      elements.push(
        <strong key={match.index} style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
          {match[5]}
        </strong>
      );
    } else if (match[6]) {
      // Italic: *text*
      elements.push(
        <em key={match.index} style={{ fontStyle: 'italic' }}>
          {match[7]}
        </em>
      );
    } else if (match[8]) {
      // Inline Code: `code`
      elements.push(
        <code
          key={match.index}
          style={{
            fontFamily: 'monospace',
            fontSize: '0.9em',
            padding: '2px 6px',
            borderRadius: '4px',
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--primary)',
          }}
        >
          {match[9]}
        </code>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return <>{elements}</>;
};

// -------------------------------------------------------------
// 1. Article Table Component
// -------------------------------------------------------------
export const ArticleTable: React.FC<{
  caption?: string;
  headers: string[];
  rows: (string | TableCell)[][];
}> = ({ caption, headers, rows }) => {
  const badgeColors: Record<string, { bg: string; text: string; border: string }> = {
    green: { bg: 'var(--income-surface)', text: 'var(--income)', border: 'rgba(16, 185, 129, 0.3)' },
    amber: { bg: 'var(--warning-surface)', text: 'var(--warning)', border: 'rgba(245, 158, 11, 0.3)' },
    blue: { bg: 'var(--info-surface)', text: 'var(--info)', border: 'rgba(56, 189, 248, 0.3)' },
    purple: { bg: 'var(--primary-surface)', text: 'var(--primary)', border: 'rgba(99, 102, 241, 0.3)' },
    red: { bg: 'var(--expense-surface)', text: 'var(--expense)', border: 'rgba(244, 63, 94, 0.3)' },
  };

  return (
    <div style={{ margin: '32px 0' }}>
      {caption && (
        <div
          style={{
            fontSize: '0.88rem',
            fontWeight: 700,
            color: 'var(--text-secondary)',
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {caption}
        </div>
      )}
      <div
        style={{
          overflowX: 'auto',
          borderRadius: '16px',
          border: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-surface)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '0.92rem',
            lineHeight: 1.5,
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderBottom: '2px solid var(--border-subtle)',
              }}
            >
              {headers.map((h, i) => (
                <th
                  key={i}
                  style={{
                    padding: '14px 18px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.01em',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => {
              const isEven = rIdx % 2 === 0;
              return (
                <tr
                  key={rIdx}
                  style={{
                    backgroundColor: isEven ? 'transparent' : 'rgba(255, 255, 255, 0.02)',
                    borderBottom:
                      rIdx === rows.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  {row.map((cell, cIdx) => {
                    const isCellObj = typeof cell !== 'string';
                    const cellText = typeof cell === 'string' ? cell : cell.text;
                    const highlight = isCellObj ? cell.highlight : false;
                    const badge = isCellObj ? cell.badge : undefined;
                    const badgeColorKey = isCellObj && cell.badgeColor ? cell.badgeColor : 'blue';
                    const align = isCellObj && cell.align ? cell.align : 'left';
                    const badgeStyle = badgeColors[badgeColorKey] || badgeColors.blue;

                    return (
                      <td
                        key={cIdx}
                        style={{
                          padding: '14px 18px',
                          color: highlight ? 'var(--text-primary)' : 'var(--text-secondary)',
                          fontWeight: highlight ? 700 : 400,
                          textAlign: align,
                          verticalAlign: 'middle',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent:
                              align === 'center'
                                ? 'center'
                                : align === 'right'
                                ? 'flex-end'
                                : 'flex-start',
                            gap: '8px',
                            flexWrap: 'wrap',
                          }}
                        >
                          <span>{cellText}</span>
                          {badge && (
                            <span
                              style={{
                                fontSize: '0.74rem',
                                fontWeight: 700,
                                padding: '3px 8px',
                                borderRadius: '9999px',
                                backgroundColor: badgeStyle.bg,
                                color: badgeStyle.text,
                                border: `1px solid ${badgeStyle.border}`,
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {badge}
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 2. Callout Block Component
// -------------------------------------------------------------
export const ArticleCallout: React.FC<{
  variant: 'tip' | 'warning' | 'info' | 'takeaway';
  title?: string;
  content: string;
}> = ({ variant, title, content }) => {
  const configs = {
    tip: {
      icon: Lightbulb,
      border: 'var(--warning)',
      bg: 'var(--warning-surface)',
      iconBg: 'var(--warning-surface)',
      iconColor: 'var(--warning)',
      title: title || 'Pro Tip',
    },
    warning: {
      icon: AlertTriangle,
      border: 'var(--expense)',
      bg: 'var(--expense-surface)',
      iconBg: 'var(--expense-surface)',
      iconColor: 'var(--expense)',
      title: title || 'Caution',
    },
    info: {
      icon: Info,
      border: 'var(--info)',
      bg: 'var(--info-surface)',
      iconBg: 'var(--info-surface)',
      iconColor: 'var(--info)',
      title: title || 'Key Information',
    },
    takeaway: {
      icon: CheckCircle2,
      border: 'var(--income)',
      bg: 'var(--income-surface)',
      iconBg: 'var(--income-surface)',
      iconColor: 'var(--income)',
      title: title || 'Key Takeaway',
    },
  };

  const config = configs[variant] || configs.info;
  const Icon = config.icon;

  return (
    <div
      style={{
        margin: '28px 0',
        padding: '20px 24px',
        borderRadius: '16px',
        backgroundColor: config.bg,
        border: `1px solid ${config.border}40`,
        borderLeft: `4px solid ${config.border}`,
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          backgroundColor: config.iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: config.iconColor,
          marginTop: '2px',
        }}
      >
        <Icon size={20} />
      </div>
      <div style={{ flex: 1 }}>
        <h4
          style={{
            margin: '0 0 6px 0',
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
          }}
        >
          {config.title}
        </h4>
        <div
          style={{
            fontSize: '0.94rem',
            lineHeight: 1.65,
            color: 'var(--text-secondary)',
            whiteSpace: 'pre-line',
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 3. Metrics Grid Component
// -------------------------------------------------------------
export const ArticleMetricsGrid: React.FC<{ items: MetricItem[] }> = ({ items }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
        margin: '32px 0',
      }}
    >
      {items.map((m, idx) => (
        <div
          key={idx}
          style={{
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-muted)',
              marginBottom: '6px',
            }}
          >
            {m.label}
          </div>
          <div
            style={{
              fontSize: '1.85rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              marginBottom: '6px',
              letterSpacing: '-0.02em',
            }}
          >
            {m.value}
          </div>
          <div
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.4,
            }}
          >
            {m.description}
          </div>
          {m.change && (
            <div
              style={{
                marginTop: '10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: m.isPositive ? '#34d399' : '#f87171',
              }}
            >
              {m.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{m.change}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// -------------------------------------------------------------
// 4. Step-by-Step Component
// -------------------------------------------------------------
export const ArticleSteps: React.FC<{
  title?: string;
  steps: ArticleStep[];
}> = ({ title, steps }) => {
  return (
    <div style={{ margin: '32px 0' }}>
      {title && (
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '20px',
          }}
        >
          {title}
        </h3>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {steps.map((st, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: '18px',
              padding: '18px 20px',
              borderRadius: '14px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.9rem',
                flexShrink: 0,
              }}
            >
              {st.stepNumber}
            </div>
            <div style={{ flex: 1 }}>
              <h4
                style={{
                  margin: '0 0 6px 0',
                  fontSize: '1.02rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}
              >
                {st.title}
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                }}
              >
                {st.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 5. CTA Box Component
// -------------------------------------------------------------
export const ArticleCtaBox: React.FC<{
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  badge?: string;
  onNavigate?: (view: string) => void;
}> = ({ title, description, buttonText, buttonLink, badge, onNavigate }) => {
  const { theme } = useSettings();
  const isDark = theme === 'dark';

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const cleanRoute = buttonLink.replace(/^\//, '');
    if (onNavigate) {
      onNavigate(cleanRoute);
    } else {
      window.location.href = buttonLink;
    }
  };

  return (
    <div
      style={{
        margin: '44px 0',
        padding: '36px 32px',
        borderRadius: '24px',
        background: isDark
          ? 'linear-gradient(135deg, rgba(30, 27, 75, 0.7) 0%, rgba(15, 23, 42, 0.95) 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)',
        border: isDark
          ? '1.5px solid rgba(99, 102, 241, 0.35)'
          : '1.5px solid rgba(99, 102, 241, 0.25)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        boxShadow: isDark
          ? '0 16px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(99, 102, 241, 0.15)'
          : '0 16px 40px rgba(79, 70, 229, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
      }}
    >
      {badge && (
        <span
          style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '5px 16px',
            borderRadius: '9999px',
            backgroundColor: 'var(--primary-surface)',
            color: 'var(--primary)',
            border: '1px solid var(--border-focus)',
          }}
        >
          {badge}
        </span>
      )}
      <h3
        style={{
          margin: 0,
          fontSize: '1.45rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          maxWidth: '560px',
          fontSize: '0.96rem',
          lineHeight: 1.6,
          color: 'var(--text-secondary)',
        }}
      >
        {description}
      </p>
      <Button
        variant="primary"
        onClick={handleClick}
        style={{
          marginTop: '8px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 28px',
          fontWeight: 700,
        }}
      >
        <span>{buttonText}</span>
        <ArrowRight size={18} />
      </Button>
    </div>
  );
};

// -------------------------------------------------------------
// 6. Interactive FAQ Accordion
// -------------------------------------------------------------
export const ArticleFaqAccordion: React.FC<{ items: ArticleFaqItem[] }> = ({ items }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (idx: number) => {
    setOpenIndices(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div style={{ margin: '40px 0' }}>
      <h3
        style={{
          fontSize: '1.35rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: '20px',
          letterSpacing: '-0.02em',
        }}
      >
        Frequently Asked Questions
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map((faq, i) => {
          const isOpen = openIndices.includes(i);
          return (
            <div
              key={i}
              style={{
                borderRadius: '14px',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-surface)',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
              }}
            >
              <button
                onClick={() => toggleIndex(i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 22px',
                  background: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  gap: '16px',
                }}
              >
                <span>{faq.question}</span>
                {isOpen ? (
                  <ChevronUp size={20} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                ) : (
                  <ChevronDown size={20} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                )}
              </button>
              {isOpen && (
                <div
                  style={{
                    padding: '0 22px 20px 22px',
                    fontSize: '0.94rem',
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '14px',
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 7. Share & Copy Link Bar
// -------------------------------------------------------------
export const ArticleShareBar: React.FC<{
  title: string;
  slug: string;
}> = ({ title, slug }) => {
  const [copied, setCopied] = useState(false);
  const articleUrl = `https://www.pocketadvisor.in/news/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = `📰 *${title}*\nRead this guide on Pocket Advisor:\n${articleUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = `${title} via @PocketAdvisor`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(
        articleUrl
      )}`,
      '_blank'
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        padding: '16px 20px',
        borderRadius: '14px',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        margin: '36px 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text-primary)',
          fontWeight: 700,
          fontSize: '0.92rem',
        }}
      >
        <Share2 size={18} color="var(--primary)" />
        <span>Share this guide:</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={handleShareWhatsApp}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '10px',
            backgroundColor: 'var(--income-surface)',
            border: '1px solid var(--income)',
            color: 'var(--income)',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          WhatsApp
        </button>
        <button
          onClick={handleShareTwitter}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '10px',
            backgroundColor: 'var(--info-surface)',
            border: '1px solid var(--info)',
            color: 'var(--info)',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          X (Twitter)
        </button>
        <button
          onClick={handleCopy}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '10px',
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {copied ? <Check size={16} color="#34d399" /> : <Copy size={16} />}
          <span>{copied ? 'Copied URL!' : 'Copy Link'}</span>
        </button>
      </div>
    </div>
  );
};
