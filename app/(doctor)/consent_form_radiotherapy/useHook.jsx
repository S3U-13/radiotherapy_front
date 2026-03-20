"use client";
import React, { useEffect, useRef, useState } from "react";
import { useApiRequest } from "@/hooks/useApi";
import { formComponentMap } from "@/components/form-config/formComponentMap";

export default function useHook() {
  const { fetchForm, FormList } = useApiRequest();
  const didFetch = useRef(false); // 🔑 flag ป้องกันเบิ้ล
  const modalRef = useRef(null);
  const [modalForm1, setModalForm1] = useState(false);
  const [modalForm2, setModalForm2] = useState(false);
  const [modalForm3, setModalForm3] = useState(false);

  //modal view
  const [modalViewForm, setModalViewForm] = useState(false);
  // set state form id and form type id
  const [formId, setFormId] = useState(null);
  const [formTypeId, setFormTypeId] = useState(null);

  const [form, setForm] = useState([]);
  const [formList, setFormList] = useState([]);

  const [selectForm, setSelectForm] = useState("");
  const openForm1 = () => {
    setModalForm1((prev) => !prev);
  };
  const openForm2 = () => {
    setModalForm2((prev) => !prev);
  };
  const openForm3 = () => {
    setModalForm3((prev) => !prev);
  };
  useEffect(() => {
    if (didFetch.current) return; // check flag ก่อน
    didFetch.current = true;
    fetchForm()
      .then((data) => setForm(data || []))
      .catch(console.error);
    FormList()
      .then((data) => setFormList(data || []))
      .catch(console.error);
  }, [fetchForm, FormList]);

  const statusStyle = {
    Pending: "bg-[#ffedd5] text-[#d97706]",
    Saved: "bg-blue-100 text-blue-500",
    Success: "bg-green-100 text-green-700",
    Cancel: "bg-red-100 text-red-600",
  };

  const FormByFormId = {
    1: setModalForm1,
    2: setModalForm2,
    3: setModalForm3,
  };

  //handle select form id and form type id

  const handleOpenView = async (form_id, form_type_id) => {
    if (!form_id || !form_type_id) return;
    try {
      await formComponentMap[form_type_id]?.();

      setFormId(form_id);
      setFormTypeId(form_type_id);
      setModalViewForm(true);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    modalRef,
    modalForm1,
    setModalForm1,
    modalForm2,
    setModalForm2,
    modalForm3,
    setModalForm3,
    form,
    selectForm,
    setSelectForm,
    formList,
    statusStyle,
    FormByFormId,
    FormList,
    setFormList,
    // mockData,
    //modalView by type id
    modalViewForm,
    setModalViewForm,
    //set state form id and form type id
    formId,
    setFormId,
    formTypeId,
    setFormTypeId,
    //handle open view
    handleOpenView,
  };
}
