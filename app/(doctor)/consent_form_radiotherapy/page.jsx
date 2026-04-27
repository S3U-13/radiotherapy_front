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
  MoreVertical,
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
import ModalEditForm1 from "../../(staff)/form/edit/edit_form_1/page";
import ModalEditForm2 from "../../(staff)/form/edit/edit_form_2/page";
import ModalEditForm3 from "../../(staff)/form/edit/edit_form_3/page";
import PreviewPDF from "@/components/pdf/previewPDF";
import ViewForm from "./view/page";
import useHook from "./useHook";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import previewPDFHook from "./previewPDFHook";

export const AddNoteIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M7.37 22h9.25a4.87 4.87 0 0 0 4.87-4.87V8.37a4.87 4.87 0 0 0-4.87-4.87H7.37A4.87 4.87 0 0 0 2.5 8.37v8.75c0 2.7 2.18 4.88 4.87 4.88Z"
        fill="currentColor"
        opacity={0.4}
      />
      <path
        d="M8.29 6.29c-.42 0-.75-.34-.75-.75V2.75a.749.749 0 1 1 1.5 0v2.78c0 .42-.33.76-.75.76ZM15.71 6.29c-.42 0-.75-.34-.75-.75V2.75a.749.749 0 1 1 1.5 0v2.78c0 .42-.33.76-.75.76ZM12 14.75h-1.69V13c0-.41-.34-.75-.75-.75s-.75.34-.75.75v1.75H7c-.41 0-.75.34-.75.75s.34.75.75.75h1.81V18c0 .41.34.75.75.75s.75-.34.75-.75v-1.75H12c.41 0 .75-.34.75-.75s-.34-.75-.75-.75Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const CopyDocumentIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M15.5 13.15h-2.17c-1.78 0-3.23-1.44-3.23-3.23V7.75c0-.41-.33-.75-.75-.75H6.18C3.87 7 2 8.5 2 11.18v6.64C2 20.5 3.87 22 6.18 22h5.89c2.31 0 4.18-1.5 4.18-4.18V13.9c0-.42-.34-.75-.75-.75Z"
        fill="currentColor"
        opacity={0.4}
      />
      <path
        d="M17.82 2H11.93C9.67 2 7.84 3.44 7.76 6.01c.06 0 .11-.01.17-.01h5.89C16.13 6 18 7.5 18 10.18V16.83c0 .06-.01.11-.01.16 2.23-.07 4.01-1.55 4.01-4.16V6.18C22 3.5 20.13 2 17.82 2Z"
        fill="currentColor"
      />
      <path
        d="M11.98 7.15c-.31-.31-.84-.1-.84.33v2.62c0 1.1.93 2 2.07 2 .71.01 1.7.01 2.55.01.43 0 .65-.5.35-.8-1.09-1.09-3.03-3.04-4.13-4.16Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const EditDocumentIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M15.48 3H7.52C4.07 3 2 5.06 2 8.52v7.95C2 19.94 4.07 22 7.52 22h7.95c3.46 0 5.52-2.06 5.52-5.52V8.52C21 5.06 18.93 3 15.48 3Z"
        fill="currentColor"
        opacity={0.4}
      />
      <path
        d="M21.02 2.98c-1.79-1.8-3.54-1.84-5.38 0L14.51 4.1c-.1.1-.13.24-.09.37.7 2.45 2.66 4.41 5.11 5.11.03.01.08.01.11.01.1 0 .2-.04.27-.11l1.11-1.12c.91-.91 1.36-1.78 1.36-2.67 0-.9-.45-1.79-1.36-2.71ZM17.86 10.42c-.27-.13-.53-.26-.77-.41-.2-.12-.4-.25-.59-.39-.16-.1-.34-.25-.52-.4-.02-.01-.08-.06-.16-.14-.31-.25-.64-.59-.95-.96-.02-.02-.08-.08-.13-.17-.1-.11-.25-.3-.38-.51-.11-.14-.24-.34-.36-.55-.15-.25-.28-.5-.4-.76-.13-.28-.23-.54-.32-.79L7.9 10.72c-.35.35-.69 1.01-.76 1.5l-.43 2.98c-.09.63.08 1.22.47 1.61.33.33.78.5 1.28.5.11 0 .22-.01.33-.02l2.97-.42c.49-.07 1.15-.4 1.5-.76l5.38-5.38c-.25-.08-.5-.19-.78-.31Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const DeleteDocumentIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82Z"
        fill="currentColor"
      />
      <path
        d="M19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Z"
        fill="currentColor"
        opacity={0.399}
      />
      <path
        clipRule="evenodd"
        d="M9.58 17a.75.75 0 0 1 .75-.75h3.33a.75.75 0 0 1 0 1.5h-3.33a.75.75 0 0 1-.75-.75ZM8.75 13a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Page() {
  const iconClasses = "text-xl text-default-500 pointer-events-none shrink-0";
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
    formList,
    statusStyle,
    FormByFormId,
    FormList,
    setFormList,
    //modalView by type id
    modalViewForm,
    setModalViewForm,
    //set state form id and form type id
    formId,
    setFormId,
    formTypeId,
    setFormTypeId,
    //handle open view
    handleOpenView,
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
    modalEditForm1,
    setModalEditForm1,
    modalEditForm2,
    setModalEditForm2,
    modalEditForm3,
    setModalEditForm3,
    handleSelectIdForm,
    patFormData,
    selectIdForm,
    fetchData,
  } = useHook();

  const { handlePreviewPDF, modalPreviewPDF, setModalPreviewPDF, pdfUrl } =
    previewPDFHook();

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
      <PreviewPDF
        open={modalPreviewPDF}
        onClose={() => setModalPreviewPDF(false)}
        pdfData={pdfUrl}
      />
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
                <TableCell className="flex justify-center">
                  {/* <div className="flex justify-center gap-2">
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
                  </div> */}
                  <Dropdown
                    classNames={{
                      base: "before:bg-default-200", // change arrow background
                      content:
                        "py-1 px-1 border border-default-200 bg-linear-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
                    }}
                  >
                    <DropdownTrigger>
                      <Button
                        variant="flat"
                        isIconOnly
                        color="default"
                        size="sm"
                      >
                        <MoreVertical
                          size={16}
                          className="text-neutral-700 dark:text-white"
                          strokeWidth={1.5}
                        />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Dropdown menu with description"
                      variant="faded"
                    >
                      <DropdownSection title="Actions">
                        <DropdownItem
                          key="View"
                          description="View Form"
                          startContent={<AddNoteIcon className={iconClasses} />}
                          onPress={() => handleOpenView(i?.id, i?.form_type_id)}
                        >
                          View
                        </DropdownItem>
                        <DropdownItem
                          key="Edit"
                          description="Edit Form"
                          startContent={
                            <EditDocumentIcon className={iconClasses} />
                          }
                          onPress={() => {
                            FormByFormId[i.form_type_id](true);
                            handleSelectIdForm(i.id);
                          }}
                        >
                          Edit
                        </DropdownItem>
                        {i.status === "Success" && (
                          <DropdownItem
                            key="Print"
                            description="Print PDF Form"
                            startContent={
                              <CopyDocumentIcon className={iconClasses} />
                            }
                            onPress={() => {
                              handlePreviewPDF(i.id);
                              setModalPreviewPDF(true);
                            }}
                          >
                            Print PDF
                          </DropdownItem>
                        )}
                      </DropdownSection>
                    </DropdownMenu>
                  </Dropdown>
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
