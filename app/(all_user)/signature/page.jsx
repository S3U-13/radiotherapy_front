"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Copy, Edit, UserPen } from "lucide-react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import SignatureCanvas from "react-signature-canvas";
import useHook from "./useHook";
import { useAuth } from "@/context/AuthContext";
import { useApiRequest } from "@/hooks/useApi";

export default function SignaturePage() {
  const { user } = useAuth();
  const { getSignature } = useApiRequest();
  const [isOpen, setIsOpen] = useState(false);
  const [savedSignature, setSavedSignature] = useState(null);
  const [savedNote, setSavedNote] = useState("");
  const [savedDateTime, setSavedDateTime] = useState("");

  const full_name = user?.person_name;
  const position = user?.position;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) return dateString; // Fallback if already formatted
    const formatted = dateObj.toLocaleString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return formatted;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSignature();
        if (data && data.signature) {
          setSavedSignature(data.signature);
          setSavedNote(data.note || "");
          setSavedDateTime(formatDate(data.signature_date));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSaveSignature = (dataUrl, note) => {
    setSavedSignature(dataUrl);
    setSavedNote(note);

    // Set edit datetime
    const now = new Date();
    const formatted = now.toLocaleString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setSavedDateTime(formatted);
  };

  return (
    <div className="w-full h-full shadow-sm rounded-2xl p-6 md:p-6 bg-white dark:bg-[#131317] flex flex-col lg:flex-row gap-8 xl:gap-10 border border-transparent dark:border-neutral-800/50">
      {/* ---------------- Left Section: Display Data ---------------- */}
      <div className="lg:w-[40%] w-full flex flex-col">
        {/* Title */}
        <div className="text-left mb-6">
          <h1 className="text-3xl font-semibold mb-2 flex items-center gap-2">
            <UserPen className="w-8 h-8 text-neutral-800 dark:text-white" />
            ข้อมูลลายเซ็น
          </h1>
          <p className="text-default-500 text-sm">
            แสดงรายละเอียดข้อมูลผู้ใช้งานและลายเซ็นปัจจุบัน
          </p>
        </div>

        {/* Display Info */}
        <div className="flex flex-col gap-6 mt-4 flex-1">
          <div className="flex flex-col gap-1 border-b border-gray-100 dark:border-neutral-800/50 pb-4">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              ชื่อ - นามสกุล
            </span>
            <span className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
              {full_name}
            </span>
          </div>

          <div className="flex flex-col gap-1 border-b border-gray-100 dark:border-neutral-800/50 pb-4">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              ตำแหน่ง
            </span>
            <span className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
              {position}
            </span>
          </div>

          <div className="flex flex-col gap-1 border-b border-gray-100 dark:border-neutral-800/50 pb-4">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              อัปเดตล่าสุด (Edit DateTime)
            </span>
            <span className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
              {savedDateTime ? savedDateTime : "-"}
            </span>
          </div>

          <div className="flex flex-col gap-1 border-b border-gray-100 dark:border-neutral-800/50 pb-4 mt-2">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              โน้ตลายเซ็น (Note)
            </span>
            <span className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
              {savedNote ? savedNote : "-"}
            </span>
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                ลายเซ็น (Signature)
              </span>
            </div>

            {savedSignature ? (
              <div className="border border-gray-200 dark:border-neutral-800/50 rounded-xl p-4 bg-gray-50/50 dark:bg-[#18181B]/50 flex justify-center items-center h-[240px] relative overflow-hidden group">
                <img
                  src={savedSignature}
                  alt="User Signature"
                  className="max-h-full max-w-full object-contain filter dark:invert"
                />
                <div className="absolute inset-0 bg-white/40 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                  <Button
                    size="sm"
                    startContent={<Edit size={16} />}
                    onPress={handleOpen}
                    className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white shadow-sm border border-neutral-200 dark:border-neutral-700"
                  >
                    แก้ไขลายเซ็น
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 dark:border-neutral-700/50 rounded-xl p-4 bg-gray-50/50 dark:bg-[#18181B]/50 flex flex-col justify-center items-center h-[240px] text-neutral-400">
                <UserPen className="w-10 h-10 mb-3 text-neutral-300 dark:text-neutral-600" />
                <p className="text-sm font-medium">ยังไม่มีลายเซ็นในระบบ</p>
                <p className="text-xs mt-1 text-center max-w-[200px]">
                  กรุณาเพิ่มลายเซ็นของคุณที่ฝั่งด้านขวาหรือกดปุ่มแก้ไข
                </p>
              </div>
            )}
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-3 italic">
              * ลายเซ็นของ user
            </p>
          </div>
        </div>
      </div>

      {/* ---------------- Divider ---------------- */}
      <div className="hidden lg:block w-px bg-gray-100 dark:bg-neutral-800/80 my-2 shadow-[1px_0_0_0_rgba(0,0,0,0.02)]"></div>
      <div className="block lg:hidden h-px bg-gray-100 dark:bg-neutral-800/80 mx-2"></div>

      {/* ---------------- Right Section: Add/Edit Data ---------------- */}
      <div className="lg:w-[60%] w-full flex flex-col">
        {/* Header */}
        <div className="text-left mb-6">
          <h1 className="text-3xl font-semibold mb-2">เพิ่ม / จัดการลายเซ็น</h1>
          <p className="text-default-500 text-sm">
            ลงลายมือชื่อของคุณเพื่อใช้ในระบบเอกสาร
          </p>
        </div>

        {/* Action Panel */}
        <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-neutral-800/50 bg-gray-50/50 dark:bg-[#18181B]/50 flex flex-col justify-center items-center h-full min-h-[400px] relative">
          <div
            className="absolute inset-0 pattern-dots opacity-50 dark:opacity-20 flex"
            style={{
              backgroundImage: "radial-gradient(#d4d4d8 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          ></div>

          <div className="flex flex-col items-center text-center gap-5 max-w-sm relative z-10 p-8 rounded-2xl bg-white/80 dark:bg-[#18181B]/80 backdrop-blur-sm border border-white/50 dark:border-neutral-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
            <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shadow-inner">
              <Edit className="w-8 h-8 text-neutral-700 dark:text-neutral-300" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                {savedSignature ? "อัปเดตลายเซ็นของคุณ" : "สร้างลายเซ็นใหม่"}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                คุณสามารถวาดลายเซ็นหรืออัปโหลดลายเซ็นของคุณ
                เพื่อใช้สำหรับการอนุมัติและยืนยันเอกสารต่างๆ ภายในระบบ
              </p>
            </div>

            <Button
              className="mt-4 bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300 font-medium px-8 py-6 w-full shadow-md"
              radius="md"
              onPress={handleOpen}
              startContent={<UserPen className="w-5 h-5" />}
            >
              {savedSignature ? "แก้ไขลายเซ็น" : "เพิ่มลายเซ็น"}
            </Button>
          </div>
        </div>
      </div>

      {/* Signature Modal */}
      <SignatureModal
        isOpen={isOpen}
        onClose={handleClose}
        onSave={handleSaveSignature}
        initialSignature={savedSignature}
        initialNote={savedNote}
      />
    </div>
  );
}

function SignatureModal({
  isOpen,
  onClose,
  onSave,
  initialSignature,
  initialNote,
}) {
  const { sigRef, handleClear, handleSave, note, setNote } = useHook({
    onSave,
    isOpen,
    onClose,
    initialSignature,
    initialNote,
  });

  return (
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
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-100">
                ลงลายมือชื่อของท่าน
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                User Signature
              </p>
            </ModalHeader>

            <ModalBody>
              {/* Mode */}
              <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg w-fit">
                <Button
                  size="sm"
                  radius="md"
                  className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-sm font-medium"
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
              <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 shadow-inner overflow-hidden relative group">
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
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    isIconOnly
                    variant="flat"
                    radius="full"
                    onPress={handleClear}
                    className="bg-neutral-200/50 dark:bg-neutral-800/50 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400"
                  >
                    <Copy size={14} className="rotate-90" />
                  </Button>
                </div>
              </div>

              {/* Label */}
              <div className="text-center text-xs font-medium text-neutral-500 dark:text-neutral-400 mt-1">
                ลงลายมือชื่อ / Signature
              </div>

              {/* Note Input */}
              <div className="flex flex-col gap-2 mt-4 px-1">
                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                  โน้ตลายเซ็น (Optional)
                </span>
                <Input
                  placeholder="เช่น ใช้สำหรับเอกสารทั่วไป"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  classNames={{
                    inputWrapper:
                      "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-sm",
                  }}
                />
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 text-center px-4 mt-2">
                โปรดลงลายมือชื่อของท่านภายในพื้นที่ที่กำหนด เพื่อยืนยันตัวตน
                ระบบจะทำการบันทึกลายเซ็นของท่านในการใช้งานต่างๆ ต่อไป
              </p>
            </ModalBody>

            <ModalFooter>
              <Button
                size="sm"
                variant="flat"
                className="text-neutral-600 dark:text-neutral-300 font-medium"
                onPress={handleClear}
              >
                ล้างลายเซ็น
              </Button>

              <Button
                size="sm"
                className="bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300 font-medium"
                onPress={handleSave}
              >
                บันทึกลายเซ็น
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
