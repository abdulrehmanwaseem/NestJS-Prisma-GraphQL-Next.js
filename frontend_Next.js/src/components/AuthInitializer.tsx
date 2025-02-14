"use client";

import { useGetProfileQuery } from "@/graphql/queries/auth.query.generated";
import { setAuthenticated } from "@/redux/slice/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthInitializer = () => {
  const dispatch = useDispatch();
  const { data, isSuccess, isFetching } = useGetProfileQuery();

  useEffect(() => {
    if (data?.getProfile && isSuccess) {
      dispatch(setAuthenticated({ user: data?.getProfile }));
    }
  }, [isFetching]);

  return null;
};

export default AuthInitializer;
