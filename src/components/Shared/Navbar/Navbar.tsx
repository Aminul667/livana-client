"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/auth.hooks";
import { TAvatarDropdownProps } from "@/types/user.types";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userAvatarData: TAvatarDropdownProps = {
    id: user?.id,
    name: `${user?.profile.firstName} ${user?.profile.lastName}`,
    email: user?.email,
    avatar: user?.profile.profilePhoto,
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FEFAE0]/95 backdrop-blur-md border-b border-[#B1AB86]/20 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div>
            <Link href="/" className="text-2xl font-bold text-[#0A400C]">
              Livana
            </Link>
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
            <Link href="/listing/add-property">
              <Button
                size="sm"
                className="bg-[#819067] hover:bg-[#0A400C] text-white cursor-pointer"
              >
                List Your Property
              </Button>
            </Link>

            {user ? (
              <UserAvatar user={userAvatarData} />
            ) : (
              <Link
                href="/sign-in"
                className="text-[#0A400C] hover:text-[#819067] font-medium transition-colors"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#819067] text-[#819067] hover:bg-[#819067] hover:text-white bg-transparent cursor-pointer"
                >
                  Sign In
                </Button>
              </Link>
            )}
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
                <Link href="/sign-in" className="w-1/2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-[#819067] text-[#819067] hover:bg-[#819067] hover:text-white bg-transparent cursor-pointer"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link className="w-1/2" href="/listing/add-property">
                  <Button
                    size="sm"
                    className="w-full bg-[#819067] hover:bg-[#0A400C] text-white cursor-pointer"
                  >
                    List Your Property
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
