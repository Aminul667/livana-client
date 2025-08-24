"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { faqs, supportCategories } from "@/constants/support.constants";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Mail,
  MessageCircle,
  Phone,
  Search,
} from "lucide-react";
import { useState } from "react";

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Contact form submitted:", contactForm);
    // Reset form
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
      category: "general",
    });
    alert(
      "Thank you for contacting us! We'll get back to you within 24 hours."
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFAE0] to-white mt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#819067] to-[#0A400C] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How Can We Help You?
          </h1>
          <p className="text-xl mb-8 text-white/90">
            Find answers to your questions or get in touch with our support team
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg bg-white text-gray-900 border-0 rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Contact */}
            <Card className="mb-6 border-[#B1AB86]/20 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#0A400C] flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Quick Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-[#819067]" />
                  <div>
                    <p className="font-medium text-[#0A400C]">Phone Support</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-[#819067]" />
                  <div>
                    <p className="font-medium text-[#0A400C]">Email Support</p>
                    <p className="text-gray-600">support@livana.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-[#819067]" />
                  <div>
                    <p className="font-medium text-[#0A400C]">Hours</p>
                    <p className="text-gray-600">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>
                <Button className="w-full bg-[#819067] hover:bg-[#0A400C] text-white cursor-pointer">
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="border-[#B1AB86]/20 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#0A400C]">
                  Help Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {supportCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? "bg-[#819067] text-white"
                          : "hover:bg-[#B1AB86]/10 text-[#0A400C]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          selectedCategory === category.id
                            ? "bg-white/20 text-white"
                            : "bg-[#B1AB86]/20 text-gray-600"
                        }`}
                      >
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* FAQ Section */}
            <Card className="mb-8 border-[#B1AB86]/20 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#0A400C]">
                  Frequently Asked Questions
                </CardTitle>
                <p className="text-gray-600">
                  {filteredFaqs.length} articles found
                  {selectedCategory !== "all" &&
                    ` in ${
                      supportCategories.find((c) => c.id === selectedCategory)
                        ?.name
                    }`}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="border border-[#B1AB86]/20 rounded-lg"
                    >
                      <button
                        onClick={() =>
                          setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                        }
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-[#B1AB86]/5 transition-colors"
                      >
                        <span className="font-medium text-[#0A400C] pr-4">
                          {faq.question}
                        </span>
                        {expandedFaq === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-[#819067] flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#819067] flex-shrink-0" />
                        )}
                      </button>
                      {expandedFaq === faq.id && (
                        <div className="px-4 pb-4 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="border-[#B1AB86]/20 shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#0A400C]">
                  Contact Our Support Team
                </CardTitle>
                <p className="text-gray-600">
                  Can&apos;t find what you&apos;re looking for? Send us a
                  message and we&apos;ll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0A400C] mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            name: e.target.value,
                          })
                        }
                        className="border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0A400C] mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            email: e.target.value,
                          })
                        }
                        className="border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0A400C] mb-2">
                        Category
                      </label>
                      <select
                        value={contactForm.category}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            category: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-[#B1AB86]/30 rounded-md focus:border-[#819067] focus:ring-[#819067] bg-white"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="account">Account Issues</option>
                        <option value="properties">Property Listings</option>
                        <option value="payments">Payments & Billing</option>
                        <option value="technical">Technical Support</option>
                        <option value="legal">Legal Questions</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0A400C] mb-2">
                        Subject *
                      </label>
                      <Input
                        type="text"
                        required
                        value={contactForm.subject}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            subject: e.target.value,
                          })
                        }
                        className="border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]"
                        placeholder="Brief description of your issue"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0A400C] mb-2">
                      Message *
                    </label>
                    <Textarea
                      required
                      rows={10}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                      className="border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067] resize-none"
                      placeholder="Please provide as much detail as possible about your question or issue..."
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      * Required fields. We typically respond within 24 hours.
                    </p>
                    <Button
                      type="submit"
                      className="bg-[#819067] hover:bg-[#0A400C] text-white px-8"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
