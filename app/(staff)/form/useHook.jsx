"use client";
import { addToast } from "@heroui/toast";
import React, { useEffect, useRef, useState } from "react";
import { useApiRequest } from "@/hooks/useApi";
import { formComponentMap } from "@/components/form-config/formComponentMap";
import { socket } from "@/lib/socket";

export default function useHook() {
  const { fetchForm, FormList, FormListByHn, DataFormById } = useApiRequest();
  const modalRef = useRef(null);
  const [modalForm1, setModalForm1] = useState(false);
  const [modalForm2, setModalForm2] = useState(false);
  const [modalForm3, setModalForm3] = useState(false);
  const [modalEditForm1, setModalEditForm1] = useState(false);
  const [modalEditForm2, setModalEditForm2] = useState(false);
  const [modalEditForm3, setModalEditForm3] = useState(false);
  const [selectIdForm, setSelectIdForm] = useState(null);
  const [patFormData, setPatFormData] = useState(null);

  const [modalViewForm, setModalViewForm] = useState(false);
  // set state form id and form type id
  const [formId, setFormId] = useState(null);
  const [formTypeId, setFormTypeId] = useState(null);

  //query form list
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("10");
  const [search, setSearch] = useState("" || "");
  const [debounceSearch, setDebounceSearch] = useState("" || "");
  //form
  const [form, setForm] = useState([]);
  const [formList, setFormList] = useState([]);
  // pagination
  const [pagination, setPagination] = useState({});

  const [selectForm, setSelectForm] = useState("");
  const [status, setStatus] = useState("");

  const loadData = async () => {
    try {
      const res = await FormList(page, limit, debounceSearch, status);
      setFormList(res.data || []);
      setPagination(res.pagination || {});
    } catch (err) {
      console.error(err);
    }
  };

  const loadFetchForm = async () => {
    try {
      const data = await fetchForm();
      setForm(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadFetchForm();
  }, []);

  useEffect(() => {
    const handleReload = () => {
      loadData();
    };
    socket.on("new-notification", handleReload);
    socket.on("form-progress", handleReload);
    socket.on("form-saved", handleReload);
    socket.on("form-success", handleReload);

    return () => {
      socket.off("new-notification", handleReload);
      socket.off("form-progress", handleReload);
      socket.off("form-saved", handleReload);
      socket.off("form-success", handleReload);
    };
  }, [page, limit, debounceSearch, status]);

  //page
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 500); // 0.5 วิ

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    loadData();
  }, [page, limit, debounceSearch, status]); // ✅ สำคัญ

  const limitData = [
    { id: 1, key: "10" },
    { id: 2, key: "25" },
    { id: 3, key: "50" },
  ];

  const [visibleColumns, setVisibleColumns] = useState(
    new Set(["id", "hn", "name", "form_type", "status", "createdAt"]),
  );

  const columns = [
    { key: "id", label: "ID" },
    { key: "hn", label: "HN" },
    { key: "name", label: "NAME" },
    { key: "form_type", label: "FORM TYPE" },
    { key: "status", label: "STATUS" },
    { key: "createdAt", label: "CREATED AT" },
  ];

  const filteredColumns = columns.filter((col) => visibleColumns.has(col.key));

  const statusStyle = {
    Pending: "bg-[#ffedd5] text-[#d97706]",
    Saved: "bg-blue-100 text-blue-500",
    Success: "bg-green-100 text-green-700",
    Cancel: "bg-red-100 text-red-600",
  };

  const FormByFormId = {
    1: setModalEditForm1,
    2: setModalEditForm2,
    3: setModalEditForm3,
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

  const handleSelectIdForm = (id) => {
    try {
      setSelectIdForm(id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!selectIdForm) return;

    if (modalEditForm1 || modalEditForm2 || modalEditForm3) {
      setPatFormData(null); // reset ก่อนโหลดใหม่
      const fetchData = async () => {
        const data = await DataFormById(selectIdForm);
        if (data) {
          setPatFormData(data);
        }
      };

      fetchData();
    } else {
      // ปิดทุก modal แล้ว: reset patFormData
      setPatFormData(null);
    }
  }, [modalEditForm1, modalEditForm2, modalEditForm3]);

  useEffect(() => {
    if (!selectIdForm) return;

    const handleUpdate = async (payload) => {
      console.log("🔥 SOCKET HIT:", payload);
      console.log("👉 selectIdForm:", selectIdForm);
      console.log("👉 payload.form_id:", payload.form_id);

      if (Number(payload.form_id) !== Number(selectIdForm)) {
        console.log("❌ NOT MATCH → RETURN");
        return;
      }

      const data = await DataFormById(selectIdForm);
      console.log("data", data);
      if (data) {
        setPatFormData(data);
      }
    };

    socket.on("form-progress", handleUpdate);
    socket.on("form-saved", handleUpdate);
    socket.on("form-success", handleUpdate);

    return () => {
      socket.off("form-progress", handleUpdate);
      socket.off("form-saved", handleUpdate);
      socket.off("form-success", handleUpdate);
    };
  }, [selectIdForm]);

  const fetchData = async () => {
    if (!searchFormByHn) return;
    setFormPatList([]);
    try {
      const data = await FormListByHn(searchFormByHn);
      if (data.length > 0) {
        setFormPatList(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const formatThaiDateTime = (date) => {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear() + 543;

    const hours = String(d.getHours()).padStart(2, "0");
    const minute = String(d.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minute} น.`;
  };

  //page
  const totalPages = pagination.totalPages;
  const totalForm = pagination.total;
  const countFormInPage = `${pagination.from} - ${pagination.to}`;

  return {
    modalRef,
    modalEditForm1,
    setModalEditForm1,
    modalEditForm2,
    setModalEditForm2,
    modalEditForm3,
    setModalEditForm3,
    formPatList,
    searchFormByHn,
    setSearchFormByHn,
    handleSearch,
    statusStyle,
    FormByFormId,
    handleSelectIdForm,
    patFormData,
    setPatFormData,
    selectIdForm,
    fetchData,
    //
    selectForm,
    setSelectForm,
    //form
    form,
    formList,

    formId,
    setFormId,
    formTypeId,
    setFormTypeId,
    modalViewForm,
    setModalViewForm,
    handleOpenView,

    loadData,
    totalPages,
    totalForm,
    countFormInPage,
    page,
    setPage,
    search,
    setSearch,
    limit,
    setLimit,
    limitData,
    formatThaiDateTime,
    status,
    setStatus,
    visibleColumns,
    setVisibleColumns,
    filteredColumns,

    modalForm1,
    setModalForm1,
    modalForm2,
    setModalForm2,
    modalForm3,
    setModalForm3,
  };
}
