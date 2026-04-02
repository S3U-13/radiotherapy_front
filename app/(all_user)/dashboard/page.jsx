"use client";
import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { Chip } from "@heroui/chip";
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
  MoreVertical,
  Activity,
  UserCheck,
} from "lucide-react";
import BarChart from "./components/BarChart";

export default function Dashboard() {
  const kpiData = [
    {
      title: "Consent Forms",
      value: "120",
      desc: "ทั้งหมดในระบบ",
      icon: <FileText className="text-blue-500" size={22} />,
      bgIcon: "bg-blue-100 dark:bg-blue-900/30",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Pending",
      value: "32",
      desc: "รอดำเนินการ",
      icon: (
        <Clock className="text-yellow-600 dark:text-yellow-500" size={22} />
      ),
      bgIcon: "bg-yellow-100 dark:bg-yellow-900/30",
      trend: "+5%",
      trendUp: true,
    },
    {
      title: "Approved",
      value: "78",
      desc: "อนุมัติแล้ว",
      icon: <CheckCircle2 className="text-emerald-500" size={22} />,
      bgIcon: "bg-emerald-100 dark:bg-emerald-900/30",
      trend: "+18%",
      trendUp: true,
    },
    {
      title: "Rejected",
      value: "10",
      desc: "ไม่อนุมัติ / ปฏิเสธ",
      icon: <XCircle className="text-rose-500" size={22} />,
      bgIcon: "bg-rose-100 dark:bg-rose-900/30",
      trend: "-2%",
      trendUp: false,
    },
  ];

  const recentActivity = [
    {
      action: "ขออนุมัติ Consent Form",
      user: "นพ. สมชาย ใจดี",
      time: "10 นาทีที่แล้ว",
      icon: <FileText size={16} className="text-blue-500" />,
    },
    {
      action: "อนุมัติรายการ #CF-1029",
      user: "พญ. หญิง สุขใจ",
      time: "1 ชั่วโมงที่แล้ว",
      icon: <CheckCircle2 size={16} className="text-emerald-500" />,
    },
    {
      action: "แก้ไขข้อมูลผู้ป่วย HN: 445210",
      user: "นพ. สมชาย ใจดี",
      time: "2 ชั่วโมงที่แล้ว",
      icon: <Activity size={16} className="text-orange-500" />,
    },
    {
      action: "สร้างแบบฟอร์มรังสีร่วมรักษา",
      user: "ระบบ",
      time: "เมื่อวาน",
      icon: <FileText size={16} className="text-gray-500" />,
    },
    {
      action: "เซ็นรับรองแพทย์เรียบร้อย",
      user: "นพ. กิตติ มั่นคง",
      time: "เมื่อวาน",
      icon: <UserCheck size={16} className="text-indigo-500" />,
    },
  ];

  const latestRecords = [
    {
      id: "CF-2001",
      name: "Somchai Jaidee",
      treatment: "รังสีรักษาบริเวณทรวงอก",
      status: "Approved",
      date: "2026-04-02",
    },
    {
      id: "CF-2002",
      name: "Orathai Somsri",
      treatment: "รังสีร่วมรักษาตับ",
      status: "Pending",
      date: "2026-04-01",
    },
    {
      id: "CF-2003",
      name: "Wichai Rakthai",
      treatment: "ฉายรังสีสมอง",
      status: "Rejected",
      date: "2026-03-31",
    },
    {
      id: "CF-2004",
      name: "Manee Saensuk",
      treatment: "ฝังแร่เฉพาะจุด",
      status: "Approved",
      date: "2026-03-30",
    },
  ];

  const getStatusChip = (status) => {
    switch (status) {
      case "Approved":
        return (
          <Chip
            size="sm"
            variant="flat"
            color="success"
            className="bg-emerald-100/80 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-medium border border-emerald-200 dark:border-emerald-800"
          >
            อนุมัติแล้ว
          </Chip>
        );
      case "Pending":
        return (
          <Chip
            size="sm"
            variant="flat"
            color="warning"
            className="bg-yellow-100/80 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500 font-medium border border-yellow-200 dark:border-yellow-800"
          >
            รอดำเนินการ
          </Chip>
        );
      case "Rejected":
        return (
          <Chip
            size="sm"
            variant="flat"
            color="danger"
            className="bg-rose-100/80 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 font-medium border border-rose-200 dark:border-rose-800"
          >
            ปฏิเสธ
          </Chip>
        );
      default:
        return (
          <Chip size="sm" variant="flat">
            Unknown
          </Chip>
        );
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 lg:gap-6 bg-transparent overflow-y-auto lg:overflow-hidden pb-4 lg:pb-0 custom-scrollbar">
      {/* 🔥 Header & KPI Section */}
      <div className="shrink-0 flex flex-col gap-5 bg-white dark:bg-[#131317] p-4 lg:p-6 rounded-2xl shadow-sm border border-transparent dark:border-neutral-800/50 bg-clip-padding">
        {/* Title and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold mb-1 text-neutral-800 dark:text-neutral-100">
              ภาพรวมระบบ (Dashboard)
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs">
              ติดตามสถานะและภาพรวมการดำเนินการของแบบฟอร์มยินยอมในความดูแลของคุณ
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              radius="md"
              variant="flat"
              size="sm"
              className="bg-gray-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium flex-1 sm:flex-none"
              startContent={<Calendar size={14} />}
            >
              สัปดาห์นี้
            </Button>
            <Button
              radius="md"
              size="sm"
              className="bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-medium flex-1 sm:flex-none hover:bg-neutral-800 dark:hover:bg-neutral-300"
            >
              ดูรายงาน
            </Button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {kpiData.map((item, index) => (
            <div
              key={index}
              className="flex items-center p-3 gap-3 rounded-xl border border-gray-100 dark:border-neutral-800/60 bg-gray-50/50 dark:bg-neutral-900/20 transition-colors hover:bg-gray-100/50 dark:hover:bg-neutral-800/50"
            >
              <div
                className={`p-2.5 rounded-xl shrink-0 flex items-center justify-center ${item.bgIcon}`}
              >
                {React.cloneElement(item.icon, { size: 20 })}
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 leading-tight">
                  {item.value}
                </h2>
                <div className="flex items-center gap-1.5 mt-0.5 truncate">
                  <p className="text-neutral-500 dark:text-neutral-400 text-[11px] truncate">
                    {item.title}
                  </p>
                  <div
                    className={`flex items-center gap-0.5 text-[10px] font-medium ${item.trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                  >
                    {item.trendUp ? (
                      <TrendingUp size={10} />
                    ) : (
                      <TrendingDown size={10} />
                    )}
                    <span>{item.trend}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 Main Content Grid (Fill Remaining Space) */}
      <div className="flex-none lg:flex-1 min-h-0 flex flex-col gap-4 lg:gap-6">
        {/* Top Split */}
        <div className="flex-none lg:flex-1 min-h-[320px] lg:min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* 📊 Chart Area */}
          <Card className="col-span-1 lg:col-span-2 shadow-sm rounded-xl border border-gray-100 dark:border-neutral-800/50 bg-white dark:bg-[#131317] flex flex-col overflow-hidden">
            <CardHeader className="p-4 border-b border-gray-100 dark:border-neutral-800/50 flex justify-between items-center shrink-0">
              <div>
                <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                  สถิติการดำเนินการ
                </h3>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  จำนวนฟอร์มในช่วงปัจจุปัน
                </p>
              </div>
              <Button
                isIconOnly
                variant="light"
                size="sm"
                className="text-neutral-400"
              >
                <MoreVertical size={16} />
              </Button>
            </CardHeader>
            <CardBody className="p-2 flex-1 min-h-0 overflow-hidden relative">
              <div className="absolute inset-2">
                <BarChart />
              </div>
            </CardBody>
          </Card>

          {/* 📌 Activity Timeline */}
          <Card className="col-span-1 shadow-sm rounded-xl border border-gray-100 dark:border-neutral-800/50 bg-white dark:bg-[#131317] flex flex-col overflow-hidden">
            <CardHeader className="p-4 border-b border-gray-100 dark:border-neutral-800/50 shrink-0">
              <div>
                <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                  ความเคลื่อนไหวล่าสุด
                </h3>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  กิจกรรมที่เกิดขึ้นในระบบ
                </p>
              </div>
            </CardHeader>
            <CardBody className="p-4 overflow-y-auto custom-scrollbar">
              <div className="relative space-y-5">
                {/* Timeline line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gray-200 dark:bg-neutral-800"></div>

                {recentActivity.map((activity, index) => (
                  <div key={index} className="relative pl-8">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#131317] border-2 border-gray-100 dark:border-neutral-800 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600"></div>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-medium text-[13px] text-neutral-800 dark:text-neutral-200 leading-tight">
                          {activity.action}
                        </span>
                        <span className="text-[10px] text-neutral-400 shrink-0">
                          {activity.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                        <span className="opacity-70">{activity.icon}</span>
                        <span>โดย {activity.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* 🔥 Bottom Split (Table) */}
        <Card className="flex-none lg:shrink-0 h-[300px] lg:h-[250px] xl:h-[240px] flex flex-col shadow-sm rounded-xl border border-gray-100 dark:border-neutral-800/50 bg-white dark:bg-[#131317] overflow-hidden">
          <CardHeader className="p-4 border-b border-gray-100 dark:border-neutral-800/50 flex justify-between items-center bg-gray-50/50 dark:bg-neutral-900/20 shrink-0">
            <div>
              <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                รายการล่าสุด (Latest Records)
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                รายการแบบฟอร์มที่มีการอัปเดตสถานะล่าสุด
              </p>
            </div>
            <Button
              size="sm"
              variant="flat"
              className="bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-gray-200 dark:border-neutral-700 font-medium h-7 text-xs"
            >
              ดูทั้งหมด
            </Button>
          </CardHeader>
          <CardBody className="p-0 overflow-y-auto custom-scrollbar">
            <div className="w-full">
              <table className="w-full text-sm text-left">
                <thead className="sticky top-0 bg-gray-50 dark:bg-[#18181B] text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wider z-10 shadow-sm">
                  <tr>
                    <th className="px-5 py-3 font-medium">รหัสฟอร์ม</th>
                    <th className="px-5 py-3 font-medium">ชื่อ-นามสกุล</th>
                    <th className="px-5 py-3 font-medium hidden sm:table-cell">
                      ประเภทการรักษา
                    </th>
                    <th className="px-5 py-3 font-medium">สถานะ</th>
                    <th className="px-5 py-3 font-medium text-right hidden md:table-cell">
                      อัปเดตเมื่อ
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-neutral-800/50">
                  {latestRecords.map((record, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50/50 dark:hover:bg-neutral-800/30 transition-colors group"
                    >
                      <td className="px-5 py-3 whitespace-nowrap font-medium text-neutral-900 dark:text-neutral-200 text-xs">
                        {record.id}
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap text-neutral-700 dark:text-neutral-300">
                        <div className="flex items-center gap-2.5">
                          <Avatar
                            name={record.name.charAt(0)}
                            className="w-6 h-6 text-[10px] bg-gray-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                          />
                          <span className="text-xs group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {record.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap text-[13px] text-neutral-600 dark:text-neutral-400 hidden sm:table-cell">
                        {record.treatment}
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        {getStatusChip(record.status)}
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap text-right text-xs text-neutral-500 dark:text-neutral-400 hidden md:table-cell">
                        {record.date}
                      </td>
                    </tr>
                  ))}
                  {/* Empty rows filler for better visual when there are few items */}
                  {Array.from({
                    length: Math.max(0, 5 - latestRecords.length),
                  }).map((_, i) => (
                    <tr key={`empty-${i}`}>
                      <td className="px-5 py-4"></td>
                      <td className="px-5 py-3"></td>
                      <td className="px-5 py-3 hidden sm:table-cell"></td>
                      <td className="px-5 py-3"></td>
                      <td className="px-5 py-3 hidden md:table-cell"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
