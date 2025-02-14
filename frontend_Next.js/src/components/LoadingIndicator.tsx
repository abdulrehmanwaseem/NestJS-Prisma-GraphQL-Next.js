"use client";

import Loading from "@/app/loading";
import { useSelector } from "react-redux";

const LoadingIndicator = () => {
  const isSomeQueryPending = useSelector(
    (state: any) =>
      Object.values(state?.api?.queries).some(
        (query: any) => query.status === "pending"
      ) ||
      Object.values(state?.api?.mutations).some(
        (query: any) => query.status === "pending"
      )
  );

  return isSomeQueryPending ? <Loading /> : null;
};

export default LoadingIndicator;
