"use client";

import { useGetProfileQuery } from "@/graphql/queries/auth.query.generated";
import { setAuthenticated } from "@/redux/slice/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface AuthInitializerProps {
  children: React.ReactNode;
}

const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const dispatch = useDispatch();
  const { data, isSuccess, isLoading, isFetching } = useGetProfileQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  useEffect(() => {
    if (isSuccess && data?.getProfile) {
      dispatch(setAuthenticated({ user: data.getProfile }));
    }
  }, [isFetching]);
  // Testing

  if (isLoading || isFetching) {
    return null;
  } else {
    return <>{children}</>;
  }
};

export default AuthInitializer;
