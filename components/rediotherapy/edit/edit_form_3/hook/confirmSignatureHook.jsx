"use client";
import React, { useState, useCallback } from "react";
import { useApiRequest } from "@/hooks/useApi";
import { useWarn } from "@/context/WarnContext";

export default function useConfirmSignature() {
  const { confirmSignModal } = useApiRequest();
  const { loadAll } = useWarn();

  const [signatureData, setSignatureData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [field, setField] = useState({
    userid: null,
    doctorid: null,
    role: "",
  });

  // ✅ memo ลด re-render
  const handleConfirmSignature = useCallback(
    async (confirmValue) => {
      try {
        // 🔥 validate ก่อนยิง
        if (!confirmValue) {
          console.warn("❗ confirmation missing");
          return;
        }

        if (!field.role) {
          console.warn("❗ role missing");
          return;
        }

        setLoading(true);

        const payload = {
          ...field,
          confirmation: confirmValue,
        };

        const res = await confirmSignModal(payload);

        // ✅ เอาเฉพาะ signature
        setSignatureData({
          ...(res || {}),
          type: field.role, // inject field.role so Disallow 'N' knows which role to clear
          signature: res?.signature || null,
        });

        // ✅ refresh warn
        loadAll();
        return true;
      } catch (error) {
        console.error("❌ confirmSignature error:", error);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [field, confirmSignModal, loadAll],
  );

  return {
    handleConfirmSignature,
    setField,
    setSignatureData,
    field,
    signatureData,
    loading, // 🔥 ใช้ disable ปุ่มได้
  };
}
