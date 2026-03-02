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
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import {
  Check,
  ChevronDown,
  FileText,
  PlusCircle,
  Save,
  Slash,
} from "@deemlol/next-icons";
import { Tooltip } from "@heroui/tooltip";
import { Pagination } from "@heroui/pagination";
import ModalForm1 from "./create_form_1/page";
import ModalForm2 from "./create_form_2/page";
import ModalForm3 from "./create_form_3/page";
import useHook from "./useHook";
import { div } from "framer-motion/client";

export default function page() {
  const {
    modalRef,
    modalForm1,
    setModalForm1,
    modalForm2,
    setModalForm2,
    modalForm3,
    setModalForm3,
    form,
    selectForm,
    setSelectForm,
  } = useHook();
  return (
    <div className="p-6 h-full bg-white rounded-xl">
      <h1 className="mb-4 text-2xl text-center">หน้าเพิ่มรายการ</h1>
      <div className="">
        <ModalForm1
          openForm1={modalForm1}
          selectForm={selectForm}
          modalRef={modalRef}
          closeForm1={() => setModalForm1(false)}
        />
        <ModalForm2
          openForm2={modalForm2}
          selectForm={selectForm}
          modalRef={modalRef}
          closeForm2={() => setModalForm2(false)}
        />
        <ModalForm3
          openForm3={modalForm3}
          selectForm={selectForm}
          modalRef={modalRef}
          closeForm3={() => setModalForm3(false)}
        />
        <div className="flex justify-end mb-4 gap-4">
          <Dropdown size="lg" classNames={{ base: "right-[20px]" }}>
            <DropdownTrigger>
              <Button
                variant="flat"
                color="default"
                endContent={
                  <ChevronDown className="text-default-500" size={20} />
                }
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="id">id</DropdownItem>
              <DropdownItem key="pat">hn</DropdownItem>
              <DropdownItem key="patvisit">pat visit id</DropdownItem>
              <DropdownItem key="patreg">pat reg id</DropdownItem>
              <DropdownItem key="patient name">patient name</DropdownItem>
              <DropdownItem key="detail">detail</DropdownItem>
              <DropdownItem key="doctor">doctor name</DropdownItem>
              <DropdownItem key="doctor case">doctor case</DropdownItem>
              <DropdownItem key="status">status</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown showArrow size="sm">
            <DropdownTrigger>
              <Button
                variant="flat"
                color="primary"
                endContent={<PlusCircle className="text-blue-500" size={20} />}
              >
                Add Form
              </Button>
            </DropdownTrigger>

            <DropdownMenu aria-label="Static Actions" variant="faded">
              {form?.map((f) => {
                return (
                  <DropdownItem
                    key={f.code}
                    startContent={<FileText className="text-default-500" />}
                    onPress={() => {
                      const code = f.code;
                      const id = f.code.replace(/^F0+/, ""); // "1", "2", "3"
                      if (id === "1") {
                        setModalForm1(true);
                        setSelectForm(code);
                      }
                      if (id === "2") {
                        setModalForm2(true);
                        setSelectForm(code);
                      }
                      if (id === "3") {
                        setModalForm3(true);
                        setSelectForm(code);
                      }
                    }}
                  >
                    {f.form_name}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>

          {/* <DropdownItem
            onPress={() => setModalForm1(true)}
            key="form1"
            startContent={<FileText className="text-default-500" />}
          >
            หนังสืออธิบายและยินยอมให้ทำการจำลองการฉายรังสี
          </DropdownItem> */}
          <Dropdown size="lg" classNames={{ base: "right-[20px]" }}>
            <DropdownTrigger>
              <Button
                variant="flat"
                color="default"
                endContent={
                  <ChevronDown className="text-default-500" size={20} />
                }
              >
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                className="flex justify-between"
                key="save"
                startContent={<Save className="text-default-500" />}
              >
                save
              </DropdownItem>
              <DropdownItem
                key="success"
                startContent={<Check className="text-default-500" />}
              >
                success
              </DropdownItem>
              <DropdownItem
                key="cancel"
                startContent={<Slash className="text-default-500" size={22} />}
              >
                cancel
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <Table aria-label="Example static collection table" radius="md">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>HN</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn className="text-center">ACTION</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Tony Reichert</TableCell>
              <TableCell>CEO</TableCell>
              <TableCell>save</TableCell>
              <TableCell>
                {" "}
                <div className="flex justify-center gap-[10px] items-center">
                  <Tooltip color="default" content="ดูข้อมูล">
                    <Button size="sm" isIconOnly variant="light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-[#71717A]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </Button>
                  </Tooltip>
                  <Tooltip color="default" content="แก้ไขข้อมูล">
                    <Button size="sm" isIconOnly variant="light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-[#71717A]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Zoey Lang</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>save</TableCell>
              <TableCell>
                {" "}
                <div className="flex justify-center gap-[10px] items-center">
                  <Tooltip color="default" content="ดูข้อมูล">
                    <Button size="sm" isIconOnly variant="light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-[#71717A]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </Button>
                  </Tooltip>
                  <Tooltip color="default" content="แก้ไขข้อมูล">
                    <Button size="sm" isIconOnly variant="light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-[#71717A]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Jane Fisher</TableCell>
              <TableCell>Senior Developer</TableCell>
              <TableCell>save</TableCell>
              <TableCell>
                {" "}
                <div className="flex justify-center gap-[10px] items-center">
                  <Tooltip color="default" content="ดูข้อมูล">
                    <Button size="sm" isIconOnly variant="light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-[#71717A]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </Button>
                  </Tooltip>
                  <Tooltip color="default" content="แก้ไขข้อมูล">
                    <Button size="sm" isIconOnly variant="light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-[#71717A]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>William Howard</TableCell>
              <TableCell>Community Manager</TableCell>
              <TableCell>cancel</TableCell>
              <TableCell>
                {" "}
                <div className="flex justify-center gap-[10px] items-center">
                  <Tooltip color="default" content="ดูข้อมูล">
                    <Button size="sm" isIconOnly variant="light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-[#71717A]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </Button>
                  </Tooltip>
                  <Tooltip color="default" content="แก้ไขข้อมูล">
                    <Button size="sm" isIconOnly variant="light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-[#71717A]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Pagination
          className="mt-2 flex justify-end"
          isCompact
          showControls
          initialPage={1}
          total={10}
        />
      </div>
    </div>
  );
}
