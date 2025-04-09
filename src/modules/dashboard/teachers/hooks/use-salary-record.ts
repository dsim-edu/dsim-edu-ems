import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteSalaryRecords,
  getTeacherSalaryPaginated,
} from "../server/teacher.action";

const LIMIT = 10;

export function useSalaryRecords(teacherId: string) {
  return useInfiniteQuery({
    queryKey: ["salary_record"],
    queryFn: async ({ pageParam = 0 }) =>
      getTeacherSalaryPaginated(LIMIT, pageParam, teacherId),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === LIMIT ? allPages.length * LIMIT : undefined,
  });
}

export function useDeleteSalaryInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await deleteSalaryRecords(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salary_record"] });
    },
  });
}
