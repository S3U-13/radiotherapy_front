"use client";
import React from "react";
// import hero Ui library
import { Avatar, AvatarGroup, AvatarIcon } from "@heroui/avatar";
import { Image } from "@heroui/image";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Bell } from "@deemlol/next-icons";
import { Input } from "@heroui/input";
import Logo from "@/components/logo";
import { usePathname } from "next/navigation";
import { Badge } from "@heroui/badge";

export const SearchIcon = () => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default function Navbar() {
  const pathname = usePathname();
  const getTitle = (path) => {
    if (path.startsWith("/dashboard")) return "Dashboard";
    if (path.startsWith("/consent_form_radiotherapy"))
      return "Consent Form Radiotherapy";
    return "Page";
  };

  return (
    <div className="h-20 p-2 flex justify-between items-center px-6 relative">
      <Logo />

      <h1 className="absolute left-71 text-3xl font-bold">
        {getTitle(pathname)}
      </h1>

      <div className="flex items-center gap-5">
        <div>
          <Input
            isClearable
            classNames={{
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-sm",
                "bg-white/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focus=true]:bg-default-200/50",
                "dark:group-data-[focus=true]:bg-default/60",
                "cursor-text!",
              ],
            }}
            placeholder="Type to search..."
            radius="lg"
            startContent={<SearchIcon />}
          />
        </div>

        {/* message icon */}
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              isIconOnly
              radius="full"
              size="md"
              className="bg-white border border-neutral-200 shadow-sm hover:shadow-md transition relative"
            >
              <Bell size={20} className="text-neutral-600" />

              {/* badge */}
              <span className="fixed bottom-5.5 right-2 z-[9999] bg-red-500 text-white text-xs p-1.5 rounded-full"></span>
            </Button>
          </DropdownTrigger>

          <DropdownMenu
            aria-label="Notifications"
            className="w-80 p-0 bg-white border border-neutral-200 shadow-xl rounded-xl overflow-hidden"
          >
            {/* header */}
            <DropdownItem
              key="header"
              isReadOnly
              className="cursor-default px-4 py-3 border-b border-neutral-100"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-neutral-800">
                  Notifications
                </span>
                <span className="text-xs text-neutral-400">3 new</span>
              </div>
            </DropdownItem>

            {/* item */}
            <DropdownItem key="1" className="px-4 py-3 hover:bg-neutral-50">
              <div className="flex gap-3 items-start">
                <div className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-semibold">
                  Z
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-neutral-800 font-medium">
                    Zoey sent you a message
                  </span>
                  <span className="text-xs text-neutral-400">
                    2 minutes ago
                  </span>
                </div>
              </div>
            </DropdownItem>

            <DropdownItem key="2" className="px-4 py-3 hover:bg-neutral-50">
              <div className="flex gap-3 items-start">
                <div className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-semibold">
                  A
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-neutral-800 font-medium">
                    Admin updated your report
                  </span>
                  <span className="text-xs text-neutral-400">1 hour ago</span>
                </div>
              </div>
            </DropdownItem>

            <DropdownItem key="3" className="px-4 py-3 hover:bg-neutral-50">
              <div className="flex gap-3 items-start">
                <div className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-semibold">
                  S
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-neutral-800 font-medium">
                    System backup completed
                  </span>
                  <span className="text-xs text-neutral-400">Yesterday</span>
                </div>
              </div>
            </DropdownItem>

            {/* footer */}
            <DropdownItem
              key="view_all"
              className="text-center text-sm text-neutral-600 py-3 border-t border-neutral-100 hover:bg-neutral-50"
            >
              View all notifications
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              size="md"
              isBordered
              src="https://www.shutterstock.com/image-vector/male-doctor-smiling-selfconfidence-flat-600nw-2281709217.jpg"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
