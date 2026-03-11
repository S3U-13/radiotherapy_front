"use client";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import React from "react";
import useHook from "./useHook";
import SignatureCanvas from "react-signature-canvas";

export default function page({ isOpen, onClose, modalRefSign, onSave }) {
  const { sigRef, signatureData, setSignatureData, handleClear, handleSave } =
    useHook({ onSave, isOpen, onClose });

  return (
    <div>
      <Modal
        classNames={{
          header:
            "border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900",
          body: "bg-neutral-50 dark:bg-neutral-950 py-6 space-y-4",
          footer:
            "border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex justify-between items-center",
        }}
        isOpen={isOpen}
        onOpenChange={onClose}
        placement="center"
        backdrop="blur"
        radius="lg"
        size="2xl"
      >
        <ModalContent ref={modalRefSign}>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-100">
                  ลงลายมือชื่อผู้ป่วย
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Patient Signature
                </p>
              </ModalHeader>

              <ModalBody>
                {/* Mode */}
                <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg w-fit">
                  <Button
                    size="sm"
                    radius="md"
                    className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-sm"
                  >
                    วาดลายเซ็น
                  </Button>

                  <Button
                    size="sm"
                    radius="md"
                    variant="light"
                    className="text-neutral-600 dark:text-neutral-300"
                  >
                    อัปโหลดรูปภาพ
                  </Button>
                </div>

                {/* Signature Area */}
                <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 shadow-inner overflow-hidden">
                  <SignatureCanvas
                    ref={sigRef}
                    penColor="black"
                    minWidth={0.8}
                    maxWidth={2.5}
                    velocityFilterWeight={0.6}
                    canvasProps={{
                      width: 1000,
                      height: 600,
                      className: "w-full h-[220px] cursor-crosshair",
                    }}
                  />
                </div>

                {/* Label */}
                <div className="text-center text-xs text-neutral-400 dark:text-neutral-500">
                  ลงลายมือชื่อผู้ป่วย / Patient Signature
                </div>

                {/* Description */}
                <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                  โปรดลงลายมือชื่อของท่านภายในพื้นที่ที่กำหนด
                  เพื่อยืนยันความถูกต้องของข้อมูล
                  และแสดงความยินยอมตามแบบฟอร์มของโรงพยาบาล
                  ลายมือชื่อของท่านจะถูกจัดเก็บในระบบเวชระเบียนอิเล็กทรอนิกส์
                  เพื่อใช้เป็นหลักฐานทางการแพทย์
                </p>
              </ModalBody>

              <ModalFooter>
                <Button
                  size="sm"
                  variant="flat"
                  className="text-neutral-600 dark:text-neutral-300"
                  onPress={handleClear}
                >
                  ล้างลายเซ็น
                </Button>

                <Button
                  size="sm"
                  className="bg-neutral-900 text-white hover:bg-neutral-800 
                     dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
                  onPress={handleSave}
                >
                  บันทึกลายเซ็น
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
