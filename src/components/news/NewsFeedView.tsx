import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Search,
  Sparkles,
  BookOpen,
  ChevronRight,
} from 'lucide-react';
import { getAllArticles, getArticleBySlug } from '../../data/newsArticles';
import {
  ArticleTable,
  ArticleCallout,
  ArticleMetricsGrid,
  ArticleSteps,
  ArticleCtaBox,
  ArticleFaqAccordion,
  ArticleShareBar,
  renderFormattedText,
} from './ArticleComponents';
import { updatePageSeo } from '../../utils/seo';
import { trackPageView } from '../../utils/analytics';

interface NewsFeedViewProps {
  slug?: string;
  onNavigate?: (view: string) => void;
}

export const NewsFeedView: React.FC<NewsFeedViewProps> = ({ slug: initialSlug, onNavigate }) => {
  const allArticles = getAllArticles();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Helper to extract article slug or ID from window.location
  const getSlugFromUrl = (): string | null => {
    try {
      const pathname = window.location.pathname.replace(/\/+$/, '');
      const parts = pathname.split('/');
      // If path is /news/some-slug
      if (parts.length >= 3 && parts[1] === 'news' && parts[2]) {
        return parts[2];
      }

      // Query param fallback ?slug= or ?id=
      const params = new URLSearchParams(window.location.search);
      const querySlug = params.get('slug');
      if (querySlug) return querySlug;

      const queryId = params.get('id');
      if (queryId) {
        // Map legacy UUID or slug to new slug
        if (queryId === '3f0a01dd-6c79-803c-81c2-c459d7271593') {
          return 'diwali-2026-how-to-track-upi-spending';
        }
        if (queryId === '3d9a01dd-6c79-80ea-ac1c-e623f8aa0cf1') {
          return 'welcome-to-pocket-advisor';
        }
        return queryId;
      }

      // Hash fallback #/news?slug= or #/news/slug
      const rawHash = window.location.hash || '';
      if (rawHash.includes('/news/')) {
        const hashParts = rawHash.split('/news/');
        if (hashParts[1]) return hashParts[1].split('?')[0];
      }
      return null;
    } catch {
      return null;
    }
  };

  // Sync state on load or popstate
  useEffect(() => {
    const slugFromUrl = getSlugFromUrl();
    if (slugFromUrl) {
      setSelectedSlug(slugFromUrl);
    } else if (initialSlug) {
      setSelectedSlug(initialSlug);
    }
  }, [initialSlug]);

  useEffect(() => {
    const handlePopState = () => {
      const slugFromUrl = getSlugFromUrl();
      setSelectedSlug(slugFromUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update SEO dynamically whenever selected article changes
  useEffect(() => {
    if (selectedSlug) {
      const article = getArticleBySlug(selectedSlug);
      if (article) {
        updatePageSeo('news', {
          title: `${article.title} | Pocket Advisor`,
          description: article.excerpt,
          canonical: `https://www.pocketadvisor.in/news/${article.slug}`,
          ogType: 'article',
          ogImage: `https://www.pocketadvisor.in${article.coverImage}`,
        });
        trackPageView();
      }
    } else {
      updatePageSeo('news', {
        title: 'Personal Finance Insights & Guides | Pocket Advisor',
        description: 'Read the latest guides on UPI expense tracking, festive budgeting, debt minimization math, and private on-device wealth management.',
        canonical: 'https://www.pocketadvisor.in/news',
        ogType: 'website',
      });
      if (window.location.pathname.replace(/\/+$/, '') === '/news') trackPageView();
    }
  }, [selectedSlug]);

  const handleOpenArticle = (slug: string) => {
    setSelectedSlug(slug);
    try {
      window.history.pushState(null, '', `/news/${slug}`);
    } catch {
      window.location.hash = `#/news/${slug}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToFeed = () => {
    setSelectedSlug(null);
    try {
      window.history.pushState(null, '', '/news');
    } catch {
      window.location.hash = '#/news';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = ['All', 'Budgeting', 'Product Updates', 'Guides'];

  // Filtered articles
  const filteredArticles = allArticles.filter(art => {
    const matchesCategory =
      activeCategory === 'All' || art.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Current selected article
  const currentArticle = selectedSlug ? getArticleBySlug(selectedSlug) : null;

  // Helper to determine typography based on article preference
  const getArticleFontFamily = (fontStyle?: 'sans' | 'serif' | 'clean') => {
    if (fontStyle === 'serif') return "'Lora', Georgia, 'Times New Roman', serif";
    if (fontStyle === 'clean') return "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    return "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  };

  // -------------------------------------------------------------
  // DETAIL VIEW: Single Article
  // -------------------------------------------------------------
  if (currentArticle) {
    const relatedArticles = allArticles
      .filter(a => a.id !== currentArticle.id)
      .slice(0, 2);

    return (
      <article
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: '48px 20px 80px 20px',
          fontFamily: getArticleFontFamily(currentArticle.fontStyle),
        }}
      >
        {/* Back Link */}
        <button
          onClick={handleBackToFeed}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: 'var(--primary)',
            fontWeight: 700,
            fontSize: '0.94rem',
            cursor: 'pointer',
            padding: 0,
            marginBottom: '28px',
          }}
        >
          <ArrowLeft size={18} />
          <span>Back to all articles</span>
        </button>

        {/* Article Header */}
        <header style={{ marginBottom: '36px' }}>
          {/* Category Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '4px 14px',
                borderRadius: '9999px',
                backgroundColor: 'var(--primary-surface)',
                color: 'var(--primary)',
                border: '1px solid var(--border-focus)',
              }}
            >
              {currentArticle.category}
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
              }}
            >
              <Clock size={15} />
              <span>{currentArticle.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 2.85rem)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              letterSpacing: '-0.03em',
              marginBottom: '16px',
            }}
          >
            {currentArticle.title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '1.2rem',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              margin: '0 0 24px 0',
            }}
          >
            {currentArticle.subtitle}
          </p>

          {/* Meta bar: Author & Published Date */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                }}
              >
                <User size={16} />
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>
                  {currentArticle.author.name}
                </strong>
                <span style={{ color: 'var(--text-muted)', marginLeft: '6px' }}>
                  ({currentArticle.author.role})
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={15} color="var(--text-muted)" />
              <span>
                {new Date(currentArticle.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Permanent Cover Banner */}
        <div
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.2)',
            marginBottom: '40px',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <img
            src={currentArticle.coverImage}
            alt={currentArticle.coverImageAlt}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              aspectRatio: '1200 / 630',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Article Body Blocks */}
        <div style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--text-primary)' }}>
          {currentArticle.blocks.map((block, idx) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <p
                    key={idx}
                    style={{
                      margin: '0 0 20px 0',
                      color: 'var(--text-secondary)',
                      fontSize: '1.05rem',
                      lineHeight: 1.8,
                    }}
                  >
                    {renderFormattedText(block.text)}
                  </p>
                );

              case 'heading2':
                return (
                  <h2
                    key={idx}
                    id={block.id}
                    style={{
                      fontSize: '1.65rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      marginTop: '44px',
                      marginBottom: '16px',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.3,
                    }}
                  >
                    {block.text}
                  </h2>
                );

              case 'heading3':
                return (
                  <h3
                    key={idx}
                    id={block.id}
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginTop: '32px',
                      marginBottom: '12px',
                    }}
                  >
                    {block.text}
                  </h3>
                );

              case 'table':
                return (
                  <ArticleTable
                    key={idx}
                    caption={block.caption}
                    headers={block.headers}
                    rows={block.rows}
                  />
                );

              case 'callout':
                return (
                  <ArticleCallout
                    key={idx}
                    variant={block.variant}
                    title={block.title}
                    content={block.content}
                  />
                );

              case 'metrics':
                return <ArticleMetricsGrid key={idx} items={block.items} />;

              case 'steps':
                return <ArticleSteps key={idx} title={block.title} steps={block.steps} />;

              case 'cta':
                return (
                  <ArticleCtaBox
                    key={idx}
                    title={block.title}
                    description={block.description}
                    buttonText={block.buttonText}
                    buttonLink={block.buttonLink}
                    badge={block.badge}
                    onNavigate={onNavigate}
                  />
                );

              case 'image':
                return (
                  <figure key={idx} style={{ margin: '36px 0', textAlign: 'center' }}>
                    <img
                      src={block.src}
                      alt={block.alt || currentArticle.title}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        maxHeight: '640px',
                        objectFit: 'contain',
                        borderRadius: '16px',
                        border: '1px solid var(--border-subtle)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                        backgroundColor: 'var(--bg-surface-elevated)',
                      }}
                    />
                    {block.caption && (
                      <figcaption
                        style={{
                          marginTop: '8px',
                          fontSize: '0.85rem',
                          color: 'var(--text-muted)',
                          fontStyle: 'italic',
                        }}
                      >
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );

              case 'quote':
                return (
                  <blockquote
                    key={idx}
                    style={{
                      margin: '28px 0',
                      padding: '18px 24px',
                      borderLeft: '4px solid var(--primary)',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      borderRadius: '0 12px 12px 0',
                      fontStyle: 'italic',
                      color: 'var(--text-primary)',
                      fontSize: '1.15rem',
                      lineHeight: 1.6,
                    }}
                  >
                    <p style={{ margin: 0 }}>"{block.text}"</p>
                    {block.author && (
                      <cite
                        style={{
                          display: 'block',
                          marginTop: '8px',
                          fontSize: '0.85rem',
                          fontStyle: 'normal',
                          color: 'var(--text-muted)',
                          fontWeight: 600,
                        }}
                      >
                        — {block.author}
                      </cite>
                    )}
                  </blockquote>
                );

              case 'checklist':
                return (
                  <div
                    key={idx}
                    style={{
                      margin: '28px 0',
                      padding: '20px 24px',
                      borderRadius: '16px',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-surface)',
                    }}
                  >
                    {block.title && (
                      <h4 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {block.title}
                      </h4>
                    )}
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <span style={{ color: item.checked ? 'var(--income)' : 'var(--text-muted)', marginTop: '2px', fontWeight: 700 }}>
                            {item.checked ? '✓' : '○'}
                          </span>
                          <span style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5 }}>
                            {renderFormattedText(item.text)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>

        {/* Share Bar */}
        <ArticleShareBar title={currentArticle.title} slug={currentArticle.slug} />

        {/* FAQs */}
        {currentArticle.faqs && currentArticle.faqs.length > 0 && (
          <ArticleFaqAccordion items={currentArticle.faqs} />
        )}

        {/* Tags */}
        <div style={{ marginTop: '32px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {currentArticle.tags.map((tag, i) => (
            <span
              key={i}
              style={{
                fontSize: '0.82rem',
                padding: '5px 12px',
                borderRadius: '9999px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div
            style={{
              marginTop: '56px',
              paddingTop: '36px',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <h3
              style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '24px',
              }}
            >
              More From Pocket Advisor
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              {relatedArticles.map(rel => (
                <div
                  key={rel.id}
                  onClick={() => handleOpenArticle(rel.slug)}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '16px',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-surface)',
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = 'var(--primary)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <img
                    src={rel.coverImage}
                    alt={rel.coverImageAlt}
                    style={{
                      width: '100%',
                      aspectRatio: '16 / 9',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <div style={{ padding: '18px' }}>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--primary)',
                        marginBottom: '6px',
                      }}
                    >
                      {rel.category}
                    </div>
                    <h4
                      style={{
                        margin: '0 0 8px 0',
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        lineHeight: 1.4,
                      }}
                    >
                      {rel.title}
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                      }}
                    >
                      {rel.readTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    );
  }

  // -------------------------------------------------------------
  // FEED VIEW: Magazine / Blog Grid
  // -------------------------------------------------------------
  const featuredArticle = allArticles[0];
  const gridArticles = filteredArticles.filter(a =>
    activeCategory === 'All' && searchQuery.trim() === '' ? a.id !== featuredArticle.id : true
  );

  return (
    <div
      style={{
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '48px 24px 80px 24px',
      }}
    >
      {/* Feed Hero Header */}
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            backgroundColor: 'var(--primary-surface)',
            border: '1px solid var(--border-focus)',
            color: 'var(--primary)',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '16px',
          }}
        >
          <Sparkles size={16} />
          <span>PERSONAL FINANCE INSIGHTS</span>
        </div>
        <h1
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            lineHeight: 1.15,
            marginBottom: '16px',
          }}
        >
          Articles &amp; Practical Guides
        </h1>
        <p
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
          }}
        >
          Master UPI spending, discover the mathematics of debt minimization, and learn how to
          accelerate your long-term wealth without giving up privacy.
        </p>
      </div>

      {/* Category Pills & Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '36px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: 700,
                border: '1px solid',
                borderColor: activeCategory === cat ? 'var(--primary)' : 'var(--border-subtle)',
                backgroundColor:
                  activeCategory === cat ? 'var(--primary-surface)' : 'var(--bg-surface)',
                color: activeCategory === cat ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 16px',
            borderRadius: '12px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            minWidth: '240px',
          }}
        >
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              width: '100%',
            }}
          />
        </div>
      </div>

      {/* Featured Big Card (when on All and no search) */}
      {activeCategory === 'All' && searchQuery.trim() === '' && featuredArticle && (
        <div
          onClick={() => handleOpenArticle(featuredArticle.slug)}
          style={{
            cursor: 'pointer',
            borderRadius: '24px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            overflow: 'hidden',
            marginBottom: '44px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease, border-color 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = 'var(--primary)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--border-subtle)';
          }}
        >
          <div>
            <img
              src={featuredArticle.coverImage}
              alt={featuredArticle.coverImageAlt}
              style={{
                width: '100%',
                height: '100%',
                minHeight: '260px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
          <div
            style={{
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--warning-surface)',
                  color: 'var(--warning)',
                  border: '1px solid var(--warning)',
                }}
              >
                Featured Guide
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {featuredArticle.readTime}
              </span>
            </div>

            <h2
              style={{
                fontSize: '1.65rem',
                fontWeight: 900,
                color: 'var(--text-primary)',
                lineHeight: 1.25,
                margin: '0 0 12px 0',
                letterSpacing: '-0.02em',
              }}
            >
              {featuredArticle.title}
            </h2>
            <p
              style={{
                fontSize: '0.98rem',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                margin: '0 0 20px 0',
              }}
            >
              {featuredArticle.excerpt}
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--primary)',
                fontWeight: 700,
                fontSize: '0.94rem',
              }}
            >
              <span>Read complete guide</span>
              <ChevronRight size={18} />
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Articles */}
      {gridArticles.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--text-muted)',
            borderRadius: '16px',
            border: '1px dashed var(--border-subtle)',
          }}
        >
          <BookOpen size={40} style={{ opacity: 0.5, marginBottom: '12px' }} />
          <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>
            No articles found matching your criteria.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {gridArticles.map(article => (
            <div
              key={article.id}
              onClick={() => handleOpenArticle(article.slug)}
              style={{
                cursor: 'pointer',
                borderRadius: '20px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ position: 'relative' }}>
                <img
                  src={article.coverImage}
                  alt={article.coverImageAlt}
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 9',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  {article.category}
                </span>
              </div>

              <div
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      marginBottom: '10px',
                    }}
                  >
                    <span>
                      {new Date(article.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3
                    style={{
                      margin: '0 0 10px 0',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      lineHeight: 1.35,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {article.title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.9rem',
                      lineHeight: 1.55,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {article.excerpt}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '20px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {article.author.name}
                  </span>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>Read</span>
                    <ChevronRight size={15} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
