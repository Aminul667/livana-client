/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import PaymentModal from "./PaymentModal";
import { IPricingPlan } from "@/types/pricing.type";
import { pricingPlans } from "@/constants/pricing.constants";

const PricingCards = () => {
  const [selectedPlan, setSelectedPlan] = useState<IPricingPlan | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handlePlanSelect = (plan: IPricingPlan) => {
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentComplete = (paymentData: any) => {
    console.log("Payment completed:", paymentData);
    // Handle successful payment
    setIsPaymentModalOpen(false);
    setSelectedPlan(null);
    // You could redirect to a success page or show a success message
  };

  const handlePaymentCancel = () => {
    setIsPaymentModalOpen(false);
    setSelectedPlan(null);
  };
  return (
    <>
      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
        {pricingPlans.map((plan) => {
          const IconComponent = plan.icon;
          return (
            <Card
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col ${
                plan.popular
                  ? "border-[#819067] ring-2 ring-[#819067]/20 bg-white"
                  : plan.premium
                  ? "border-[#0A400C] ring-2 ring-[#0A400C]/20 bg-gradient-to-br from-white to-[#FEFAE0]/30"
                  : "border-[#B1AB86]/30 bg-white hover:border-[#819067]/50"
              }`}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-4 rounded-full ${
                      plan.popular
                        ? "bg-[#819067]/10"
                        : plan.premium
                        ? "bg-[#0A400C]/10"
                        : "bg-[#B1AB86]/10"
                    }`}
                  >
                    <IconComponent
                      className={`w-8 h-8 ${
                        plan.popular
                          ? "text-[#819067]"
                          : plan.premium
                          ? "text-[#0A400C]"
                          : "text-[#819067]"
                      }`}
                    />
                  </div>
                </div>

                <CardTitle className="text-2xl font-bold text-[#0A400C] mb-2">
                  {plan.name}
                </CardTitle>

                {/* Popular Badge */}
                {plan.popular && (
                  <div className="">
                    <Badge className="bg-[#819067] text-white px-4 py-1 text-sm font-semibold">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Premium Badge */}
                {plan.premium && (
                  <div className="">
                    <Badge className="bg-[#0A400C] text-white px-4 py-1 text-sm font-semibold">
                      Best Value
                    </Badge>
                  </div>
                )}

                <div className="mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-[#0A400C]">
                      ${plan.price}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-lg text-[#819067] line-through">
                        ${plan.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-[#819067] text-sm">for {plan.duration}</p>
                  {plan.savings && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 mt-2"
                    >
                      {plan.savings}
                    </Badge>
                  )}
                </div>

                <p className="text-[#819067] text-sm leading-relaxed">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                {/* Features List */}
                <div className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-[#0A400C] text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  {/* CTA Button */}
                  <Button
                    onClick={() => handlePlanSelect(plan)}
                    className={`w-full py-3 font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-[#819067] hover:bg-[#0A400C] text-white shadow-lg hover:shadow-xl"
                        : plan.premium
                        ? "bg-[#0A400C] hover:bg-[#819067] text-white shadow-lg hover:shadow-xl"
                        : "bg-transparent border-2 border-[#819067] text-[#819067] hover:bg-[#819067] hover:text-white"
                    }`}
                  >
                    {plan.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {/* Additional Info */}
                  <p className="text-center text-xs text-[#819067] mt-3">
                    {plan.id === "basic" && "Perfect for first-time listers"}
                    {plan.id === "featured" && "Most chosen by property owners"}
                    {plan.id === "premium" && "Maximum visibility & support"}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0A400C] text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#0A400C] mb-2">
                What happens after my listing expires?
              </h3>
              <p className="text-[#819067] text-sm">
                Your listing will be automatically removed from search results.
                You can renew or upgrade your plan at any time to keep your
                property visible.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#0A400C] mb-2">
                Can I upgrade my plan later?
              </h3>
              <p className="text-[#819067] text-sm">
                Yes! You can upgrade to a higher plan at any time. We&apos;ll
                prorate the difference and extend your listing duration
                accordingly.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#0A400C] mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-[#819067] text-sm">
                We offer a 7-day money-back guarantee. If you&apos;re not
                satisfied with our service, contact us for a full refund.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#0A400C] mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-[#819067] text-sm">
                We accept all major credit cards, PayPal, and bank transfers.
                All payments are processed securely through our encrypted
                payment system.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#0A400C] mb-2">
                Is there a setup fee?
              </h3>
              <p className="text-[#819067] text-sm">
                No setup fees! The price you see is exactly what you pay. No
                hidden costs or surprise charges.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#0A400C] mb-2">
                Can I list multiple properties?
              </h3>
              <p className="text-[#819067] text-sm">
                Each plan covers one property listing. For multiple properties,
                you can purchase additional plans or contact us for bulk pricing
                options.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-16 text-center">
        <div className="flex items-center justify-center gap-8 flex-wrap">
          <div className="flex items-center gap-2 text-[#819067]">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium">SSL Secured Payments</span>
          </div>
          <div className="flex items-center gap-2 text-[#819067]">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium">24/7 Customer Support</span>
          </div>
          <div className="flex items-center gap-2 text-[#819067]">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium">
              Trusted by 10,000+ Property Owners
            </span>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handlePaymentCancel}
        onPaymentComplete={handlePaymentComplete}
        selectedPlan={selectedPlan}
      />
    </>
  );
};

export default PricingCards;
