export type TUserProfile = {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  profilePhoto?: string;
  about?: string;
  location: string;
};

export type TAvatarDropdownProps = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};
