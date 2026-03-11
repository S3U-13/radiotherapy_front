"use client";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import React, { useEffect, useRef, useState } from "react";
import { useApiRequest } from "@/hooks/useApi";
import { addToast } from "@heroui/toast";

export default function useHook({ patFormData, closeForm1, selectIdForm }) {
  const { fetchChoice, PatFillOutForm, prenameApi } = useApiRequest();
  const didFetch = useRef(false); // 🔑 flag ป้องกันเบิ้ล
  const modalRefSign = useRef(null);
  const [choice, setChoice] = useState([]);
  const [openSign01, setOpenSign01] = useState(false);
  const [openSign02, setOpenSign02] = useState(false);
  const [openSign03, setOpenSign03] = useState(false);
  const [signature, setSignature] = useState(null);
  const [signature2, setSignature2] = useState(null);
  const [signature3, setSignature3] = useState(null);
  const [prename, setPrename] = useState([]);

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
    prenameApi()
      .then((data) => setPrename(data || []))
      .catch(console.error);
  }, [fetchChoice, prenameApi]);

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
    staff_position: "",
    staff_sign: "",
    staff_sign_date: null,
    doctor_id: null,
    doctor_sign: "",
    doctor_sign_date: null,
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
    staff_sign: z.string().optional(),
    staff_sign_date: z.string().nullable(),
    doctor_id: z.number().nullable(),
    doctor_sign: z.string().optional(),
    doctor_sign_date: z.string().nullable(),
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

  // set field value
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
    // congenital disease
    const disease = patFormData?.data_form?.congenital_disease ?? [];
    if (!Array.isArray(disease)) return;
    // data checkbox
    setSelectedDisease(disease.map((i) => i.condition_id));
    form.setFieldValue(
      "contrast_history_id",
      String(
        patFormData?.data_form?.contrast_history_status?.contrast_history_id,
      ) ?? null,
    );
    form.setFieldValue(
      "contrast_allergy_id",
      String(
        patFormData?.data_form?.contrast_allergy_status?.contrast_allergy_id,
      ) ?? null,
    );
    form.setFieldValue(
      "contrast_allergy_symptom",
      patFormData?.data_form?.contrast_allergy_status
        ?.contrast_allergy_symptom ?? "",
    );
    form.setFieldValue(
      "seafood_allergy_id",
      String(
        patFormData?.data_form?.seafood_allergy_status?.seafood_allergy_id,
      ) ?? null,
    );
    form.setFieldValue(
      "seafood_allergy_symptom",
      patFormData?.data_form?.seafood_allergy_status?.seafood_allergy_symptom ??
        "",
    );
    form.setFieldValue(
      "drug_allergy_id",
      String(patFormData?.data_form?.drug_allergy_status?.drug_allergy_id) ??
        null,
    );
    form.setFieldValue(
      "drug",
      patFormData?.data_form?.drug_allergy_status?.drug ?? "",
    );
    form.setFieldValue(
      "name",
      patFormData?.data_form?.patient_contacts?.name ?? "",
    );
    form.setFieldValue(
      "relation",
      patFormData?.data_form?.patient_contacts?.relation ?? "",
    );
  }, [patFormData]);

  // service
  const calculateAge = (birthdate) => {
    if (!birthdate) return "";

    const birth = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    // ถ้ายังไม่ถึงวันเกิดของปีนี้ ให้ลบ 1
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return `${age}`;
  };

  // pat data object
  const pat_name = patFormData?.data_pat?.pat
    ? `${patFormData?.data_pat?.pat?.prename}${patFormData?.data_pat?.pat?.firstname} ${patFormData?.data_pat?.pat?.lastname}`
    : "";

  const pat_age = patFormData?.data_pat?.pat
    ? calculateAge(patFormData?.data_pat?.pat?.birthdatetime)
    : "";

  const pat_weight = patFormData?.data_pat?.pat
    ? patFormData?.data_pat?.pat_vitalsign?.weight
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
    form,
    //pat data and object
    pat_name,
    pat_age,
    pat_weight,
    //handleDisease
    selectedDisease,
    handleChangeDisease,
    prename,
    isSubmitting,
  };
}
