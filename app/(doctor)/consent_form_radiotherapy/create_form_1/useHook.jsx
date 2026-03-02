"use client";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import React, { useRef, useState } from "react";
import { useApiRequest } from "../../../../hooks/useApi";

export default function useHook() {
  const { SearchHn } = useApiRequest();
  const modalRefSign = useRef(null);
  const [hnInput, setHnInput] = useState("");
  const [pat, setPet] = useState(null);
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
  const handleSearchHn = async () => {
    await SearchHn(hnInput, form, setPet);
  };

  const initialField = () => ({
    form_type_code: "",
    pat_name: "",
    hn: "",
    relation: "",
    diseuse: "",
  });

  const [field, setField] = useState(initialField());

  const defaultValues = initialField();

  const validationSchema = z.object({
    form_type_code: z.string().optional(),
    hn: z.coerce.number().nullable(),
    relation: z.string().optional(),
    diseuse: z.string().optional(),
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setField((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        const validatedData = validationSchema.parse(value);
        return validatedData;
      } catch (error) {
        console.error("Validation or Submit error:", error);

        if (error.errors) {
          console.table(error.errors);
        }
      }
    },
    validators: {
      onSubmit: validationSchema,
    },
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
    hnInput,
    setHnInput,
    handleSearchHn,
    field,
    setField,
    form,
    handleChange,
  };
}
