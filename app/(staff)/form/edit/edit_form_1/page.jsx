"use client";
import { Button } from "@heroui/button";
import { DatePicker } from "@heroui/date-picker";
import { Input, Textarea } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Radio, RadioGroup } from "@heroui/radio";
import React from "react";
import { Info, PenSquare } from "lucide-react";
import useHook from "./hook/useHook";
import Sign01 from "./patient_signature/page";
import Sign02 from "./staff_signature/page";
import Sign03 from "./witness_signature/page";
import Sign04 from "./nurse_signature/page";

import { Edit3 } from "@deemlol/next-icons";
import { Select, SelectItem } from "@heroui/select";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { Image } from "@heroui/image";
import fieldAndHandleHook from "./hook/fieldAndHandleHook";

export default function page({
  patFormData,
  openForm1,
  closeForm1,
  modalRef,
  selectIdForm,
  fetchData,
}) {
  const {
    form,
    selectedDisease,
    setSelectedDisease,
    handleChangeDisease,
    isSubmitting,
    signature,
    signature2,
    signature3,
    nurseSignature,
    setSignature,
    setSignature2,
    setSignature3,
    setNurseSignature,
    modalRefSign,
    handleSaveSignature,
    handleSaveSignature2,
    handleSaveSignature3,
    handleSaveSignature4,
  } = fieldAndHandleHook({
    closeForm1,
    selectIdForm,
    fetchData,
  });

  const [confirmSignModal, setConfirmSignModal] = React.useState({
    isOpen: false,
    role: null,
  });
  const handleApproveSignature = () => {
    // สามารถใส่ Logic สำหรับการใช้อนุญาตลายเซ็นตรงนี้ได้เลย
    setConfirmSignModal({ isOpen: false, role: null });
  };

  const {
    choice,
    //pat data object
    pat_name,
    pat_age,
    pat_weight,
    // handleDisease
    prename,
    openSign01,
    openSign02,
    openSign03,
    openSign04,
    setOpenSign01,
    setOpenSign02,
    setOpenSign03,
    setOpenSign04,
    handleCloseModal,
    relation,
    doctor,
    user,
  } = useHook({
    closeForm1,
    patFormData,
    form,
    setSelectedDisease,
    setSignature,
    setSignature2,
    setSignature3,
    setNurseSignature,
  });

  // const prename = [
  //   { key: "1", label: "นาย" },
  //   { key: "2", label: "นาง" },
  //   { key: "3", label: "นางสาว" },
  // ];
  return (
    <div>
      <Modal
        size="5xl"
        isOpen={openForm1}
        onOpenChange={handleCloseModal}
        classNames={{
          body: "max-h-[calc(80vh-145px)] overflow-y-scroll py-6 bg-[#f1f1f1] dark:bg-[#1f1e1e]",
          header: "border-b border-divider py-6 bg-[#e6e6e6] dark:bg-[#181818]",
          footer: "border-t border-divider bg-[#e6e6e6] dark:bg-[#181818]",
          base: "dark:border dark:border-divider",
        }}
        placement="center"
        backdrop="blur"
      >
        <ModalContent ref={modalRef}>
          {(closeForm1) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <ModalHeader className="flex flex-col items-center gap-1 text-center text-lg font-semibold text-gray-800 dark:text-white ">
                <h1>หนังสืออธิบายและยินยอมให้ทำการจำลองการฉายรังสี</h1>
                <h1>โดยใช้รังสีเอกซเรย์และสารทึบรังสี</h1>
                <h1 className="text-xs text-default-700">
                  หน่วยงานรังสีรักษา โรงพยาบาลพระปกเกล้า
                </h1>
              </ModalHeader>

              <ModalBody className="space-y-4 text-gray-800 ">
                {/* ---------------- ข้อมูลผู้ป่วย ---------------- */}

                <section className="light:border light:border-gray-200 rounded-2xl p-6 bg-white shadow-sm dark:bg-[#181818]">
                  <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4 dark:text-white">
                    <span className="w-1 h-5 bg-neutral-600 rounded-full"></span>
                    ข้อมูลผู้ป่วย
                  </h2>

                  <form.Field name="form_type_id">
                    {(field) => (
                      <Input
                        size="sm"
                        radius="sm"
                        className="col-span-1 md:col-span-2"
                        label="Form Type ID"
                        type="hidden"
                        classNames={{ label: "text-default-700" }}
                        value={field.state.value ?? ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        readOnly
                      />
                    )}
                  </form.Field>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-3 ">
                    <Input
                      size="sm"
                      radius="sm"
                      classNames={{ label: "text-default-700" }}
                      className="col-span-1 md:col-span-3"
                      label="ชื่อ-สกุล ผู้ป่วย"
                      value={pat_name}
                      readOnly
                    />
                    <div className="flex items-center gap-2">
                      <Input
                        size="sm"
                        radius="sm"
                        label="อายุ"
                        classNames={{ label: "text-default-700" }}
                        value={pat_age}
                        readOnly
                      />
                      <span className="text-default-700">ปี</span>
                    </div>
                    <form.Field name="hn">
                      {(field) => (
                        <Input
                          size="sm"
                          radius="sm"
                          className="col-span-1 md:col-span-2"
                          label="HN"
                          classNames={{ label: "text-default-700" }}
                          value={field.state.value ?? ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                          readOnly
                        />
                      )}
                    </form.Field>
                    <DatePicker
                      size="sm"
                      radius="sm"
                      className=" col-span-1 md:col-span-2"
                      label="วันที่"
                      classNames={{ label: "text-default-700" }}
                      variant="bordered"
                    />
                    <div className="flex items-center gap-2 col-span-1  md:col-span-2">
                      <Input
                        size="sm"
                        radius="sm"
                        label="น้ำหนัก"
                        className="w-full"
                        value={pat_weight}
                        classNames={{ label: "text-default-700" }}
                        readOnly
                      />
                      <span className="text-default-700">กิโลกรัม</span>
                    </div>
                  </div>
                </section>

                {/* ---------------- คำอธิบาย ---------------- */}
                <section className="light:border light:border-gray-200 rounded-2xl p-6 bg-white shadow-sm dark:bg-[#181818]">
                  <h2 className="text-gray-700 dark:text-white font-semibold text-base flex items-center gap-2 mb-4">
                    <span className="w-1 h-5 bg-neutral-600 rounded-full"></span>
                    คำอธิบายการตรวจ
                  </h2>

                  <div className="space-y-1 text-sm leading-6 dark:text-white">
                    <p className="indent-8">
                      ท่านกำลังจะเข้ารับการตรวจทางรังสีโดยใช้รังสีเอกซเรย์
                      หรือการฉีดสารทึบรังสีร่วมกับการเอกซเรย์
                      ซึ่งในการตรวจนี้เเพทย์/เจ้าหน้าที่จะใช้สารทึบรังสีฉีดผ่านทางหลอดเลือดดำ
                      หลังจากนั้นจึงเอกซเรย์ ในการตรวจดังกล่าว
                      อาจมีโอกาสเกิดการเเพ้ต่อสารทึบรังสีได้ดังนี้
                    </p>
                    <p className="indent-8">
                      1. เเพ้เล็กน้อย ได้เเก่ คลื่นไส้/อาเจียน จาม ผื่นคัน มีไข้
                    </p>
                    <p className="indent-8">
                      2.เเพ้ปานกลางถึงมาก ได้เเก่ หายใจขัด ความดันโลหิตต่ำ
                      หัวใจเต้นช้า หน้าบวม ปากบวม กล่องเสียงบวม ไตวาย ชัก
                      หรืออาจเสียชีวิตได้
                      อย่างไรก็ตามทางหน่วยงานรังสีรักษาได้ตามมาตรการในการป้องกันเเละรักษาอาการเเพ้ที่เกิดจากการตรวจดังกล่าว
                      ทั้งนี้เพื่อป้องกันอันตรายที่อาจเกิดขึ้น
                      กรุณาตอบคำถามต่อไปนี้
                      เพื่อตรวจหาความเสี่ยงต่อการเอกซเรย์หรือฉีดสารทึบรังสี
                    </p>
                  </div>
                </section>

                {/* ---------------- แบบสอบถาม ---------------- */}
                <section className="rounded-2xl light:border light:border-gray-100 bg-white backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-all duration-300 dark:bg-[#181818]">
                  <h2 className="text-gray-700 dark:text-white font-semibold text-base flex items-center gap-2 mb-4">
                    <span className="w-1 h-5 bg-neutral-600 rounded-full"></span>
                    แบบสอบถามประวัติทางการแพทย์
                  </h2>

                  <div
                    className="space-y-6 text-md
                   text-gray-700 dark:text-white"
                  >
                    {/* ข้อ 1 */}
                    <div>
                      <p className="font-medium mb-2">
                        1. ท่านมีโรคประจำตัวดังต่อไปนี้หรือไม่
                      </p>
                      <div className="mt-4 rounded-xl light:border light:border-gray-200 bg-[#f9f9f9] p-6 shadow-inner dark:bg-[#1f1e1e]">
                        <CheckboxGroup
                          className="text-sm text-default-700"
                          value={selectedDisease}
                          onChange={handleChangeDisease}
                        >
                          {choice
                            .filter((ch) => ch.option_group_id === 7)
                            .map((c) => (
                              <Checkbox key={c.id} value={c.id}>
                                {c.name}
                              </Checkbox>
                            ))}
                        </CheckboxGroup>
                      </div>
                    </div>

                    {/* ข้อ 2 */}
                    <div>
                      <p className="font-medium mb-2">
                        2. ท่านเคยได้รับการฉีดสารทึบรังสีมาก่อนหรือไม่
                      </p>
                      <form.Field name="contrast_history_id">
                        {(field) => (
                          <RadioGroup
                            // orientation="horizontal"
                            className="ml-4 text-default-700"
                            value={field.state.value ?? null}
                            onChange={(e) => field.handleChange(e.target.value)}
                          >
                            {choice
                              .filter((ch) => ch.option_group_id === 2)
                              .map((c) => (
                                <Radio key={c.id} value={String(c.id)}>
                                  {c.name}
                                </Radio>
                              ))}
                          </RadioGroup>
                        )}
                      </form.Field>
                    </div>

                    {/* ข้อ 3 */}
                    <div>
                      <p className="font-medium mb-2">
                        3. ถ้าเคยตรวจ ท่านแพ้สารทึบรังสีหรือไม่
                      </p>
                      <div className="flex flex-wrap items-end gap-3 ml-4">
                        <form.Field name="contrast_allergy_id">
                          {(field) => (
                            <RadioGroup
                              // orientation="horizontal"
                              className="text-default-700"
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            >
                              {choice
                                .filter((ch) => ch.option_group_id === 2)
                                .map((c) => (
                                  <div
                                    key={String(c.id)}
                                    className="flex items-center gap-2"
                                  >
                                    <Radio value={String(c.id)}>{c.name}</Radio>
                                    {String(c.id) === "3" &&
                                      field.state.value === "3" && (
                                        <form.Field name="contrast_allergy_symptom">
                                          {(field) => (
                                            <Input
                                              size="sm"
                                              radius="sm"
                                              label="ระบุอาการ"
                                              placeholder="เช่น ผื่นขึ้น, หายใจลำบาก"
                                              className="max-w-[280px]"
                                              value={field.state.value || ""}
                                              onChange={(e) =>
                                                field.handleChange(
                                                  e.target.value,
                                                )
                                              }
                                            />
                                          )}
                                        </form.Field>
                                      )}
                                  </div>
                                ))}
                            </RadioGroup>
                          )}
                        </form.Field>
                      </div>
                    </div>

                    {/* ข้อ 4 */}
                    <div>
                      <p className="font-medium mb-2">
                        4. ท่านมีประวัติแพ้อาหารทะเลหรือไม่
                      </p>
                      <div className="flex flex-wrap items-end gap-3 ml-4">
                        <form.Field name="seafood_allergy_id">
                          {(field) => (
                            <RadioGroup
                              // orientation="horizontal"
                              className="text-default-700"
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            >
                              {choice
                                .filter((ch) => ch.option_group_id === 1)
                                .map((c, index) =>
                                  index <= 1 ? (
                                    <div
                                      key={String(c.id)}
                                      className="flex item-center gap-2"
                                    >
                                      {" "}
                                      <Radio value={String(c.id)}>
                                        {c.name}
                                      </Radio>
                                      {String(c.id) === "1" &&
                                        field.state.value === "1" && (
                                          <form.Field name="seafood_allergy_symptom">
                                            {(field) => (
                                              <Input
                                                size="sm"
                                                radius="sm"
                                                label="ระบุอาการ"
                                                placeholder="เช่น คัน, บวม, คลื่นไส้"
                                                className="max-w-[280px]"
                                                value={field.state.value || ""}
                                                onChange={(e) =>
                                                  field.handleChange(
                                                    e.target.value,
                                                  )
                                                }
                                              />
                                            )}
                                          </form.Field>
                                        )}
                                    </div>
                                  ) : null,
                                )}
                            </RadioGroup>
                          )}
                        </form.Field>
                      </div>
                    </div>

                    {/* ข้อ 5 */}
                    <div>
                      <p className="font-medium mb-2">
                        5. ท่านมีประวัติการแพ้ยาอื่น ๆ หรือไม่
                      </p>
                      <div className="flex flex-wrap items-end gap-3 ml-4">
                        <form.Field name="drug_allergy_id">
                          {(field) => (
                            <RadioGroup
                              // orientation="horizontal"
                              className="text-default-700"
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            >
                              {choice
                                .filter((ch) => ch.option_group_id === 3)
                                .map((c) => (
                                  <div
                                    key={String(c.id)}
                                    className="flex item-center gap-2"
                                  >
                                    {" "}
                                    <Radio value={String(c.id)}>{c.name}</Radio>
                                    {String(c.id) === "6" &&
                                      field.state.value === "6" && (
                                        <form.Field name="drug">
                                          {(field) => (
                                            <Input
                                              size="sm"
                                              radius="sm"
                                              label="ระบุอาการ"
                                              placeholder="เช่น ผื่น, หน้ามืด, หายใจลำบาก"
                                              className="max-w-[280px]"
                                              value={field.state.value || ""}
                                              onChange={(e) =>
                                                field.handleChange(
                                                  e.target.value,
                                                )
                                              }
                                            />
                                          )}
                                        </form.Field>
                                      )}
                                  </div>
                                ))}
                            </RadioGroup>
                          )}
                        </form.Field>
                      </div>
                    </div>

                    {/* ข้อ 6 */}
                    <div>
                      <p className="font-medium mb-2">
                        6. ข้าพเจ้าขอรับรองว่าไม่ได้อยู่ในระหว่างตั้งครรภ์
                      </p>
                      <div className="ml-4">
                        <DatePicker
                          radius="sm"
                          className="max-w-[330px]"
                          label="โดยประจำเดือนสุดท้ายมาวันที่"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* ---------------- ส่วนลงนาม ---------------- */}
                <section className="rounded-2xl bg-white p-6 shadow-sm space-y-6 dark:bg-[#181818]">
                  <h2 className="text-gray-700 dark:text-white font-semibold text-base flex items-center gap-2">
                    <span className="w-1 h-5 bg-neutral-600 rounded-full"></span>
                    การยินยอมเข้ารับการตรวจ
                  </h2>

                  {/* กล่องเนื้อหาหลัก */}
                  <div className="grid grid-cols-8 gap-3 items-center rounded-xl bg-[#f9f9f9] light:border light:border-gray-200 shadow-sm p-6 dark:bg-[#1f1e1e]">
                    <form.Field name="name">
                      {(field) => (
                        <Input
                          label="ข้าพเจ้า ชื่อ-นามสกุล"
                          className="col-span-8 md:col-span-5 "
                          size="sm"
                          radius="sm"
                          placeholder="ชื่อ-นามสกุล"
                          value={field.state.value ?? ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                    <form.Field name="relation">
                      {(field) => (
                        <Select
                          label="ความเกี่ยวข้อง"
                          className="col-span-8 md:col-span-3"
                          size="sm"
                          radius="sm"
                          placeholder="ระบุความเกี่ยวข้อง"
                          selectedKeys={
                            field.state.value ? [field.state.value] : []
                          }
                          onSelectionChange={(keys) => {
                            const value = Array.from(keys)[0];
                            field.handleChange(value);
                          }}
                        >
                          {relation.map((item) => (
                            <SelectItem key={String(item.lookupid)}>
                              {item?.lookupname}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    </form.Field>

                    <Input
                      value={pat_name}
                      label="ชื่อ-นามสกุล"
                      className="col-span-8 md:col-span-5"
                      size="sm"
                      radius="sm"
                      placeholder="ชื่อผู้เกี่ยวข้อง"
                    />

                    <p className="text-sm leading-6 col-span-8 text-default-700 mt-2">
                      ได้รับทราบคำอธิบายข้างต้น
                      รวมทั้งผลแทรกซ้อนที่อาจเกิดขึ้นจากการตรวจดังกล่าว
                      โดยข้าพเจ้า
                    </p>

                    <form.Field name="consent">
                      {(field) => (
                        <RadioGroup
                          className="col-span-8"
                          orientation="horizontal"
                          classNames={{ base: "text-sm text-gray-700" }}
                          value={field.state.value ?? ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        >
                          {choice
                            .filter((ch) => ch.option_group_id === 4)
                            .map((c, index) =>
                              index <= 1 ? (
                                <div key={String(c.id)}>
                                  <Radio value={String(c.id)}>{c.name}</Radio>
                                </div>
                              ) : null,
                            )}
                        </RadioGroup>
                      )}
                    </form.Field>
                  </div>

                  {/* ลายเซ็น */}
                  <div className="grid gap-5 mt-4">
                    <span className="text-gray-700 dark:text-white text-md font-semibold">
                      จึงได้ลงลายมือชื่อไว้เป็นหลักฐาน
                    </span>

                    {/* ผู้ป่วย */}
                    <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#131317]/50 p-5 sm:p-6 space-y-4 shadow-sm hover:border-gray-300 dark:hover:border-neutral-700 transition-all relative">
                      <div className="pb-3 border-b border-gray-100 dark:border-neutral-800/80 flex items-center justify-between">
                        <span className="font-semibold text-gray-800 dark:text-gray-200 text-[15px] flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                          ผู้ป่วย / ตัวแทนผู้ป่วย
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
                        <Input
                          className="max-w-[300px]"
                          size="sm"
                          radius="sm"
                          label="ชื่อ-สกุล"
                          labelPlacement="outside-left"
                          placeholder="ระบุชื่อ-นามสกุล"
                          classNames={{
                            inputWrapper:
                              "shadow-none border border-gray-200/80 dark:border-neutral-700/80 bg-gray-50/50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-800",
                          }}
                        />
                        <div className="flex-shrink-0 flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">
                            ลงลายมือชื่อ
                          </span>
                          {!signature ? (
                            <div className="w-[180px] h-[50px] rounded-lg border-2 border-dashed border-gray-300 dark:border-neutral-700 flex items-center justify-center text-gray-400 dark:text-neutral-500 text-xs bg-gray-50 dark:bg-neutral-800/30">
                              รอการลงนาม
                            </div>
                          ) : (
                            <img
                              src={signature}
                              alt="signature"
                              className="border border-gray-200 dark:border-neutral-700 rounded-lg shadow-sm w-[180px] h-[50px] object-contain bg-white dark:bg-transparent"
                            />
                          )}
                          <Button
                            size="sm"
                            isIconOnly
                            className="bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 shadow-sm"
                            onPress={() => setOpenSign01(true)}
                          >
                            <Edit3 size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* แพทย์ */}
                    <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#131317]/50 p-5 sm:p-6 space-y-4 shadow-sm hover:border-gray-300 dark:hover:border-neutral-700 transition-all relative">
                      <div className="pb-3 border-b border-gray-100 dark:border-neutral-800/80 flex items-center justify-between">
                        <span className="font-semibold text-gray-800 dark:text-gray-200 text-[15px] flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                          แพทย์
                        </span>
                      </div>
                      {patFormData?.data_form?.form?.doctor_userid ===
                        user?.userid && (
                        <div className="mt-2 flex items-center justify-between p-3.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300 shadow-sm border border-neutral-200 dark:border-neutral-600">
                              <Info size={16} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                                คุณมีสิทธิ์ลงนาม
                              </p>
                              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                แบบฟอร์มนี้ต้องการลายเซ็นของคุณ
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-neutral-900 text-white shadow-sm hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white font-medium"
                            onPress={() =>
                              setConfirmSignModal({
                                isOpen: true,
                                role: "doctor",
                              })
                            }
                          >
                            ตรวจสอบ
                          </Button>
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
                        <Input
                          className="max-w-[300px]"
                          size="sm"
                          radius="sm"
                          label="ชื่อ-สกุล"
                          labelPlacement="outside-left"
                          value={
                            patFormData?.data_form?.doctor_user?.person_name ??
                            ""
                          }
                          isReadOnly
                          classNames={{
                            inputWrapper:
                              "shadow-none border border-gray-200/80 dark:border-neutral-700/80 bg-gray-50/50 dark:bg-neutral-900/50",
                          }}
                        />
                        <div className="flex-shrink-0 flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">
                            ลงลายมือชื่อ
                          </span>
                          {!patFormData?.data_form?.doctorsign?.doctor_sign ? (
                            <div className="w-[180px] h-[50px] rounded-lg border-2 border-dashed border-gray-300 dark:border-neutral-700 flex items-center justify-center text-gray-400 dark:text-neutral-500 text-xs bg-gray-50 dark:bg-neutral-800/30">
                              รอการลงนาม
                            </div>
                          ) : (
                            <Image
                              src={patFormData.data_form.doctorsign.doctor_sign}
                              alt="signature"
                              className="border border-gray-200 dark:border-neutral-700 rounded-lg shadow-sm w-[180px] h-[50px] object-contain bg-white dark:bg-transparent"
                            />
                          )}
                          <Button
                            size="sm"
                            isIconOnly
                            className="bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 shadow-sm"
                            isDisabled={
                              patFormData?.data_form?.form?.doctor_id !==
                              user.userid
                            }
                          >
                            <Edit3 size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* นักรังสีแพทย์ */}
                    <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#131317]/50 p-5 sm:p-6 space-y-4 shadow-sm hover:border-gray-300 dark:hover:border-neutral-700 transition-all relative">
                      <div className="pb-3 border-b border-gray-100 dark:border-neutral-800/80 flex items-center justify-between">
                        <span className="font-semibold text-gray-800 dark:text-gray-200 text-[15px] flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                          นักรังสีแพทย์
                        </span>
                      </div>
                      {patFormData?.data_form?.form?.staff_id ===
                        user?.userid && (
                        <div className="mt-2 flex items-center justify-between p-3.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300 shadow-sm border border-neutral-200 dark:border-neutral-600">
                              <Info size={16} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                                คุณมีสิทธิ์ลงนาม
                              </p>
                              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                แบบฟอร์มนี้ต้องการลายเซ็นของคุณ
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-neutral-900 text-white shadow-sm hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white font-medium"
                            onPress={() =>
                              setConfirmSignModal({
                                isOpen: true,
                                role: "staff",
                              })
                            }
                          >
                            ตรวจสอบ
                          </Button>
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
                        <Input
                          className="max-w-[300px]"
                          size="sm"
                          radius="sm"
                          label="ชื่อ-สกุล"
                          labelPlacement="outside-left"
                          value={
                            patFormData?.data_form?.staff_user?.[0]
                              ?.person_name ?? ""
                          }
                          isReadOnly
                          classNames={{
                            inputWrapper:
                              "shadow-none border border-gray-200/80 dark:border-neutral-700/80 bg-gray-50/50 dark:bg-neutral-900/50",
                          }}
                        />
                        <div className="flex-shrink-0 flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">
                            ลงลายมือชื่อ
                          </span>
                          {!signature3 ? (
                            <div className="w-[180px] h-[50px] rounded-lg border-2 border-dashed border-gray-300 dark:border-neutral-700 flex items-center justify-center text-gray-400 dark:text-neutral-500 text-xs bg-gray-50 dark:bg-neutral-800/30">
                              รอการลงนาม
                            </div>
                          ) : (
                            <img
                              src={signature3}
                              alt="signature3"
                              className="border border-gray-200 dark:border-neutral-700 rounded-lg shadow-sm w-[180px] h-[50px] object-contain bg-white dark:bg-transparent"
                            />
                          )}
                          <Button
                            size="sm"
                            isIconOnly
                            className="bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 shadow-sm"
                            isDisabled={
                              patFormData?.data_form?.form?.staff_id !==
                              user.userid
                            }
                            onPress={() => setOpenSign03(true)}
                          >
                            <Edit3 size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* พยาน */}
                    <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#131317]/50 p-5 sm:p-6 space-y-4 shadow-sm hover:border-gray-300 dark:hover:border-neutral-700 transition-all relative">
                      <div className="pb-3 border-b border-gray-100 dark:border-neutral-800/80 flex items-center justify-between">
                        <span className="font-semibold text-gray-800 dark:text-gray-200 text-[15px] flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                          พยาน
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
                        <Input
                          className="max-w-[300px]"
                          size="sm"
                          radius="sm"
                          label="ชื่อ-สกุล"
                          labelPlacement="outside-left"
                          placeholder="ระบุชื่อ-นามสกุล"
                          classNames={{
                            inputWrapper:
                              "shadow-none border border-gray-200/80 dark:border-neutral-700/80 bg-gray-50/50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-800",
                          }}
                        />
                        <div className="flex-shrink-0 flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">
                            ลงลายมือชื่อ
                          </span>
                          {!signature2 ? (
                            <div className="w-[180px] h-[50px] rounded-lg border-2 border-dashed border-gray-300 dark:border-neutral-700 flex items-center justify-center text-gray-400 dark:text-neutral-500 text-xs bg-gray-50 dark:bg-neutral-800/30">
                              รอการลงนาม
                            </div>
                          ) : (
                            <img
                              src={signature2}
                              alt="signature"
                              className="border border-gray-200 dark:border-neutral-700 rounded-lg shadow-sm w-[180px] h-[50px] object-contain bg-white dark:bg-transparent"
                            />
                          )}
                          <Button
                            size="sm"
                            isIconOnly
                            className="bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 shadow-sm"
                            onPress={() => setOpenSign02(true)}
                          >
                            <Edit3 size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* พยาบาล */}
                    <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#131317]/50 p-5 sm:p-6 space-y-4 shadow-sm hover:border-gray-300 dark:hover:border-neutral-700 transition-all relative">
                      <div className="pb-3 border-b border-gray-100 dark:border-neutral-800/80 flex items-center justify-between">
                        <span className="font-semibold text-gray-800 dark:text-gray-200 text-[15px] flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                          พยาบาล
                        </span>
                      </div>
                      {patFormData?.data_form?.form?.nurse_id ===
                        user?.userid && (
                        <div className="mt-2 flex items-center justify-between p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/20">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                              <Info size={16} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                                คุณมีสิทธิ์ลงนาม
                              </p>
                              <p className="text-xs text-blue-700 dark:text-blue-300">
                                แบบฟอร์มนี้ต้องการลายเซ็นของคุณ
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-blue-600 text-white shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 font-medium"
                            onPress={() =>
                              setConfirmSignModal({
                                isOpen: true,
                                role: "nurse",
                              })
                            }
                          >
                            ตรวจสอบ
                          </Button>
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
                        <Input
                          className="max-w-[300px]"
                          size="sm"
                          radius="sm"
                          label="ชื่อ-สกุล"
                          labelPlacement="outside-left"
                          value={
                            patFormData?.data_form?.nurse_user?.[0]
                              ?.person_name ?? ""
                          }
                          isReadOnly
                          classNames={{
                            inputWrapper:
                              "shadow-none border border-gray-200/80 dark:border-neutral-700/80 bg-gray-50/50 dark:bg-neutral-900/50",
                          }}
                        />
                        <div className="flex-shrink-0 flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">
                            ลงลายมือชื่อ
                          </span>
                          {!nurseSignature ? (
                            <div className="w-[180px] h-[50px] rounded-lg border-2 border-dashed border-gray-300 dark:border-neutral-700 flex items-center justify-center text-gray-400 dark:text-neutral-500 text-xs bg-gray-50 dark:bg-neutral-800/30">
                              รอการลงนาม
                            </div>
                          ) : (
                            <img
                              src={nurseSignature}
                              alt="nurse_signature"
                              className="border border-gray-200 dark:border-neutral-700 rounded-lg shadow-sm w-[180px] h-[50px] object-contain bg-white dark:bg-transparent"
                            />
                          )}
                          <Button
                            size="sm"
                            isIconOnly
                            className="bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 shadow-sm"
                            onPress={() => setOpenSign04(true)}
                            isDisabled={
                              patFormData?.data_form?.form?.nurse_id !==
                              user.userid
                            }
                          >
                            <Edit3 size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <DatePicker
                        labelPlacement="outside"
                        className="w-40"
                        label="วันที่"
                      />
                    </div>
                  </div>
                </section>

                {/* ---------------- สำหรับเจ้าหน้าที่ ---------------- */}
                <section className="light:border light:border-gray-200 rounded-2xl p-6 bg-white shadow-sm grid grid-cols-7 gap-2 dark:bg-[#181818]">
                  <h2 className="text-gray-700 dark:text-white font-semibold text-base flex items-center gap-2 mb-4 col-span-7">
                    <span className="w-1 h-5 bg-neutral-600 rounded-full"></span>
                    สำหรับเจ้าหน้าที่
                  </h2>
                  <div className="grid grid-cols-6 items-center text-sm space-y-3 rounded-xl light:border light:border-gray-200 bg-[#f9f9f9] p-6 shadow-inner col-span-7 md:col-span-4 dark:bg-[#1f1e1e]">
                    {" "}
                    <Textarea
                      isClearable
                      className="col-span-6"
                      label="บันทึก (กรณีผู้ป่วยเเพ้สารทึบรังสี)"
                      variant="flat"
                    />
                    <div className="dark:text-white">
                      <span>ลงชื่อ........................</span>
                      <span className="block">
                        (.............ชื่อ..............)
                      </span>
                      <span>ตำแหน่ง..............</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-2 items-center text-sm  space-y-1 rounded-xl light:border light:border-gray-200 bg-[#f9f9f9] p-6 shadow-inner col-span-7 md:col-span-3 dark:bg-[#1f1e1e]">
                    <Input
                      label="Cr"
                      size="sm"
                      radius="sm"
                      className="col-span-6 md:col-span-3"
                    />

                    <Input
                      label="eGFR"
                      size="sm"
                      radius="sm"
                      className="col-span-6 md:col-span-3"
                    />

                    <p className="text-xs text-center text-gray-500 dark:text-white col-span-6">
                      (ต้องมี Cr ≤ 1.5 mg%, eGFR ≥ 45)
                    </p>

                    <Input
                      label="Contrast media"
                      size="sm"
                      className="col-span-6"
                    />

                    <Input
                      label="ปริมาณ (CC)"
                      size="sm"
                      className="col-span-6"
                    />
                  </div>
                </section>

                <Sign01
                  modalRefSign={modalRefSign}
                  isOpen={openSign01}
                  onClose={() => {
                    setOpenSign01(false);
                  }}
                  onSave={handleSaveSignature}
                />
                <Sign02
                  modalRefSign={modalRefSign}
                  isOpen={openSign02}
                  onClose={() => {
                    setOpenSign02(false);
                  }}
                  onSave={handleSaveSignature2}
                />
                <Sign03
                  modalRefSign={modalRefSign}
                  isOpen={openSign03}
                  onClose={() => {
                    setOpenSign03(false);
                  }}
                  onSave={handleSaveSignature3}
                />
                <Sign04
                  modalRefSign={modalRefSign}
                  isOpen={openSign04}
                  onClose={() => {
                    setOpenSign04(false);
                  }}
                  onSave={handleSaveSignature4}
                />

                {/* Confirm Signature Modal */}
                <Modal
                  isOpen={confirmSignModal.isOpen}
                  onOpenChange={(open) =>
                    setConfirmSignModal({ ...confirmSignModal, isOpen: open })
                  }
                  size="sm"
                  classNames={{
                    base: "dark:bg-[#18181B]",
                  }}
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1 items-center pb-0 pt-6">
                          <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 mb-4 border border-neutral-200 dark:border-neutral-700">
                            <PenSquare size={24} />
                          </div>
                          <p className="text-lg font-semibold text-neutral-900 dark:text-white">
                            ยืนยันการใช้ลายเซ็น
                          </p>
                        </ModalHeader>
                        <ModalBody className="text-center pb-6">
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            คุณต้องการอนุญาตให้ใช้ลายเซ็นของคุณในแบบฟอร์มนี้หรือไม่?
                          </p>
                        </ModalBody>
                        <ModalFooter className="flex justify-center gap-3 w-full pb-6 border-none">
                          <Button
                            variant="flat"
                            className="font-medium flex-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                            onPress={() =>
                              setConfirmSignModal({ isOpen: false, role: null })
                            }
                          >
                            ไม่อนุญาต
                          </Button>
                          <Button
                            className="font-medium flex-1 shadow-sm bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                            onPress={handleApproveSignature}
                          >
                            อนุญาต
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </ModalBody>

              <ModalFooter>
                <Button
                  variant="flat"
                  color="default"
                  onPress={handleCloseModal}
                >
                  ปิด
                </Button>
                <Button
                  className="bg-neutral-900 text-white dark:bg-neutral-800 dark:hover:bg-neutral-700"
                  // onPress={closeForm1}
                  type="submit"
                  isDisabled={isSubmitting}
                >
                  {isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
