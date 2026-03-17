"use client";

import React, { useEffect, useRef, useState } from "react";
import { useApiRequest } from "@/hooks/useApi";

export default function useHook({
  closeForm1,
  patFormData,
  form,
  setSelectedDisease,
  setSignature,
  setSignature2,
  setSignature3,
  setNurseSignature,
}) {
  const { fetchChoice, prenameApi, Relation } = useApiRequest();
  const didFetch = useRef(false); // 🔑 flag ป้องกันเบิ้ล
  const [choice, setChoice] = useState([]);
  const [prename, setPrename] = useState([]);
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
    prenameApi()
      .then((data) => setPrename(data || []))
      .catch(console.error);
    Relation()
      .then((data) => setRelation(data || []))
      .catch(console.error);
  }, [fetchChoice, prenameApi, Relation]);

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
      String(patFormData?.data_form?.patient_contacts?.relation) ?? "",
    );

    //set sign
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

  const handleCloseModal = () => {
    closeForm1();
    form.reset();
    setSignature(null);
    setSignature2(null);
    setSignature3(null);
    setNurseSignature(null);
  };

  return {
    choice,
    //pat data and object
    pat_name,
    pat_age,
    pat_weight,
    //handleDisease
    prename,
    handleCloseModal,
    openSign01,
    openSign02,
    openSign03,
    openSign04,
    setOpenSign01,
    setOpenSign02,
    setOpenSign03,
    setOpenSign04,
    relation,
  };
}
