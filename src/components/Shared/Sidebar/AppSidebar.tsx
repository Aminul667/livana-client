"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ROLE_LABEL, ROLE_TO_MENU } from "@/constants/sidebar.constants";
import { useCurrentUser } from "@/hooks/auth.hooks";
import { UserRole } from "@/types/user.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AppSidebar = () => {
  const pathname = usePathname();

  const { data: user, isLoading } = useCurrentUser();
  const role = user?.role as UserRole;
  const menu = ROLE_TO_MENU[role];

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
    </Sidebar>
  );
};

export default AppSidebar;
