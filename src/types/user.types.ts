export type UserRole = "landlord" | "tenant" | "admin";

export type TUserProfile = {
  id: string;
  email: string;
  role: UserRole;
  profile: {
    firstName: string;
    lastName: string;
    phone: string;
    profilePhoto?: string;
    about?: string;
    location: string;
  };
};

export type TAvatarDropdownProps = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
};
