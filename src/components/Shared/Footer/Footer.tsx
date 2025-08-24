"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  HeadphonesIcon,
  Home,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Shield,
  Twitter,
  Users,
} from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };
  return (
    <footer className="bg-gradient-to-br from-[#0A400C] to-[#819067] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-[#FEFAE0]" />
              <h3 className="text-2xl font-bold text-[#FEFAE0]">RentEase</h3>
            </div>
            <p className="text-gray-200 leading-relaxed">
              Your trusted platform for finding and listing rental properties.
              We connect landlords and tenants with secure, verified listings
              and comprehensive support.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-300 hover:text-[#FEFAE0] cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-300 hover:text-[#FEFAE0] cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-300 hover:text-[#FEFAE0] cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-300 hover:text-[#FEFAE0] cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#FEFAE0] flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/browse-rentals"
                  className="text-gray-200 hover:text-[#FEFAE0] transition-colors"
                >
                  Browse Rentals
                </a>
              </li>
              <li>
                <a
                  href="/list-property"
                  className="text-gray-200 hover:text-[#FEFAE0] transition-colors"
                >
                  List Your Property
                </a>
              </li>
              <li>
                <a
                  href="/how-it-works"
                  className="text-gray-200 hover:text-[#FEFAE0] transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="text-gray-200 hover:text-[#FEFAE0] transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="text-gray-200 hover:text-[#FEFAE0] transition-colors"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#FEFAE0] flex items-center">
              <HeadphonesIcon className="h-5 w-5 mr-2" />
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/support"
                  className="text-gray-200 hover:text-[#FEFAE0] transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="/support#contact"
                  className="text-gray-200 hover:text-[#FEFAE0] transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/support#faq"
                  className="text-gray-200 hover:text-[#FEFAE0] transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/community"
                  className="text-gray-200 hover:text-[#FEFAE0] transition-colors"
                >
                  Community Forum
                </a>
              </li>
              <li>
                <a
                  href="/guides"
                  className="text-gray-200 hover:text-[#FEFAE0] transition-colors"
                >
                  User Guides
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#FEFAE0] flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Stay Connected
            </h4>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-200">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">123 Main St, New York, NY 10001</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-200">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-200">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@rentease.com</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-2">
              <p className="text-sm text-gray-200">
                Subscribe to our newsletter
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex space-x-2"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                  required
                />
                <Button
                  type="submit"
                  className="bg-[#FEFAE0] text-[#0A400C] hover:bg-[#B1AB86] hover:text-white transition-colors cursor-pointer"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Links */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-start space-x-6">
              <a
                href="/privacy"
                className="text-gray-300 hover:text-[#FEFAE0] text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-300 hover:text-[#FEFAE0] text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/cookies"
                className="text-gray-300 hover:text-[#FEFAE0] text-sm transition-colors"
              >
                Cookie Policy
              </a>
              <a
                href="/accessibility"
                className="text-gray-300 hover:text-[#FEFAE0] text-sm transition-colors"
              >
                Accessibility
              </a>
            </div>

            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-300 text-sm">
              <Shield className="h-4 w-4" />
              <span>© 2024 RentEase. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
