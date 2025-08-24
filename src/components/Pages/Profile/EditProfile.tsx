"use client";

import "react-phone-number-input/style.css";
import { CustomInput } from "@/components/Shared/Form/CustomInput";
import LInputField from "@/components/Shared/Form/LInputField";
import { LivanaForm } from "@/components/Shared/Form/LivanaForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getInitials } from "@/lib/utils";
import {
  TUserProfileFormValues,
  userProfileSchema,
} from "@/schema/user.schema";
import { Camera, FileText, MapPin, Phone, Save, User, X } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser, useUpdateUserProfile } from "@/hooks/auth.hooks";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const router = useRouter();

  const { data: user, refetch } = useCurrentUser();

  const { mutate: handleUpdateProfile, isPending } = useUpdateUserProfile({
    onSuccess: () => {
      refetch();
      router.push("/profile");
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (!user) return <div>No user data provided.</div>;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const onSubmit = (data: TUserProfileFormValues) => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("profilePhoto", selectedFile);
    }

    formData.append("data", JSON.stringify(data));
    handleUpdateProfile(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFAE0] to-[#B1AB86]/20 py-8 px-4 mt-16">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A400C] mb-2">My Profile</h1>
          <p className="text-[#819067]">
            Manage your personal information and preferences
          </p>
        </div>
        <Card className="border-[#B1AB86]/30 shadow-xl bg-white mt-16">
          <CardHeader className="border-b border-[#B1AB86]/20">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-[#0A400C]">
                Profile Information
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <LivanaForm
              schema={userProfileSchema}
              onSubmit={onSubmit}
              className="space-y-4"
              defaultValues={user?.profile}
            >
              {({ register, reset, control, formState: { errors } }) => (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Photo Section */}
                    <div className="lg:col-span-1">
                      <div className="text-center">
                        <div className="relative inline-block mb-4">
                          <Avatar className="w-32 h-32 border-4 border-[#B1AB86]/30">
                            <AvatarImage
                              src={previewUrl || user.profile?.profilePhoto}
                              alt={`${user.profile.firstName} ${user.profile.lastName}`}
                            />
                            <AvatarFallback className="bg-[#819067] text-white text-2xl">
                              {getInitials(
                                user.profile.firstName,
                                user.profile.lastName
                              )}
                            </AvatarFallback>
                          </Avatar>

                          <label className="absolute bottom-0 right-0 bg-[#819067] hover:bg-[#0A400C] text-white rounded-full p-2 cursor-pointer transition-colors">
                            <Camera className="w-4 h-4" />
                            <input
                              type="file"
                              name="profilePhotoFile"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {selectedFile && (
                          <p className="text-sm text-[#819067] mb-2">
                            Selected: {selectedFile.name}
                          </p>
                        )}

                        <h3 className="text-xl font-semibold text-[#0A400C] mb-1">
                          {user.profile.firstName} {user.profile.lastName}
                        </h3>
                        <Badge className="bg-[#819067]/10 text-[#819067] hover:bg-[#819067]/20">
                          {user.role}
                        </Badge>
                      </div>
                    </div>

                    {/* Profile Details Form */}
                    <div className="lg:col-span-2">
                      <div className="space-y-6">
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label
                              htmlFor="firstName"
                              className="text-sm font-medium text-[#0A400C] flex items-center"
                            >
                              <User className="w-4 h-4 mr-2 text-[#819067]" />
                              First Name *
                            </label>
                            <LInputField<TUserProfileFormValues>
                              registerName="firstName"
                              type="string"
                              register={register}
                              errors={errors}
                              inputClass="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                            />
                          </div>

                          <div className="space-y-2">
                            <label
                              htmlFor="lastName"
                              className="text-sm font-medium text-[#0A400C] flex items-center"
                            >
                              <User className="w-4 h-4 mr-2 text-[#819067]" />
                              Last Name *
                            </label>
                            <LInputField<TUserProfileFormValues>
                              registerName="lastName"
                              type="string"
                              register={register}
                              errors={errors}
                              inputClass="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                            />
                          </div>
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-[#0A400C] flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-[#819067]" />
                            Phone Number *
                          </label>

                          <Controller
                            name="phone"
                            control={control}
                            rules={{ required: "Phone number is required" }}
                            render={({ field }) => (
                              <PhoneInputWithCountrySelect
                                {...field}
                                defaultCountry="BD"
                                international
                                countryCallingCodeEditable={false}
                                className="w-full px-2 rounded-md border border-[#B1AB86]/30 focus:outline-none focus:ring-2 focus:ring-[#819067]"
                                inputComponent={CustomInput}
                              />
                            )}
                          />

                          {errors.phone && (
                            <p className="text-red-500 text-sm">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>

                        {/* Location Field */}
                        <div className="space-y-2">
                          <label
                            htmlFor="location"
                            className="text-sm font-medium text-[#0A400C] flex items-center"
                          >
                            <MapPin className="w-4 h-4 mr-2 text-[#819067]" />
                            Location *
                          </label>
                          <LInputField<TUserProfileFormValues>
                            registerName="location"
                            type="string"
                            register={register}
                            errors={errors}
                            inputClass="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20"
                          />
                        </div>

                        {/* About Field */}
                        <div className="space-y-2">
                          <label
                            htmlFor="about"
                            className="text-sm font-medium text-[#0A400C] flex items-center"
                          >
                            <FileText className="w-4 h-4 mr-2 text-[#819067]" />
                            About Me
                          </label>
                          <Textarea
                            id="about"
                            {...register("about")}
                            className="bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20 min-h-[120px]"
                            placeholder="Tell us about yourself..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end gap-4 pt-6 border-t border-[#B1AB86]/20">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-[#B1AB86] text-[#819067] hover:bg-[#B1AB86]/10 bg-transparent cursor-pointer"
                      onClick={() => reset()}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#819067] hover:bg-[#0A400C] text-white cursor-pointer"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isPending ? "Updating..." : "Save Changes"}
                    </Button>
                  </div>
                </>
              )}
            </LivanaForm>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;
