"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ROLE_LABEL, ROLE_TO_MENU } from "@/constants/sidebar.constants";
import { useCurrentUser } from "@/hooks/auth.hooks";
import { TAvatarDropdownProps, UserRole } from "@/types/user.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import SidebarNaveUser from "./SidebarNaveUser";

const AppSidebar = () => {
  const pathname = usePathname();

  const { data: user, isLoading } = useCurrentUser();
  const role = user?.role as UserRole;
  const menu = ROLE_TO_MENU[role];

  const userAvatarData: TAvatarDropdownProps = {
    id: user?.id,
    name: `${user?.profile.firstName} ${user?.profile.lastName}`,
    email: user?.email,
    role: user?.role,
    avatar: user?.profile.profilePhoto,
  };

  if (isLoading) {
    return <h2>Loading ...</h2>;
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{ROLE_LABEL[role]}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item) => {
                const isActive = pathname === item.url;
                console.log(isActive, pathname, item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={[
                        "flex items-center gap-2 rounded-md px-2 py-1",
                        "text-muted-foreground hover:bg-muted",
                        // when active → override
                        "data-[active=true]:bg-[#819067] data-[active=true]:text-white",
                      ].join(" ")}
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
        <SidebarNaveUser user={userAvatarData} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
