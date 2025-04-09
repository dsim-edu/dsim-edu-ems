import { useQuery } from "@tanstack/react-query";
import { isAuth } from "../server/user.action";

export const useUserAuth = () => {
  return useQuery({ queryKey: ["auth-boolean"], queryFn: isAuth });
};
