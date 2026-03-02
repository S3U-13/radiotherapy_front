"use client";
import { CheckSquare, Edit, FileText } from "@deemlol/next-icons";
import { Card } from "@heroui/card";
import { Tab, Tabs } from "@heroui/tabs";
import React, { useState } from "react";
import { ThemeSwitch } from "@/components/theme-switch";
import { ChevronDown } from "lucide-react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

export default function Sidebar() {
  const menu = [
    { id: 1, name: "Dashboard", path: "/dashboard", type: "button" },
    {
      id: 2,
      name: "ใบยินยอม",
      type: "accordion",
      children: [
        { id: 1, name: "ออกใบยินยอม", path: "/form_doc" },
        // { id: 1, name: "ออกใบยินยอม", path: "/form_doc" },
      ],
    },
  ];

  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-60 px-4 flex flex-col min-h-auto relative">
      <div className="space-y-2">
        {menu.map((item) => {
          const isOpen = openId === item.id;

          // 👉 ถ้าไม่มี children = ปุ่มธรรมดา
          if (!item.children) {
            return (
              <Button
                key={item.id}
                as={Link}
                href={item.path}
                variant="light"
                size="lg"
                className={
                  item.type === "button"
                    ? "w-full justify-start bg-white shadow-md text-black font-medium"
                    : "w-full justify-start"
                }
              >
                {item.name}
              </Button>
            );
          }

          // 👉 ถ้ามี children = accordion
          return (
            <div key={item.id}>
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-default-100"
              >
                <span>{item.name}</span>
                <ChevronDown
                  size={16}
                  className={`transition ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* dropdown */}
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  isOpen ? "max-h-40 mt-1" : "max-h-0"
                }`}
              >
                <div className="space-y-1">
                  {item.children.map((sub) => (
                    <Button
                      key={sub.id}
                      as={Link}
                      href={sub.path}
                      variant="light"
                      size="md"
                      className="w-full justify-start px-4"
                    >
                      {sub.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* ThemeSwitch */}
      <div className="absolute bottom-16 left-4 ">
        <ThemeSwitch />
      </div>
    </div>
  );
}
