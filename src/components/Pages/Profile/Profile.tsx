import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInitials } from "@/lib/utils";
import { TUserProfile } from "@/types/user.types";
import { Edit, FileText, MapPin, Phone, User } from "lucide-react";
import Link from "next/link";

const Profile = ({ profile }: { profile: TUserProfile }) => {
  console.log("Profile", profile);
  return (
    <>
      <Card className="border-[#B1AB86]/30 shadow-xl bg-white">
        <CardHeader className="border-b border-[#B1AB86]/20">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-[#0A400C]">
              Profile Information
            </CardTitle>

            <Link href={`/profile/edit/${profile.id}`}>
              <Button className="bg-[#819067] hover:bg-[#0A400C] text-white">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {/* <Profile profile={mockUser} /> */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Photo Section */}
            <div className="lg:col-span-1">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-32 h-32 border-4 border-[#B1AB86]/30">
                    <AvatarImage
                      src={profile.profilePhoto || "/placeholder.svg"}
                      alt={`${profile.firstName} ${profile.lastName}`}
                    />
                    <AvatarFallback className="bg-[#819067] text-white text-2xl">
                      {getInitials(profile.firstName, profile.lastName)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <h3 className="text-xl font-semibold text-[#0A400C] mb-1">
                  {profile.firstName} {profile.lastName}
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
                      {profile.firstName}
                    </label>
                    <div className="p-3 bg-[#FEFAE0]/50 rounded-md border border-[#B1AB86]/20">
                      <span className="text-[#0A400C]">
                        {profile.firstName}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#0A400C] flex items-center">
                      <User className="w-4 h-4 mr-2 text-[#819067]" />
                      {profile.lastName}
                    </label>
                    <div className="p-3 bg-[#FEFAE0]/50 rounded-md border border-[#B1AB86]/20">
                      <span className="text-[#0A400C]">{profile.lastName}</span>
                    </div>
                  </div>
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0A400C] flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-[#819067]" />
                    {profile.phone}
                  </label>
                  <div className="p-3 bg-[#FEFAE0]/50 rounded-md border border-[#B1AB86]/20">
                    <span className="text-[#0A400C]">{profile.phone}</span>
                  </div>
                </div>

                {/* Location Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0A400C] flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-[#819067]" />
                    {profile.location}
                  </label>
                  <div className="p-3 bg-[#FEFAE0]/50 rounded-md border border-[#B1AB86]/20">
                    <span className="text-[#0A400C]">{profile.location}</span>
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
                      {profile.about || "No description provided."}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information Cards - Only show in read-only mode */}
          <div className="mt-8 pt-8 border-t border-[#B1AB86]/20">
            <h4 className="text-lg font-semibold text-[#0A400C] mb-4">
              Account Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-[#B1AB86]/20 bg-[#FEFAE0]/30">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-[#819067] mb-1">
                    2
                  </div>
                  <div className="text-sm text-[#0A400C]">
                    Active Applications
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#B1AB86]/20 bg-[#FEFAE0]/30">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-[#819067] mb-1">
                    5
                  </div>
                  <div className="text-sm text-[#0A400C]">Saved Properties</div>
                </CardContent>
              </Card>

              <Card className="border-[#B1AB86]/20 bg-[#FEFAE0]/30">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-[#819067] mb-1">
                    98%
                  </div>
                  <div className="text-sm text-[#0A400C]">
                    Profile Completion
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#B1AB86]/30 shadow-xl bg-white mt-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-[#0A400C]">
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="border-[#819067] text-[#819067] hover:bg-[#819067] hover:text-white bg-transparent"
            >
              Change Password
            </Button>
            <Button
              variant="outline"
              className="border-[#819067] text-[#819067] hover:bg-[#819067] hover:text-white bg-transparent"
            >
              Notification Settings
            </Button>
            <Button
              variant="outline"
              className="border-[#819067] text-[#819067] hover:bg-[#819067] hover:text-white bg-transparent"
            >
              Privacy Settings
            </Button>
            <Button
              variant="outline"
              className="border-[#819067] text-[#819067] hover:bg-[#819067] hover:text-white bg-transparent"
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Profile;
