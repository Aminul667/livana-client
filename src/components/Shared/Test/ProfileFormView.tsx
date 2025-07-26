/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Camera,
  FileText,
  Loader2,
  MapPin,
  Phone,
  Save,
  User,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { LivanaForm } from "../Form/LivanaForm";
import {
  TUserProfileFormValues,
  userProfileSchema,
} from "@/schema/user.schema";
import LInputField from "../Form/LInputField";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CustomInput } from "../Form/CustomInput";

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

type ProfileFormViewProps = {
  setIsEditing: (value: boolean) => void;
  isLoading: boolean;
};

const ProfileFormView: React.FC<ProfileFormViewProps> = ({
  setIsEditing,
  isLoading,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUser);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

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

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const onSubmit = (data: TUserProfileFormValues) => {
    console.log("Login data", data);
    // alert(JSON.stringify(data, null, 2));
  };

  return (
    <LivanaForm
      schema={userProfileSchema}
      onSubmit={onSubmit}
      className="space-y-4"
    >
      {({ register, control, formState: { errors } }) => (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Photo Section */}
            <div className="lg:col-span-1">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-32 h-32 border-4 border-[#B1AB86]/30">
                    <AvatarImage
                      src={previewUrl || userProfile.profilePhoto}
                      alt={`${userProfile.firstName} ${userProfile.lastName}`}
                    />
                    <AvatarFallback className="bg-[#819067] text-white text-2xl">
                      {getInitials(userProfile.firstName, userProfile.lastName)}
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
                  {userProfile.firstName} {userProfile.lastName}
                </h3>
                <Badge className="bg-[#819067]/10 text-[#819067] hover:bg-[#819067]/20">
                  Tenant
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
                      <PhoneInput
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
              onClick={handleCancel}
              variant="outline"
              className="border-[#B1AB86] text-[#819067] hover:bg-[#B1AB86]/10 bg-transparent"
              disabled={isLoading}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#819067] hover:bg-[#0A400C] text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </>
      )}
    </LivanaForm>
  );
};

export default ProfileFormView;
