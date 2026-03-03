"use client";
import React, { useEffect, useRef, useState } from "react";
import { useApiRequest } from "../../../../hooks/useApi";

export default function useHook() {
  const { fetchChoice } = useApiRequest();
  const didFetch = useRef(false); // 🔑 flag ป้องกันเบิ้ล
  const modalRefSign = useRef(null);
  const [choice, setChoice] = useState([]);
  const [openSign01, setOpenSign01] = useState(false);
  const [openSign02, setOpenSign02] = useState(false);
  const [openSign03, setOpenSign03] = useState(false);
  const [signature, setSignature] = useState(null);
  const [signature2, setSignature2] = useState(null);
  const [signature3, setSignature3] = useState(null);

  const openModal = () => {
    setOpenSign01((prev) => !prev);
    setOpenSign02((prev) => !prev);
    setOpenSign03((prev) => !prev);
  };

  const handleSaveSignature = (dataUrl) => {
    setSignature(dataUrl);
    console.log("📜 ลายเซ็น:", dataUrl);
    // 👉 สามารถ fetch ไป backend ได้ เช่น:
    // await fetch('/api/upload-signature', { method: 'POST', body: JSON.stringify({ signature: dataUrl }) })
  };
  const handleSaveSignature2 = (dataUrl) => {
    setSignature2(dataUrl);
    console.log("📜 ลายเซ็น:", dataUrl);
    // 👉 สามารถ fetch ไป backend ได้ เช่น:
    // await fetch('/api/upload-signature', { method: 'POST', body: JSON.stringify({ signature: dataUrl }) })
  };
  const handleSaveSignature3 = (dataUrl) => {
    setSignature3(dataUrl);
    console.log("📜 ลายเซ็น:", dataUrl);
    // 👉 สามารถ fetch ไป backend ได้ เช่น:
    // await fetch('/api/upload-signature', { method: 'POST', body: JSON.stringify({ signature: dataUrl }) })
  };

  useEffect(() => {
    if (didFetch.current) return; // check flag ก่อน
    didFetch.current = true;
    fetchChoice()
      .then((data) => setChoice(data || []))
      .catch(console.error);
  }, [fetchChoice]);

  console.log(choice)

  const [field, setField] = useState({
    form_type_code: "",
    hn: "",
    consent: "",
    allergy: "",
    asthma: "",
    kidney_disease: "",
    diabetes: "",
    heart_disease: "",
    contrast_before: "",
    contrast_allergy: "",
    contrast_allergy_detail: "",
    seafood_allergy: "",
    seafood_allergy_detail: "",
    drug_allergy: "",
    drug_allergy_detail: "",
    lmp: null,
  });

  return {
    modalRefSign,
    openSign01,
    openSign02,
    openSign03,
    setOpenSign01,
    setOpenSign02,
    setOpenSign03,
    signature,
    signature2,
    signature3,
    handleSaveSignature,
    handleSaveSignature2,
    handleSaveSignature3,
    choice,
    field,
    setField,
  };
}
