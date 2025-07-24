import Navbar from "@/components/Shared/Navbar/Navbar";
import { ReactNode } from "react";

const CommonLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className="w-full m-auto">
      <Navbar />
      {children}
      <div>Footer</div>
    </div>
  );
};

export default CommonLayout;
