import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Camera,
  CheckCircle,
  Home,
  Key,
  MessageSquare,
  Search,
  Users,
} from "lucide-react";

const rentersSteps = [
  {
    step: 1,
    icon: Search,
    title: "Search & Discover",
    description:
      "Use our smart search to find properties that match your needs, budget, and preferred location.",
    color: "from-[#819067] to-[#0A400C]",
  },
  {
    step: 2,
    icon: Calendar,
    title: "Schedule Viewing",
    description:
      "Book virtual or in-person tours directly with property owners at your convenience.",
    color: "from-[#B1AB86] to-[#819067]",
  },
  {
    step: 3,
    icon: MessageSquare,
    title: "Connect & Apply",
    description:
      "Chat with owners, ask questions, and submit your rental application seamlessly.",
    color: "from-[#0A400C] to-[#819067]",
  },
  {
    step: 4,
    icon: Key,
    title: "Move In",
    description:
      "Complete the lease agreement and get your keys. Welcome to your new home!",
    color: "from-[#819067] to-[#B1AB86]",
  },
];

const ownersSteps = [
  {
    step: 1,
    icon: Camera,
    title: "List Your Property",
    description:
      "Upload photos, add details, and set your rental price in just a few minutes.",
    color: "from-[#819067] to-[#0A400C]",
  },
  {
    step: 2,
    icon: Users,
    title: "Meet Tenants",
    description:
      "Review applications, schedule viewings, and connect with potential renters directly.",
    color: "from-[#B1AB86] to-[#819067]",
  },
  {
    step: 3,
    icon: CheckCircle,
    title: "Choose & Approve",
    description:
      "Select your ideal tenant and finalize the rental agreement with our secure tools.",
    color: "from-[#0A400C] to-[#819067]",
  },
  {
    step: 4,
    icon: Home,
    title: "Start Earning",
    description:
      "Receive rent payments and manage your property with our landlord dashboard.",
    color: "from-[#819067] to-[#B1AB86]",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A400C] mb-4">
            How Livana Works
          </h2>
          <p className="text-lg text-[#819067] max-w-2xl mx-auto mb-8">
            Whether you&apos;re looking for a rental or listing your property,
            we&apos;ve made the process simple and transparent
          </p>

          {/* Toggle Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            <Button
              className="bg-[#819067] hover:bg-[#0A400C] text-white px-8 py-3 rounded-full"
              id="renters-tab"
            >
              🏡 For Renters
            </Button>
            <Button
              variant="outline"
              className="border-[#819067] text-[#819067] hover:bg-[#819067] hover:text-white px-8 py-3 rounded-full bg-white"
            >
              🏠 For Property Owners
            </Button>
          </div>
        </div>

        {/* For Renters Section */}
        <div className="mb-16" id="renters-section">
          <h3 className="text-2xl font-semibold text-[#0A400C] text-center mb-8">
            Finding Your Perfect Rental
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rentersSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card
                  key={step.step}
                  className="relative overflow-hidden border-[#B1AB86]/30 bg-[#FEFAE0] hover:shadow-lg transition-all duration-300 hover:border-[#819067]/50"
                >
                  <CardContent className="p-6 text-center">
                    {/* Step Number */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-[#819067]/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-[#0A400C]">
                        {step.step}
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h4 className="text-lg font-semibold text-[#0A400C] mb-3">
                      {step.title}
                    </h4>
                    <p className="text-[#819067] text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>

                  {/* Connecting Line */}
                  {index < rentersSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#B1AB86] z-10"></div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* For Property Owners Section */}
        <div className="mb-12" id="owners-section">
          <h3 className="text-2xl font-semibold text-[#0A400C] text-center mb-8">
            Listing Your Property
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ownersSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card
                  key={step.step}
                  className="relative overflow-hidden border-[#B1AB86]/30 bg-[#FEFAE0] hover:shadow-lg transition-all duration-300 hover:border-[#819067]/50"
                >
                  <CardContent className="p-6 text-center">
                    {/* Step Number */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-[#819067]/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-[#0A400C]">
                        {step.step}
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h4 className="text-lg font-semibold text-[#0A400C] mb-3">
                      {step.title}
                    </h4>
                    <p className="text-[#819067] text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>

                  {/* Connecting Line */}
                  {index < ownersSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#B1AB86] z-10"></div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-[#FEFAE0] rounded-2xl p-8 shadow-lg border border-[#B1AB86]/30">
          <h3 className="text-2xl font-bold text-[#0A400C] mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-[#819067] mb-6 max-w-xl mx-auto">
            Join thousands of happy renters and property owners who trust Livana
            for their rental needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#819067] hover:bg-[#0A400C] text-white px-8 py-3 rounded-full">
              Start Searching
            </Button>
            <Button
              variant="outline"
              className="border-[#819067] text-[#819067] hover:bg-[#819067] hover:text-white px-8 py-3 rounded-full bg-white"
            >
              List Your Property
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
