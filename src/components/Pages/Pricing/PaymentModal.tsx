/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check, Mail, Phone } from "lucide-react";
import { IPricingPlan } from "@/types/pricing.type";
import { useCurrentUser } from "@/hooks/auth.hooks";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./StripeForm";
import envConfig from "@/config/envConfig";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: IPricingPlan | null;
}

const stripe = loadStripe(envConfig.stripePublicKey as string);

const PaymentModal = ({ isOpen, onClose, selectedPlan }: PaymentModalProps) => {
  const { data: user, isLoading } = useCurrentUser();

  if (!selectedPlan) return null;

  const IconComponent = selectedPlan.icon;
  const tax = selectedPlan.price * 0.08;
  const total = selectedPlan.price + tax;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#0A400C] flex items-center gap-3">
            <div
              className={`p-2 rounded-full ${
                selectedPlan.popular
                  ? "bg-[#819067]/10"
                  : selectedPlan.premium
                  ? "bg-[#0A400C]/10"
                  : "bg-[#B1AB86]/10"
              }`}
            >
              <IconComponent
                className={`w-6 h-6 ${
                  selectedPlan.popular
                    ? "text-[#819067]"
                    : selectedPlan.premium
                    ? "text-[#0A400C]"
                    : "text-[#819067]"
                }`}
              />
            </div>
            Complete Your {selectedPlan.name} Purchase
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Payment Form */}
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-[#0A400C] mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-medium text-[#0A400C]"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={user.profile.firstName}
                    className="bg-white border-[#B1AB86]/30 focus:border-[#819067]"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-medium text-[#0A400C]"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={user.profile.lastName}
                    className="bg-white border-[#B1AB86]/30 focus:border-[#819067]"
                    disabled
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-[#0A400C]"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#819067] w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      className="pl-10 bg-white border-[#B1AB86]/30 focus:border-[#819067]"
                      disabled
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-[#0A400C]"
                  >
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#819067] w-4 h-4" />
                    <Input
                      id="phone"
                      value={user.profile?.phone}
                      className="pl-10 bg-white border-[#B1AB86]/30 focus:border-[#819067]"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <Elements stripe={stripe}>
              <StripeForm
                planId={selectedPlan.id}
                price={selectedPlan.price}
                total={total}
              />
            </Elements>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#0A400C] mb-4">
                Order Summary
              </h3>

              {/* Order Summary */}
              <Card className="border-[#B1AB86]/30 bg-[#FEFAE0]/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`p-3 rounded-full ${
                        selectedPlan.popular
                          ? "bg-[#819067]/10"
                          : selectedPlan.premium
                          ? "bg-[#0A400C]/10"
                          : "bg-[#B1AB86]/10"
                      }`}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${
                          selectedPlan.popular
                            ? "text-[#819067]"
                            : selectedPlan.premium
                            ? "text-[#0A400C]"
                            : "text-[#819067]"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-semibold text-[#0A400C]">
                          {selectedPlan.name}
                        </h4>
                        {selectedPlan.popular && (
                          <Badge className="bg-[#819067] text-white text-xs">
                            Popular
                          </Badge>
                        )}
                        {selectedPlan.premium && (
                          <Badge className="bg-[#0A400C] text-white text-xs">
                            Premium
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-[#819067] mb-2">
                        {selectedPlan.description}
                      </p>
                      <p className="text-sm text-[#819067]">
                        Duration: {selectedPlan.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-[#0A400C]">
                        ${selectedPlan.price}
                      </div>
                      {selectedPlan.originalPrice && (
                        <div className="text-sm text-[#819067] line-through">
                          ${selectedPlan.originalPrice}
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#819067]">Subtotal:</span>
                      <span className="text-[#0A400C]">
                        ${selectedPlan.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#819067]">Tax (8%):</span>
                      <span className="text-[#0A400C]">${tax.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-[#0A400C]">Total:</span>
                      <span className="text-[#0A400C]">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Features */}
              <Card className="border-[#B1AB86]/30 mt-4">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-[#0A400C] mb-3">
                    What&apos;s Included:
                  </h4>
                  <div className="space-y-2">
                    {selectedPlan.features.slice(0, 5).map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-[#0A400C]">
                          {feature}
                        </span>
                      </div>
                    ))}
                    {selectedPlan.features.length > 5 && (
                      <p className="text-xs text-[#819067] mt-2">
                        + {selectedPlan.features.length - 5} more features
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
