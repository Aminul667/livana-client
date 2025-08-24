import { getUserById } from "@/Services/UserServices";
import React from "react";

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
          <h1 className="text-3xl font-bold text-[#0A400C] mb-2">
            {data.profile.firstName}&apos;s Profile
          </h1>
          {/* <p className="text-[#819067]">
            Manage your personal information and preferences: {id}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
