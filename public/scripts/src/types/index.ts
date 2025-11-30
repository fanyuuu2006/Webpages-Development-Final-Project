export interface MovieItem {
  name: string;
  slogan?: string;
  src?: string;
  genre?: string;
  rating?: string;
  releaseDate?: string;
  director?: string;
  status?: string; // 上映狀態文字，如 "上映中" 或 "12/15 上映"
  statusType?: "current" | "upcoming"; // 狀態類型，用於樣式區分
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  categoryType: "activity" | "announcement" | "news";
  date: string;
  image: string;
  alt: string;
}