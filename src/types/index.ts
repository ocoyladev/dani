export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
  coverImage?: string;
}

export interface Photo {
  id: string;
  title: string;
  description: string;
  url: string;
  category?: string;
}

export interface User {
  isAuthenticated: boolean;
  isAdmin: boolean;
}