"use client";

import AuthInitializer from "@/components/AuthInitializer";
import LoadingIndicator from "@/components/LoadingIndicator";
import { store } from "@/redux/store";
import { Suspense, type ReactNode } from "react";
import { Provider } from "react-redux";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <LoadingIndicator />
      <Suspense fallback={<LoadingIndicator />}>
        <AuthInitializer>{children}</AuthInitializer>
      </Suspense>
    </Provider>
  );
}
