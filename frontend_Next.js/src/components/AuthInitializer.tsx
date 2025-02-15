"use client";

import Loading from "@/app/loading";
import { useGetProfileQuery } from "@/graphql/queries/auth.query.generated";
import { setAuthenticated } from "@/redux/slice/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface AuthInitializerProps {
  children: React.ReactNode;
}

const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const dispatch = useDispatch();
  const { data, isSuccess, isLoading, isFetching } = useGetProfileQuery();
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (isSuccess && data?.getProfile) {
      dispatch(setAuthenticated({ user: data.getProfile }));
      setHasInitialized(true);
    }
  }, [isSuccess, data, dispatch]);

  if (!hasInitialized && (isLoading || isFetching)) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthInitializer;
