"use client";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import React, { useEffect, useRef, useState } from "react";
import { useApiRequest } from "@/hooks/useApi";
import { addToast } from "@heroui/toast";

export default function useHook({ closeForm2, selectForm }) {
  const { SearchHn, DoctorCreateForm } = useApiRequest();
  const [hnInput, setHnInput] = useState("");
  const [pat, setPat] = useState(null);
  const modalRefSign = useRef(null);
  const [openSign01, setOpenSign01] = useState(false);
  const [openSign02, setOpenSign02] = useState(false);
  const [openSign03, setOpenSign03] = useState(false);
  const [signature, setSignature] = useState(null);

  const openModal = () => {
    setOpenSign01((prev) => !prev);
    setOpenSign02((prev) => !prev);
    setOpenSign03((prev) => !prev);
  };

  const handleSearchHn = async () => {
    if (!hnInput) {
      addToast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกหมายเลข HN ก่อนทำการค้นหา",
        color: "warning",
        variant: "flat",
        radius: "lg",
      });
      return;
    }

    try {
      const data = await SearchHn(hnInput, form, setPat);

      if (data) {
        addToast({
          title: "ค้นหาสำเร็จ",
          description: "ค้นหาข้อมูลผู้ป่วยสำเร็จ",
          color: "success",
          variant: "flat",
          radius: "lg",
        });
      } else {
        addToast({
          title: "ไม่พบข้อมูล",
          description: "ไม่พบข้อมูลผู้ป่วยจากหมายเลข HN ที่ระบุ",
          color: "warning",
          variant: "flat",
          radius: "lg",
        });
      }
    } catch (error) {
      addToast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถค้นหาข้อมูล HN ได้ กรุณาลองใหม่อีกครั้ง",
        color: "danger",
        variant: "flat",
        radius: "lg",
      });
    }
  };

  const initialField = () => ({
    form_type_id: null,
    pat_name: "",
    hn: null,
    pat_age: "",
    doctor_sign: "",
  });

  const [field, setField] = useState(initialField());

  const defaultValues = initialField();

  const validationSchema = z.object({
    form_type_id: z.number().nullable(),
    hn: z.coerce.number().nullable(),
    doctor_sign: z.string().optional(),
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setField((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (value) => {
    if (isSubmitting) return;
    if (!value.hn) {
      addToast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกหมายเลข HN ก่อนบันทึกข้อมูล",
        color: "warning",
        variant: "flat",
        radius: "lg",
      });
      return;
    }
    try {
      setIsSubmitting(true);
      const data = await DoctorCreateForm(value);

      if (data) {
        addToast({
          title: "Success",
          description: "Successfully Create Form",
          color: "success",
          variant: "flat",
          radius: "lg",
        });
        form.reset();
        setHnInput("");
        setSignature(null);
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
        description: "error",
        color: "danger",
        variant: "flat",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const form = useForm({
    defaultValues,
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
    validators: {
      onSubmit: validationSchema,
    },
    onSubmitInvalid: ({ formApi }) => {
      // console.log("❌ validation ไม่ผ่าน");
      console.dir(formApi.state.errors, { depth: null });
    },
  });

  const handleSaveSignature = (dataUrl) => {
    setSignature(dataUrl);
    form.setFieldValue("doctor_sign", dataUrl);
    // console.log("📜 ลายเซ็น:", dataUrl);
    // 👉 สามารถ fetch ไป backend ได้ เช่น:
    // await fetch('/api/upload-signature', { method: 'POST', body: JSON.stringify({ signature: dataUrl }) })
  };

  useEffect(() => {
    if (selectForm) {
      form.setFieldValue("form_type_id", selectForm);
    }
  }, [selectForm]);

  return {
    modalRefSign,
    openSign01,
    openSign02,
    openSign03,
    setOpenSign01,
    setOpenSign02,
    setOpenSign03,
    signature,
    handleSaveSignature,
    hnInput,
    setHnInput,
    handleSearchHn,
    form,
    handleSubmit,
    isSubmitting,
  };
}
