import {
  Calendar,
  Camera,
  CheckCircle,
  Clock,
  CreditCard,
  FileText,
  Home,
  Key,
  MapPin,
  MessageSquare,
  Search,
  Shield,
  Star,
  Users,
} from "lucide-react";

export const rentersSteps = [
  {
    step: 1,
    icon: Search,
    title: "Search & Discover",
    description:
      "Use our smart search to find properties that match your needs, budget, and preferred location. Filter by amenities, price range, and property type.",
    details: [
      "Advanced search filters",
      "Save favorite properties",
      "Get instant notifications",
      "View detailed property photos",
    ],
    color: "from-[#819067] to-[#0A400C]",
  },
  {
    step: 2,
    icon: Calendar,
    title: "Schedule Viewing",
    description:
      "Book virtual or in-person tours directly with property owners at your convenience. Choose from available time slots.",
    details: [
      "Instant booking confirmation",
      "Virtual tour options",
      "Flexible scheduling",
      "Calendar integration",
    ],
    color: "from-[#B1AB86] to-[#819067]",
  },
  {
    step: 3,
    icon: MessageSquare,
    title: "Connect & Apply",
    description:
      "Chat with owners, ask questions, and submit your rental application seamlessly through our secure platform.",
    details: [
      "Direct messaging system",
      "Document upload",
      "Application tracking",
      "Background check integration",
    ],
    color: "from-[#0A400C] to-[#819067]",
  },
  {
    step: 4,
    icon: Key,
    title: "Move In",
    description:
      "Complete the lease agreement digitally and get your keys. Welcome to your new home with full platform support!",
    details: [
      "Digital lease signing",
      "Secure payment processing",
      "Move-in checklist",
      "24/7 customer support",
    ],
    color: "from-[#819067] to-[#B1AB86]",
  },
];

export const ownersSteps = [
  {
    step: 1,
    icon: Camera,
    title: "List Your Property",
    description:
      "Upload high-quality photos, add detailed descriptions, and set your rental price in just a few minutes with our easy-to-use listing tool.",
    details: [
      "Professional photo tips",
      "Pricing recommendations",
      "Property description templates",
      "Instant listing activation",
    ],
    color: "from-[#819067] to-[#0A400C]",
  },
  {
    step: 2,
    icon: Users,
    title: "Meet Tenants",
    description:
      "Review applications, schedule viewings, and connect with potential renters directly through our secure messaging system.",
    details: [
      "Tenant screening tools",
      "Application management",
      "Scheduling system",
      "Background check access",
    ],
    color: "from-[#B1AB86] to-[#819067]",
  },
  {
    step: 3,
    icon: CheckCircle,
    title: "Choose & Approve",
    description:
      "Select your ideal tenant and finalize the rental agreement with our secure digital tools and legal document templates.",
    details: [
      "Tenant comparison tools",
      "Digital lease agreements",
      "Legal document templates",
      "Secure approval process",
    ],
    color: "from-[#0A400C] to-[#819067]",
  },
  {
    step: 4,
    icon: Home,
    title: "Start Earning",
    description:
      "Receive rent payments automatically and manage your property with our comprehensive landlord dashboard and tools.",
    details: [
      "Automated rent collection",
      "Property management dashboard",
      "Maintenance request system",
      "Financial reporting",
    ],
    color: "from-[#819067] to-[#B1AB86]",
  },
];

export const features = [
  {
    icon: Shield,
    title: "Secure & Verified",
    description:
      "All users are verified with background checks and identity verification for your safety and peace of mind.",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description:
      "Secure payment processing with multiple payment options including bank transfers, cards, and digital wallets.",
  },
  {
    icon: FileText,
    title: "Legal Protection",
    description:
      "Legally binding digital contracts and lease agreements with built-in legal protection for both parties.",
  },
  {
    icon: Star,
    title: "Review System",
    description:
      "Transparent review system helps build trust between landlords and tenants with verified feedback.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Round-the-clock customer support to help you with any questions or issues that may arise.",
  },
  {
    icon: MapPin,
    title: "Location Intelligence",
    description:
      "Detailed neighborhood information, nearby amenities, and local market insights for informed decisions.",
  },
];

export const faqs = [
  {
    question: "How much does it cost to use Livana?",
    answer:
      "For renters, Livana is completely free to use. Property owners pay a small service fee only when they successfully rent their property.",
  },
  {
    question: "How do you verify users?",
    answer:
      "We verify all users through identity checks, phone verification, and background screening to ensure a safe community for everyone.",
  },
  {
    question: "What if I have issues with my rental?",
    answer:
      "Our 24/7 support team is here to help resolve any issues. We also provide mediation services and legal resources when needed.",
  },
  {
    question: "How quickly can I list my property?",
    answer:
      "You can list your property in under 10 minutes. Once approved by our team (usually within 24 hours), it goes live immediately.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Yes, we use bank-level encryption and partner with trusted payment processors to ensure your financial information is completely secure.",
  },
];
