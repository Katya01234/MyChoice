// src/features/university/hooks/useReview.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewApi } from '../api/reviewApi';
import { type ReviewRequest } from '../../../types/university';

export const useMyReview = (programId: number) => {
  return useQuery({
    queryKey: ['myReview', programId],
    queryFn: () => reviewApi.getMyReview(programId),
    enabled: !!programId,
  });
};

export const useProgramReviews = (programId: number) => {
  return useQuery({
    queryKey: ['reviews', programId],
    queryFn: () => reviewApi.getProgramReviews(programId),
    enabled: !!programId,
  });
};

export const useSaveReview = (programId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ReviewRequest) => reviewApi.saveReview(data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['myReview', programId] }),
        queryClient.invalidateQueries({ queryKey: ['reviews', programId] }),
        queryClient.invalidateQueries({ queryKey: ['program', programId] }),
      ]);
    }
  });
};