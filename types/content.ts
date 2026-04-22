export interface PricingTier {
  name: string;
  price: number;
  unit: string;
  description?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  image: string;
  features: string[];
  pricing: PricingTier[];
  process: ProcessStep[];
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  avatar?: string;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface City {
  id: string;
  name: string;
  slug: string;
  state: string;
  storeCount?: number;
  isComingSoon?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  tags: string[];
  readTime: number;
}

export interface SiteStat {
  label: string;
  value: string;
  suffix: string;
}

export interface HeroBanner {
  id: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  image: string;
}
