import Profile from "@/components/Pages/Profile/Profile";
import { getUserById } from "@/Services/UserServices";
import { TUserProfile } from "@/types/user.types";
import React from "react";

// Mock user data
const mockUser: TUserProfile = {
  id: "1",
  firstName: "Sarah",
  lastName: "Johnson",
  phone: "+1 (555) 123-4567",
  profilePhoto: "/placeholder.svg?height=150&width=150&text=SJ",
  about:
    "I'm a marketing professional looking for a comfortable and modern apartment in the city. I love cooking, reading, and spending time with my two cats. I'm a responsible tenant with excellent references and stable income.",
  location: "Seattle, WA",
};

const ProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getUserById(id);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  console.log(data);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFAE0] to-[#B1AB86]/20 py-8 px-4 mt-16">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A400C] mb-2">{data.profile.firstName}&apos;s Profile</h1>
          {/* <p className="text-[#819067]">
            Manage your personal information and preferences: {id}
          </p> */}
        </div>
        <Profile profile={mockUser} />
      </div>
    </div>
  );
};

export default ProfilePage;
