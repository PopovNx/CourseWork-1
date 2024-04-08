import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainPage from "@/components/pages/MainPage";
import UploadPage from "@/components/pages/UploadPage";

const queryClient = new QueryClient();

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage></MainPage>,
    errorElement: <div>Not found</div>,
  },
  {
    path: "/upload",
    element: <UploadPage></UploadPage>,
  },
]);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
