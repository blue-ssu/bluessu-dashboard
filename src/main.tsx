import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../app/globals.css";
import { RecoilRoot } from "recoil";
import { Toaster } from "./components/ui/sonner.tsx";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { APIResponseError } from "endpoint-client";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof APIResponseError) {
        if (error.body.code === "invalid_token") {
          localStorage.removeItem("token");
          window.location.reload();
        }
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
