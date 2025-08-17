/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Lock,
  Check,
  Calendar,
  User,
  Mail,
  Phone,
  Loader2,
  Shield,
} from "lucide-react";
import { IPaymentForm, IPricingPlan } from "@/types/pricing.type";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: (paymentData: any) => void;
  selectedPlan: IPricingPlan | null;
}

export default function PaymentModal({
  isOpen,
  onClose,
  onPaymentComplete,
  selectedPlan,
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentForm, setPaymentForm] = useState<IPaymentForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    agreeToTerms: false,
  });

  if (!selectedPlan) return null;

  const IconComponent = selectedPlan.icon;
  const tax = selectedPlan.price * 0.08; // 8% tax
  const total = selectedPlan.price + tax;

  const handleInputChange = (
    field: keyof IPaymentForm,
    value: string | boolean
  ) => {
    setPaymentForm((prev) => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    if (formatted.replace(/\s/g, "").length <= 16) {
      handleInputChange("cardNumber", formatted);
    }
  };

  const handleExpiryChange = (value: string) => {
    const formatted = formatExpiryDate(value);
    if (formatted.length <= 5) {
      handleInputChange("expiryDate", formatted);
    }
  };

  const validateForm = () => {
    return (
      paymentForm.firstName &&
      paymentForm.lastName &&
      paymentForm.email &&
      paymentForm.phone &&
      paymentForm.cardNumber.replace(/\s/g, "").length === 16 &&
      paymentForm.expiryDate.length === 5 &&
      paymentForm.cvv.length >= 3 &&
      paymentForm.cardholderName &&
      paymentForm.agreeToTerms
    );
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // In a real app, you would integrate with a payment processor like Stripe
      const paymentData = {
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        amount: total,
        customerInfo: {
          name: `${paymentForm.firstName} ${paymentForm.lastName}`,
          email: paymentForm.email,
          phone: paymentForm.phone,
        },
        paymentMethod: {
          last4: paymentForm.cardNumber.slice(-4),
          cardType: "Visa", // You would detect this from the card number
        },
        transactionId: `txn_${Date.now()}`,
        timestamp: new Date().toISOString(),
      };

      onPaymentComplete(paymentData);
    } catch (error) {
      console.error("Payment failed:", error);
      // Handle payment error
    } finally {
      setIsProcessing(false);
    }
  };

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
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    value={paymentForm.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="bg-white border-[#B1AB86]/30 focus:border-[#819067]"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-medium text-[#0A400C]"
                  >
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    value={paymentForm.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="bg-white border-[#B1AB86]/30 focus:border-[#819067]"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-[#0A400C]"
                  >
                    Email Address *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#819067] w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={paymentForm.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="pl-10 bg-white border-[#B1AB86]/30 focus:border-[#819067]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-[#0A400C]"
                  >
                    Phone Number *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#819067] w-4 h-4" />
                    <Input
                      id="phone"
                      value={paymentForm.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="pl-10 bg-white border-[#B1AB86]/30 focus:border-[#819067]"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h3 className="text-lg font-semibold text-[#0A400C] mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-[#819067]" />
                Payment Information
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="cardholderName"
                    className="text-sm font-medium text-[#0A400C]"
                  >
                    Cardholder Name *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#819067] w-4 h-4" />
                    <Input
                      id="cardholderName"
                      value={paymentForm.cardholderName}
                      onChange={(e) =>
                        handleInputChange("cardholderName", e.target.value)
                      }
                      className="pl-10 bg-white border-[#B1AB86]/30 focus:border-[#819067]"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="cardNumber"
                    className="text-sm font-medium text-[#0A400C]"
                  >
                    Card Number *
                  </Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#819067] w-4 h-4" />
                    <Input
                      id="cardNumber"
                      value={paymentForm.cardNumber}
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                      className="pl-10 bg-white border-[#B1AB86]/30 focus:border-[#819067]"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="expiryDate"
                      className="text-sm font-medium text-[#0A400C]"
                    >
                      Expiry Date *
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#819067] w-4 h-4" />
                      <Input
                        id="expiryDate"
                        value={paymentForm.expiryDate}
                        onChange={(e) => handleExpiryChange(e.target.value)}
                        className="pl-10 bg-white border-[#B1AB86]/30 focus:border-[#819067]"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="cvv"
                      className="text-sm font-medium text-[#0A400C]"
                    >
                      CVV *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#819067] w-4 h-4" />
                      <Input
                        id="cvv"
                        value={paymentForm.cvv}
                        onChange={(e) =>
                          handleInputChange(
                            "cvv",
                            e.target.value.replace(/\D/g, "")
                          )
                        }
                        className="pl-10 bg-white border-[#B1AB86]/30 focus:border-[#819067]"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-[#FEFAE0]/50 border border-[#B1AB86]/30 rounded-lg p-4 mt-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#0A400C]">
                      Secure Payment
                    </h4>
                    <p className="text-xs text-[#819067]">
                      Your payment information is encrypted and secure. We never
                      store your card details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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

        {/* Terms Agreement */}
        <div className="flex items-start gap-3 p-4 bg-[#FEFAE0]/50 border border-[#B1AB86]/30 rounded-lg mb-6">
          <input
            type="checkbox"
            id="agreeToTerms"
            checked={paymentForm.agreeToTerms}
            onChange={(e) =>
              handleInputChange("agreeToTerms", e.target.checked)
            }
            className="mt-1"
          />
          <label
            htmlFor="agreeToTerms"
            className="text-sm text-[#0A400C] cursor-pointer"
          >
            I agree to the{" "}
            <a href="#" className="text-[#819067] hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#819067] hover:underline">
              Privacy Policy
            </a>
            . I understand that my listing will be published for{" "}
            {selectedPlan.duration} and I can cancel or modify it at any time.
          </label>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-[#B1AB86]/30">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
          >
            Cancel
          </Button>

          <Button
            onClick={handlePayment}
            disabled={!validateForm() || isProcessing}
            className="bg-[#819067] hover:bg-[#0A400C] text-white disabled:opacity-50 min-w-[120px]"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Pay ${total.toFixed(2)}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
