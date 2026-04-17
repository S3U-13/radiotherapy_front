"use client";
import React, { useRef, useState } from "react";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { addToast } from "@heroui/toast";
import { useApiRequest } from "@/hooks/useApi";
import { useWarn } from "@/context/WarnContext";

export default function fieldAndHandleHook({
  closeForm1,
  selectIdForm,
  fetchData,
}) {
  const { PatFillOutForm } = useApiRequest();
  const { loadAll } = useWarn();
  const modalRefSign = useRef(null);
  const [signature, setSignature] = useState(null);
  const [signature2, setSignature2] = useState(null);
  const Field = () => ({
    form_type_id: null,
    hn: null,
    disease: "",
    lmp: null,
    consent: null,
    name: "",
    relation: "",
    //array in future
    conditions: [],
    contrast_allergy_id: null,
    contrast_allergy_symptom: "",
    contrast_history_id: null,
    drug_allergy_id: null,
    drug: "",
    seafood_allergy_id: null,
    seafood_allergy_symptom: "",
    patient_sign: "",
    patient_sign_date: null,
    witness_name: "",
    witness_sign: "",
    witness_sign_date: null,
    staff_id: null,
    staff_posid: null,
    staff_sign_id: null,
    staff_sign_date: null,
    nurse_id: null,
    nurse_sign_id: null,
    nurse_sign_date: null,
    doctor_sign_id: null,
  });

  // const [field, setField] = useState(Field());

  const defaultValues = Field();

  const validationSchema = z.object({
    form_type_id: z.number().nullable(),
    hn: z.number().nullable(),
    disease: z.string().optional(),
    lmp: z.string().nullable(),
    consent: z.string().nullable(),
    name: z.string().optional(),
    relation: z.string().optional(),
    //
    contrast_history_id: z.string().nullable(),
    contrast_allergy_id: z.string().nullable(),
    contrast_allergy_symptom: z.string().optional(),
    seafood_allergy_id: z.string().nullable(),
    seafood_allergy_symptom: z.string().optional(),
    drug_allergy_id: z.string().nullable(),
    drug: z.string().optional(),
    patient_sign: z.string().optional(),
    patient_sign_date: z.string().nullable(),
    witness_sign_name: z.string().optional(),
    witness_sign: z.string().optional(),
    witness_sign_date: z.string().nullable(),
    staff_id: z.number().nullable(),
    staff_sign_id: z.number().nullable(),
    staff_sign_date: z.string().nullable(),
    nurse_id: z.number().nullable(),
    nurse_sign_id: z.number().nullable(),
    nurse_sign_date: z.string().nullable(),
    doctor_sign_id: z.number().nullable(),
    staff_posid: z.number().nullable(),
  });

  //handle and payload
  const [selectedDisease, setSelectedDisease] = useState([]);

  const handleChangeDisease = (vals) => {
    const updatedSelected = vals.map(Number);
    setSelectedDisease(updatedSelected);

    const diseaseField = selectedDisease;
    Object.entries(diseaseField).forEach(([key, value]) => {
      form.setFieldValue(key, value ?? null);
    });
  };

  const buildDiseasePayload = (selectedDisease) => {
    if (!selectedDisease?.length) return [];

    return selectedDisease.map((id) => {
      const numId = Number(id);

      const payload = {
        condition_id: numId,
      };

      return payload;
    });
  };

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
      const diseasePayload = buildDiseasePayload(selectedDisease, value);

      const payload = {
        ...value,
        congenital_diseases: diseasePayload,
      };

      const data = await PatFillOutForm(payload, selectIdForm);

      if (data) {
        addToast({
          title: "Success",
          description: "Successfully Create Form",
          color: "success",
          variant: "flat",
          radius: "lg",
        });
        form.reset();
        closeForm1();
        fetchData();
        setSelectedDisease([]);
        setSignature(null);
        setSignature2(null);
        loadAll();
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

  const handleSaveSignature = (dataUrl) => {
    setSignature(dataUrl);
    form.setFieldValue("patient_sign", dataUrl);
    // console.log("📜 ลายเซ็น:", dataUrl);
    // 👉 สามารถ fetch ไป backend ได้ เช่น:
    // await fetch('/api/upload-signature', { method: 'POST', body: JSON.stringify({ signature: dataUrl }) })
  };
  const handleSaveSignature2 = (dataUrl) => {
    setSignature2(dataUrl);
    form.setFieldValue("witness_sign", dataUrl);
    // console.log("📜 ลายเซ็น:", dataUrl);
    // 👉 สามารถ fetch ไป backend ได้ เช่น:
    // await fetch('/api/upload-signature', { method: 'POST', body: JSON.stringify({ signature: dataUrl }) })
  };
  // const handleSaveSignature3 = (dataUrl) => {
  //   setSignature3(dataUrl);
  //   form.setFieldValue("staff_sign", dataUrl);
  //   // console.log("📜 ลายเซ็น:", dataUrl);
  //   // 👉 สามารถ fetch ไป backend ได้ เช่น:
  //   // await fetch('/api/upload-signature', { method: 'POST', body: JSON.stringify({ signature: dataUrl }) })
  // };
  // const handleSaveSignature4 = (dataUrl) => {
  //   setNurseSignature(dataUrl);
  //   form.setFieldValue("nurse_sign", dataUrl);
  //   // console.log("📜 ลายเซ็น:", dataUrl);
  //   // 👉 สามารถ fetch ไป backend ได้ เช่น:
  //   // await fetch('/api/upload-signature', { method: 'POST', body: JSON.stringify({ signature: dataUrl }) })
  // };
  return {
    form,
    selectedDisease,
    setSelectedDisease,
    handleChangeDisease,
    isSubmitting,
    signature,
    signature2,

    setSignature,
    setSignature2,

    modalRefSign,
    handleSaveSignature,
    handleSaveSignature2,
  };
}
