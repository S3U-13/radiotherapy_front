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
  ChevronDown,
  Edit3,
  Eye,
  FileText,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "@deemlol/next-icons";
import { Tooltip } from "@heroui/tooltip";
import { Pagination } from "@heroui/pagination";
import ModalForm1 from "./create/create_form_1/page";
import ModalForm2 from "./create/create_form_2/page";
import ModalForm3 from "./create/create_form_3/page";
import ModalEditForm1 from "./edit/edit_form_1/page";
import ModalEditForm2 from "./edit/edit_form_2/page";
import ModalEditForm3 from "./edit/edit_form_3/page";
import useHook from "./useHook";
import { Input } from "@heroui/input";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import ViewForm from "../../(doctor)/consent_form_radiotherapy/view/page";
import { Select, SelectItem } from "@heroui/select";

export default function page() {
  const {
    modalRef,
    modalEditForm1,
    setModalEditForm1,
    modalEditForm2,
    setModalEditForm2,
    modalEditForm3,
    setModalEditForm3,
    formPatList,
    searchFormByHn,
    setSearchFormByHn,
    handleSearch,
    statusStyle,
    FormByFormId,
    handleSelectIdForm,
    patFormData,
    setPatFormData,
    selectIdForm,
    fetchData,

    selectForm,
    setSelectForm,

    formId,
    setFormId,
    formTypeId,
    setFormTypeId,
    modalViewForm,
    setModalViewForm,
    handleOpenView,

    form,
    formList,

    loadData,
    totalPages,
    totalForm,
    countFormInPage,
    page,
    setPage,
    search,
    setSearch,
    limit,
    setLimit,
    limitData,
    formatThaiDateTime,
    status,
    setStatus,
    visibleColumns,
    setVisibleColumns,
    filteredColumns,

    modalForm1,
    setModalForm1,
    modalForm2,
    setModalForm2,
    modalForm3,
    setModalForm3,
  } = useHook();

  const renderCell = (item, key) => {
    switch (key) {
      case "id":
        return item.id;

      case "hn":
        return item.hn;

      case "name":
        return item.name;

      case "form_type":
        return item.form_type;

      case "status":
        return (
          <div className="flex justify-center">
            <span
              className={`px-6 py-2 text-xs rounded-full font-medium ${
                statusStyle[item?.status] || "bg-gray-100 text-gray-600"
              }`}
            >
              {item.status}
            </span>
          </div>
        );

      case "createdAt":
        return (
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              {formatThaiDateTime(item?.createdAt)}
            </span>

            <div className="flex items-center gap-1">
              {item.isNew && (
                <span
                  className="px-2 py-0.5 text-[10px] font-semibold rounded-full 
            bg-[#DCF7E8] text-[#17CB9B] 
            dark:bg-emerald-900/40 dark:text-emerald-300
            animate-pulse"
                >
                  NEW
                </span>
              )}

              {item.isUpdated && (
                <span
                  className="px-2 py-0.5 text-[10px] font-semibold rounded-full 
            bg-[#FEF2DE] text-[#F7A524] 
            dark:bg-[amber-900/40] dark:text-amber-300 "
                >
                  UPDATED
                </span>
              )}
            </div>
          </div>
        );

      default:
        return "-";
    }
  };

  return (
    <div className="p-6 space-y-4 bg-white shadow-md rounded-xl dark:bg-[#131317]">
      <ModalForm1
        openForm1={modalForm1}
        selectForm={selectForm}
        modalRef={modalRef}
        closeForm1={() => {
          setModalForm1(false);
          loadData();
          setSelectForm("");
        }}
      />
      <ModalForm2
        openForm2={modalForm2}
        selectForm={selectForm}
        modalRef={modalRef}
        closeForm2={() => {
          setModalForm2(false);
          loadData();
          setSelectForm("");
        }}
      />
      <ModalForm3
        openForm3={modalForm3}
        selectForm={selectForm}
        modalRef={modalRef}
        closeForm3={() => {
          setModalForm3(false);
          loadData();
          setSelectForm("");
        }}
      />
      <ModalEditForm1
        patFormData={patFormData}
        openForm1={modalEditForm1}
        modalRef={modalRef}
        selectIdForm={selectIdForm}
        fetchData={fetchData}
        closeForm1={() => {
          setModalEditForm1(false);
          setPatFormData(null);
          loadData();
          setSelectForm("");
        }}
      />
      <ModalEditForm2
        patFormData={patFormData}
        openForm2={modalEditForm2}
        modalRef={modalRef}
        selectIdForm={selectIdForm}
        fetchData={fetchData}
        closeForm2={() => {
          setModalEditForm2(false);
          setPatFormData(null);
          loadData();
          setSelectForm("");
        }}
      />
      <ModalEditForm3
        patFormData={patFormData}
        openForm3={modalEditForm3}
        modalRef={modalRef}
        selectIdForm={selectIdForm}
        fetchData={fetchData}
        closeForm3={() => {
          setModalEditForm3(false);
          setPatFormData(null);
          loadData();
          setSelectForm("");
        }}
      />
      <ViewForm
        isOpen={modalViewForm}
        onClose={() => setModalViewForm(false)}
        formId={formId}
        setFormId={setFormId}
        formTypeId={formTypeId}
        setFormTypeId={setFormTypeId}
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
          shadow-xl
          dark:bg-[#18181B]
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
      <div className="flex flex-wrap gap-3 justify-between items-center bg-white p-4 rounded-md shadow-sm dark:bg-[#0E0E11]">
        {/* LEFT */}
        <div className="flex gap-3 items-center">
          <Input
            size="sm"
            placeholder="Search..."
            startContent={<Search size={18} />}
            className="w-64"
            value={search ?? ""}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" variant="flat" endContent={<ChevronDown />}>
                {status || "Status"}
              </Button>
            </DropdownTrigger>

            <DropdownMenu
              selectionMode="single"
              selectedKeys={status ? new Set([status]) : new Set([])}
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0] || "";
                setStatus(value);
              }}
            >
              <DropdownItem key="">All</DropdownItem>
              <DropdownItem key="Pending">Pending</DropdownItem>
              <DropdownItem key="Saved">Saved</DropdownItem>
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
            <DropdownMenu
              selectionMode="multiple"
              selectedKeys={visibleColumns}
              onSelectionChange={setVisibleColumns}
            >
              <DropdownItem key="id">ID</DropdownItem>
              <DropdownItem key="hn">HN</DropdownItem>
              <DropdownItem key="name">NAME</DropdownItem>
              <DropdownItem key="form_type">FORM TYPE</DropdownItem>
              <DropdownItem key="status">STATUS</DropdownItem>
              <DropdownItem key="createdAt">CREATED AT</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/* <Button size="sm" variant="flat">
                Export
              </Button> */}
        </div>

        {/* RIGHT */}
        <div className="flex gap-2">
          <Select
            className="w-18"
            size="sm"
            selectedKeys={[String(limit)]}
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0];
              setLimit(Number(value));
            }}
          >
            {limitData.map((i) => (
              <SelectItem key={i.key}>{i.key}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* 🔥 TABLE CARD */}
      <div className=" bg-white overflow-hidden">
        <Table
          aria-label="Consent Table"
          radius="none"
          classNames={{
            wrapper: " bg-white dark:bg-[#0E0E11] max-h-[570px]",
            tr: "hover:bg-neutral-50 dark:hover:bg-[#18181B]",
            th: "bg-neutral-100 dark:bg-[#18181B]",
          }}
        >
          <TableHeader>
            {filteredColumns.map((col) => (
              <TableColumn
                className={
                  ["status", "createdAt"].includes(col.key) ? "text-center" : ""
                }
                key={col.key}
              >
                {col.label}
              </TableColumn>
            ))}

            <TableColumn className="text-center">ACTION</TableColumn>
          </TableHeader>

          <TableBody emptyContent="ไม่พบข้อมูล">
            {formList?.map((i) => (
              <TableRow key={i.id} className="hover:bg-neutral-100 rounded-xl">
                {filteredColumns.map((col) => (
                  <TableCell key={col.key}>{renderCell(i, col.key)}</TableCell>
                ))}

                {/* 🔥 Action */}
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      radius="lg"
                      variant="flat"
                      className="bg-neutral-900 text-white"
                      onPress={() => handleOpenView(i?.id, i?.form_type_id)}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      radius="lg"
                      variant="flat"
                      className="bg-neutral-900 text-white"
                      onPress={() => {
                        FormByFormId[i.form_type_id](true);
                        handleSelectIdForm(i.id);
                      }}
                    >
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
        bg-white dark:bg-[#0E0E11]
        
       
        shadow-sm
      "
        >
          {/* Left */}
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            Showing{" "}
            <span className="font-medium text-neutral-800 dark:text-neutral-200">
              {countFormInPage}
            </span>{" "}
            of{" "}
            <span className="font-medium text-neutral-800 dark:text-neutral-200">
              {totalForm}
            </span>
          </div>

          {/* Right */}
          <Pagination
            isCompact
            showControls
            page={page} // ✅ ใช้ตัวนี้
            total={totalPages}
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
