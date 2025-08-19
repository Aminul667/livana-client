import PricingCards from "@/components/Pages/Pricing/PricingCards";
import { getDraftListingById } from "@/Services/ListingServices";
import { Check } from "lucide-react";
import React from "react";

const PricingPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getDraftListingById(id);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFAE0] to-[#B1AB86]/20 mt-16">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A400C] mb-4">
            Choose Your <span className="text-[#819067]">Listing Plan</span>
          </h1>
          <p className="text-xl text-[#819067] max-w-3xl mx-auto mb-8">
            Get your property noticed by thousands of potential tenants and
            buyers. Choose the plan that best fits your needs and budget.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-[#819067]">
            <Check className="w-4 h-4 text-green-600" />
            <span>No hidden fees</span>
            <span className="mx-2">•</span>
            <Check className="w-4 h-4 text-green-600" />
            <span>Cancel anytime</span>
            <span className="mx-2">•</span>
            <Check className="w-4 h-4 text-green-600" />
            <span>Money-back guarantee</span>
          </div>
        </div>

        {/* pricing */}
        <PricingCards />
      </div>
    </div>
  );
};

export default PricingPage;
