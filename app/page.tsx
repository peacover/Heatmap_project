"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MentalomeChart from "@/components/MentalomeChart";
import MentalomeInput from "@/components/MentalomeInputs";
import ScrollToTop from "@/components/ScrollToTop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

// const queryClient = new QueryClient();
export default function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <MentalomeInput />
        <ScrollToTop />
        <Footer />
      </QueryClientProvider>
    </>
  );
}
