"use client";
import { useApiRequest } from "@/hooks/useApi";
import React, { useState } from "react";

export default function previewPDFHook() {
  const { previewPDF } = useApiRequest();
  const [modalPreviewPDF, setModalPreviewPDF] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handlePreviewPDF = async (id) => {
    try {
      setLoading(true);

      const data = await previewPDF(id);

      if (data instanceof Blob) {
        const url = URL.createObjectURL(data);
        setPdfUrl(url); // 👈 ต้องมี
        setModalPreviewPDF(true); // 👈 เปิด modal
      } else {
        console.error("Not a blob:", data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { handlePreviewPDF, modalPreviewPDF, setModalPreviewPDF, pdfUrl };
}
