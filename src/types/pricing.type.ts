export interface IPricingPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration: string;
  description: string;
  features: string[];
  popular?: boolean;
  premium?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  buttonText: string;
  savings?: string;
}

export interface IPaymentForm {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Payment Information
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;

  // Agreement
  agreeToTerms: boolean;
}
