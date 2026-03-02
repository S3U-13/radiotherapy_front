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
import { Search } from "@deemlol/next-icons";

export default function page({ openForm1, closeForm1, modalRef, selectForm }) {
  const {
    hnInput,
    setHnInput,
    handleSearchHn,
    form,
    field,
    setField,
    handleChange,
  } = useHook();
  return (
    <div>
      <Modal
        size="3xl"
        isOpen={openForm1}
        onOpenChange={closeForm1}
        classNames={{
          body: "max-h-[calc(85vh-120px)] overflow-y-scroll py-6",
          header: "border-b border-divider py-6",
          footer: "border-t border-divider",
        }}
        placement="center"
      >
        <ModalContent ref={modalRef}>
          {(closeForm1) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-1 text-center text-lg font-semibold text-gray-800">
                <h1>หนังสืออธิบายและยินยอมให้ทำการจำลองการฉายรังสี</h1>
                <h1>โดยใช้รังสีเอกซเรย์และสารทึบรังสี</h1>
                <h1 className="text-xs text-gray-600">
                  หน่วยงานรังสีรักษา โรงพยาบาลพระปกเกล้า
                </h1>
              </ModalHeader>

              <ModalBody className="space-y-6 text-gray-800">
                {/* ---------------- ข้อมูลผู้ป่วย ---------------- */}
                <section className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
                  <div className="">
                    <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4">
                      <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
                      ข้อมูลผู้ป่วย
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                      <div className="w-1/4">
                        <Input
                          labelPlacement="outside-left"
                          size="md"
                          radius="sm"
                          label="FORM ID :"
                          value={selectForm}
                          type="text"
                          readOnly
                          disabled
                        />
                      </div>

                      <div className="flex items-center sm:w-1/2 pl-8">
                        <Input
                          labelPlacement="outside-left"
                          size="md"
                          radius="sm"
                          label="ค้นหา"
                          value={hnInput}
                          onChange={(e) => setHnInput(e.target.value)}
                          placeholder="กรอก HN ...."
                          variant="flat"
                        />
                        <Button
                          size="sm"
                          isIconOnly
                          onPress={handleSearchHn}
                          color="secondary"
                          variant="solid"
                        >
                          <Search size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 border-t border-divider pt-4">
                    <form.Field name="pat_name">
                      {(field) => (
                        <Input
                          labelPlacement="outside-left"
                          size="md"
                          radius="sm"
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                          classNames={{ label: "text-gray-600" }}
                          className="col-span-3"
                          label="ชื่อ-สกุล ผู้ป่วย"
                        />
                      )}
                    </form.Field>

                    <div className="flex items-center gap-2 col-span-1 ">
                      <Input
                        labelPlacement="outside-left"
                        size="md"
                        radius="sm"
                        label="อายุ"
                        classNames={{ label: "text-gray-600" }}
                      />
                      <span className="text-gray-600">ปี</span>
                    </div>
                    <form.Field name="hn">
                      {(field) => (
                        <Input
                          labelPlacement="outside-left"
                          size="md"
                          radius="sm"
                          className="col-span-2"
                          label="HN"
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                          classNames={{ label: "text-gray-600" }}
                        />
                      )}
                    </form.Field>

                    <DatePicker
                      labelPlacement="outside-left"
                      size="md"
                      radius="sm"
                      className="col-span-2 pl-2"
                      label="วันที่"
                      classNames={{ label: "text-gray-600" }}
                    />
                    <div className="flex items-center gap-2 col-span-2">
                      <Input
                        labelPlacement="outside-left"
                        size="md"
                        radius="sm"
                        label="น้ำหนัก"
                        className="w-[120px]"
                        classNames={{ label: "text-gray-600" }}
                      />
                      <span className="text-gray-600">กิโลกรัม</span>
                    </div>
                  </div>
                </section>

                {/* ---------------- คำอธิบาย ---------------- */}
                <section className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
                  <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4">
                    <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
                    คำอธิบายการตรวจ
                  </h2>

                  <div className="space-y-1 text-sm leading-6">
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
                <section className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm space-y-2">
                  <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2">
                    <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
                    จึงได้ลงลายมือชื่อไว้เป็นหลักฐาน
                  </h2>

                  <div className="rounded-xl border border-gray-200 bg-white/70 p-4 space-y-2 shadow-sm">
                    <span className="block font-medium text-gray-700 text-md ">
                      แพทย์
                    </span>
                    <span className="block text-sm text-gray-600">
                      ลงชื่อ.........................
                    </span>
                    <span className="block text-sm text-gray-500">
                      (.............ชื่อ..............)
                    </span>
                  </div>
                </section>
              </ModalBody>

              <ModalFooter>
                <Button variant="light" color="danger" onPress={closeForm1}>
                  ปิด
                </Button>
                <Button color="primary" onPress={closeForm1}>
                  บันทึก
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
