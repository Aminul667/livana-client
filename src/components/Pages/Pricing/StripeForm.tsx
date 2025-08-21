/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calendar,
  CreditCard,
  Loader2,
  Lock,
  Shield,
  User,
} from "lucide-react";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import {
  useAddPaymentHistory,
  useCreatePaymentIntent,
} from "@/hooks/payment.hook";
import {
  StripeCardCvcElementOptions,
  StripeCardExpiryElementOptions,
  StripeCardNumberElementOptions,
  StripeElementStyle,
} from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

const SHARED_STYLE: StripeElementStyle = {
  base: {
    fontSize: "16px",
    lineHeight: "24px",
    color: "#0f172a",
    "::placeholder": { color: "#7D8A9B" },
    ":-webkit-autofill": { color: "#0f172a" },
  },
  invalid: { color: "#fa755a" },
};

export const CARD_NUMBER_OPTIONS: StripeCardNumberElementOptions = {
  placeholder: "Card number",
  showIcon: true,
  style: SHARED_STYLE,
};

export const CARD_EXPIRY_OPTIONS: StripeCardExpiryElementOptions = {
  placeholder: "MM/YY",
  style: SHARED_STYLE,
};

export const CARD_CVC_OPTIONS: StripeCardCvcElementOptions = {
  placeholder: "CVC",
  style: SHARED_STYLE,
};

type TPrice = {
  planId: string;
  price: number;
  total: number;
};

