"use client";

import Loading from "@/app/loading";
import { useGetProfileQuery } from "@/graphql/queries/auth.query.generated";
import { setAuthenticated } from "@/redux/slice/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface AuthInitializerProps {
  children: React.ReactNode;
}
const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const dispatch = useDispatch();
  const { data, isSuccess, isLoading, isFetching } = useGetProfileQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuthenticated({ user: data?.getProfile }));
    }
  }, [isFetching]);

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthInitializer;
