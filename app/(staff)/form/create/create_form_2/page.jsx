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
import { Edit3, Search } from "@deemlol/next-icons";
import Sign01 from "./signature01/page";

export default function page({ openForm2, closeForm2, modalRef, selectForm }) {
  const {
    hnInput,
    setHnInput,
    handleSearchHn,
    form,
    handleSubmit,
    isSubmitting,
    modalRefSign,
    openSign01,
    setOpenSign01,
    handleSaveSignature,
    signature,
  } = useHook({ closeForm2, selectForm });
  return (
    <div>
      <Modal
        size="5xl"
        isOpen={openForm2}
        onOpenChange={closeForm2}
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
          {(closeForm2) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              {/* Header */}
              <ModalHeader className="flex flex-col items-center gap-1 text-center text-lg font-semibold text-gray-800 dark:text-white">
                <h1>ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการฉายรังสี</h1>
                <h2>โรงพยาบาลพระปกเกล้า</h2>
              </ModalHeader>

              {/* Body */}
              <ModalBody className="space-y-6">
                <Sign01
                  modalRefSign={modalRefSign}
                  isOpen={openSign01}
                  onClose={() => {
                    setOpenSign01(false);
                  }}
                  onSave={handleSaveSignature}
                />
                {/* SECTION 1: ข้อมูลทั่วไป */}
                <section className="light:border light:border-gray-200 rounded-2xl p-6 bg-white shadow-sm dark:bg-[#181818] space-y-4">
                  <div className="flex justify-between items-center">
                    {" "}
                    <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4 dark:text-white">
                      <span className="w-1 h-5 bg-neutral-600 rounded-full"></span>
                      ข้อมูลทั่วไปของผู้ป่วย
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
                    <form.Field name="hn">
                      {(field) => (
                        <Input
                          size="sm"
                          radius="sm"
                          className="col-span-2"
                          label="hn"
                          type="hidden"
                          value={field.state.value ?? ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                  </div>

                  <div className="flex justify-between items-center  ">
                    <DatePicker
                      className="w-2/7"
                      label="วันที่"
                      size="sm"
                      radius="sm"
                    />
                    <div className="flex items-center gap-2 sm:max-w-xs">
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
                        className="w-[210px]"
                      />
                      <p className="text-sm text-gray-600 dark:text-default-400">
                        เกี่ยวข้องกับผู้ป่วย
                      </p>
                    </div>

                    <form.Field name="pat_name">
                      {(field) => (
                        <Input
                          className="col-span-2"
                          label="ชื่อ"
                          size="sm"
                          radius="sm"
                          value={field.state.value ?? ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>

                    <div className="col-span-4 flex items-center gap-2">
                      <Input
                        className="w-[250px]"
                        label="เจ็บป่วยด้วยโรค"
                        size="sm"
                        radius="sm"
                      />
                      <h1 className="text-sm text-gray-600 dark:text-default-400">
                        จะต้องเข้ารักษาด้วยการฉายรังสี
                      </h1>
                    </div>
                  </div>
                </section>

                {/* SECTION 2: คำอธิบาย */}
                <section className="light:border light:border-gray-200 rounded-2xl p-6 bg-white shadow-sm dark:bg-[#181818] space-y-4">
                  <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4 dark:text-white">
                    <span className="w-1 h-5 bg-neutral-600 rounded-full"></span>
                    คำอธิบายเกี่ยวกับการรักษา
                  </h2>

                  <div className="space-y-1 text-sm leading-6 text-gray-600 dark:text-white">
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
                <section className="light:border light:border-gray-200 rounded-2xl p-6 bg-white shadow-sm dark:bg-[#181818] space-y-4">
                  <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4 dark:text-white">
                    <span className="w-1 h-5 bg-neutral-600 rounded-full"></span>
                    ลายเซ็นและพยาน
                  </h2>

                  <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#131317]/50 p-5 sm:p-6 space-y-4 shadow-sm hover:border-gray-300 dark:hover:border-neutral-700 transition-all relative">
                    <div className="pb-3 border-b border-gray-100 dark:border-neutral-800/80 flex items-center justify-between">
                      <span className="font-semibold text-gray-800 dark:text-gray-200 text-[15px] flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                        แพทย์
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
                      <Input
                        className="max-w-[300px]"
                        size="sm"
                        radius="sm"
                        placeholder="ชื่อ-นามสกุล"
                      />
                      <div className="flex items-center gap-3">
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
                </section>
              </ModalBody>

              {/* Footer */}
              <ModalFooter>
                <Button
                  variant="flat"
                  color="default"
                  radius="sm"
                  className="font-medium"
                  onPress={closeForm2}
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
