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

export default function page({ openForm3, closeForm3, modalRef, selectForm }) {
  const { hnInput, setHnInput, handleSearchHn } = useHook();
  return (
    <div>
      <Modal
        size="3xl"
        isOpen={openForm3}
        onOpenChange={closeForm3}
        classNames={{
          body: "max-h-[calc(85vh-120px)] overflow-y-scroll py-6",
          header: "border-b border-divider py-6",
          footer: "border-t border-divider",
        }}
        placement="center"
      >
        <ModalContent ref={modalRef}>
          {(closeForm3) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-1 text-center text-lg font-semibold text-gray-800">
                <h1>ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการใส่เเร่</h1>
                <h1>โรงพยาบาลพระปกเกล้า</h1>
              </ModalHeader>

              <ModalBody className="space-y-4 text-gray-700 dark:text-gray-300">
                {/* 🩺 ส่วนข้อมูลผู้ยินยอม */}

                <section className="p-4 bg-white dark:bg-[#27272a] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4 pt-4">
                      <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
                      ข้อมูลผู้ยินยอม
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
                        className=""
                        label="เจ็บป่วยด้วยโรคมะเร็ง ปากมดลูก/มดลูก/"
                        size="md"
                        radius="sm"
                        labelPlacement="outside-left"
                      />
                    </div>
                    <h1 className="pl-2 text-sm text-gray-600 dark:text-gray-400 col-span-6">
                      จะต้องเข้าการรักษาด้วยการใส่น้ำเเร่
                    </h1>
                  </div>
                </section>

                {/* 💬 ส่วนคำอธิบาย */}
                <section className="p-4 bg-white dark:bg-[#27272a] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
                  <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4">
                    <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
                    รายละเอียดการรักษา
                  </h2>
                  <div className="space-y-1 text-sm leading-6 text-gray-600">
                    <p className="indent-8">
                      ข้าพเจ้าเเละผู้เเทนของข้าพเจ้า
                      เข้าใจถึงวิธีการรักษาด้วยรังสี คือ
                      การใส่อุปกรณ์เข้าทางช่องคลอด
                      เพื่อใส่เเร่รังสีเข้าทางอุปกรณ์สู่ภายในร่างกายผู้ป่วยในท่านอนโดยใช้เวลาในการรักษาทั้งสิ้นประมาณ
                      3 ชั่วโมง
                    </p>
                    <p className="indent-8">
                      ประโยชน์ที่คาดว่าจะได้รับจากการรักษาด้วยรังสี
                      คือเพิ่มโอกาสหายขาดจากโรคมะเร็งดังกล่าว
                    </p>
                    <p className="indent-8">
                      ภาวะเเทรกซ้อนที่อาจเกิดจากการรักษาด้วยรังสี
                      ทั้งที่อาจเกิดระหว่างการฉายรังสีได้เเก่
                      เลือดออกทางช่องคลอด เบื่ออาหาร ปวดท้อง ปัสสาวะเเสบขัด
                      มีภาวะติดเชื้อในกระเพาะปัสสาวะ อุจจาระปนเลือด
                      ถ่ายเหลวท้องเสียเป็นต้น
                    </p>
                    <p className="indent-8">
                      ข้าพเจ้าเเละผู้เทนของข้าพเจ้าเข้าใจถึงข้อมูลอันเป็นประโยชน์ดังกล่าว
                      เเละซักถามข้อมูลอันเป็นประโยชน์ต่อการตัดสินใจได้ครบถ่วนเเล้ว
                      จึงตัดสินในเข้ารับการรักษาดังกล่าว เเละ จะไม่ฟ้องร้อง
                      เรียกร้องหรือเอาความผิดกับโรงพยาบาล
                      รวมทั้งเเพทย์เเละเจ้าหน้าที่ผู้เกี่ยวข้อง
                      ในผลอันไม่พึงประสงค์ที่อาจเกิดขึ้นจากการรักษาดังกล่าว
                    </p>
                  </div>
                </section>

                {/* ✍️ ส่วนลงชื่อ */}
                <section className="p-4 bg-white dark:bg-[#27272a] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
                  <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4">
                    <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
                    การลงชื่อและพยาน
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

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={closeForm3}
                  className="rounded-lg"
                >
                  ปิด
                </Button>
                <Button
                  color="primary"
                  onPress={closeForm3}
                  className="bg-blue-600 text-white rounded-lg"
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
