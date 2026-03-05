"use client";
import { addToast } from "@heroui/toast";
import React, { useRef, useState } from "react";
import { useApiRequest } from "@/hooks/useApi";

export default function useHook() {
  const { FormListByHn } = useApiRequest();
  const modalRef = useRef(null);
  const [modalForm1, setModalForm1] = useState(false);
  const [modalForm2, setModalForm2] = useState(false);
  const [modalForm3, setModalForm3] = useState(false);

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

  const handleSearch = async () => {
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
      const data = await FormListByHn(searchFormByHn);
      if (data.length > 0) {
        setFormPatList(data);
        addToast({
          title: "ค้นหาสำเร็จ",
          description: `พบข้อมูล ${data.length} รายการ`,
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
    formPatList,
    searchFormByHn,
    setSearchFormByHn,
    handleSearch,
    statusStyle,
    FormByFormId,
  };
}
