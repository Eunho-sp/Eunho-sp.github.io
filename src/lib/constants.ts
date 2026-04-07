import { Category } from "./types";

export const SITE = {
  title: "Eunho's Blog",
  description: "CS & AI 전공자 은호의 보안/개발 블로그",
  author: "은호 (Eunho Park)",
  bio: "전북대 CS & AI / 보안 및 알고리즘 공부 중",
  github: "https://github.com/Eunho-sp",
};

export const CATEGORIES: { label: Category; color: string }[] = [
  { label: "개발", color: "#3182F6" },
  { label: "CTF/Wargame", color: "#F04452" },
  { label: "BugBounty", color: "#F59E0B" },
  { label: "블로그/기술문서", color: "#10B981" },
  { label: "논문/컨퍼런스", color: "#8B5CF6" },
  { label: "공모전/자격증", color: "#EC4899" },
];

export function getCategoryColor(category: Category): string {
  return CATEGORIES.find((c) => c.label === category)?.color ?? "#4E5968";
}
