"use client";
import { Edit, Search } from "@deemlol/next-icons";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import React from "react";
import setDataHook from "./hook/setDataHook";
import { Pagination } from "@heroui/pagination";
import fieldAndHandleHook from "./hook/fieldAndHandleHook";

export default function page() {
  const {
    dataManageUser,
    loading,
    userDatas,
    userPagination,
    page,
    limit,
    search,
    setPage,
    setLimit,
    setSearch,
    loadData,
  } = setDataHook();
  const { selectedUsers, setSelectedUsers, handleSelectionChange } =
    fieldAndHandleHook({ loadData, userDatas, dataManageUser });

  return (
    <div className="w-full h-full shadow-sm rounded-2xl p-6 md:p-8 bg-white dark:bg-[#131317] flex flex-col lg:flex-row gap-8 xl:gap-10 border border-transparent dark:border-neutral-800/50">
      {/* ---------------- Left Section: Staff List ---------------- */}
      <div className="lg:w-[35%] w-full flex flex-col">
        {/* Title */}
        <div className="text-left mb-6">
          <h1 className="text-3xl font-semibold mb-2">รายชื่อบุคลากร</h1>
          <p className="text-default-500 text-sm">
            จัดการและอัปเดตข้อมูลบุคลากรในความดูแล
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl flex-1 border border-gray-100 dark:border-neutral-800/50 bg-gray-50/30 dark:bg-[#18181B]/30 pt-2 p-1 sm:pt-4 sm:p-2">
          <Table
            removeWrapper
            aria-label="ตารางรายชื่อบุคลากร"
            className="min-w-full text-sm"
          >
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>NAME</TableColumn>
              <TableColumn>POSITION</TableColumn>
            </TableHeader>
            <TableBody emptyContent="ไม่พบข้อมูลบุคลากร">
              {dataManageUser?.map((item, index) => (
                <TableRow
                  key={`${item.userid}-${item.personid}`}
                  className="hover:bg-neutral-100 dark:hover:bg-[#27272A] transition-colors border-b border-gray-100 dark:border-neutral-800/50 last:border-0"
                >
                  <TableCell className="py-4">{index + 1}</TableCell>
                  <TableCell className="py-4">{item.person_name}</TableCell>
                  <TableCell className="py-4">{item.position}</TableCell>
                  {/* <TableCell className="py-4">
                    <span className="px-3 py-1 text-xs rounded-full font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                      Active
                    </span>
                  </TableCell> */}
                  {/* <TableCell className="flex justify-center py-4">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                    >
                      <Edit size={18} />
                    </Button>
                  </TableCell> */}
                </TableRow>
              ))}

              {/* {[]} */}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ---------------- Divider ---------------- */}
      <div className="hidden lg:block w-px bg-gray-100 dark:bg-neutral-800/80 my-2 shadow-[1px_0_0_0_rgba(0,0,0,0.02)]"></div>
      <div className="block lg:hidden h-px bg-gray-100 dark:bg-neutral-800/80 mx-2"></div>

      {/* ---------------- Right Section: Search ---------------- */}
      <div className="lg:w-[65%] w-full flex flex-col space-y-6">
        {/* Header & Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="text-left w-full sm:w-auto mt-2 lg:mt-0">
            <h1 className="text-3xl font-semibold mb-2">ค้นหาบุคลากร</h1>
            <p className="text-default-500 text-sm">
              ระบุชื่อ-นามสกุล หรือข้อมูลที่เกี่ยวข้องเพื่อค้นหา
            </p>
          </div>
          <div className="flex w-full sm:w-auto items-center justify-end gap-2">
            <Input
              size="md"
              radius="md"
              placeholder="กรอกชื่อ-นามสกุล ...."
              variant="flat"
              className="lg:min-w-[280px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Search Results Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-neutral-800/50 bg-gray-50/50 dark:bg-[#18181B]/50 pt-2 p-1 sm:pt-4 sm:p-2 flex-1">
          <Table
            removeWrapper
            aria-label="ตารางค้นหาบุคลากร"
            className="min-w-full text-sm"
            selectionMode="multiple"
            selectedKeys={
              new Set(
                (selectedUsers || []).map((u) => `${u.userid}-${u.personid}`),
              )
            }
            onSelectionChange={handleSelectionChange}
          >
            <TableHeader>
              <TableColumn>NO</TableColumn>
              <TableColumn>NAME</TableColumn>
              <TableColumn>POSITION</TableColumn>
              <TableColumn>OFFICE</TableColumn>
            </TableHeader>
            <TableBody
              emptyContent="ยังไม่มีการค้นหาข้อมูล"
              isLoading={loading}
              loadingContent={
                <div className="flex w-full h-full min-h-[150px] items-center justify-center">
                  <div className="w-8 h-8 border-4 border-gray-200 dark:border-zinc-800 border-t-[#111] dark:border-t-[#f4f4f5] rounded-full animate-spin"></div>
                </div>
              }
            >
              {userDatas?.map((item, index) => (
                <TableRow
                  key={`${item.userid}-${item.personid}`}
                  className="hover:bg-white dark:hover:bg-[#27272A] transition-colors border-b border-gray-100 dark:border-neutral-800/50 last:border-0"
                >
                  <TableCell className="py-4">
                    {index + 1 + (page - 1) * limit}
                  </TableCell>
                  <TableCell className="py-4">{item.name}</TableCell>
                  <TableCell className="py-4">{item.position}</TableCell>
                  <TableCell className="py-4">{item.office}</TableCell>
                </TableRow>
              ))}

              {/* {[]} */}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end">
          <Pagination
            isCompact
            showControls
            page={page} // ✅ ใช้ตัวนี้
            total={userPagination.totalPages}
            onChange={(p) => setPage(p)} // ✅ ไม่ต้อง loadData
            classNames={{
              wrapper: "gap-1",
              item: "bg-transparent text-neutral-600 dark:text-neutral-300 rounded-lg",
              cursor:
                "bg-neutral-900 text-white dark:bg-neutral-800 dark:text-white font-medium rounded-lg",
            }}
          />
        </div>
      </div>
    </div>
  );
}
