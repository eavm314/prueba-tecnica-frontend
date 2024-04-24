export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface ParamProps {
  params?: { slug: string };
  searchParams?:{ [key: string]: string | undefined };
}