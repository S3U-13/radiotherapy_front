"use client";
import { addToast } from "@heroui/toast";
import React, { useEffect, useRef, useState } from "react";

export default function useHook({ onSave, isOpen, onClose }) {
  const sigRef = useRef(null);
  const [signatureData, setSignatureData] = useState(null);

  const handleClear = () => {
    sigRef.current.clear();
    setSignatureData(null);
  };

  useEffect(() => {
    if (!isOpen || !sigRef.current) return;

    const canvas = sigRef.current.getCanvas();
    const ctx = canvas.getContext("2d");

    const ratio = window.devicePixelRatio || 1;
    const displayWidth = canvas.offsetWidth;
    const displayHeight = canvas.offsetHeight;

    canvas.width = displayWidth * ratio;
    canvas.height = displayHeight * ratio;
    canvas.style.width = displayWidth + "px";
    canvas.style.height = displayHeight + "px";

    ctx.scale(ratio, ratio);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#000";
    ctx.imageSmoothingEnabled = false; // ✅ ปิดการเบลอโดย browser

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDraw = (e) => {
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      lastX = e.clientX - rect.left;
      lastY = e.clientY - rect.top;
    };

    let lastWidth = 1.5; // เก็บความหนาเส้นก่อนหน้า (เริ่มต้นกลางๆ)

    const draw = (e) => {
      if (!isDrawing) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 🔹 อ่านแรงกด (ถ้าไม่มีใช้ 0.5)
      const pressure = e.pressure || 0.5;

      // 🔹 คำนวณความหนาเป้าหมาย (min 0.5px → max 5px)
      const targetWidth = 0.5 + pressure * 5;

      // 🔹 ปรับความหนาแบบ smooth (lerp)
      const smoothing = 0.2; // ค่ามาก = ปรับไว ค่าน้อย = ลื่นขึ้น
      const newWidth = lastWidth + (targetWidth - lastWidth) * smoothing;

      ctx.lineWidth = newWidth;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();

      lastX = x;
      lastY = y;
      lastWidth = newWidth; // เก็บไว้ใช้ในรอบต่อไป
    };

    const stopDraw = () => {
      isDrawing = false;
    };

    canvas.addEventListener("pointerdown", startDraw);
    canvas.addEventListener("pointermove", draw);
    canvas.addEventListener("pointerup", stopDraw);
    canvas.addEventListener("pointerleave", stopDraw);

    return () => {
      canvas.removeEventListener("pointerdown", startDraw);
      canvas.removeEventListener("pointermove", draw);
      canvas.removeEventListener("pointerup", stopDraw);
      canvas.removeEventListener("pointerleave", stopDraw);
    };
  }, [isOpen]);

  const handleSave = () => {
    if (!sigRef.current) return;

    const canvas = sigRef.current.getCanvas();
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    const imgData = ctx.getImageData(0, 0, w, h);
    const pixels = imgData.data;

    let minX = w,
      minY = h,
      maxX = 0,
      maxY = 0;
    let hasInk = false;

    // 🔍 หาพื้นที่ที่มีเส้น
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4 + 3; // alpha
        if (pixels[idx] > 0) {
          hasInk = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (!hasInk) {
      // alert("กรุณาเซ็นก่อนบันทึก");
      addToast({
        title: "เตือน",
        description: "กรุณาเซ็นก่อนบันทึก",
        color: "warning",
        variant: "solid",
      });
      return;
    }

    const cropWidth = maxX - minX;
    const cropHeight = maxY - minY;

    // ✂️ ครอปลายเซ็น
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = cropWidth;
    croppedCanvas.height = cropHeight;
    croppedCanvas
      .getContext("2d")
      .drawImage(
        canvas,
        minX,
        minY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

    // 🧭 จัดลายเซ็นให้อยู่ตรงกลาง canvas ใหม่
    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = w;
    finalCanvas.height = h;
    const finalCtx = finalCanvas.getContext("2d");
    const offsetX = (w - cropWidth) / 2;
    const offsetY = (h - cropHeight) / 2;
    finalCtx.drawImage(croppedCanvas, offsetX, offsetY);

    // 📸 export PNG ชัดสุด
    const dataUrl = finalCanvas.toDataURL("image/png", 1.0);

    setSignatureData(dataUrl);
    onSave(dataUrl);
    onClose();
  };
  return {
    sigRef,
    signatureData,
    setSignatureData,
    handleClear,
    handleSave,
  };
}
