"use client";
import { BarChart2, Menu } from "@deemlol/next-icons";
import React, { useEffect, useMemo, useState } from "react";
import { ThemeSwitch } from "@/components/theme-switch";
import { ChevronDown, Edit2 } from "lucide-react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  const menu_config = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      icon: <BarChart2 size={22} className="text-default-700" />,
      role: ["staff", "nurse", "doctor"],
    },
    {
      id: 2,
      name: "Consent Form",
      icon: <Edit2 size={18} className="text-default-700" />,
      children: [
        {
          id: 1,
          name: "Consent Form",
          path: "/consent_form_radiotherapy",
        },
        // { id: 2, name: "Drafts", path: "/drafts", count: 3, type: "warning" },
        // { id: 3, name: "Released", path: "/released" },
        // { id: 4, name: "Comments", path: "/comments" },
        // { id: 5, name: "Scheduled", path: "/scheduled", count: 8 },
      ],
      role: "doctor",
    },
    {
      id: 3,
      name: "Menu",
      children: [
        { id: 1, name: "Manage Staff", path: "/manage_staff" },
        {
          id: 2,
          name: "Consent Form",
          path: "/form",
        },
      ],
      icon: <Menu size={22} className="text-default-700" />,
      role: ["staff", "nurse"],
    },
  ];

  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // 👉 เปิด accordion ตาม path อัตโนมัติ

  const menu = useMemo(() => {
    return menu_config.filter((item) => item.role.includes(user.role));
  }, [user.role]);

  useEffect(() => {
    const found = menu.find((item) =>
      item.children?.some((sub) => sub.path === pathname),
    );

    if (found) setOpenId(found.id);
  }, [pathname]);

  return (
    <div className="w-70 px-4 flex flex-col relative">
      <div className="space-y-2">
        {menu.map((item) => {
          const isOpen = openId === item.id;

          // 👉 เมนูปกติ
          if (!item.children) {
            return (
              <Button
                key={item.id}
                as={Link}
                href={item.path}
                variant="light"
                size="lg"
                radius="lg"
                className={`w-full justify-start ${
                  pathname === item.path
                    ? "bg-white shadow-sm font-medium dark:bg-[#18181B] dark:hover:bg-default-100"
                    : ""
                }`}
                startContent={item.icon}
              >
                {item.name}
              </Button>
            );
          }

          // 👉 Accordion
          return (
            <div key={item.id}>
              {/* Header */}
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between px-6 py-3 rounded-xl hover:bg-default-100"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </div>

                <ChevronDown
                  size={16}
                  className={`transition ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-96 mt-2 pl-6" : "max-h-0"
                }`}
              >
                <div className="relative border-l border-gray-300 dark:border-gray-700 space-y-2 pb-1">
                  {item.children.map((sub) => {
                    const isActive = pathname === sub.path;

                    return (
                      <div key={sub.id} className="relative">
                        {/* เส้นโค้ง */}
                        <div className="absolute left-0 top-2 w-4 h-4 border-l border-b border-gray-300 dark:border-gray-700 rounded-bl-full"></div>

                        <Button
                          as={Link}
                          href={sub.path}
                          variant="light"
                          radius="lg"
                          className={`w-46 justify-between ml-4 pl-3 pr-3 py-2 ${
                            isActive
                              ? "bg-white shadow-sm font-medium dark:bg-[#18181B] dark:hover:bg-default-100"
                              : "text-default-500"
                          }`}
                        >
                          <span>{sub.name}</span>

                          {/* badge */}
                          {sub?.count && (
                            <span
                              className={`text-xs px-2 py-1 rounded-md ${
                                sub.type === "warning"
                                  ? "bg-orange-200 text-orange-800"
                                  : "bg-green-200 text-green-800"
                              }`}
                            >
                              {sub.count}
                            </span>
                          )}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ThemeSwitch */}
      <div className="absolute bottom-4 left-4">
        <ThemeSwitch />
      </div>
    </div>
  );
}
