import { Article } from '../types/article';
import rawArticles from './articles.json';

// Single source of truth loaded dynamically from articles.json
export const NEWS_ARTICLES: Article[] = rawArticles as Article[];

export function getArticleBySlug(slug: string): Article | undefined {
  if (!slug) return undefined;
  const cleanSlug = slug.toLowerCase().replace(/^\/+|\/+$/g, '');
  return NEWS_ARTICLES.find(
    a => a.slug.toLowerCase() === cleanSlug || a.id.toLowerCase() === cleanSlug
  );
}

export function getAllArticles(): Article[] {
  return [...NEWS_ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
