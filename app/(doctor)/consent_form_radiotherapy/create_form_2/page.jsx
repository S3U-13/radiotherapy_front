"use client";
import { Button } from "@heroui/button";
import { DatePicker } from "@heroui/date-picker";
import { Input } from "@heroui/input";
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

export default function page({ openForm2, closeForm2, modalRef, selectForm }) {
  const { hnInput, setHnInput, handleSearchHn } = useHook();
  return (
    <div>
      <Modal
        size="3xl"
        isOpen={openForm2}
        onOpenChange={closeForm2}
        classNames={{
          body: "max-h-[calc(85vh-120px)] overflow-y-scroll py-6",
          header: "border-b border-divider py-6",
          footer: "border-t border-divider",
        }}
        placement="center"
      >
        <ModalContent ref={modalRef}>
          {(closeForm2) => (
            <>
              {/* Header */}
              <ModalHeader className="flex flex-col items-center gap-1 text-center text-lg font-semibold text-gray-800">
                <h1>ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการฉายรังสี</h1>
                <h2>โรงพยาบาลพระปกเกล้า</h2>
              </ModalHeader>

              {/* Body */}
              <ModalBody className="space-y-6">
                {/* SECTION 1: ข้อมูลทั่วไป */}
                <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    {" "}
                    <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 pt-4 mb-4">
                      <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
                      ข้อมูลทั่วไปของผู้ป่วย
                    </h2>
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
                  </div>

                  <div className="flex justify-between items-center  ">
                    <DatePicker
                      classNames={{ label: "text-gray-600" }}
                      className="w-2/7"
                      label="วันที่"
                      size="md"
                      radius="sm"
                      labelPlacement="outside-left"
                    />
                    <div className="flex items-center gap-2 sm:w-1/2 pl-8">
                      <Input
                        labelPlacement="outside-left"
                        size="md"
                        radius="sm"
                        label="ค้นหา"
                        value={hnInput}
                        onChange={(e) => setHnInput(e.target.value)}
                        placeholder="กรอก HN ...."
                        variant="flat"
                        classNames={{ label: "text-gray-600" }}
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

                  <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 gap-y-3 border-t border-gray-200 pt-4">
                    <Input
                      classNames={{ label: "text-gray-600" }}
                      className="col-span-3"
                      label="ข้าพเจ้า ชื่อ"
                      size="md"
                      radius="sm"
                      labelPlacement="outside-left"
                    />
                    <div className="flex items-center gap-2 col-span-3">
                      <Input
                        classNames={{ label: "text-gray-600" }}
                        label="มีความสัมพันธ์เป็น"
                        size="md"
                        radius="sm"
                        className="w-[210px]"
                        labelPlacement="outside-left"
                      />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        เกี่ยวข้องกับผู้ป่วย
                      </p>
                    </div>

                    <Input
                      classNames={{ label: "text-gray-600" }}
                      className="col-span-2"
                      label="ชื่อ"
                      size="md"
                      radius="sm"
                      labelPlacement="outside-left"
                    />
                    <div className="col-span-4 flex items-center gap-2">
                      <Input
                        classNames={{ label: "text-gray-600" }}
                        className="w-[250px]"
                        label="เจ็บป่วยด้วยโรค"
                        size="md"
                        radius="sm"
                        labelPlacement="outside-left"
                      />
                      <h1 className="text-sm text-gray-600 dark:text-gray-400">
                        จะต้องเข้ารักษาด้วยการฉายรังสี
                      </h1>
                    </div>
                  </div>
                </section>

                {/* SECTION 2: คำอธิบาย */}
                <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-5 space-y-4">
                  <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4">
                    <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
                    คำอธิบายเกี่ยวกับการรักษา
                  </h2>

                  <div className="space-y-1 text-sm leading-6 text-gray-600">
                    <p className="indent-8">
                      ข้าพเจ้าเเละผู้เเทนของข้าพเจ้า
                      เข้าใจถึงวิธีการรักษาด้วยรังสี คือ
                      การฉายรังสีด้วยเครื่องฉายภาพนอกร่างกายผ่านตัวผู้ป่วยในท่านอนบนเตียงเฉพาะ
                      โดยต้องสามารถนอนได้อย่างสงบเป็นเวลาอย่างน้อยประมาณ 15 นาที
                    </p>
                    <p className="indent-8">
                      ข้าพเจ้าได้ทราบถึงประโยชน์ที่คาดว่าจะได้รับจากการรักษาด้วยรังสี
                      เเละ ภาวะเเทรกซ้อนที่อาจเกิดจากการรักษาด้วยรังสี
                      ทั้งที่อาจเกิดระหว่างการฉายรังสี
                    </p>
                    <p className="indent-8">
                      ข้าพเจ้าเเละผู้เทนของข้าพเจ้าเข้าใจถึงข้อมูลอันเป็นประโยชน์ดังกล่าว
                      เเละซักถามข้อมูลอันเป็นประโยชน์ต่อการตัดสินใจได้ครบถ่วนเเล้ว
                    </p>
                  </div>
                </section>

                {/* SECTION 4: ลายเซ็นและพยาน */}
                <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-5 space-y-4">
                  <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4">
                    <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
                    ลายเซ็นและพยาน
                  </h2>

                  <div className="rounded-xl border border-gray-200 bg-white/70 p-4 space-y-3 shadow-sm">
                    <span className="block font-medium text-gray-700 text-sm">
                      ผู้ให้ข้อมูล แพทย์ / พยาบาล
                    </span>
                    <span className="block text-sm text-gray-600">
                      ลงชื่อ.........................
                    </span>
                    <span className="block text-sm text-gray-600">
                      (.............ชื่อ..............)
                    </span>
                  </div>
                </section>
              </ModalBody>

              {/* Footer */}
              <ModalFooter className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-2xl flex justify-end gap-3 py-4">
                <Button
                  color="danger"
                  variant="light"
                  radius="sm"
                  className="font-medium"
                  onPress={closeForm2}
                >
                  ปิด
                </Button>
                <Button
                  color="primary"
                  radius="sm"
                  className="font-medium"
                  onPress={closeForm2}
                >
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
