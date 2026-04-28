"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { Link } from "@heroui/link";

import { useAuth } from "@/context/AuthContext";
import { useWarn } from "@/context/WarnContext";
import { useApiRequest } from "@/hooks/useApi";
import { useForm } from "@/context/FormContext";

// import SimulationCreateModal from "@components/radiotherapy/create/create_form_1/simulation";
// import RadiotherapyCreateModal from "@components/radiotherapy/create/create_form_2/Radiotherapy";
// import BrachytherapyCreateModal from "@components/radiotherapy/create/create_form_3/Brachytherapy";
import SimulationEditModal from "./radiotherapy/edit/edit_form_1/simulation";
import RadiotherapyEditModal from "./radiotherapy/edit/edit_form_2/radiotherapy";
import BrachytherapyEditModal from "./radiotherapy/edit/edit_form_3/brachytherapy";

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
  const { notifications, countWarn } = useWarn();
  const {
    formId,
    patFormData,
    loadForm,
    selectIdForm,
    modalRef,
    modalEditForm1,
    setModalEditForm1,
    modalEditForm2,
    setModalEditForm2,
    modalEditForm3,
    setModalEditForm3,
    fetchData,
    FormByFormId,
    handleSelectIdForm,
  } = useForm();

  const { user, logout } = useAuth();

  const getAvatar = (role, sex) => {
    const isMale = sex === "ชาย" || sex === "M";

    if (role === "doctor") {
      return isMale ? "/images/men-doctor.webp" : "/images/women-doctor.png";
    }

    if (role === "nurse") {
      return isMale ? "/images/men-nurse.png" : "/images/women-nurse.png";
    }

    if (role === "staff") {
      return isMale ? "/images/men-staff.png" : "/images/women-staff.png";
    }
  };

  const pathname = usePathname();
  const getTitle = (path) => {
    if (path.startsWith("/dashboard")) return "Dashboard";
    if (path.startsWith("/consent_form_radiotherapy"))
      return "Consent Form Radiotherapy";
    if (path.startsWith("/form")) return "Consent Form";
    if (path.startsWith("/signature")) return "My Signature";
    if (path.startsWith("/message")) return "Message";
    return "Page";
  };

  return (
    <div>
      <div className="h-20 p-2 flex justify-between items-center px-6 relative">
        <div>
          <Logo />
        </div>

        <h1 className="absolute left-71 text-3xl font-bold">
          {getTitle(pathname)}
        </h1>

        <div className="flex items-center gap-5">
          {/* <div>
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
          </div> */}

          {/* message icon */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                isIconOnly
                radius="full"
                size="md"
                className="bg-white dark:bg-[#18181B] dark:border dark:border-neutral-800 shadow-md hover:shadow-lg transition-all duration-200 relative overflow-visible"
              >
                <Bell size={20} className="text-neutral-900 dark:text-white" />

                {/* badge */}
                <span
                  className={`absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white dark:border-[#131317] px-1 transition-transform ${
                    countWarn > 0 ? "scale-100" : "scale-0"
                  }`}
                >
                  {countWarn > 99 ? "99+" : countWarn}
                </span>
              </Button>
            </DropdownTrigger>

            <DropdownMenu
              aria-label="Notifications"
              className="w-160 p-0 bg-white dark:bg-[#18181B] shadow-lg rounded-xl overflow-hidden border border-neutral-100 dark:border-neutral-800"
            >
              {/* header */}
              <DropdownItem
                key="header"
                isReadOnly
                className="cursor-default px-4 py-3 border-b border-neutral-100 dark:border-neutral-800"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-neutral-800 dark:text-neutral-100">
                    Notifications
                  </span>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500">
                    {countWarn > 0 ? `${countWarn} new` : "No new"}
                  </span>
                </div>
              </DropdownItem>

              {/* item */}
              {notifications?.length > 0 ? (
                notifications.slice(0, 3).map((item) => (
                  <DropdownItem
                    onPress={() => {
                      handleSelectIdForm(
                        item.form_id,
                        item.id,
                        "viewed", // 🔥 สำคัญ
                        item.status,
                        item.form_type_id,
                      );
                    }}
                    key={item.id}
                    textValue={`Notification ${item.id}`}
                    className={`py-2 border-b border-neutral-100/50 dark:border-neutral-800/50 transition-all rounded-none last:border-b-0 ${
                      item.status === "pending"
                        ? "bg-blue-50/40 hover:bg-blue-50/80 dark:bg-blue-900/10 dark:hover:bg-blue-900/20 border-l-4 border-l-blue-500 dark:border-l-blue-400 pl-3 pr-4"
                        : "border-l-4 border-l-transparent hover:bg-gray-50/80 dark:hover:bg-[#202024] pl-3 pr-4"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 my-auto rounded-full bg-neutral-100 dark:bg-[#18181B] border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-center text-neutral-600 dark:text-neutral-400 shadow-sm">
                        <Bell size={18} />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        {item.creator === item.by_userid ? (
                          <div className="flex flex-col gap-1 pr-2">
                            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                              คุณได้สร้างฟอร์ม
                            </span>
                            <span className="text-sm text-neutral-600 dark:text-neutral-300">
                              {item?.form_type_name}
                            </span>
                            {item?.time && (
                              <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                                {item?.time}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1 pr-2">
                            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                              คุณ {item?.creator_name}
                            </span>
                            <span className="text-sm text-neutral-600 dark:text-neutral-300">
                              ต้องการใช้ลายเซ็นของคุณในฟอร์ม{" "}
                              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                                {item?.form_type_name}
                              </span>
                            </span>
                            {/* {item?.timeText && ( */}
                            <div className="flex items-center justify-between pr-1 ">
                              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                {item?.time}
                              </span>
                              {item.status === "pending" && (
                                <span className="px-2 rounded-full text-[10px] font-medium bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200/50 dark:border-blue-500/20 flex items-center justify-center">
                                  ยังไม่ได้อ่าน
                                </span>
                              )}
                              {item.status === "viewed" && (
                                <span className="px-2 rounded-full text-[10px] font-medium bg-gray-50 text-neutral-500 dark:bg-neutral-800/50 dark:text-neutral-400 border border-gray-200/50 dark:border-neutral-700/50 flex items-center justify-center">
                                  อ่านแล้ว
                                </span>
                              )}
                            </div>
                            {/* )} */}
                          </div>
                        )}
                      </div>
                    </div>
                  </DropdownItem>
                ))
              ) : (
                <DropdownItem
                  key="empty"
                  isReadOnly
                  className="py-12 text-center hover:bg-transparent dark:hover:bg-transparent cursor-default"
                  textValue="No notifications"
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-neutral-50 dark:bg-[#18181B] border border-neutral-100 dark:border-neutral-800/80 flex items-center justify-center shadow-sm">
                      <Bell
                        size={24}
                        className="text-neutral-300 dark:text-neutral-600"
                      />
                    </div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                      ไม่มีการแจ้งเตือนใหม่
                    </span>
                  </div>
                </DropdownItem>
              )}

              {/* footer */}
              <DropdownItem
                key="view_all"
                href="/message"
                className="group text-center w-full py-3.5 mt-1 border-t border-neutral-100/80 dark:border-neutral-800/80 hover:bg-neutral-900 dark:hover:bg-white transition-all duration-300 rounded-none"
              >
                <div className="flex items-center justify-center gap-2 w-full font-semibold tracking-wide  transition-colors">
                  <span>View all notifications</span>
                  <span className="">
                    {notifications?.length > 99
                      ? "99+"
                      : notifications?.length || 0}
                  </span>
                  <span>Message</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                size="md"
                isBordered
                src={getAvatar(user?.role, user?.sex)}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as name</p>
                <p className="font-semibold">{user?.person_name}</p>
              </DropdownItem>
              <DropdownItem key="signature">
                <Link
                  size="sm"
                  className="w-full"
                  color="foreground"
                  href="/signature"
                >
                  My Signature
                </Link>
              </DropdownItem>
              <DropdownItem key="message">
                <Link
                  size="sm"
                  className="w-full"
                  color="foreground"
                  href="/message"
                >
                  Message
                </Link>
              </DropdownItem>
              <DropdownItem key="ChangePassword">
                <Link
                  size="sm"
                  className="w-full"
                  color="foreground"
                  href="/ChangePassword"
                >
                  Change Password
                </Link>
              </DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onPress={() => {
                  logout();
                }}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <SimulationEditModal
        patFormData={patFormData}
        openForm1={modalEditForm1}
        modalRef={modalRef}
        selectIdForm={selectIdForm}
        fetchData={fetchData}
        closeForm1={() => setModalEditForm1(false)}
      />
      <RadiotherapyEditModal
        patFormData={patFormData}
        openForm2={modalEditForm2}
        modalRef={modalRef}
        selectIdForm={selectIdForm}
        fetchData={fetchData}
        closeForm2={() => setModalEditForm2(false)}
      />
      <BrachytherapyEditModal
        patFormData={patFormData}
        openForm3={modalEditForm3}
        modalRef={modalRef}
        selectIdForm={selectIdForm}
        fetchData={fetchData}
        closeForm3={() => setModalEditForm3(false)}
      />
    </div>
  );
}
