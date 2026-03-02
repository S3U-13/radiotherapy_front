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
  Eye,
  FileText,
  MoreHorizontal,
  PlusCircle,
  Save,
  Search,
  Slash,
} from "@deemlol/next-icons";
import { Tooltip } from "@heroui/tooltip";
import { Pagination } from "@heroui/pagination";
import ModalForm1 from "./create_form_1/page";
import ModalForm2 from "./create_form_2/page";
import ModalForm3 from "./create_form_3/page";
import useHook from "./useHook";
import { Input } from "@heroui/input";
import { Edit3 } from "lucide-react";

export default function Page() {
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

  const mockData = [
    {
      id: 1,
      hn: "6900181",
      name: "Somchai Boonmee",
      form_type:
        "หนังสืออธิบายและยินยอมให้ทำการจำลองการฉายรังสีโดยใช้รังสีเอกซเรย์และสารทึบรังสี",
      status: "Success",
    },
    {
      id: 2,
      hn: "6900182",
      name: "Pichai Sangthong",
      form_type:
        "หนังสืออธิบายและยินยอมให้ทำการจำลองการฉายรังสีโดยใช้รังสีเอกซเรย์และสารทึบรังสี",
      status: "Success",
    },
    {
      id: 3,
      hn: "6900183",
      name: "Niran Suksawat",
      form_type:
        "หนังสืออธิบายและยินยอมให้ทำการจำลองการฉายรังสีโดยใช้รังสีเอกซเรย์และสารทึบรังสี",
      status: "Success",
    },
    {
      id: 4,
      hn: "6900184",
      name: "Somsak Chaiyaporn",
      form_type:
        "หนังสืออธิบายและยินยอมให้ทำการจำลองการฉายรังสีโดยใช้รังสีเอกซเรย์และสารทึบรังสี",
      status: "Success",
    },
    {
      id: 5,
      hn: "6900185",
      name: "Somsri Srisawat",
      form_type:
        "หนังสืออธิบายและยินยอมให้ทำการจำลองการฉายรังสีโดยใช้รังสีเอกซเรย์และสารทึบรังสี",
      status: "Success",
    },
    {
      id: 6,
      hn: "6900186",
      name: "Kittipong Sokdee",
      form_type: "ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการฉายรังสี",
      status: "Success",
    },
    {
      id: 7,
      hn: "6900187",
      name: "Kanokwan Thongchai",
      form_type: "ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการฉายรังสี",
      status: "Success",
    },
    {
      id: 8,
      hn: "6900188",
      name: "Chatchai Sukjai",
      form_type: "ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการฉายรังสี",
      status: "Success",
    },
    {
      id: 9,
      hn: "6900189",
      name: "Chatnam Somjai",
      form_type: "ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการใส่เเร่",
      status: "Success",
    },
    {
      id: 10,
      hn: "6900190",
      name: "Chulai Sukprasert",
      form_type: "ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการใส่เเร่",
      status: "Cancel",
    },
  ];
  return (
    <div className="p-6 space-y-5 bg-white rounded-xl ">
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
      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Consent Forms</h1>
          <p className="text-default-500 text-sm">
            Manage all consent form records
          </p>
        </div>

        <Dropdown showArrow placement="bottom-end">
          <DropdownTrigger>
            <Button
              radius="lg"
              className="
       bg-neutral-900
        text-white 
        shadow-md hover:shadow-lg
        transition-all duration-200
      "
              endContent={<PlusCircle size={20} />}
            >
              Add Form
            </Button>
          </DropdownTrigger>

          <DropdownMenu
            aria-label="form menu"
            variant="faded"
            className="
      p-2 rounded-2xl 
      bg-white/80 backdrop-blur-md 
      shadow-xl border border-white/40
    "
          >
            {form?.length > 0 &&
              form.map((f) => (
                <DropdownItem
                  key={f.id}
                  textValue={f.form_name}
                  className="
            rounded-xl px-3 py-2 
            hover:bg-default-100 
            transition-all duration-150
          "
                  startContent={
                    <div className="p-2 rounded-lg bg-default-100">
                      <FileText size={18} className="text-default-600" />
                    </div>
                  }
                  onPress={() => {
                    const id = f.id;

                    if (id === 1) {
                      setModalForm1(true);
                      setSelectForm(id);
                    }
                    if (id === 2) {
                      setModalForm2(true);
                      setSelectForm(id);
                    }
                    if (id === 3) {
                      setModalForm3(true);
                      setSelectForm(id);
                    }
                  }}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{f.form_name}</span>
                    <span className="text-xs text-default-400">
                      Create new document
                    </span>
                  </div>
                </DropdownItem>
              ))}
          </DropdownMenu>
        </Dropdown>
        {/* <Button
          color="primary"
          className="shadow-md"
          startContent={<PlusCircle />}
        >
          Create Form
        </Button> */}
      </div>

      {/* 🔥 CONTROL BAR */}
      <div className="flex flex-wrap gap-3 justify-between items-center bg-white p-4 rounded-md shadow-sm">
        {/* LEFT */}
        <div className="flex gap-3 items-center">
          <Input
            size="sm"
            placeholder="Search..."
            startContent={<Search size={18} />}
            className="w-64"
          />

          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" variant="flat" endContent={<ChevronDown />}>
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="all">All</DropdownItem>
              <DropdownItem key="save">Save</DropdownItem>
              <DropdownItem key="success">Success</DropdownItem>
              <DropdownItem key="cancel">Cancel</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" variant="flat" endContent={<ChevronDown />}>
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="id">ID</DropdownItem>
              <DropdownItem key="hn">HN</DropdownItem>
              <DropdownItem key="status">Status</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* RIGHT */}
        <div className="flex gap-2">
          <Button size="sm" variant="flat">
            Export
          </Button>
        </div>
      </div>

      {/* 🔥 TABLE CARD */}
      <div className="bg-white shadow-sm overflow-hidden">
        <Table aria-label="Consent Table" radius="none">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>HN</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>FORM TYPE</TableColumn>
            <TableColumn className="text-center">STATUS</TableColumn>
            <TableColumn className="text-center">ACTION</TableColumn>
          </TableHeader>

          <TableBody>
            {mockData.map((i) => (
              <TableRow key={i.id} className="hover:bg-neutral-100 rounded-xl">
                <TableCell>{i.id}</TableCell>
                <TableCell>{i.hn}</TableCell>
                <TableCell>{i.name}</TableCell>
                <TableCell>{i.form_type}</TableCell>

                {/* 🔥 Status Badge */}
                <TableCell className="text-center">
                  <span
                    className={`
                      px-6 py-2 text-xs rounded-full font-medium
                      ${
                        i.status === "Cancel"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }
                    `}
                  >
                    {i.status === "Cancel" ? "Cancel" : "Success"}
                  </span>
                </TableCell>

                {/* 🔥 Action */}
                <TableCell>
                  <div className="flex justify-center gap-2">
                    {/* <Dropdown placement="bottom-center">
                      <DropdownTrigger>
                        <Button
                          size="sm"
                          variant="light"
                          isIconOnly
                          className="text-neutral-500 hover:text-neutral-800"
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
                          className=" text-neutral-700 hover:bg-neutral-100 rounded-md px-3 py-1.5"
                          startContent={<Eye size={16} />}
                        >
                          <span>View</span>
                        </DropdownItem>

                        <DropdownItem
                          key="edit"
                          className=" text-neutral-700 hover:bg-neutral-100 rounded-md px-3 py-1.5 font-medium"
                          startContent={<Edit3 size={16} />}
                        >
                          <span>Edit</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown> */}
                    <Button size="sm" radius="lg" variant="flat" className="bg-neutral-900 text-white">
                      View
                    </Button>
                    <Button size="sm" radius="lg" variant="flat" className="bg-neutral-900 text-white">
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* 🔥 FOOTER */}
        <div
          className="
    flex justify-between items-center
    px-5 py-3
    bg-white dark:bg-neutral-900
    
   
    shadow-sm
  "
        >
          {/* Left */}
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            Showing{" "}
            <span className="font-medium text-neutral-800 dark:text-neutral-200">
              1 - 10
            </span>{" "}
            of{" "}
            <span className="font-medium text-neutral-800 dark:text-neutral-200">
              100
            </span>
          </div>

          {/* Right */}
          <Pagination
            isCompact
            showControls
            initialPage={1}
            total={10}
            classNames={{
              wrapper: "gap-1",
              item: "bg-transparent text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg",
              cursor:
                "bg-neutral-900 text-white dark:bg-white dark:text-black font-medium rounded-lg",
            }}
          />
        </div>
      </div>
    </div>
  );
}
