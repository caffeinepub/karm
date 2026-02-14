import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

/**
 * React Query hook for managing the install count
 * Provides methods to fetch and increment the persisted install count
 */
export function useInstallCount() {
  const { actor, isFetching: isActorFetching } = useActor();
  const queryClient = useQueryClient();

  // Fetch the current install count
  const { data: installCount, isLoading } = useQuery<number>({
    queryKey: ['installCount'],
    queryFn: async () => {
      if (!actor) return 24; // Base value fallback
      const count = await actor.getInstallCount();
      return Number(count);
    },
    enabled: !!actor && !isActorFetching,
    staleTime: 1000 * 60, // Cache for 1 minute
  });

  // Increment the install count
  const incrementMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      const newCount = await actor.incrementInstallCount();
      return Number(newCount);
    },
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['installCount'] });

      // Snapshot the previous value
      const previousCount = queryClient.getQueryData<number>(['installCount']);

      // Optimistically update to the new value
      queryClient.setQueryData<number>(['installCount'], (old) => (old ?? 24) + 1);

      return { previousCount };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousCount !== undefined) {
        queryClient.setQueryData(['installCount'], context.previousCount);
      }
    },
    onSuccess: (newCount) => {
      // Update with the actual server value
      queryClient.setQueryData(['installCount'], newCount);
    },
  });

  return {
    installCount: installCount ?? 24, // Always show at least the base value
    isLoading,
    increment: incrementMutation.mutate,
    isIncrementing: incrementMutation.isPending,
  };
}
