"use client";

import { useGetProfileQuery } from "@/graphql/queries/auth.query.generated";
import { setAuthenticated } from "@/redux/slice/authSlice";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";

interface AuthInitializerProps {
  children: React.ReactNode;
}

const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const dispatch = useDispatch();
  const { data, isSuccess, isLoading, isFetching } = useGetProfileQuery();

  useEffect(() => {
    if (isSuccess && data?.getProfile) {
      dispatch(setAuthenticated({ user: data.getProfile }));
    }
  }, [isSuccess, data, dispatch, isFetching]);

  if (isLoading) {
    return null;
  } else {
    return <Suspense>{children}</Suspense>;
  }
};

export default AuthInitializer;
