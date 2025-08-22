"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  faqs,
  features,
  ownersSteps,
  rentersSteps,
} from "@/constants/common.constants";
import { ArrowRight, CheckCircle, Mail, Phone, Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<"renters" | "owners">("renters");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFAE0] to-white mt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#819067] to-[#0A400C] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            How Livana Works
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Discover how easy it is to find your perfect rental or list your
            property with our simple, secure platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#819067] hover:bg-[#FEFAE0] px-8 py-4 text-lg cursor-pointer"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#819067] px-8 py-4 text-lg bg-transparent cursor-pointer"
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-white border-b border-[#B1AB86]/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setActiveTab("renters")}
              className={`px-8 py-3 rounded-full text-lg ${
                activeTab === "renters"
                  ? "bg-[#819067] text-white"
                  : "bg-[#FEFAE0] text-[#819067] hover:bg-[#B1AB86]/20"
              }`}
            >
              🏡 For Renters
            </Button>
            <Button
              onClick={() => setActiveTab("owners")}
              className={`px-8 py-3 rounded-full text-lg ${
                activeTab === "owners"
                  ? "bg-[#819067] text-white"
                  : "bg-[#FEFAE0] text-[#819067] hover:bg-[#B1AB86]/20"
              }`}
            >
              🏠 For Property Owners
            </Button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A400C] mb-4">
              {activeTab === "renters"
                ? "Finding Your Perfect Rental"
                : "Listing Your Property"}
            </h2>
            <p className="text-lg text-[#819067] max-w-2xl mx-auto">
              {activeTab === "renters"
                ? "Follow these simple steps to find and secure your ideal rental property"
                : "Get your property listed and start earning rental income in just a few steps"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(activeTab === "renters" ? rentersSteps : ownersSteps).map(
              (step, index) => {
                const IconComponent = step.icon;
                return (
                  <Card
                    key={step.step}
                    className="p-0 relative overflow-hidden border-[#B1AB86]/30 bg-white hover:shadow-xl transition-all duration-300 hover:border-[#819067]/50 group"
                  >
                    <CardContent className="p-6">
                      {/* Step Number */}
                      <div className="absolute top-4 right-4 w-8 h-8 bg-[#819067]/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-[#0A400C]">
                          {step.step}
                        </span>
                      </div>

                      {/* Icon */}
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <h4 className="text-xl font-semibold text-[#0A400C] mb-3 text-center">
                        {step.title}
                      </h4>
                      <p className="text-[#819067] text-sm leading-relaxed mb-4 text-center">
                        {step.description}
                      </p>

                      {/* Details */}
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-xs text-[#819067]"
                          >
                            <CheckCircle className="w-3 h-3 text-[#819067] mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>

                      {/* Connecting Arrow */}
                      {index <
                        (activeTab === "renters" ? rentersSteps : ownersSteps)
                          .length -
                          1 && (
                        <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-[#819067] rounded-full flex items-center justify-center z-10">
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#FEFAE0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A400C] mb-4">
              Why Choose Livana?
            </h2>
            <p className="text-lg text-[#819067] max-w-2xl mx-auto">
              We&apos;ve built the most comprehensive rental platform with
              features designed to make your experience seamless and secure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="bg-white border-[#B1AB86]/30 hover:shadow-lg transition-all duration-300 p-0"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-[#819067] rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0A400C] mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-[#819067] text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A400C] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[#819067] max-w-2xl mx-auto">
              Got questions? We&apos;ve got answers. Here are the most common
              questions about using Livana
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-[#B1AB86]/30 bg-white p-0">
                <CardContent className="p-0">
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                    className="w-full p-6 text-left hover:bg-[#FEFAE0]/50 transition-colors duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-[#0A400C] pr-4">
                        {faq.question}
                      </h3>
                      <ArrowRight
                        className={`w-5 h-5 text-[#819067] transition-transform duration-200 ${
                          expandedFaq === index ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-[#819067] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#819067] to-[#0A400C] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of happy renters and property owners who trust Livana
            for their rental needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties">
              <Button
                size="lg"
                className="bg-white text-[#819067] hover:bg-[#FEFAE0] px-8 py-4 text-lg cursor-pointer"
              >
                Find Rentals
              </Button>
            </Link>
            <Link href="/listing/add-property">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#819067] px-8 py-4 text-lg bg-transparent cursor-pointer"
            >
              List Your Property
            </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-lg mb-4 opacity-90">
              Still have questions? We&apos;re here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>1-800-LIVANA-1</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>support@livana.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
