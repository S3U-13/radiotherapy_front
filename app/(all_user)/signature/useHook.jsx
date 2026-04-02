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
    
    // Check dark mode
    const isDark = document.documentElement.classList.contains("dark");
    ctx.strokeStyle = isDark ? "#fff" : "#000";
    
    ctx.imageSmoothingEnabled = false;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDraw = (e) => {
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      lastX = e.clientX - rect.left;
      lastY = e.clientY - rect.top;
    };

    let lastWidth = 1.5;

    const draw = (e) => {
      if (!isDrawing) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const pressure = e.pressure || 0.5;
      const targetWidth = 0.5 + pressure * 5;
      const smoothing = 0.2;
      const newWidth = lastWidth + (targetWidth - lastWidth) * smoothing;

      ctx.lineWidth = newWidth;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();

      lastX = x;
      lastY = y;
      lastWidth = newWidth;
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

    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = w;
    finalCanvas.height = h;
    const finalCtx = finalCanvas.getContext("2d");
    const offsetX = (w - cropWidth) / 2;
    const offsetY = (h - cropHeight) / 2;
    finalCtx.drawImage(croppedCanvas, offsetX, offsetY);

    const dataUrl = finalCanvas.toDataURL("image/png", 1.0);

    setSignatureData(dataUrl);
    if (onSave) onSave(dataUrl);
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
