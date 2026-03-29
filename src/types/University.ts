export interface University {
  id: number;
  name: string;
  city: string;
  rating: number;
  tags: string[];
  description: string;
  image?: string; // Опционально, на будущее
}