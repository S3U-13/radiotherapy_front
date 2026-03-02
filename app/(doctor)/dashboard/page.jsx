"use client";
import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";

export default function Dashboard() {
  return (
    <div className="p-5 space-y-4 bg-white rounded-xl">
      {/* 🔥 Header */}
      <div>
        <p className="text-default-500">Overview of your system performance</p>
      </div>

      {/* 🔥 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { title: "Consent Forms", value: "120", desc: "ทั้งหมด" },
          { title: "Pending", value: "32", desc: "รอดำเนินการ" },
          { title: "Approved", value: "78", desc: "อนุมัติแล้ว" },
          { title: "Rejected", value: "10", desc: "ปฏิเสธ" },
        ].map((item, index) => (
          <Card key={index} className="p-4 shadow-md rounded-2xl bg-[#F1F1F1]">
            <CardHeader className="flex flex-col items-start">
              <p className="text-default-500 text-sm">{item.title}</p>
              <h2 className="text-2xl font-bold">{item.value}</h2>
            </CardHeader>
            <CardBody>
              <p className="text-xs text-default-400">{item.desc}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* 🔥 Charts + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 ">
        {/* 📊 Chart */}
        <Card className="col-span-2 p-4 shadow-md rounded-2xl bg-[#F1F1F1]">
          <CardHeader>
            <h3 className="font-semibold">Statistics</h3>
          </CardHeader>
          <CardBody>
            <div className="h-64 flex items-center justify-center text-default-400">
              (Chart Area)
            </div>
          </CardBody>
        </Card>

        {/* 📌 Activity */}
        <Card className="p-4 shadow-md rounded-2xl bg-[#F1F1F1]">
          <CardHeader>
            <h3 className="font-semibold">Recent Activity</h3>
          </CardHeader>
          <CardBody className="space-y-3">
            <div className="flex justify-between">
              <span>สร้าง Consent</span>
              <span className="text-xs text-default-400">2 นาที</span>
            </div>
            <div className="flex justify-between">
              <span>แก้ไขข้อมูล</span>
              <span className="text-xs text-default-400">10 นาที</span>
            </div>
            <div className="flex justify-between">
              <span>อนุมัติรายการ</span>
              <span className="text-xs text-default-400">1 ชั่วโมง</span>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* 🔥 Table */}
      <Card className="p-4 shadow-md rounded-2xl bg-[#F1F1F1]">
        <CardHeader>
          <h3 className="font-semibold">Latest Records</h3>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-neutral-300">
                  <th className="py-2">ชื่อ</th>
                  <th>สถานะ</th>
                  <th>วันที่</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-300">
                  <td className="py-2">Somchai</td>
                  <td className="text-green-600">Approved</td>
                  <td>2026-03-02</td>
                </tr>
                <tr className="border-b border-neutral-300">
                  <td className="py-2">Orathai</td>
                  <td className="text-yellow-600">Pending</td>
                  <td>2026-03-01</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
