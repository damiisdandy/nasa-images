import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              backgroundColor: "#222",
              color: "#fff",
            },
          }}
        />
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
