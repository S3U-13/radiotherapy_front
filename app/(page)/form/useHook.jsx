"use client";
import { addToast } from "@heroui/toast";
import React, { useRef, useState } from "react";

export default function useHook() {
  const modalRef = useRef(null);
  const [modalForm1, setModalForm1] = useState(false);
  const [modalForm2, setModalForm2] = useState(false);
  const [modalForm3, setModalForm3] = useState(false);

  const mockData = [
    {
      id: 1,
      hn: "6900181",
      name: "Somchai Boonmee",
      form_type:
        "หนังสืออธิบายและยินยอมให้ทำการจำลองการฉายรังสีโดยใช้รังสีเอกซเรย์และสารทึบรังสี",
      form_id: 1,
      status: "Success",
      created_at: "2024-06-01",
    },
    {
      id: 2,
      hn: "6900182",
      name: "Pichai Sangthong",
      form_type:
        "หนังสืออธิบายและยินยอมให้ทำการจำลองการฉายรังสีโดยใช้รังสีเอกซเรย์และสารทึบรังสี",
      form_id: 1,
      status: "Success",
      created_at: "2024-06-02",
    },
    {
      id: 3,
      hn: "6900183",
      name: "Niran Suksawat",
      form_type:
        "หนังสืออธิบายและยินยอมให้ทำการจำลองการฉายรังสีโดยใช้รังสีเอกซเรย์และสารทึบรังสี",
      form_id: 1,
      status: "Success",
      created_at: "2024-06-03",
    },
    {
      id: 4,
      hn: "6900184",
      name: "Somsak Chaiyaporn",
      form_type:
        "หนังสืออธิบายและยินยอมให้ทำการจำลองการฉายรังสีโดยใช้รังสีเอกซเรย์และสารทึบรังสี",
      form_id: 1,
      status: "Success",
      created_at: "2024-06-03",
    },
    {
      id: 5,
      hn: "6900185",
      name: "Somsri Srisawat",
      form_type:
        "หนังสืออธิบายและยินยอมให้ทำการจำลองการฉายรังสีโดยใช้รังสีเอกซเรย์และสารทึบรังสี",
      form_id: 1,
      status: "Success",
      created_at: "2024-06-03",
    },
    {
      id: 6,
      hn: "6900186",
      name: "Kittipong Sokdee",
      form_type: "ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการฉายรังสี",
      form_id: 2,
      status: "Success",
      created_at: "2024-06-03",
    },
    {
      id: 7,
      hn: "6900187",
      name: "Kanokwan Thongchai",
      form_type: "ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการฉายรังสี",
      form_id: 2,
      status: "Success",
      created_at: "2024-06-04",
    },
    {
      id: 8,
      hn: "6900188",
      name: "Chatchai Sukjai",
      form_type: "ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการฉายรังสี",
      form_id: 2,
      status: "Success",
      created_at: "2024-06-04",
    },
    {
      id: 9,
      hn: "6900189",
      name: "Chatnam Somjai",
      form_type: "ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการใส่เเร่",
      form_id: 3,
      status: "Success",
      created_at: "2024-06-05",
    },
    {
      id: 10,
      hn: "6900190",
      name: "Chulai Sukprasert",
      form_type: "ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการใส่เเร่",
      form_id: 3,
      status: "Cancel",
      created_at: "2024-06-05",
    },
    {
      id: 11,
      hn: "6900181",
      name: "Somchai Boonmee",
      form_type: "ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการฉายรังสี",
      form_id: 2,
      status: "Pending",
      created_at: "2024-06-20",
    },
    {
      id: 12,
      hn: "6900181",
      name: "Somchai Boonmee",
      form_type: "ใบรับทราบข้อมูลเเละยินยอมรับการรักษาด้วยการใส่เเร่",
      form_id: 3,
      status: "Saved",
      created_at: "2024-07-11",
    },
  ];

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

  // ค้น หา form ตาม HN
  const [searchFormByHn, setSearchFormByHn] = useState("");
  const [formPatList, setFormPatList] = useState([]);

  const handleSearch = () => {
    if (!searchFormByHn) {
      setFormPatList([]);
      addToast({
        title: "กรุณากรอก HN",
        description: "กรุณากรอก HN ที่ต้องการค้นหา",
        color: "warning",
      });
      return;
    }
    try {
      const filtered = mockData.filter((item) =>
        item.hn.includes(searchFormByHn),
      );
      if (filtered.length > 0) {
        setFormPatList(filtered);
        addToast({
          title: "ค้นหาสำเร็จ",
          description: `พบข้อมูล ${filtered.length} รายการ`,
          color: "success",
        });
      } else {
        setFormPatList([]);
        addToast({
          title: "ไม่พบข้อมูล",
          description: "ไม่พบข้อมูลที่ค้นหา",
          color: "warning",
        });
      }
    } catch (error) {
      addToast({
        title: "error",
        description: "เกิดข้อผิดพลาดในการค้นหา",
        color: "danger",
      });
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
    mockData,
    formPatList,
    searchFormByHn,
    setSearchFormByHn,
    handleSearch,
    statusStyle,
    FormByFormId,
  };
}
