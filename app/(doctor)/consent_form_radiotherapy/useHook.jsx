"use client";
import React, { useEffect, useRef, useState } from "react";
import { useApiRequest } from "../../../hooks/useApi";

export default function useHook() {
  const { fetchForm } = useApiRequest();
  const didFetch = useRef(false); // 🔑 flag ป้องกันเบิ้ล
  const modalRef = useRef(null);
  const [modalForm1, setModalForm1] = useState(false);
  const [modalForm2, setModalForm2] = useState(false);
  const [modalForm3, setModalForm3] = useState(false);

  const [form, setForm] = useState([]);
  console.log(form);

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
  }, [fetchForm]);

  const mockData = [
    {
      id: 1,
      hn: "6900181",
      name: "Somchai Boonmee",
      form_type:
        "หนังสืออธิบายและยินยอมให้ทำการจำลองการฉายรังสีโดยใช้รังสีเอกซเรย์และสารทึบรังสี",
      status: "Success",
    },
    {
      id: 2,
      hn: "6900182",
      name: "Pichai Sangthong",
      form_type:
        "หนังสืออธิบายและยินยอมให้ทำการจำลองการฉายรังสีโดยใช้รังสีเอกซเรย์และสารทึบรังสี",
      status: "Success",
    },
    {
      id: 3,
      hn: "6900183",
      name: "Niran Suksawat",
      form_type:
        "หนังสืออธิบายและยินยอมให้ทำการจำลองการฉายรังสีโดยใช้รังสีเอกซเรย์และสารทึบรังสี",
      status: "Success",
    },
    {
      id: 4,
      hn: "6900184",
      name: "Somsak Chaiyaporn",
      form_type:
        "หนังสืออธิบายและยินยอมให้ทำการจำลองการฉายรังสีโดยใช้รังสีเอกซเรย์และสารทึบรังสี",
      status: "Success",
    },
    {
      id: 5,
      hn: "6900185",
      name: "Somsri Srisawat",
      form_type:
        "หนังสืออธิบายและยินยอมให้ทำการจำลองการฉายรังสีโดยใช้รังสีเอกซเรย์และสารทึบรังสี",
      status: "Success",
    },
    {
      id: 6,
      hn: "6900186",
      name: "Kittipong Sokdee",
      form_type: "ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการฉายรังสี",
      status: "Success",
    },
    {
      id: 7,
      hn: "6900187",
      name: "Kanokwan Thongchai",
      form_type: "ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการฉายรังสี",
      status: "Success",
    },
    {
      id: 8,
      hn: "6900188",
      name: "Chatchai Sukjai",
      form_type: "ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการฉายรังสี",
      status: "Success",
    },
    {
      id: 9,
      hn: "6900189",
      name: "Chatnam Somjai",
      form_type: "ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการใส่เเร่",
      status: "Success",
    },
    {
      id: 10,
      hn: "6900190",
      name: "Chulai Sukprasert",
      form_type: "ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการใส่เเร่",
      status: "Cancel",
    },
  ];

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
    mockData,
  };
}
