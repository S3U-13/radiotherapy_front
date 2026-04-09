"use client";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import React, { useEffect, useRef, useState } from "react";
import { useApiRequest } from "@/hooks/useApi";
import { addToast } from "@heroui/toast";
import { useAuth } from "@/context/AuthContext";

export default function useHook({
  closeForm2,
  patFormData,
  form,
  setSignature,
  setSignature2,
  setSignature3,
  setNurseSignature,
}) {
  const { user } = useAuth();
  const { fetchChoice, Relation } = useApiRequest();
  const didFetch = useRef(false); // 🔑 flag ป้องกันเบิ้ล
  const [choice, setChoice] = useState([]);
  const [relation, setRelation] = useState([]);
  const [openSign01, setOpenSign01] = useState(false);
  const [openSign02, setOpenSign02] = useState(false);
  const [openSign03, setOpenSign03] = useState(false);
  const [openSign04, setOpenSign04] = useState(false);

  useEffect(() => {
    if (didFetch.current) return; // check flag ก่อน
    didFetch.current = true;
    fetchChoice()
      .then((data) => setChoice(data || []))
      .catch(console.error);
    Relation()
      .then((data) => setRelation(data || []))
      .catch(console.error);
  }, [fetchChoice]);

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
      patFormData?.data_form?.patient_contact?.name ?? "",
    );
    form.setFieldValue(
      "relation",
      String(patFormData?.data_form?.patient_contact?.relation) ?? "",
    );
    form.setFieldValue("disease", patFormData?.data_form?.form?.disease ?? "");

    const signMap = [
      {
        value: patFormData?.data_form?.patientsign?.patient_sign,
        setState: setSignature,
        field: "patient_sign",
      },
      {
        value: patFormData?.data_form?.witnesssign?.witness_sign,
        setState: setSignature2,
        field: "witness_sign",
      },
      {
        value: patFormData?.data_form?.staffsign?.staff_sign,
        setState: setSignature3,
        field: "staff_sign",
      },
      {
        value: patFormData?.data_form?.nursesign?.nurse_sign,
        setState: setNurseSignature,
        field: "nurse_sign",
      },
    ];

    signMap.forEach(({ value, setState, field }) => {
      if (value) {
        setState(value);
        form.setFieldValue(field, value);
      }
    });
  }, [patFormData]);

  const pat_name = patFormData?.data_pat?.pat
    ? `${patFormData?.data_pat?.pat?.prename}${patFormData?.data_pat?.pat?.firstname} ${patFormData?.data_pat?.pat?.lastname}`
    : "";

  const handleCloseModal = () => {
    closeForm2();
    form.reset();
    setSignature(null);
    setSignature2(null);
    setSignature3(null);
    setNurseSignature(null);
  };

  return {
    openSign01,
    openSign02,
    openSign03,
    openSign04,
    setOpenSign01,
    setOpenSign02,
    setOpenSign03,
    setOpenSign04,
    choice,
    pat_name,
    handleCloseModal,
    relation,
    user,
  };
}
