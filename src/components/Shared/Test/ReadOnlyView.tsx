import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FileText, MapPin, Phone, User } from "lucide-react";
import React from "react";

type UserProfile = {
  firstName: string;
  lastName: string;
  phone: string;
  profilePhoto?: string;
  about?: string;
  location: string;
};

// Mock user data
const mockUser: UserProfile = {
  firstName: "Sarah",
  lastName: "Johnson",
  phone: "+1 (555) 123-4567",
  profilePhoto: "/placeholder.svg?height=150&width=150&text=SJ",
  about:
    "I'm a marketing professional looking for a comfortable and modern apartment in the city. I love cooking, reading, and spending time with my two cats. I'm a responsible tenant with excellent references and stable income.",
  location: "Seattle, WA",
};

const ReadOnlyView = () => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Profile Photo Section */}
      <div className="lg:col-span-1">
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <Avatar className="w-32 h-32 border-4 border-[#B1AB86]/30">
              <AvatarImage
                src={mockUser.profilePhoto || "/placeholder.svg"}
                alt={`${mockUser.firstName} ${mockUser.lastName}`}
              />
              <AvatarFallback className="bg-[#819067] text-white text-2xl">
                {getInitials(mockUser.firstName, mockUser.lastName)}
              </AvatarFallback>
            </Avatar>
          </div>

          <h3 className="text-xl font-semibold text-[#0A400C] mb-1">
            {mockUser.firstName} {mockUser.lastName}
          </h3>
          <Badge className="bg-[#819067]/10 text-[#819067] hover:bg-[#819067]/20">
            Tenant
          </Badge>
        </div>
      </div>

      {/* Profile Details Section */}
      <div className="lg:col-span-2">
        <div className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0A400C] flex items-center">
                <User className="w-4 h-4 mr-2 text-[#819067]" />
                First Name
              </label>
              <div className="p-3 bg-[#FEFAE0]/50 rounded-md border border-[#B1AB86]/20">
                <span className="text-[#0A400C]">{mockUser.firstName}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0A400C] flex items-center">
                <User className="w-4 h-4 mr-2 text-[#819067]" />
                Last Name
              </label>
              <div className="p-3 bg-[#FEFAE0]/50 rounded-md border border-[#B1AB86]/20">
                <span className="text-[#0A400C]">{mockUser.lastName}</span>
              </div>
            </div>
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0A400C] flex items-center">
              <Phone className="w-4 h-4 mr-2 text-[#819067]" />
              Phone Number
            </label>
            <div className="p-3 bg-[#FEFAE0]/50 rounded-md border border-[#B1AB86]/20">
              <span className="text-[#0A400C]">{mockUser.phone}</span>
            </div>
          </div>

          {/* Location Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0A400C] flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-[#819067]" />
              Location
            </label>
            <div className="p-3 bg-[#FEFAE0]/50 rounded-md border border-[#B1AB86]/20">
              <span className="text-[#0A400C]">{mockUser.location}</span>
            </div>
          </div>

          {/* About Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0A400C] flex items-center">
              <FileText className="w-4 h-4 mr-2 text-[#819067]" />
              About Me
            </label>
            <div className="p-3 bg-[#FEFAE0]/50 rounded-md border border-[#B1AB86]/20 min-h-[120px]">
              <span className="text-[#0A400C]">
                {mockUser.about || "No description provided."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadOnlyView;
