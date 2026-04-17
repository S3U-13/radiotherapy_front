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
import useHook from "./useHook";
import { Edit3, Search } from "@deemlol/next-icons";
import { Select, SelectItem } from "@heroui/select";
import Sign01 from "./signature01/page";

export default function page({ openForm1, closeForm1, modalRef, selectForm }) {
  const {
    hnInput,
    setHnInput,
    handleSearchHn,
    form,
    handleSubmit,
    isSubmitting,
    visitList,
    fetchVisit,
    formatThaiDateTime,
    formatThaiDate,
    visitId,
    handelSelectVisitId,
    vitalsignList,
    vitalsignId,
    handelSelectVitalsignId,
    vitalsignData,
    modalRefSign,
    openSign01,
    setOpenSign01,
    handleSaveSignature,
    signature,
    user,
    pat,
    staff,
    doctor,
  } = useHook({ closeForm1, selectForm });

  return (
    <div>
      <Modal
        size="5xl"
        isOpen={openForm1}
        onOpenChange={closeForm1}
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
              <ModalHeader className="flex flex-col items-center gap-1 text-center text-lg font-semibold text-gray-800 dark:text-white">
                <h1>หนังสืออธิบายและยินยอมให้ทำการจำลองการฉายรังสี</h1>
                <h1>โดยใช้รังสีเอกซเรย์และสารทึบรังสี</h1>
                <h1 className="text-xs text-gray-600 dark:text-white">
                  หน่วยงานรังสีรักษา โรงพยาบาลพระปกเกล้า
                </h1>
              </ModalHeader>

              <ModalBody className="space-y-6 text-gray-800">
                <Sign01
                  modalRefSign={modalRefSign}
                  isOpen={openSign01}
                  onClose={() => {
                    setOpenSign01(false);
                  }}
                  onSave={handleSaveSignature}
                />
                {/* ---------------- ข้อมูลผู้ป่วย ---------------- */}
                <section className="light:border light:border-gray-200 rounded-2xl p-6 bg-white shadow-sm dark:bg-[#181818]">
                  <div className="">
                    <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4 dark:text-white">
                      <span className="w-1 h-5 bg-neutral-600 rounded-full"></span>
                      ข้อมูลผู้ป่วย
                    </h2>
                    <div className="w-1/4">
                      <form.Field name="form_type_id">
                        {(field) => (
                          <Input
                            size="sm"
                            radius="sm"
                            label="FORM ID :"
                            value={field.state.value ?? ""}
                            onChange={(e) => field.handleChange(e.target.value)}
                            type="hidden"
                          />
                        )}
                      </form.Field>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-start gap-2 items-center mb-2  bg-white p-4 rounded-md shadow-sm dark:bg-[#0E0E11]">
                      <div className="flex items-center sm:max-w-xs gap-2">
                        <Input
                          size="sm"
                          radius="sm"
                          label="ค้นหา"
                          value={hnInput}
                          onChange={(e) => setHnInput(e.target.value)}
                          placeholder="กรอก HN ...."
                          variant="flat"
                          className=""
                        />
                        <Button
                          size="sm"
                          isIconOnly
                          onPress={() => {
                            handleSearchHn();
                            fetchVisit();
                          }}
                          className="bg-neutral-900 text-white dark:bg-neutral-800 dark:hover:bg-neutral-700"
                        >
                          <Search size={18} />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 ml-4">
                        {" "}
                        {visitList?.length > 0 ? (
                          <Select
                            label="Visit Date Time"
                            size="sm"
                            className="w-[280px]"
                            selectedKeys={
                              visitId ? new Set([String(visitId)]) : new Set()
                            }
                            onSelectionChange={(keys) => {
                              const selectedValue = Array.from(keys)[0];
                              handelSelectVisitId(selectedValue);
                            }}
                          >
                            {visitList?.map((item) => (
                              <SelectItem key={item.id}>
                                {formatThaiDateTime(item.visitdatetime)}
                              </SelectItem>
                            ))}
                          </Select>
                        ) : null}
                        {vitalsignList.length > 0 ? (
                          <Select
                            label="Vitalsign"
                            size="sm"
                            className="w-[280px]"
                            selectedKeys={
                              vitalsignId ? new Set([vitalsignId]) : new Set()
                            }
                            onSelectionChange={(keys) => {
                              const selectedValue = Array.from(keys)[0];
                              handelSelectVitalsignId(selectedValue);
                            }}
                          >
                            {vitalsignList?.map((item) => (
                              <SelectItem key={item.id}>
                                {`${formatThaiDate(item.dodate)}
                                น้ำหนัก ${item.weight} กิโลกรัม`}
                              </SelectItem>
                            ))}
                          </Select>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 pt-4">
                    <form.Field name="pat_name">
                      {(field) => (
                        <Input
                          size="sm"
                          radius="sm"
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="col-span-3"
                          label="ชื่อ-สกุล ผู้ป่วย"
                          readOnly
                        />
                      )}
                    </form.Field>

                    <div className="flex items-center gap-2 col-span-1 ">
                      <form.Field name="pat_age">
                        {(field) => (
                          <Input
                            size="sm"
                            radius="sm"
                            label="อายุ"
                            value={field.state.value || ""}
                            onChange={(e) => field.handleChange(e.target.value)}
                            readOnly
                          />
                        )}
                      </form.Field>

                      <span className="text-gray-600 dark:text-default-400">
                        ปี
                      </span>
                    </div>
                    <form.Field name="hn">
                      {(field) => (
                        <Input
                          size="sm"
                          radius="sm"
                          className="col-span-2"
                          label="HN"
                          value={field.state.value ?? ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                          readOnly
                        />
                      )}
                    </form.Field>

                    <DatePicker
                      size="sm"
                      radius="sm"
                      className="col-span-2"
                      label="วันที่"
                      variant="bordered"
                    />
                    <div className="flex items-center gap-2 col-span-2">
                      <Input
                        size="sm"
                        radius="sm"
                        label="น้ำหนัก"
                        className="w-[120px]"
                        value={vitalsignData}
                        readOnly
                      />
                      <span className="text-gray-600 dark:text-default-400">
                        กิโลกรัม
                      </span>
                    </div>
                  </div>
                </section>

                {/* ---------------- คำอธิบาย ---------------- */}
                <section className="light:border light:border-gray-200 rounded-2xl p-6 bg-white shadow-sm dark:bg-[#181818]">
                  <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4 dark:text-white">
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

                {/* ---------------- ส่วนลงนาม ---------------- */}
                <section className="rounded-2xl bg-white p-6 shadow-sm space-y-6 dark:bg-[#181818]">
                  {/* ลายเซ็น */}
                  <div className="grid gap-5 mt-4">
                    <span className="text-gray-700 dark:text-white text-md font-semibold">
                      จึงได้ลงลายมือชื่อไว้เป็นหลักฐาน
                    </span>

                    {/* ผู้ป่วย */}
                    {/* <div className="rounded-xl light:border light:border-gray-200 bg-[#f9f9f9] p-6 space-y-3 shadow-sm dark:bg-[#1f1e1e]">
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
                    </div> */}

                    {/* แพทย์ */}
                    <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#131317]/50 p-5 sm:p-6 space-y-4 shadow-sm hover:border-gray-300 dark:hover:border-neutral-700 transition-all relative">
                      <div className="pb-3 border-b border-gray-100 dark:border-neutral-800/80 flex items-center justify-between">
                        <span className="font-semibold text-gray-800 dark:text-gray-200 text-[15px] flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                          แพทย์
                        </span>
                      </div>
                      <div className="w-full">
                        <form.Field name="doctor_id">
                          {(field) => (
                            <Select
                              label="กรุณาเลือกแพทย์เพื่อขออนุญาตใช้ลายเซ็น"
                              className="w-full max-w-[500px]"
                              size="sm"
                              radius="sm"
                              placeholder=""
                              selectedKeys={
                                field.state.value ? [field.state.value] : []
                              }
                              onSelectionChange={(keys) => {
                                const value = Array.from(keys)[0];
                                field.handleChange(value);
                              }}
                              classNames={{
                                trigger:
                                  "shadow-none border border-gray-200/80 dark:border-neutral-700/80 bg-gray-50/50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-800",
                              }}
                            >
                              {doctor?.map((item) => (
                                <SelectItem key={String(item.doctorid)}>
                                  {`${item?.name} ${item?.location_name}`}
                                </SelectItem>
                              ))}
                            </Select>
                          )}
                        </form.Field>
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
                      <div className="w-full">
                        <form.Field name="staff_id">
                          {(field) => (
                            <Select
                              label="กรุณาเลือกนักรังสีแพทย์เพื่อขออนุญาตใช้ลายเซ็น"
                              className="w-full max-w-[500px]"
                              size="sm"
                              radius="sm"
                              placeholder=""
                              selectedKeys={
                                field.state.value ? [field.state.value] : []
                              }
                              onSelectionChange={(keys) => {
                                const value = Array.from(keys)[0];
                                field.handleChange(value);
                              }}
                              classNames={{
                                trigger:
                                  "shadow-none border border-gray-200/80 dark:border-neutral-700/80 bg-gray-50/50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-800",
                              }}
                            >
                              {staff?.map((item) => (
                                <SelectItem key={String(item.userid)}>
                                  {`${item?.person_name} ${item?.position}`}
                                </SelectItem>
                              ))}
                            </Select>
                          )}
                        </form.Field>
                      </div>
                    </div>

                    {/* พยาน */}
                    {/* <div className="rounded-xl light:border light:border-gray-200 bg-[#f9f9f9] p-6 space-y-3 shadow-sm dark:bg-[#1f1e1e]">
                      <span className="font-medium text-gray-700 dark:text-white text-sm">
                        พยาน
                      </span>

                      <Input
                        className="max-w-xs"
                        size="sm"
                        radius="sm"
                        placeholder="ชื่อ-นามสกุล"
                      />
                    </div> */}

                    {/* พยาบาล */}
                    <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#131317]/50 p-5 sm:p-6 space-y-4 shadow-sm hover:border-gray-300 dark:hover:border-neutral-700 transition-all relative">
                      <div className="pb-3 border-b border-gray-100 dark:border-neutral-800/80 flex items-center justify-between">
                        <span className="font-semibold text-gray-800 dark:text-gray-200 text-[15px] flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                          พยาบาล
                        </span>
                      </div>
                      <div className="w-full">
                        <form.Field name="nurse_id">
                          {(field) => (
                            <Select
                              label="กรุณาเลือกพยาบาลเพื่อขออนุญาตใช้ลายเซ็น"
                              className="w-full max-w-[500px]"
                              size="sm"
                              radius="sm"
                              placeholder=""
                              selectedKeys={
                                field.state.value ? [field.state.value] : []
                              }
                              onSelectionChange={(keys) => {
                                const value = Array.from(keys)[0];
                                field.handleChange(value);
                              }}
                              classNames={{
                                trigger:
                                  "shadow-none border border-gray-200/80 dark:border-neutral-700/80 bg-gray-50/50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-800",
                              }}
                            >
                              {staff?.map((item) => (
                                <SelectItem key={String(item.userid)}>
                                  {`${item?.person_name} ${item?.position}`}
                                </SelectItem>
                              ))}
                            </Select>
                          )}
                        </form.Field>
                      </div>
                    </div>
                    <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#131317]/50 p-5 sm:p-6 space-y-4 shadow-sm hover:border-gray-300 dark:hover:border-neutral-700 transition-all relative">
                      <div className="pb-3 border-b border-gray-100 dark:border-neutral-800/80 flex items-center justify-between">
                        <span className="font-semibold text-gray-800 dark:text-gray-200 text-[15px] flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                          ผู้ตรวจสอบ
                        </span>
                      </div>
                      <div className="w-full">
                        <form.Field name="viewer">
                          {(field) => (
                            <Select
                              label="กรุณาเลือกผู้ตรวจสอบ"
                              className="w-full max-w-[500px]"
                              size="sm"
                              radius="sm"
                              placeholder=""
                              selectedKeys={
                                field.state.value ? [field.state.value] : []
                              }
                              onSelectionChange={(keys) => {
                                const value = Array.from(keys)[0];
                                field.handleChange(value);
                              }}
                              classNames={{
                                trigger:
                                  "shadow-none border border-gray-200/80 dark:border-neutral-700/80 bg-gray-50/50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-800",
                              }}
                            >
                              {staff?.map((item) => (
                                <SelectItem key={String(item.userid)}>
                                  {`${item?.person_name} ${item?.position}`}
                                </SelectItem>
                              ))}
                            </Select>
                          )}
                        </form.Field>
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
              </ModalBody>

              <ModalFooter>
                <Button variant="flat" color="default" onPress={closeForm1}>
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
