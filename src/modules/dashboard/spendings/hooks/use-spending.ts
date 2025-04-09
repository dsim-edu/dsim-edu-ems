import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteSpending,
  getSpendingsPaginated,
} from "../server/spending.action";

const LIMIT = 10;

export function useSpendings() {
  return useInfiniteQuery({
    queryKey: ["spendings"],
    queryFn: async ({ pageParam = 0 }) =>
      getSpendingsPaginated(LIMIT, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === LIMIT ? allPages.length * LIMIT : undefined,
  });
}

export function useDeleteSpending() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await deleteSpending(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spendings"] });
    },
  });
}
