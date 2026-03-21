export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  featured: boolean;
  published: boolean;
  heroImage?: string;
  tableOfContents?: {
    id: string;
    title: string;
    level: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}
