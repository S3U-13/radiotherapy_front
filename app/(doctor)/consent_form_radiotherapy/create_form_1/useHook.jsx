"use client";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import React, { useEffect, useRef, useState } from "react";
import { useApiRequest } from "@/hooks/useApi";
import { addToast } from "@heroui/toast";

export default function useHook({ closeForm1, selectForm }) {
  const { SearchHn, SearchVisit, SearchVitalsign, DoctorCreateForm } =
    useApiRequest();
  const [hnInput, setHnInput] = useState("");
  const [pat, setPat] = useState(null);
  const modalRefSign = useRef(null);
  const [openSign01, setOpenSign01] = useState(false);
  const [openSign02, setOpenSign02] = useState(false);
  const [openSign03, setOpenSign03] = useState(false);
  const [signature, setSignature] = useState(null);
  const [signature2, setSignature2] = useState(null);
  const [signature3, setSignature3] = useState(null);
  const [visitList, setVisitList] = useState([]);
  const [visitId, setVisitId] = useState("");
  const [vitalsignList, setVitalSignList] = useState([]);
  const [vitalsignId, setVitalsignId] = useState("");

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

  //field
  const initialField = () => ({
    form_type_id: null,
    pat_name: "",
    hn: null,
    visit_id: null,
    vitalsign_id: null,
    pat_age: "",
  });

  const [field, setField] = useState(initialField());

  const defaultValues = initialField();

  const validationSchema = z.object({
    form_type_id: z.number().nullable(),
    hn: z.coerce.number().nullable(),
    visit_id: z.coerce.number().nullable(),
    vitalsign_id: z.coerce.number().nullable(),
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
        setVisitList([]);
        setVisitId([]);
        setVitalSignList([]);
        setVitalsignId("");
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

  // set data and field value
  useEffect(() => {
    if (selectForm) {
      form.setFieldValue("form_type_id", selectForm);
    }
  }, [selectForm]);

  const fetchVisit = async () => {
    if (!hnInput) return;
    const data = await SearchVisit(hnInput);
    if (data) {
      setVisitList(data);
    } else {
      setVisitList(null);
    }
  };

  // service
  const formatThaiDateTime = (isoString) => {
    if (!isoString) return "";

    const date = new Date(isoString);

    // แปลงเป็นปี พ.ศ.
    const buddhistYear = date.getFullYear() + 543;

    // format วันที่ เวลา ภาษาไทย
    return (
      new Intl.DateTimeFormat("th-TH", {
        timeZone: "Asia/Bangkok",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(date) +
      " น.".replace(`${date.getFullYear() + 543}`, buddhistYear)
    );
  };

  const formatThaiDate = (isoString) => {
    if (!isoString) return "";

    const date = new Date(isoString);

    // แปลงเป็นปี พ.ศ.
    const buddhistYear = date.getFullYear() + 543;

    // format วันที่ เวลา ภาษาไทย
    return (
      new Intl.DateTimeFormat("th-TH", {
        timeZone: "Asia/Bangkok",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(date) + "".replace(`${date.getFullYear() + 543}`, buddhistYear)
    );
  };

  const handelSelectVisitId = async (id) => {
    if (!id) return;
    try {
      setVisitId(id);
      form.setFieldValue("visit_id", id);

      const data = await SearchVitalsign(id);
      if (data) {
        setVitalSignList(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handelSelectVitalsignId = async (id) => {
    if (!id) return;
    try {
      setVitalsignId(id);
      form.setFieldValue("vitalsign_id", id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("visit_id", form.getFieldValue("visit_id"));
    console.log("visit_id", visitId);
    console.log("vitalsign_list", vitalsignList);
  }, [form, visitId, vitalsignList]);

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
    handleSubmit,
    isSubmitting,
    visitList,
    fetchVisit,
    formatThaiDateTime,
    formatThaiDate,
    visitId,
    handelSelectVisitId,
    vitalsignList,
    vitalsignId,
    handelSelectVitalsignId,
  };
}
