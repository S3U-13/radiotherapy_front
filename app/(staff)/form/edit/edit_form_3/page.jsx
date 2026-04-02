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
import useHook from "./hook/useHook";
import Sign01 from "./patient_signature/page";
import Sign02 from "./staff_signature/page";
import Sign03 from "./witness_signature/page";
import Sign04 from "./nurse_signature/page";
import { Edit3 } from "@deemlol/next-icons";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import fieldAndHandleHook from "./hook/fieldAndHandleHook";
import { Image } from "@heroui/image";
import { Select, SelectItem } from "@heroui/select";

export default function page({
  openForm3,
  closeForm3,
  modalRef,
  patFormData,
  selectIdForm,
  fetchData,
}) {
  const {
    form,
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
  } = fieldAndHandleHook({ closeForm3, selectIdForm, fetchData });
  const {
    openSign01,
    openSign02,
    openSign03,
    openSign04,
    setOpenSign01,
    setOpenSign02,
    setOpenSign03,
    setOpenSign04,
    choice,
    pat_name,
    handleCloseModal,
    relation,
  } = useHook({
    closeForm3,
    patFormData,
    form,
    setSignature,
    setSignature2,
    setSignature3,
    setNurseSignature,
  });

  return (
    <div>
      <Modal
        size="5xl"
        isOpen={openForm3}
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
          {(closeForm3) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <ModalHeader className="flex flex-col items-center gap-1 text-center text-lg font-semibold text-gray-800 dark:text-white">
                <h1>ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการใส่เเร่</h1>
                <h1>โรงพยาบาลพระปกเกล้า</h1>
              </ModalHeader>

              <ModalBody className="space-y-4 text-gray-700 dark:text-gray-300">
                <section className="bg-white dark:bg-[#181818] light:border light:border-gray-200  rounded-2xl shadow-md p-6 space-y-5 text-sm text-gray-700 dark:text-gray-300">
                  <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
                    <span className="w-1 h-5 bg-neutral-600 rounded-full"></span>
                    ข้อมูลผู้ยินยอม
                  </h2>
                  <div className="flex justify-end ">
                    <DatePicker
                      className="w-2/7"
                      label="วันที่"
                      size="sm"
                      radius="sm"
                      labelPlacement="outside-left"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 gap-y-3 border-t border-gray-200 dark:border-divider pt-4">
                    <form.Field name="name">
                      {(field) => (
                        <Input
                          className="col-span-3"
                          label="ข้าพเจ้า ชื่อ"
                          size="sm"
                          radius="sm"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>

                    <div className="flex items-center gap-2 col-span-3">
                      <form.Field name="relation">
                        {(field) => (
                          <Select
                            label="มีความสัมพันธ์เป็น"
                            size="sm"
                            radius="sm"
                            className="max-w-xs"
                            selectedKeys={
                              field.state.value ? [field.state.value] : []
                            }
                            onSelectionChange={(keys) => {
                              const value = Array.from(keys)[0];
                              field.handleChange(value);
                            }}
                          >
                            {relation?.map((item) => (
                              <SelectItem key={String(item.lookupid)}>
                                {item.lookupname}
                              </SelectItem>
                            ))}
                          </Select>
                        )}
                      </form.Field>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        เกี่ยวข้องกับผู้ป่วย
                      </p>
                    </div>

                    <Input
                      className="col-span-2"
                      label="ชื่อ"
                      size="sm"
                      radius="sm"
                      readOnly
                      value={pat_name}
                    />
                    <div className="col-span-4 flex items-center gap-2">
                      <form.Field name="disease">
                        {(field) => (
                          <Input
                            className="max-w-xs"
                            label="เจ็บป่วยด้วยโรคมะเร็ง ปากมดลูก/มดลูก/"
                            size="sm"
                            radius="sm"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        )}
                      </form.Field>

                      <h1 className="text-sm text-gray-600 dark:text-gray-400">
                        จะต้องเข้าการรักษาด้วยการใส่น้ำเเร่
                      </h1>
                    </div>
                  </div>
                </section>

                {/* 💬 ส่วนคำอธิบาย */}
                <section className="bg-white dark:bg-[#181818] light:border light:border-gray-200  rounded-2xl shadow-md p-6 space-y-5 text-sm text-gray-700 dark:text-gray-300">
                  <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
                    <span className="w-1 h-5 bg-neutral-600 rounded-full"></span>
                    รายละเอียดการรักษา
                  </h2>
                  <div className="space-y-1 text-sm leading-6">
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

                  <form.Field name="consent">
                    {(field) => (
                      <RadioGroup
                        orientation="horizontal"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      >
                        {choice
                          .filter((ch) => ch.option_group_id === 5)
                          .map((c) => (
                            <Radio size="sm" key={c.id} value={String(c.id)}>
                              <p className="text-sm">{c.name}</p>
                            </Radio>
                          ))}
                      </RadioGroup>
                    )}
                  </form.Field>
                </section>

                {/* SECTION 4: ลายเซ็นและพยาน */}
                <section className="bg-white dark:bg-[#181818] light:border light:border-gray-200  rounded-2xl shadow-md p-6 space-y-5 text-sm text-gray-700 dark:text-gray-300">
                  <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
                    <span className="w-1 h-6 bg-neutral-600 rounded-full"></span>
                    การลงชื่อและพยาน
                  </h2>

                  <div className="space-y-4">
                    {/* ผู้ให้ข้อมูล */}
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
                          <span className="text-gray-400">
                            ........................
                          </span>
                        )}
                      </div>

                      <span className="text-sm text-gray-500 dark:text-white">
                        (ชื่อแพทย์)
                      </span>
                    </div>

                    {/* ผู้รับข้อมูล */}
                    <div className="p-6 rounded-xl bg-[#f9f9f9] light:border light:border-gray-200   dark:bg-[#1f1e1e] space-y-3">
                      <h3 className="font-medium text-gray-800 dark:text-gray-100">
                        ผู้ให้คำยินยอม / ผู้ป่วย
                      </h3>
                      <div className="flex flex-wrap gap-3 items-center">
                        <span className="flex items-center gap-2">
                          ลงชื่อ{" "}
                          {!signature ? (
                            <span className="italic text-gray-400">
                              .............................
                            </span>
                          ) : (
                            <Image
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
                      <div className="grid sm:grid-cols-2 gap-2 w-140 items-center pr-6">
                        <Input
                          size="sm"
                          radius="sm"
                          labelPlacement="outside-left"
                          label="ชื่อ"
                          className="max-w-sm"
                          type="text"
                        />
                        <h1>ผู้ป่วย หรือ ผู้เเทนโดยชอบธรรมด้วยกฏหมาย</h1>
                      </div>
                    </div>

                    {/* พยานฝ่ายผู้ป่วย */}
                    <div className="p-6 rounded-xl bg-[#f9f9f9] light:border light:border-gray-200 dark:bg-[#1f1e1e] space-y-3">
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
                            <Image
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

                      <Input
                        size="sm"
                        radius="sm"
                        labelPlacement="outside-left"
                        label="ชื่อ"
                        className="max-w-sm"
                        type="text"
                      />

                      <CheckboxGroup orientation="horizontal">
                        {choice
                          .filter((ch) => ch.option_group_id === 6)
                          .map((c) => (
                            <Checkbox size="sm" key={c.id} value={c.id}>
                              <p className="text-sm">{c.name}</p>
                            </Checkbox>
                          ))}
                      </CheckboxGroup>
                    </div>

                    {/* พยานฝ่ายเจ้าหน้าที่ */}
                    <div className="p-6 rounded-xl bg-[#f9f9f9] light:border light:border-gray-200   dark:bg-[#1f1e1e] space-y-3">
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
                            <Image
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
                          size="sm"
                          radius="sm"
                          labelPlacement="outside-left"
                          label="ชื่อ"
                          type="text"
                        />
                        <Input
                          size="sm"
                          radius="sm"
                          labelPlacement="outside-left"
                          label="ตำแหน่ง"
                          type="text"
                        />
                      </div>
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
                            <Image
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
                  type="submit"
                  className="bg-neutral-900 text-white dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                  บันทึก
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
