import React from "react";
import MainPage from "@/components/main/MainPage";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MainPage></MainPage>
      </QueryClientProvider>
    </>
  );
};

export default App;
