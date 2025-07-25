"use client";

import FeaturedProperties from "@/components/Pages/Home/FeaturedProperties";
import Hero from "@/components/Pages/Home/Hero";
import HowItWorks from "@/components/Pages/Home/HowItWorks";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProperties />
      <HowItWorks />
    </main>
  );
}
