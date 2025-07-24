import { ReactNode } from "react";

const CommonLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className="w-full m-auto">
      <div>Navbar</div>
      {children}
      <div>Footer</div>
    </div>
  );
};

export default CommonLayout;
