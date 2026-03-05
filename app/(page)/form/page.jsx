"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Button } from "@heroui/button";
import {
  Edit3,
  Eye,
  FileText,
  MoreHorizontal,
  Search,
} from "@deemlol/next-icons";
import { Tooltip } from "@heroui/tooltip";
import { Pagination } from "@heroui/pagination";
import ModalForm1 from "./create_form_1/page";
import ModalForm2 from "./create_form_2/page";
import ModalForm3 from "./create_form_3/page";
import useHook from "./useHook";
import { Input } from "@heroui/input";
import { div } from "framer-motion/client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";

export default function page() {
  const {
    modalRef,
    modalForm1,
    setModalForm1,
    modalForm2,
    setModalForm2,
    modalForm3,
    setModalForm3,
    formPatList,
    searchFormByHn,
    setSearchFormByHn,
    handleSearch,
    statusStyle,
    FormByFormId,
  } = useHook();
  return (
    <div className="w-full shadow-sm rounded-2xl p-6 bg-white dark:bg-[#131317]">
      {/* Title */}

      {/* Search Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-2 mt-6">
        <div className="text-left mb-4">
          <h1 className="text-3xl font-semibold ">หน้าค้นหารายการ</h1>
          <p className="text-default-500 text-sm">
            ค้นหาและจัดการข้อมูลแบบฟอร์มต่าง ๆ ภายในระบบ
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 w-full sm:w-1/2">
          <Input
            size="md"
            radius="md"
            placeholder="กรอก HN ...."
            variant="flat"
            className="max-w-xs"
            value={searchFormByHn}
            onChange={(e) => setSearchFormByHn(e.target.value)}
          />
          <Button
            isIconOnly
            className="bg-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            variant="solid"
            onPress={handleSearch}
          >
            <Search size={16} color="#FFFFFF" />
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto mt-2 rounded-lg p-2">
        <Table
          radius="none"
          aria-label="ตารางรายการ"
          className="min-w-full text-sm"
          classNames={{
            // th: "py-4 text-md font-semibold",
            // td: "py-3",
            tbody: "min-h-[80vh-200px] overflow-y-scroll",
          }}
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>HN</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>FORM TYPE</TableColumn>
            <TableColumn className="text-center">CREATED AT</TableColumn>
            <TableColumn className="text-center">STATUS</TableColumn>
            <TableColumn className="text-center">ACTION</TableColumn>
          </TableHeader>

          <TableBody emptyContent="ไม่พบข้อมูล">
            {formPatList.map((i) => (
              <TableRow
                key={i.id}
                className="hover:bg-neutral-100 dark:hover:bg-[#27272A]"
              >
                <TableCell>{i.id}</TableCell>
                <TableCell>{i.hn}</TableCell>
                <TableCell>{i.name}</TableCell>
                <TableCell>{i.form_type}</TableCell>
                <TableCell className="text-center">{i.created_at}</TableCell>
                {/* 🔥 Status Badge */}
                <TableCell className="text-center">
                  <span
                    className={`
                               px-6 py-2 text-xs rounded-full font-medium
                              ${statusStyle[i?.status] || "bg-gray-100 text-gray-600"}
                             `}
                  >
                    {i.status}
                  </span>
                </TableCell>
                {/* 🔥 Action */}
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Dropdown placement="bottom-center">
                      <DropdownTrigger>
                        <Button
                          size="sm"
                          variant="light"
                          isIconOnly
                          className="text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
                        >
                          <MoreHorizontal size={18} />
                        </Button>
                      </DropdownTrigger>

                      <DropdownMenu
                        aria-label="Actions"
                        className="shadow-md rounded-lg"
                        variant="faded"
                      >
                        <DropdownItem
                          key="view"
                          className=" text-neutral-700 dark:text-white hover:bg-neutral-100 rounded-md px-3 py-1.5"
                          startContent={<Eye size={16} />}
                        >
                          <span>View</span>
                        </DropdownItem>

                        <DropdownItem
                          key="edit"
                          className=" text-neutral-700 dark:text-white hover:bg-neutral-100 rounded-md px-3 py-1.5 font-medium"
                          startContent={<Edit3 size={16} />}
                          onPress={() => FormByFormId[i.form_type_id](true)}
                        >
                          <span>Edit</span>
                        </DropdownItem>
                        <DropdownItem
                          key="pdf"
                          className=" text-neutral-700 dark:text-white hover:bg-neutral-100 rounded-md px-3 py-1.5 font-medium"
                          startContent={<FileText size={16} />}
                        >
                          <span>PDF</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ModalForm1
        openForm1={modalForm1}
        modalRef={modalRef}
        closeForm1={() => setModalForm1(false)}
      />
      <ModalForm2
        openForm2={modalForm2}
        modalRef={modalRef}
        closeForm2={() => setModalForm2(false)}
      />
      <ModalForm3
        openForm3={modalForm3}
        modalRef={modalRef}
        closeForm3={() => setModalForm3(false)}
      />
    </div>
  );
}