const StripeForm = ({ planId, price, total }: TPrice) => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  console.log("Id from stripe form", id);

  const { mutate: handleAddPaymentHistory, isPending: historyPending } =
    useAddPaymentHistory({
      onSuccess: () => {
        toast.success("Payment history is added successfully");
        router.push(`/properties`);
      },
    });

  const stripe = useStripe();
  const elements = useElements();

  const [cardholderName, setCardholderName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // field completion + errors
  const [complete, setComplete] = useState({
    number: false,
    expiry: false,
    cvc: false,
  });
  const [errs, setErrs] = useState({
    number: "",
    expiry: "",
    cvc: "",
    general: "",
  });

  const onNumberChange = (e: any) => {
    setComplete((p) => ({ ...p, number: e.complete }));
    setErrs((p) => ({ ...p, number: e.error?.message ?? "" }));
  };
  const onExpiryChange = (e: any) => {
    setComplete((p) => ({ ...p, expiry: e.complete }));
    setErrs((p) => ({ ...p, expiry: e.error?.message ?? "" }));
  };
  const onCvcChange = (e: any) => {
    setComplete((p) => ({ ...p, cvc: e.complete }));
    setErrs((p) => ({ ...p, cvc: e.error?.message ?? "" }));
  };

  // Create (or refresh) a PaymentIntent whenever the inputs change
  const {
    mutateAsync: createIntent,
    data: clientSecret, // string | undefined
    isPending,
    reset: resetIntent,
  } = useCreatePaymentIntent();

  useEffect(() => {
    // only create if total is valid
    if (total > 0 && planId) {
      createIntent(total).catch(() => {});
    } else {
      resetIntent();
    }
    // optional cleanup if this component unmounts
    return () => {
      resetIntent();
    };
  }, [planId, total, createIntent, resetIntent]);

  console.log("clientSecret", clientSecret);

  const focusFirstIncomplete = () => {
    if (!complete.number) elements?.getElement(CardNumberElement)?.focus();
    else if (!complete.expiry) elements?.getElement(CardExpiryElement)?.focus();
    else elements?.getElement(CardCvcElement)?.focus();
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setErrs((p) => ({ ...p, general: "" }));

      if (!stripe || !elements) throw new Error("Stripe not ready.");
      if (!total || total <= 0) throw new Error("Invalid amount.");

      // client secret might not be ready yet → ensure it
      const ensuredSecret = clientSecret ?? (await createIntent(total));

      // hard-guard Elements completion
      if (!complete.number || !complete.expiry || !complete.cvc) {
        setErrs((p) => ({
          ...p,
          number: complete.number
            ? p.number
            : p.number || "Enter a valid card number",
          expiry: complete.expiry ? p.expiry : p.expiry || "Enter expiry date",
          cvc: complete.cvc ? p.cvc : p.cvc || "Enter CVC",
          general: "Please fix the highlighted fields.",
        }));
        focusFirstIncomplete();
        setIsProcessing(false);
        return;
      }

      const card = elements.getElement(CardNumberElement);
      if (!card) throw new Error("Card element not found.");

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        ensuredSecret,
        {
          payment_method: {
            card,
            billing_details: { name: cardholderName || undefined },
          },
        }
      );

      if (error) {
        setErrs((p) => ({ ...p, general: error.message ?? "Payment failed." }));
        focusFirstIncomplete();
        setIsProcessing(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        // Clear UI
        setCardholderName("");
        elements.getElement(CardNumberElement)?.clear();
        elements.getElement(CardExpiryElement)?.clear();
        elements.getElement(CardCvcElement)?.clear();
        // TODO: notify backend / close modal, etc.
        const paymentData = {
          propertyId: id,
          type: planId,
          amount: total,
          transactionId: clientSecret as string,
        };

        handleAddPaymentHistory(paymentData);
      } else {
        setErrs((p) => ({
          ...p,
          general: `Unexpected status: ${paymentIntent?.status ?? "unknown"}`,
        }));
      }
    } catch (e: any) {
      setErrs((p) => ({ ...p, general: e?.message ?? "Payment failed." }));
    } finally {
      setIsProcessing(false);
    }
  };

  const payDisabled =
    isProcessing ||
    isPending || // waiting for clientSecret
    !stripe ||
    !elements ||
    !planId ||
    !total ||
    total <= 0 ||
    !complete.number ||
    !complete.expiry ||
    !complete.cvc;

  return (
    <div>
      {!clientSecret && (
        <p className="text-sm text-slate-500 mt-2">Preparing secure payment…</p>
      )}
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
            Cardholder Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#819067] w-4 h-4" />
            <Input
              id="cardholderName"
              className="pl-10 bg-white border-[#B1AB86]/30 focus:border-[#819067]"
              placeholder="John Doe"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
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
          <div>
            <div>
              <CardNumberElement
                onChange={onNumberChange}
                options={{ showIcon: true }}
                className="w-full bg-white rounded-sm p-2 border border-[#B1AB86]/30 focus:border-[#819067]"
              />
            </div>
            {errs.number && (
              <p className="text-sm text-red-600 mt-1">{errs.number}</p>
            )}
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
            <div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#819067] w-4 h-4" />
                <CardExpiryElement
                  id="card-expiry"
                  options={CARD_EXPIRY_OPTIONS}
                  onChange={onExpiryChange}
                  className="w-full p-1 pl-10 bg-white border rounded-sm border-[#B1AB86]/30 focus:border-[#819067]"
                />
              </div>
              {errs.expiry && (
                <p className="text-sm text-red-600 mt-1">{errs.expiry}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvv" className="text-sm font-medium text-[#0A400C]">
              CVV *
            </Label>
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#819067] w-4 h-4" />
                <CardCvcElement
                  id="card-cvc"
                  options={CARD_CVC_OPTIONS}
                  onChange={onCvcChange}
                  className="w-full p-1 pl-10 bg-white border rounded-sm border-[#B1AB86]/30 focus:border-[#819067]"
                />
              </div>
              {errs.cvc && (
                <p className="text-sm text-red-600 mt-1">{errs.cvc}</p>
              )}
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
              Your payment information is encrypted and secure. We never store
              your card details.
            </p>
          </div>
        </div>
      </div>
      <Button
        className="w-full mt-4 bg-[#819067] hover:bg-[#0A400C] text-white disabled:opacity-50 min-w-[120px] cursor-pointer"
        onClick={handlePayment}
        disabled={payDisabled}
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
  );
};

export default StripeForm;
