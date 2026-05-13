// src/types/university.ts

export type DegreeType = 'BACHELOR' | 'MASTER' | 'PHD';

export interface DirectionResponse {
  code: string;
  name: string;
}

export interface UniversityShortResponse {
  id: number;
  name: string;
  code: string;
}

export interface FacultyShortResponse {
  id: number;
  name: string;
  rating: number;
}

export interface UniversityResponse {
  id: number;
  code: string;
  name: string;
  city: string;
  description: string;
  rating: number;
}

export interface FacultyResponse {
  id: number;
  name: string;
  description: string;
  rating: number;
  university: UniversityShortResponse;
}

export interface ProgramResponse {
  id: number;
  name: string;
  description: string;
  rating: number;
  degree: DegreeType;
  direction: DirectionResponse;
  faculty: FacultyShortResponse;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}