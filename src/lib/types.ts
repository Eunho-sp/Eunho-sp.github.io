export type Category =
  | "개발"
  | "CTF/Wargame"
  | "BugBounty"
  | "블로그/기술문서"
  | "논문/컨퍼런스"
  | "공모전/자격증";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: Category;
  description: string;
  tags?: string[];
}
