import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const showMessageOrError = async (
  data: { error?: string; message?: string; status?: number },
  queryClient?: QueryClient,
  query?: string[]
) => {
  console.log(data, "data");

  if (data?.message) {
    toast.success(data.message); // ✅ Show success toast
  }
  if (data?.error) {
    toast.error(data.error); // ✅ Show success toast
  }
  if (queryClient && query) {
    await queryClient.invalidateQueries({ queryKey: query });
  }
};
