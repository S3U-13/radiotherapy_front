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

import React from "react";
import useHook from "./useHook";
import { Search } from "@deemlol/next-icons";

export default function page({ openForm3, closeForm3, modalRef, selectForm }) {
  const { hnInput, setHnInput, handleSearchHn } = useHook();
  return (
    <div>
      <Modal
        size="5xl"
        isOpen={openForm3}
        onOpenChange={closeForm3}
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
          {(closeForm3) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-1 text-center text-lg font-semibold text-gray-800 dark:text-white">
                <h1>ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการใส่เเร่</h1>
                <h1>โรงพยาบาลพระปกเกล้า</h1>
              </ModalHeader>

              <ModalBody className="space-y-4 text-gray-700 dark:text-gray-300">
                {/* 🩺 ส่วนข้อมูลผู้ยินยอม */}

                <section className="light:border light:border-gray-200 rounded-2xl p-6 bg-white shadow-sm dark:bg-[#181818] space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4 dark:text-white">
                      <span className="w-1 h-5 bg-neutral-600 rounded-full"></span>
                      ข้อมูลผู้ยินยอม
                    </h2>
                  </div>

                  <div className="flex justify-between items-center  ">
                    <DatePicker
                      className="w-2/7"
                      label="วันที่"
                      size="sm"
                      radius="sm"
                    />
                    <div className="flex items-center gap-2 sm:max-w-sx">
                      <Input
                        size="sm"
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
                        className="bg-neutral-900 text-white dark:bg-neutral-800 dark:hover:bg-neutral-700"
                      >
                        <Search size={18} />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 gap-y-3 border-t border-gray-200 dark:border-divider pt-4">
                    <Input
                      className="col-span-3"
                      label="ข้าพเจ้า ชื่อ"
                      size="sm"
                      radius="sm"
                    />
                    <div className="flex items-center gap-2 col-span-3">
                      <Input
                        label="มีความสัมพันธ์เป็น"
                        size="sm"
                        radius="sm"
                        className="max-w-xs"
                      />
                      <p className="text-sm text-gray-600 dark:text-default-400">
                        เกี่ยวข้องกับผู้ป่วย
                      </p>
                    </div>

                    <Input
                      className="col-span-2"
                      label="ชื่อ"
                      size="sm"
                      radius="sm"
                    />
                    <div className="col-span-4 flex items-center gap-2">
                      <Input
                        className="max-w-xs"
                        label="เจ็บป่วยด้วยโรคมะเร็ง ปากมดลูก/มดลูก/"
                        size="sm"
                        radius="sm"
                      />
                      <h1 className="text-sm text-gray-600 dark:text-default-400">
                        จะต้องเข้าการรักษาด้วยการใส่น้ำเเร่
                      </h1>
                    </div>
                  </div>
                </section>

                {/* 💬 ส่วนคำอธิบาย */}
                <section className="light:border light:border-gray-200 rounded-2xl p-6 bg-white shadow-sm dark:bg-[#181818] space-y-4">
                  <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4 dark:text-white">
                    <span className="w-1 h-5 bg-neutral-600 rounded-full"></span>
                    รายละเอียดการรักษา
                  </h2>
                  <div className="space-y-1 text-sm leading-6 text-gray-600 dark:text-white">
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
                <section className="light:border light:border-gray-200 rounded-2xl p-6 bg-white shadow-sm dark:bg-[#181818] space-y-4">
                  <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4 dark:text-white">
                    <span className="w-1 h-5 bg-neutral-600 rounded-full"></span>
                    การลงชื่อและพยาน
                  </h2>
                  <div className="rounded-xl light:border light:border-gray-200 bg-[#f9f9f9] p-6 space-y-3 shadow-sm dark:bg-[#1f1e1e]">
                    <span className="block font-medium text-gray-700 dark:text-white text-sm">
                      ผู้ให้ข้อมูล แพทย์ / พยาบาล
                    </span>
                    <span className="block text-sm text-gray-600 dark:text-white">
                      ลงชื่อ.........................
                    </span>
                    <span className="block text-sm text-gray-600 dark:text-white">
                      (.............ชื่อ..............)
                    </span>
                  </div>
                </section>
              </ModalBody>

              <ModalFooter>
                <Button color="default" variant="flat" sonPress={closeForm3}>
                  ปิด
                </Button>
                <Button
                  onPress={closeForm3}
                  className="bg-neutral-900 text-white dark:bg-neutral-800 dark:hover:bg-neutral-700"
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
