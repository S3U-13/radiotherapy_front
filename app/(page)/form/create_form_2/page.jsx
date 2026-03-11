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
import Sign01 from "./signature01/page";
import Sign02 from "./signature02/page";
import Sign03 from "./signature03/page";
import { Edit3 } from "@deemlol/next-icons";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";

export default function page({
  openForm2,
  closeForm2,
  modalRef,
  patFormData,
  selectIdForm,
  fetchData,
}) {
  const {
    modalRefSign,
    openSign01,
    openSign02,
    openSign03,
    setOpenSign01,
    setOpenSign02,
    setOpenSign03,
    signature,
    signature2,
    signature3,
    handleSaveSignature,
    handleSaveSignature2,
    handleSaveSignature3,
    choice,
    pat_name,
    form,
    isSubmitting,
  } = useHook({ closeForm2, patFormData, selectIdForm, fetchData });
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
                {/* SECTION 1: ข้อมูลทั่วไป */}
                <section className="bg-white dark:bg-[#181818] light:border light:border-gray-200 rounded-2xl shadow-sm p-5 space-y-4 ">
                  <h2 className="text-gray-700 dark:text-white font-semibold text-base flex items-center gap-2 mb-4">
                    <span className="w-1 h-5 bg-neutral-600 rounded-full"></span>
                    ข้อมูลทั่วไปของผู้ป่วย
                  </h2>
                  <div className="flex justify-end ">
                    <DatePicker
                      className="w-2/7"
                      label="วันที่"
                      size="md"
                      radius="sm"
                      labelPlacement="outside-left"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-6 gap-3 border-t border-gray-200 dark:border-divider pt-4">
                    <form.Field name="name">
                      {(field) => (
                        <Input
                          className="col-span-3"
                          label="ข้าพเจ้า ชื่อ"
                          size="sm"
                          radius="sm"
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>

                    <div className="flex items-center gap-2 col-span-3">
                      <form.Field name="relation">
                        {(field) => (
                          <Input
                            label="มีความสัมพันธ์เป็น"
                            size="sm"
                            radius="sm"
                            className="max-w-xs"
                            value={field.state.value || ""}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        )}
                      </form.Field>

                      <span className="text-sm text-gray-600 dark:text-white">
                        เกี่ยวข้องกับผู้ป่วย
                      </span>
                    </div>

                    <Input
                      className="col-span-2"
                      label="ชื่อ"
                      value={pat_name}
                      size="sm"
                      radius="sm"
                      readOnly
                    />
                    <div className="col-span-4 flex items-center gap-2">
                      <form.Field name="disease">
                        {(field) => (
                          <Input
                            label="เจ็บป่วยด้วยโรค"
                            size="sm"
                            radius="sm"
                            className="max-w-xs"
                            value={field.state.value || ""}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        )}
                      </form.Field>

                      <h1 className="col-span-6 text-center text-sm text-gray-600 dark:text-white">
                        จะต้องเข้ารักษาด้วยการฉายรังสี
                      </h1>
                    </div>
                  </div>
                </section>

                {/* SECTION 2: คำอธิบาย */}
                <section className="bg-white dark:bg-[#181818] light:border light:border-gray-200  rounded-2xl shadow-sm p-5 space-y-3 leading-relaxed text-justify">
                  <h2 className="text-gray-700 dark:text-white font-semibold text-base flex items-center gap-2 mb-4">
                    <span className="w-1 h-5 bg-neutral-600 rounded-full"></span>
                    คำอธิบายเกี่ยวกับการรักษา
                  </h2>

                  <div className="space-y-1 text-sm leading-6 pr-6">
                    <p className="indent-8 text-justify">
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

                {/* SECTION 3: การยินยอม */}
                <section className="bg-white dark:bg-[#181818] light:border light:border-gray-200  rounded-2xl shadow-sm p-5 space-y-4">
                  <h2 className="text-gray-700 dark:text-white font-semibold text-base flex items-center gap-2 mb-1">
                    <span className="w-1 h-5 bg-neutral-600 rounded-full"></span>
                    การยินยอมเข้ารับการรักษา
                  </h2>
                  <form.Field name="consent">
                    {(field) => (
                      <RadioGroup
                        orientation="vertical"
                        className="mt-3"
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                      >
                        {choice
                          .filter((ch) => ch.option_group_id === 5)
                          .map((c, index) => (
                            <div key={c.id}>
                              <Radio
                                size="sm"
                                className="pl-8"
                                value={String(c.id)}
                              >
                                <p className="text-sm pl-2">{c.name}</p>
                              </Radio>
                            </div>
                          ))}
                      </RadioGroup>
                    )}
                  </form.Field>
                </section>

                {/* SECTION 4: ลายเซ็นและพยาน */}
                <section className="bg-white dark:bg-[#181818] light:border light:border-gray-200  rounded-2xl shadow-md p-6 space-y-5 text-sm text-gray-700 dark:text-gray-300">
                  <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
                    <span className="w-1 h-6 bg-neutral-600 rounded-full"></span>
                    ลายเซ็นและพยาน
                  </h2>

                  <div className="space-y-4">
                    {/* ผู้ให้ข้อมูล */}
                    <div className="p-6 rounded-xl light:border light:border-gray-200   dark:bg-[#1f1e1e] space-y-2">
                      <h3 className="font-medium text-gray-800 dark:text-gray-100">
                        ผู้ให้ข้อมูล แพทย์ / พยาบาล
                      </h3>
                      <p>
                        ลงชื่อ....................................................
                      </p>
                      <p>(..............................................)</p>
                    </div>

                    {/* ผู้รับข้อมูล */}
                    <div className="p-6 rounded-xl light:border light:border-gray-200   dark:bg-[#1f1e1e] space-y-3">
                      <h3 className="font-medium text-gray-800 dark:text-gray-100">
                        ผู้รับข้อมูล ผู้ป่วย หรือ ผู้เเทนโดยชอบธรรมด้วยกฎหมาย
                      </h3>
                      <div className="flex flex-wrap gap-3 items-center">
                        <span className="flex items-center gap-2">
                          ลงชื่อ{" "}
                          {!signature ? (
                            <span className="italic text-gray-400">
                              .............................
                            </span>
                          ) : (
                            <img
                              src={signature}
                              alt="signature"
                              className="border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm w-[200px] h-[55px] object-contain bg-white"
                            />
                          )}
                        </span>
                        <Button
                          size="sm"
                          className="bg-neutral-900 text-white dark:bg-neutral-800 dark:hover:bg-neutral-700"
                          variant="flat"
                          isIconOnly
                          onPress={() => setOpenSign01(true)}
                        >
                          <Edit3 className="size-5" />
                        </Button>
                      </div>

                      <Input
                        size="md"
                        radius="sm"
                        labelPlacement="outside-left"
                        label="ชื่อ"
                        className="max-w-sm"
                        type="text"
                      />
                    </div>

                    {/* พยานฝ่ายผู้ป่วย */}
                    <div className="p-6 rounded-xl light:border light:border-gray-200   dark:bg-[#1f1e1e] space-y-3">
                      <h3 className="font-medium text-gray-800 dark:text-gray-100">
                        พยานฝ่ายผู้ป่วย
                      </h3>

                      <div className="flex flex-wrap gap-3 items-center">
                        <span className="flex items-center gap-2">
                          ลงชื่อ{" "}
                          {!signature2 ? (
                            <span className="italic text-gray-400">
                              .............................
                            </span>
                          ) : (
                            <img
                              src={signature2}
                              alt="signature2"
                              className="border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm w-[200px] h-[55px] object-contain bg-white"
                            />
                          )}
                        </span>
                        <Button
                          size="sm"
                          className="bg-neutral-900 text-white dark:bg-neutral-800 dark:hover:bg-neutral-700"
                          variant="flat"
                          isIconOnly
                          onPress={() => setOpenSign02(true)}
                        >
                          <Edit3 className="size-5" />
                        </Button>
                      </div>

                      {/* <form.Field>
                        {(field) => ( */}
                      <CheckboxGroup orientation="horizontal">
                        {choice
                          .filter((ch) => ch.choice_type_id === 5)
                          .map((c) => (
                            <Checkbox size="sm" key={c.id} value={c.id}>
                              <p className="text-sm">{c.choice_name}</p>
                            </Checkbox>
                          ))}
                      </CheckboxGroup>
                      {/* )}
                      </form.Field> */}

                      <Input
                        size="md"
                        radius="sm"
                        labelPlacement="outside-left"
                        label="ชื่อ"
                        className="max-w-sm"
                        type="text"
                      />
                    </div>

                    {/* พยานฝ่ายเจ้าหน้าที่ */}
                    <div className="p-6 rounded-xl light:border light:border-gray-200  dark:bg-[#1f1e1e] space-y-3">
                      <h3 className="font-medium text-gray-800 dark:text-gray-100">
                        พยานฝ่ายเจ้าหน้าที่
                      </h3>

                      <div className="flex flex-wrap gap-3 items-center">
                        <span className="flex items-center gap-2">
                          ลงชื่อ{" "}
                          {!signature3 ? (
                            <span className="italic text-gray-400">
                              .............................
                            </span>
                          ) : (
                            <img
                              src={signature3}
                              alt="signature3"
                              className="border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm w-[200px] h-[55px] object-contain bg-white"
                            />
                          )}
                        </span>
                        <Button
                          size="sm"
                          className="bg-neutral-900 text-white dark:bg-neutral-800 dark:hover:bg-neutral-700"
                          variant="flat"
                          isIconOnly
                          onPress={() => setOpenSign03(true)}
                        >
                          <Edit3 className="size-5" />
                        </Button>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-2 max-w-lg">
                        <Input
                          size="md"
                          radius="sm"
                          labelPlacement="outside-left"
                          label="ชื่อ"
                          type="text"
                        />
                        <Input
                          size="md"
                          radius="sm"
                          labelPlacement="outside-left"
                          label="ตำแหน่ง"
                          type="text"
                        />
                      </div>
                    </div>
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
              </ModalBody>

              {/* Footer */}
              <ModalFooter className="dark:bg-[#181818] rounded-b-2xl flex justify-end gap-3 py-4">
                <Button variant="flat" color="default" onPress={closeForm2}>
                  ปิด
                </Button>
                <Button
                  className="bg-neutral-900 text-white dark:bg-neutral-800 dark:hover:bg-neutral-700"
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
