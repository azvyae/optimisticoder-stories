type Sitemap = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority?: number;
}[];

interface StoryMetadata {
  title: string;
  subtitle: string;
  excerpt: string;
  cover: string;
  date: string;
  keywords: string[];
}

interface StoryIndexEntry extends StoryMetadata {
  slug: string;
  category: string;
  readTime: string;
}

type CategoryIndexEntry = string[];
