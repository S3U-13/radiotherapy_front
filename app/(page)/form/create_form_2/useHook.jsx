"use client";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import React, { useEffect, useRef, useState } from "react";
import { useApiRequest } from "@/hooks/useApi";
import { addToast } from "@heroui/toast";

export default function useHook({ closeForm2, patFormData, selectIdForm }) {
  const { fetchChoice } = useApiRequest();
  const didFetch = useRef(false); // 🔑 flag ป้องกันเบิ้ล
  const modalRefSign = useRef(null);
  const [openSign01, setOpenSign01] = useState(false);
  const [openSign02, setOpenSign02] = useState(false);
  const [openSign03, setOpenSign03] = useState(false);
  const [signature, setSignature] = useState(null);
  const [signature2, setSignature2] = useState(null);
  const [signature3, setSignature3] = useState(null);

  const [choice, setChoice] = useState([]);

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

  const Field = () => ({
    form_type_id: null,
    hn: null,
    disease: "",
    lmp: null,
    consent: null,
    name: "",
    relation: "",
  });

  const defaultValues = Field();

  const validationSchema = z.object({
    form_type_id: z.number().nullable(),
    hn: z.number().nullable(),
    disease: z.string().optional(),
    lmp: z.string().nullable(),
    consent: z.string().nullable(),
    name: z.string().optional(),
    relation: z.string().optional(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (value) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (!value) {
      addToast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกก่อนบันทึกข้อมูล",
        color: "warning",
        variant: "flat",
        radius: "lg",
      });
      return;
    }
    try {
      const data = await PatFillOutForm(value, selectIdForm);

      if (data) {
        addToast({
          title: "Success",
          description: "Successfully Create Form",
          color: "success",
          variant: "flat",
          radius: "lg",
        });
        form.reset();
        closeForm2();
      } else if (!data) {
        addToast({
          title: "Fails",
          description: "Failed Create Form",
          color: "danger",
          variant: "flat",
          radius: "lg",
        });
      }
    } catch (error) {
      addToast({
        title: "error",
        description: error.message,
        color: "danger",
        variant: "flat",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const form = useForm({
    defaultValues,

    validators: {
      onSubmit: validationSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        const validatedData = validationSchema.parse(value);
        await handleSubmit(validatedData);
      } catch (error) {
        console.error("Validation or Submit error:", error);

        if (error.errors) {
          console.table(error.errors);
        }
      }
    },

    onSubmitInvalid: async ({ formApi }) => {
      console.dir(formApi.state.errors, { depth: null });
    },
  });

  useEffect(() => {
    if (!patFormData) return;

    form.setFieldValue("hn", patFormData?.data_pat?.pat?.hn ?? null);
    form.setFieldValue(
      "form_type_id",
      patFormData?.data_form?.form?.form_type_id ?? null,
    );
    form.setFieldValue(
      "consent",
      String(patFormData?.data_form?.form?.consent) ?? null,
    );
    form.setFieldValue(
      "name",
      patFormData?.data_form?.patient_contacts?.name ?? "",
    );
    form.setFieldValue(
      "relation",
      patFormData?.data_form?.patient_contacts?.relation ?? "",
    );
    form.setFieldValue("disease", patFormData?.data_form?.form?.disease ?? "");
  }, [patFormData]);

  const pat_name = patFormData?.data_pat?.pat
    ? `${patFormData?.data_pat?.pat?.prename}${patFormData?.data_pat?.pat?.firstname} ${patFormData?.data_pat?.pat?.lastname}`
    : "";

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
    pat_name,
    form,
  };
}
