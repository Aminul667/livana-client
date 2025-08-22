import {
  CreditCard,
  FileText,
  HelpCircle,
  Home,
  Shield,
  User,
} from "lucide-react";

export const supportCategories = [
  { id: "all", name: "All Topics", icon: HelpCircle, count: 24 },
  { id: "account", name: "Account & Profile", icon: User, count: 6 },
  { id: "properties", name: "Properties & Listings", icon: Home, count: 8 },
  { id: "payments", name: "Payments & Billing", icon: CreditCard, count: 5 },
  { id: "security", name: "Safety & Security", icon: Shield, count: 3 },
  { id: "legal", name: "Legal & Contracts", icon: FileText, count: 2 },
];

export const faqs = [
  {
    id: 1,
    category: "account",
    question: "How do I create an account on Livana?",
    answer:
      'Creating an account is simple! Click the "Sign Up" button in the top right corner, fill in your basic information including name, email, and phone number. You\'ll receive a verification email to confirm your account. Once verified, you can complete your profile and start browsing or listing properties.',
  },
  {
    id: 2,
    category: "account",
    question: "How do I reset my password?",
    answer:
      'If you\'ve forgotten your password, click "Sign In" then "Forgot Password" on the login page. Enter your email address and we\'ll send you a secure link to reset your password. The link expires in 24 hours for security purposes.',
  },
  {
    id: 3,
    category: "properties",
    question: "How do I list my property for rent?",
    answer:
      'To list your property, sign in to your account and click "List Your Property" in the navigation. Fill out the property details including location, rent amount, amenities, and upload high-quality photos. Our team reviews all listings within 24 hours before they go live.',
  },
  {
    id: 4,
    category: "properties",
    question: "What makes a good property listing?",
    answer:
      "Great listings include clear, high-quality photos, detailed descriptions, accurate pricing, and complete amenity information. Properties with virtual tours and detailed neighborhood information typically receive 3x more inquiries.",
  },
  {
    id: 5,
    category: "payments",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and bank transfers. All payments are processed securely through our encrypted payment system. We do not store your payment information.",
  },
  {
    id: 6,
    category: "payments",
    question: "When are listing fees charged?",
    answer:
      "Listing fees are charged when your property listing goes live on our platform. We offer three tiers: Basic ($29), Featured ($59), and Premium Plus ($99). You can upgrade or downgrade your listing at any time.",
  },
  {
    id: 7,
    category: "security",
    question: "How do you verify users and properties?",
    answer:
      "We verify all users through phone number and email confirmation. Property owners must provide government-issued ID and proof of ownership. All listings are manually reviewed by our team. We also run background checks on request.",
  },
  {
    id: 8,
    category: "legal",
    question: "Do you provide rental agreements?",
    answer:
      "Yes, we provide legally compliant rental agreement templates for all states. These agreements are reviewed by legal professionals and updated regularly to reflect current laws. Premium users get access to customizable agreement templates.",
  },
];
