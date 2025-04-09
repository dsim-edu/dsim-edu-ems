import { useQuery } from "@tanstack/react-query";
import { SortingState } from "@tanstack/react-table";
import { getStudentsForTable } from "../server/student.action";
import { showMessageOrError } from "@/lib/show-message-error";
import { courseEnumType, sessionRangeEnumType } from "../types";

export const useAllStudentsForTable = ({
  pageIndex,
  pageSize,
  search,
  sorting,
  course,
  sessionRange,
}: {
  pageIndex: number;
  pageSize: number;
  search?: string;
  sorting?: SortingState;
  course: courseEnumType | "all";
  sessionRange: sessionRangeEnumType | "all";
}) => {
  return useQuery({
    queryKey: [
      "table_students",
      pageIndex,
      pageSize,
      search,
      sorting,
      course,
      sessionRange,
    ],
    queryFn: async () => {
      const data = await getStudentsForTable({
        limit: pageSize,
        offset: pageIndex * pageSize,
        search,
        sorting,
        course,
        sessionRange,
      });
      if ("error" in data) {
        showMessageOrError(data);

        return { allStudents: [], totalCount: 0 };
      } else {
        return {
          allStudents: data.allStudents,
          totalCount: data.studentCount,
        };
      }
    },
  });
};
