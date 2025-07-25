"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FEFAE0]/95 backdrop-blur-md border-b border-[#B1AB86]/20 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-[#0A400C]">Livana</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a
              href="#"
              className="text-[#0A400C] hover:text-[#819067] font-medium transition-colors"
            >
              Browse Rentals
            </a>
            <a
              href="#"
              className="text-[#0A400C] hover:text-[#819067] font-medium transition-colors"
            >
              How it Works
            </a>
            <a
              href="#"
              className="text-[#0A400C] hover:text-[#819067] font-medium transition-colors"
            >
              Support
            </a>
          </div>

          {/* Desktop Auth & Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/sign-in"
              className="text-[#0A400C] hover:text-[#819067] font-medium transition-colors"
            >
              Sign In
            </Link>
            <Button
              size="sm"
              className="bg-[#819067] hover:bg-[#0A400C] text-white"
            >
              List Your Property
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#0A400C]"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-[#B1AB86]/20 py-4">
            <div className="flex flex-col space-y-4">
              <a
                href="#"
                className="text-[#0A400C] hover:text-[#819067] font-medium transition-colors"
              >
                Browse Rentals
              </a>
              <a
                href="#"
                className="text-[#0A400C] hover:text-[#819067] font-medium transition-colors"
              >
                How it Works
              </a>
              <a
                href="#"
                className="text-[#0A400C] hover:text-[#819067] font-medium transition-colors"
              >
                Support
              </a>
              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#819067] text-[#819067] hover:bg-[#819067] hover:text-white flex-1 bg-transparent"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="bg-[#819067] hover:bg-[#0A400C] text-white flex-1"
                >
                  List Your Property
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
