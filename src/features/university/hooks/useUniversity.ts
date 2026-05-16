// src/features/university/hooks/useUniversity.ts
import { useQuery } from '@tanstack/react-query';
import { universityApi } from '../api/universityApi';

export const useUniversities = (page: number, size: number) => {
  return useQuery({
    queryKey: ['universities', page, size],
    queryFn: () => universityApi.getUniversities(page, size),
  });
};

export const useUniversityDetails = (id: number) => {
  return useQuery({
    queryKey: ['university', id],
    queryFn: () => universityApi.getUniversityById(id),
    enabled: !!id, // Запрос не пойдет, пока id не определен
  });
};

export const useFaculties = (universityId: number) => {
  return useQuery({
    queryKey: ['faculties', universityId],
    queryFn: () => universityApi.getUniversityFaculties(universityId),
    enabled: !!universityId,
  });
};

export const usePrograms = (facultyId: number) => {
  return useQuery({
    queryKey: ['programs', facultyId],
    queryFn: () => universityApi.getFacultyPrograms(facultyId),
    enabled: !!facultyId,
  });
};

export const useFacultyDetails = (id: number) => {
  return useQuery({
    queryKey: ['faculty', id],
    queryFn: () => universityApi.getFacultyById(id),
    enabled: !!id,
  });
};