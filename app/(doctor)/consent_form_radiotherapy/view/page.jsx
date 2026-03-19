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

export default function page({
  isOpen,
  onClose,
  formId,
  setFormId,
  formTypeId,
  setFormTypeId,
}) {
  const {} = useHook({ onClose, formId, setFormId, formTypeId, setFormTypeId });
  return (
    <div>
      <Modal
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onClose}
        classNames={{
          body: "max-h-[calc(80vh-145px)] overflow-y-scroll py-6 bg-[#f1f1f1] dark:bg-[#1f1e1e]",
          header: "border-b border-divider py-6 bg-[#e6e6e6] dark:bg-[#181818]",
          footer: "border-t border-divider bg-[#e6e6e6] dark:bg-[#181818]",
          base: "dark:border dark:border-divider",
        }}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
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
                <div>
                  form id: {formId} form type id: {formTypeId}
                </div>
              </ModalBody>

              <ModalFooter>
                <Button variant="flat" color="default" onPress={onClose}>
                  ปิด
                </Button>
                {/* <Button
                  className="bg-neutral-900 text-white dark:bg-neutral-800 dark:hover:bg-neutral-700"
                  // onPress={closeForm1}
                  type="submit"
                  isDisabled={isSubmitting}
                >
                  {isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
                </Button> */}
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
