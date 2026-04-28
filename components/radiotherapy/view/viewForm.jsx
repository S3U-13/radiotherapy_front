"use client";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import React, { useEffect } from "react";
import useHook from "./useHook";
import { formTypeHeaderMap } from "@/components/form-config/formTypeHeaderMap";
import FormRenderer from "@/components/renderer/FormViewRenderer";

export default function ViewForm({
  isOpen,
  onClose,
  formId,
  setFormId,
  formTypeId,
  setFormTypeId,
  refresh,
}) {
  const { choice, patient, patientContact, formDataObj } = useHook({
    onClose,
    formId,
    setFormId,
    setFormTypeId,
    refresh,
  });

  const header = formTypeHeaderMap[formTypeId];

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
            <>
              <ModalHeader className="flex flex-col items-center gap-1 text-center text-lg font-semibold text-gray-800 dark:text-white">
                {header ? header : null}
              </ModalHeader>

              <ModalBody className="space-y-6 text-gray-800">
                <FormRenderer
                  formId={formId}
                  formTypeId={formTypeId}
                  choice={choice}
                  pat={patient}
                  pat_contact={patientContact}
                  form_data={formDataObj}
                />
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
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
