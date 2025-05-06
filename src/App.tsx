import React from "react";
import RoutesApp from "./routers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { CartProvider } from "./Layout/Cart";

const App = () => {
  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Open Sans",
          },
        }}
      >
        
        <RoutesApp />
      </ConfigProvider>
    </QueryClientProvider>
  );
};
export default App;
