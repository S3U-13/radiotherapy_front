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
                    <div className="rounded-xl light:border light:border-gray-200 bg-[#f9f9f9] p-6 space-y-3 shadow-sm dark:bg-[#1f1e1e]">
                      <span className="font-medium text-gray-700 dark:text-white text-sm">
                        ผู้ป่วย / ตัวแทนผู้ป่วย
                      </span>
                      <div className="flex flex-wrap gap-3 items-center">
                        <span className="text-sm flex items-center gap-2 text-default-700">
                          ลงชื่อ{" "}
                          {!signature ? (
                            <span className="text-gray-400">
                              .............................
                            </span>
                          ) : (
                            <img
                              src={signature}
                              alt="signature"
                              className="border border-gray-200 rounded-lg shadow w-[180px] h-[50px] object-contain bg-white"
                            />
                          )}
                        </span>
                        <Button
                          size="sm"
                          isIconOnly
                          className="bg-neutral-900 text-white dark:bg-neutral-800 dark:hover:bg-neutral-700"
                          variant="flat"
                          onPress={() => setOpenSign01(true)}
                        >
                          <Edit3 className="size-5" />
                        </Button>
                      </div>
                      <Input
                        className="max-w-xs"
                        size="sm"
                        radius="sm"
                        placeholder="ชื่อ-นามสกุล"
                      />
                    </div>

                    {/* แพทย์ */}
                    <div className="rounded-xl light:border light:border-gray-200 bg-[#f9f9f9] p-6 space-y-3 shadow-sm dark:bg-[#1f1e1e]">
                      <span className="font-medium text-gray-700 dark:text-white text-sm">
                        แพทย์
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-default-700">ลงชื่อ</span>{" "}
                        {patFormData?.data_form?.doctorsign?.doctor_sign ? (
                          <Image
                            className="border border-gray-200 rounded-lg shadow w-[180px] h-[50px] object-contain bg-white"
                            src={
                              patFormData?.data_form?.doctorsign
                                ? patFormData?.data_form?.doctorsign
                                    ?.doctor_sign
                                : null
                            }
                            alt=""
                          />
                        ) : (
                          <span>
                            ..........................................
                          </span>
                        )}
                        <Button
                          size="sm"
                          isIconOnly
                          className="bg-neutral-900 text-white dark:bg-neutral-800 dark:hover:bg-neutral-700"
                          variant="flat"
                          isDisabled={
                            patFormData?.data_form?.form?.doctor_id !==
                            user.userid
                          }
                        >
                          <Edit3 className="size-5" />
                        </Button>
                      </div>

                      <p className="max-w-xs text-sm">
                        ({" "}
                        {patFormData?.data_form?.doctor_user?.person_name ?? ""}{" "}
                        )
                      </p>
                    </div>

                    {/* นักรังสีแพทย์ */}
                    <div className="rounded-xl light:border light:border-gray-200 bg-[#f9f9f9] p-6 space-y-3 shadow-sm dark:bg-[#1f1e1e]">
                      <span className="font-medium text-gray-700 dark:text-white text-sm">
                        นักรังสีแพทย์
                      </span>
                      <div className="flex flex-wrap gap-3 items-center">
                        <span className="text-sm flex items-center gap-2 text-default-700 dark:text-white">
                          ลงชื่อ{" "}
                          {!signature3 ? (
                            <span className="text-gray-400">
                              .............................
                            </span>
                          ) : (
                            <img
                              src={signature3}
                              alt="signature3"
                              className="border border-gray-200 rounded-lg shadow w-[180px] h-[50px] object-contain bg-white"
                            />
                          )}
                        </span>
                        <Button
                          size="sm"
                          isIconOnly
                          className="bg-neutral-900 text-white dark:bg-neutral-800 dark:hover:bg-neutral-700"
                          variant="flat"
                          isDisabled={
                            patFormData?.data_form?.form?.staff_id !==
                            user.userid
                          }
                          onPress={() => setOpenSign03(true)}
                        >
                          <Edit3 className="size-5" />
                        </Button>
                      </div>
                      <p className="max-w-xs text-sm">
                        ({" "}
                        {patFormData?.data_form?.staff_user?.person_name ?? ""}{" "}
                        )
                      </p>
                    </div>

                    {/* พยาน */}
                    <div className="rounded-xl light:border light:border-gray-200 bg-[#f9f9f9] p-6 space-y-3 shadow-sm dark:bg-[#1f1e1e]">
                      <span className="font-medium text-gray-700 dark:text-white text-sm">
                        พยาน
                      </span>
                      <div className="flex flex-wrap gap-3 items-center">
                        <span className="text-sm flex items-center gap-2 text-default-700">
                          ลงชื่อ{" "}
                          {!signature2 ? (
                            <span className="text-gray-400">
                              .............................
                            </span>
                          ) : (
                            <img
                              src={signature2}
                              alt="signature"
                              className="border border-gray-200 rounded-lg shadow w-[180px] h-[50px] object-contain bg-white"
                            />
                          )}
                        </span>
                        <Button
                          size="sm"
                          isIconOnly
                          className="bg-neutral-900 text-white dark:bg-neutral-800 dark:hover:bg-neutral-700"
                          variant="flat"
                          onPress={() => setOpenSign02(true)}
                        >
                          <Edit3 className="size-5" />
                        </Button>
                      </div>
                      <Input
                        className="max-w-xs"
                        size="sm"
                        radius="sm"
                        placeholder="ชื่อ-นามสกุล"
                      />
                    </div>

                    {/* พยาบาล */}
                    <div className="rounded-xl light:border light:border-gray-200 bg-[#f9f9f9] p-6 space-y-3 shadow-sm dark:bg-[#1f1e1e]">
                      <span className="font-medium text-gray-700 dark:text-white text-sm">
                        พยาบาล
                      </span>
                      <div className="flex flex-wrap gap-3 items-center">
                        <span className="text-sm flex items-center gap-2 text-default-700">
                          ลงชื่อ{" "}
                          {!nurseSignature ? (
                            <span className="text-gray-400">
                              .............................
                            </span>
                          ) : (
                            <img
                              src={nurseSignature}
                              alt="nurse_signature"
                              className="border border-gray-200 rounded-lg shadow w-[180px] h-[50px] object-contain bg-white"
                            />
                          )}
                        </span>

                        <Button
                          size="sm"
                          isIconOnly
                          className="bg-neutral-900 text-white dark:bg-neutral-800 dark:hover:bg-neutral-700"
                          variant="flat"
                          onPress={() => setOpenSign04(true)}
                          isDisabled={
                            patFormData?.data_form?.form?.nurse_id !==
                            user.userid
                          }
                        >
                          <Edit3 className="size-5" />
                        </Button>
                      </div>
                      <p className="max-w-xs text-sm">
                        ( {""}
                        {patFormData?.data_form?.nurse_user?.person_name ?? ""}
                        {""} )
                      </p>
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
