import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit } from "lucide-react";
import React, { useState } from "react";
import ReadOnlyView from "./ReadOnlyView";
import ProfileFormView from "./ProfileFormView";

type UserProfile = {
  firstName: string;
  lastName: string;
  phone: string;
  profilePhoto?: string;
  about?: string;
  location: string;
};

const Test = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFAE0] to-[#B1AB86]/20 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A400C] mb-2">My Profile</h1>
          <p className="text-[#819067]">
            Manage your personal information and preferences
          </p>
        </div>

        <Card className="border-[#B1AB86]/30 shadow-xl bg-white">
          <CardHeader className="border-b border-[#B1AB86]/20">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-[#0A400C]">
                Profile Information
              </CardTitle>
              {!isEditing && (
                <Button
                  onClick={handleEdit}
                  className="bg-[#819067] hover:bg-[#0A400C] text-white"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {isEditing ? (
              /* Edit Form */
              <ProfileFormView
                setIsEditing={setIsEditing}
                isLoading={isLoading}
              />
            ) : (
              /* Read-only View */
              <ReadOnlyView />
            )}

            {/* Additional Information Cards - Only show in read-only mode */}
            {!isEditing && (
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
                      <div className="text-sm text-[#0A400C]">
                        Saved Properties
                      </div>
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
            )}
          </CardContent>
        </Card>

        {/* Additional Settings Card - Only show in read-only mode */}
        {!isEditing && (
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
        )}
      </div>
    </div>
  );
};

export default Test;
