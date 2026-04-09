"use client";
import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Avatar } from "@heroui/avatar";
import { Chip } from "@heroui/chip";
import {
  Search,
  Inbox,
  Send,
  Star,
  FileText,
  Trash2,
  AlertCircle,
  MessageSquare,
  MoreVertical,
  PenSquare,
} from "lucide-react";
import { useWarn } from "@/context/WarnContext";
import { useForm } from "@/context/FormContext";

export default function MessagePage() {
  const { notifications, countWarn } = useWarn();
  const { handleSelectIdForm } = useForm();
  const [activeFolder, setActiveFolder] = useState("inbox");
  const [searchQuery, setSearchQuery] = useState("");

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

  // Navigation Folders
  const folders = [
    {
      id: "inbox",
      name: "กล่องข้อความ",
      icon: <Inbox size={18} />,
      count: notifications.length,
      color: "text-blue-500",
    },
    {
      id: "starred",
      name: "ติดดาว",
      icon: <Star size={18} />,
      count: 0,
      color: "text-yellow-500",
    },
    {
      id: "sent",
      name: "ส่งแล้ว",
      icon: <Send size={18} />,
      count: 0,
      color: "text-green-500",
    },
    {
      id: "drafts",
      name: "ฉบับร่าง",
      icon: <FileText size={18} />,
      count: 1,
      color: "text-gray-500",
    },
    {
      id: "important",
      name: "สำคัญ",
      icon: <AlertCircle size={18} />,
      count: 0,
      color: "text-red-500",
    },
    {
      id: "trash",
      name: "ถังขยะ",
      icon: <Trash2 size={18} />,
      count: 0,
      color: "text-neutral-500",
    },
  ];

  // Mock Messages
  // const mockMessages = [
  //   {
  //     id: 1,
  //     sender: "ฝ่ายบุคคล (HR)",
  //     email: "hr@hospital.com",
  //     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  //     subject: "ประกาศการทำแบบประเมินประจำปี 2026",
  //     snippet:
  //       "เรียน บุคลากรทุกท่าน ขอความร่วมมือในการทำแบบประเมินผลการปฏิบัติงาน...",
  //     time: "10:45 น.",
  //     unread: true,
  //     labels: ["สำคัญ", "ประกาศ"],
  //   },
  //   {
  //     id: 2,
  //     sender: "นพ. สมชาย ใจดี",
  //     email: "somchai.j@hospital.com",
  //     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  //     subject: "ปรึกษาเคสผู้ป่วยรังสีรักษา HN: 445210",
  //     snippet:
  //       "สวัสดีครับ รบกวนตรวจสอบแผนการรักษาของเคสผู้ป่วยหมายเลข 445210...",
  //     time: "เมื่อวาน",
  //     unread: true,
  //     labels: ["ปรึกษาแพทย์"],
  //   },
  //   {
  //     id: 3,
  //     sender: "ระบบแจ้งเตือนอัตโนมัติ",
  //     email: "system-noreply@hospital.com",
  //     avatar: "",
  //     subject: "อัปเดตระบบเวชระเบียนอิเล็กทรอนิกส์ (HIS)",
  //     snippet:
  //       "แจ้งปิดปรับปรุงระบบชั่วคราวในวันเสาร์ที่ 15 เมษายน ตั้งแต่เวลา 01:00 - 04:00 น.",
  //     time: "1 เม.ย.",
  //     unread: false,
  //     labels: ["ระบบ"],
  //   },
  //   {
  //     id: 4,
  //     sender: "พญ. หญิง สุขใจ",
  //     email: "ying.s@hospital.com",
  //     avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  //     subject: "กำหนดการประชุมประจำเดือนแผนกรังสีวิทยา",
  //     snippet:
  //       "ขอเชิญเข้าร่วมประชุมประจำเดือนในวันพุธหน้า เวลา 13:00 น. ณ ห้องประชุม 3",
  //     time: "28 มี.ค.",
  //     unread: false,
  //     labels: ["การประชุม"],
  //   },
  // ];

  return (
    <div className="w-full h-full shadow-sm rounded-2xl bg-white dark:bg-[#131317] flex flex-col md:flex-row border border-transparent dark:border-neutral-800/50 overflow-hidden min-h-[calc(100vh-120px)]">
      {/* ---------------- Left Sidebar ---------------- */}
      <div className="w-full md:w-[280px] lg:w-[300px] border-b md:border-b-0 md:border-r border-gray-100 dark:border-neutral-800/50 flex flex-col bg-gray-50/30 dark:bg-neutral-900/20">
        <div className="p-6">
          <Button
            className="w-full bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 font-medium py-6 shadow-sm"
            radius="md"
            startContent={<PenSquare size={18} />}
          >
            ข้อความใหม่
          </Button>
        </div>

        <div className="px-4 pb-6 flex-1 overflow-y-auto">
          <div className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-3 px-2">
            กล่องจดหมาย
          </div>

          <div className="flex flex-col gap-1">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setActiveFolder(folder.id)}
                className={`flex items-center justify-between w-full p-3 rounded-xl transition-all duration-200 ${
                  activeFolder === folder.id
                    ? "bg-white dark:bg-neutral-800/80 shadow-sm border border-gray-100 dark:border-neutral-700/50 text-neutral-900 dark:text-white font-medium"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`${activeFolder === folder.id ? folder.color : ""}`}
                  >
                    {folder.icon}
                  </div>
                  <span className="text-sm">{folder.name}</span>
                </div>
                {folder.count > 0 && (
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      activeFolder === folder.id
                        ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                        : "bg-gray-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                    }`}
                  >
                    {folder.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <div className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-3 px-2 flex justify-between items-center">
              <span>ป้ายกำกับ</span>
            </div>
            <div className="flex flex-col gap-2 px-2">
              <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer hover:text-neutral-900 dark:hover:text-white transition-colors">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>ประกาศ</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer hover:text-neutral-900 dark:hover:text-white transition-colors">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>ปรึกษาเคส</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer hover:text-neutral-900 dark:hover:text-white transition-colors">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span>ส่วนตัว</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Right Content Area ---------------- */}
      <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#131317]">
        {/* Header & Search */}
        <div className="h-20 border-b border-gray-100 dark:border-neutral-800/50 flex items-center justify-between px-6 lg:px-8 shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold capitalize flex items-center gap-2">
              {folders.find((f) => f.id === activeFolder)?.name || "ข้อความ"}
              {activeFolder === "inbox" && (
                <span className="text-sm font-normal text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">
                  {countWarn} ใหม่
                </span>
              )}
            </h1>
          </div>

          <div className="flex flex-1 max-w-md ml-8 justify-end">
            <Input
              isClearable
              radius="full"
              placeholder="ค้นหาข้อความ..."
              startContent={<Search className="text-neutral-400" size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              classNames={{
                input: "text-sm",
                inputWrapper:
                  "bg-gray-100/50 dark:bg-neutral-800/50 dark:hover:bg-neutral-800 border border-transparent shadow-none",
              }}
            />
          </div>
        </div>

        {/* Message List */}
        <div className="flex-1 max-h-[calc(80vh-5px)] overflow-y-auto w-full">
          {notifications.length > 0 ? (
            <div className="flex flex-col">
              {notifications.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => {
                    handleSelectIdForm(
                      msg.form_id,
                      msg.id,
                      "viewed", // 🔥 สำคัญ
                      msg.status,
                      msg.form_type_id,
                    );
                  }}
                  className={`group flex items-start gap-4 p-4 lg:p-6 border-b border-gray-50 dark:border-neutral-800/30 cursor-pointer transition-all duration-200 border-l-4 ${
                    msg.status === "pending"
                      ? "bg-blue-50/40 hover:bg-blue-50/80 dark:bg-blue-900/10 dark:hover:bg-blue-900/20 border-l-blue-500 dark:border-l-blue-400"
                      : "bg-white hover:bg-gray-50/80 dark:bg-[#131317] dark:hover:bg-[#18181B] border-l-transparent"
                  }`}
                >
                  <div className="shrink-0 mt-1">
                    <Avatar
                      size="md"
                      isBordered
                      src={getAvatar(msg?.role, msg?.sex)}
                    />
                  </div>

                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex justify-between items-center mb-1">
                      <h3
                        className={`text-[15px] truncate ${msg.status === "pending" ? "font-semibold text-neutral-900 dark:text-neutral-100" : "font-medium text-neutral-700 dark:text-neutral-300"}`}
                      >
                        {msg.creator_name}
                      </h3>
                      <span
                        className={`text-xs whitespace-nowrap ml-4 ${msg.status === "pending" ? "font-medium text-blue-600 dark:text-blue-400" : "text-neutral-500"}`}
                      >
                        {msg.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-1.5 overflow-hidden">
                      <p
                        className={`text-sm truncate ${msg.status === "pending" ? "font-medium text-neutral-800 dark:text-neutral-200" : "text-neutral-600 dark:text-neutral-400"}`}
                      >
                        {msg.form_type_name}
                      </p>
                    </div>

                    <p className="text-sm text-neutral-500 line-clamp-1">
                      {msg.creator === msg.by_userid
                        ? `คุณได้ทำการสร้างเอกสารการยินยอมให้กับผู้ป่วย HN: ${msg.hn}`
                        : `ได้ขออนุญาตใช้ลายเซ็นของคุณในเอกสารการยินยอมให้กับผู้ป่วย HN: ${msg.hn}`}
                    </p>

                    <div className="mt-3 flex gap-2">
                      {msg.creator === msg.by_userid ? (
                        <Chip
                          size="sm"
                          variant="flat"
                          className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20 h-6 text-[10px] px-2 font-medium"
                        >
                          แจ้งเตือน
                        </Chip>
                      ) : (
                        <Chip
                          size="sm"
                          variant="flat"
                          className={`${
                            msg.status === "pending"
                              ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200/50 dark:border-blue-500/20"
                              : "bg-gray-50 text-neutral-500 dark:bg-neutral-800/50 dark:text-neutral-400 border-gray-200/50 dark:border-neutral-700/50"
                          } border h-6 text-[10px] px-2 font-medium`}
                        >
                          {msg.status === "pending"
                            ? "ยังไม่ได้อ่าน"
                            : "อ่านแล้ว"}
                        </Chip>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      radius="full"
                      className="text-neutral-400 hover:text-neutral-800 dark:hover:text-white"
                    >
                      <Star size={18} />
                    </Button>
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      radius="full"
                      className="text-neutral-400 hover:text-neutral-800 dark:hover:text-white"
                    >
                      <MoreVertical size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-600 space-y-4">
              <MessageSquare size={48} className="opacity-20" />
              <p>ไม่มีข้อความในโฟลเดอร์นี้</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
