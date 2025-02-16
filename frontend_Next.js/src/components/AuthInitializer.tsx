"use client";

import Loading from "@/app/loading";
import { useGetProfileQuery } from "@/graphql/queries/auth.query.generated";
import { setAuthenticated } from "@/redux/slice/authSlice";
import { Suspense, useEffect, useState } from "react";
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
  }, [isSuccess, data, dispatch]);

  // Prevent infinite loading
  if (isLoading || isFetching) {
    return (
      <div className="bg-white p-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim saepe
        ipsam tempora ipsa veniam earum, optio molestiae nostrum soluta
      </div>
    );
  } else {
    return <Suspense>{children}</Suspense>;
  }
};

export default AuthInitializer;
