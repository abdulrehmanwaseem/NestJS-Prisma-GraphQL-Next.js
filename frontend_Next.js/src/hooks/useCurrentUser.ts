import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

export const useCurrentUser = () => {
  return useSelector((state: RootState) => state.auth.user);
};
