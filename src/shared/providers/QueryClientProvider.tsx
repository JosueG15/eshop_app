import React from "react";
import {
  QueryClient,
  QueryClientProvider as RQProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const QueryClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <RQProvider client={queryClient}>{children}</RQProvider>;
};

export default QueryClientProvider;
