export interface IArticle {
  id: string | number;
  slug: string;
  title: string;
  description?: string;
  content?: string;
  index?: number;
}