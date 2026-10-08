export type ArticleCategory =
  | 'Budgeting'
  | 'Guides'
  | 'Product Updates'
  | 'Wealth Planning';

export interface TableCell {
  text: string;
  highlight?: boolean;
  badge?: string;
  badgeColor?: 'green' | 'amber' | 'blue' | 'purple' | 'red';
  align?: 'left' | 'center' | 'right';
}

export interface MetricItem {
  label: string;
  value: string;
  description: string;
  change?: string;
  isPositive?: boolean;
}

export interface ArticleStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface ArticleFaqItem {
  question: string;
  answer: string;
}

export type ArticleBlock =
  | {
      type: 'paragraph';
      text: string;
    }
  | {
      type: 'heading2';
      text: string;
      id?: string;
    }
  | {
      type: 'heading3';
      text: string;
      id?: string;
    }
  | {
      type: 'table';
      caption?: string;
      headers: string[];
      rows: (string | TableCell)[][];
    }
  | {
      type: 'callout';
      variant: 'tip' | 'warning' | 'info' | 'takeaway';
      title?: string;
      content: string;
    }
  | {
      type: 'metrics';
      items: MetricItem[];
    }
  | {
      type: 'image';
      src: string;
      alt: string;
      caption?: string;
      aspectRatio?: string;
    }
  | {
      type: 'quote';
      text: string;
      author?: string;
    }
  | {
      type: 'checklist';
      title?: string;
      items: { text: string; checked?: boolean }[];
    }
  | {
      type: 'steps';
      title?: string;
      steps: ArticleStep[];
    }
  | {
      type: 'cta';
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
      badge?: string;
    };

export interface ArticleAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  publishedAt: string;
  updatedAt: string;
  author: ArticleAuthor;
  category: ArticleCategory;
  readTime: string;
  tags: string[];
  fontStyle?: 'sans' | 'serif' | 'clean';
  faqs?: ArticleFaqItem[];
  blocks: ArticleBlock[];
}
