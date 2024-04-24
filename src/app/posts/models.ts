export interface ParamProps {
  params?: { [key: string]: string };
  searchParams?:{ [key: string]: string | undefined };
}

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}
