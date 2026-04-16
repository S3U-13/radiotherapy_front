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
import React, { useContext, useEffect, useState } from "react";

import { Info, PenSquare } from "lucide-react";
import useHook from "./hook/useHook";
import Sign01 from "./patient_signature/page";
import Sign02 from "./staff_signature/page";
import Sign03 from "./witness_signature/page";
import Sign04 from "./nurse_signature/page";
import { Edit3 } from "@deemlol/next-icons";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import fieldAndHandleHook from "./hook/fieldAndHandleHook";
import { Select, SelectItem } from "@heroui/select";
import { Image } from "@heroui/image";
import useConfirmSignature from "./hook/confirmSignatureHook";

export default function page({
  openForm2,
  closeForm2,
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
    setSignature,
    setSignature2,
    modalRefSign,
    handleSaveSignature,
    handleSaveSignature2,
    handleSaveSignature3,
    handleSaveSignature4,
  } = fieldAndHandleHook({ closeForm2, selectIdForm, fetchData });
  const {
    handleConfirmSignature,
    setField,
    signatureData,
    setSignatureData,
    loading: confirmLoading,
  } = useConfirmSignature();

  const [staffSign, setStaffSign] = useState(null);
  const [nurseSign, setNurseSign] = useState(null);
  const [doctorSign, setDoctorSign] = useState(null);

  useEffect(() => {
    setDoctorSign(patFormData?.data_form?.doctorsign?.doctor_sign || null);
    setStaffSign(patFormData?.data_form?.staffsign?.staff_sign || null);
    setNurseSign(patFormData?.data_form?.nursesign?.nurse_sign || null);
  }, [patFormData]);

  useEffect(() => {
    if (signatureData && signatureData.type) {
      if (signatureData.type === "doctor") {
        setDoctorSign(signatureData.signature || null);
      } else if (signatureData.type === "staff") {
        setStaffSign(signatureData.signature || null);
      } else if (signatureData.type === "nurse") {
        setNurseSign(signatureData.signature || null);
      }
    }
  }, [signatureData]);

  useEffect(() => {
    if (!openForm2 && setSignatureData) {
      setSignatureData(null);
    }
  }, [openForm2, setSignatureData]);

  const [confirmSignModal, setConfirmSignModal] = useState({
    isOpen: false,
    role: null,
  });

  const handleApproveSignature = async (confirmValue) => {
    const success = await handleConfirmSignature(confirmValue);
    if (success) {
      setConfirmSignModal({ isOpen: false, role: null });
      if (typeof fetchData === "function") {
        fetchData();
      }
    }
  };

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
    user,
  } = useHook({
    closeForm2,
    patFormData,
    form,
    setSignature,
    setSignature2,
    openForm2,
  });

  const getFieldNameByRole = (role) => {
    const map = {
      staff: "staff_sign_id",
      nurse: "nurse_sign_id",
      doctor: "doctor_sign_id",
    };
    return map[role] || "";
  };

  useEffect(() => {
    if (signatureData && user?.role) {
      const fieldName = getFieldNameByRole(user.role);

      if (fieldName) {
        form.setFieldValue(fieldName, signatureData.id);
      }
    }
    if (user?.role === "staff") {
      form.setFieldValue("staff_posid", user.PosID);
    }
  }, [signatureData, user?.role]);

  const fieldName = getFieldNameByRole(user?.role);
  return (
    <div>
      <Modal
        size="5xl"
        isOpen={openForm2}
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
                            onPress={() => {
                              setField({
                                userid: user?.userid,
                                doctorid:
                                  patFormData?.data_form?.form?.doctor_id,
                                role: "doctor",
                              });
                              setConfirmSignModal({
                                isOpen: true,
                                role: "doctor",
                              });
                            }}
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
                          placeholder="ระบุชื่อแพทย์"
                          value={
                            patFormData?.data_form?.doctor_user?.person_name ??
                            ""
                          }
                          classNames={{
                            inputWrapper:
                              "shadow-none border border-gray-200/80 dark:border-neutral-700/80 bg-gray-50/50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-800",
                          }}
                          isReadOnly
                        />
                        <div className="flex-shrink-0 flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">
                            ลงลายมือชื่อ
                          </span>
                          {!doctorSign ? (
                            <div className="w-[180px] h-[50px] rounded-lg border-2 border-dashed border-gray-300 dark:border-neutral-700 flex items-center justify-center text-gray-400 dark:text-neutral-500 text-xs bg-gray-50 dark:bg-neutral-800/30">
                              รอการลงนาม
                            </div>
                          ) : (
                            <Image
                              src={doctorSign}
                              alt="signature"
                              className="border border-gray-200 dark:border-neutral-700 rounded-lg shadow-sm w-[180px] h-[50px] object-contain bg-white dark:bg-transparent"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ผู้รับข้อมูล */}
                    <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#131317]/50 p-5 sm:p-6 space-y-4 shadow-sm hover:border-gray-300 dark:hover:border-neutral-700 transition-all relative">
                      <div className="pb-3 border-b border-gray-100 dark:border-neutral-800/80 flex items-center justify-between">
                        <span className="font-semibold text-gray-800 dark:text-gray-200 text-[15px] flex items-center gap-2 border-b-0 pb-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                          ผู้รับข้อมูล ผู้ป่วย หรือ ผู้เเทนโดยชอบธรรมด้วยกฎหมาย
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

                    {/* พยานฝ่ายผู้ป่วย */}
                    <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#131317]/50 p-5 sm:p-6 space-y-4 shadow-sm hover:border-gray-300 dark:hover:border-neutral-700 transition-all relative">
                      <div className="pb-3 border-b border-gray-100 dark:border-neutral-800/80 flex items-center justify-between">
                        <span className="font-semibold text-gray-800 dark:text-gray-200 text-[15px] flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                          พยานฝ่ายผู้ป่วย
                        </span>
                      </div>
                      <CheckboxGroup orientation="horizontal" className="mb-2">
                        {choice
                          .filter((ch) => ch.choice_type_id === 5)
                          .map((c) => (
                            <Checkbox
                              size="sm"
                              key={c.id}
                              value={c.id}
                              classNames={{ label: "text-sm" }}
                            >
                              {c.choice_name}
                            </Checkbox>
                          ))}
                      </CheckboxGroup>
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
                              alt="signature2"
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

                    {/* พยานฝ่ายเจ้าหน้าที่ */}
                    <div className="rounded-xl border border-gray-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#131317]/50 p-5 sm:p-6 space-y-4 shadow-sm hover:border-gray-300 dark:hover:border-neutral-700 transition-all relative">
                      <div className="pb-3 border-b border-gray-100 dark:border-neutral-800/80 flex items-center justify-between">
                        <span className="font-semibold text-gray-800 dark:text-gray-200 text-[15px] flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                          พยานฝ่ายเจ้าหน้าที่
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
                            onPress={() => {
                              setField({
                                userid: user?.userid,
                                doctorid: null,
                                role: "staff",
                              });
                              setConfirmSignModal({
                                isOpen: true,
                                role: "staff",
                              });
                            }}
                          >
                            ตรวจสอบ
                          </Button>
                        </div>
                      )}
                      <div className="flex flex-col xl:flex-row gap-4 xl:gap-6 items-start xl:items-center justify-between">
                        <div className="grid sm:grid-cols-2 gap-3 w-full max-w-[500px]">
                          <Input
                            size="sm"
                            radius="sm"
                            label="ชื่อ-สกุล"
                            labelPlacement="outside-left"
                            placeholder="ระบุชื่อ-นามสกุล"
                            value={
                              patFormData?.data_form?.staff_user[0]
                                ?.person_name ?? ""
                            }
                            classNames={{
                              inputWrapper:
                                "shadow-none border border-gray-200/80 dark:border-neutral-700/80 bg-gray-50/50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-800",
                            }}
                            isReadOnly
                          />
                          <Input
                            size="sm"
                            radius="sm"
                            label="ตำแหน่ง"
                            labelPlacement="outside-left"
                            value={
                              patFormData?.data_form?.staff_user[0]?.position ??
                              ""
                            }
                            placeholder="ระบุตำแหน่ง"
                            classNames={{
                              inputWrapper:
                                "shadow-none border border-gray-200/80 dark:border-neutral-700/80 bg-gray-50/50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-800",
                            }}
                            isReadOnly
                          />
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">
                            ลงลายมือชื่อ
                          </span>
                          {!staffSign ? (
                            <div className="w-[180px] h-[50px] rounded-lg border-2 border-dashed border-gray-300 dark:border-neutral-700 flex items-center justify-center text-gray-400 dark:text-neutral-500 text-xs bg-gray-50 dark:bg-neutral-800/30">
                              รอการลงนาม
                            </div>
                          ) : (
                            <img
                              src={staffSign}
                              alt="signature3"
                              className="border border-gray-200 dark:border-neutral-700 rounded-lg shadow-sm w-[180px] h-[50px] object-contain bg-white dark:bg-transparent"
                            />
                          )}
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
                            onPress={() => {
                              setField({
                                userid: user?.userid,
                                doctorid: null,
                                role: "nurse",
                              });
                              setConfirmSignModal({
                                isOpen: true,
                                role: "nurse",
                              });
                            }}
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
                          {!nurseSign ? (
                            <div className="w-[180px] h-[50px] rounded-lg border-2 border-dashed border-gray-300 dark:border-neutral-700 flex items-center justify-center text-gray-400 dark:text-neutral-500 text-xs bg-gray-50 dark:bg-neutral-800/30">
                              รอการลงนาม
                            </div>
                          ) : (
                            <img
                              src={nurseSign}
                              alt="nurse_signature"
                              className="border border-gray-200 dark:border-neutral-700 rounded-lg shadow-sm w-[180px] h-[50px] object-contain bg-white dark:bg-transparent"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <form.Field name={fieldName}>
                      {(field) => (
                        <Input
                          type="hidden"
                          value={field.state.value ?? ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
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
                            onPress={() => handleApproveSignature("N")}
                            isDisabled={confirmLoading}
                          >
                            ไม่อนุญาต
                          </Button>
                          <Button
                            className="font-medium flex-1 shadow-sm bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                            onPress={() => handleApproveSignature("Y")}
                            isLoading={confirmLoading}
                          >
                            อนุญาต
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </ModalBody>

              {/* Footer */}
              <ModalFooter className="dark:bg-[#181818] rounded-b-2xl flex justify-end gap-3 py-4">
                <Button
                  variant="flat"
                  color="default"
                  onPress={handleCloseModal}
                >
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
