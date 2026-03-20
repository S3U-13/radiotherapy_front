"use client";
import { useEffect, useState } from "react";
import { useApiRequest } from "@/hooks/useApi";

export default function useHook({ formId }) {
  const { DataFormById, fetchChoice } = useApiRequest();
  const [formData, setFormData] = useState(null);
  const [choice, setChoice] = useState([]);

  useEffect(() => {
    if (!formId) return;

    const fetchAll = async () => {
      try {
        const [form, choice] = await Promise.all([
          DataFormById(formId),
          fetchChoice(),
        ]);

        setFormData(form);
        setChoice(choice);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAll();
  }, [formId]);

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

  const patient = {
    hn: formData?.data_pat?.pat?.hn ?? "",
    name: `${formData?.data_pat?.pat?.prename ?? ""}${
      formData?.data_pat?.pat?.firstname ?? ""
    } ${formData?.data_pat?.pat?.lastname ?? ""}`,
    age: formData?.data_pat?.pat?.birthdatetime
      ? calculateAge(formData.data_pat.pat.birthdatetime)
      : "",
    weight: formData?.data_pat?.pat_vitalsign?.weight ?? "",
    disease: formData?.data_form?.form?.disease ?? "-",
  };

  const patientContact = {
    name: formData?.data_form?.patient_contact?.name ?? "-",
    relation: formData?.data_form?.patient_contact?.relation_name ?? "-",
  };

  const formDataObj = {
    consent: formData?.data_form?.form?.consent ?? null,
    congenital_disease: formData?.data_form?.congenital_disease ?? [],
    contrast_allergy_id:
      formData?.data_form?.contrast_allergy_status?.contrast_allergy_id ?? "-",
    contrast_allergy_symptom:
      formData?.data_form?.contrast_allergy_status?.contrast_allergy_symptom ??
      "-",
    contrast_history_id:
      formData?.data_form?.contrast_history_status?.contrast_history_id ?? null,
    drug_allergy_id:
      formData?.data_form?.drug_allergy_status?.drug_allergy_id ?? null,
    drug: formData?.data_form?.drug_allergy_status?.drug ?? "-",
    seafood_allergy_id:
      formData?.data_form?.seafood_allergy_status?.seafood_allergy_id ?? null,
    seafood_allergy_symptom:
      formData?.data_form?.seafood_allergy_status?.seafood_allergy_symptom ??
      "-",
    pat_sign: formData?.data_form?.patientsign?.patient_sign ?? null,
    witness_sign: formData?.data_form?.witnesssign?.witness_sign ?? null,
    staff_sign: formData?.data_form?.staffsign?.staff_sign ?? null,
    nurse_sign: formData?.data_form?.nursesign?.nurse_sign ?? null,
    doctor_sign: formData?.data_form?.doctorsign?.doctor_sign ?? null,
  };

  return {
    choice,
    patient,
    patientContact,
    formDataObj,
  };
}
