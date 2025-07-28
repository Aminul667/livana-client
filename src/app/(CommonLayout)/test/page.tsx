"use client";

import Test from "@/components/Shared/Test/Test";
import React from "react";

const TestPage = () => {
  return (
    <div className="mt-16 min-h-screen bg-gradient-to-br from-[#FEFAE0] to-[#B1AB86]/20 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A400C] mb-2">
            List Your Property
          </h1>
          <p className="text-[#819067]">
            Fill out the details below to list your property on Livana
          </p>
        </div>

        <Test />
      </div>
    </div>
  );
};

export default TestPage;
