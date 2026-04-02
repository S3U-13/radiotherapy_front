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

  useEffect(() => {
    if (didFetch.current) return; // check flag ก่อน
    didFetch.current = true;
    fetchForm()
      .then((data) => setForm(data || []))
      .catch(console.error);

    loadData();
  }, [fetchForm]);
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

  //page
  const totalPages = pagination.totalPages;
  const totalForm = pagination.total;
  const countFormInPage = `${pagination.from} - ${pagination.to}`;

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

  const formatThaiDateTime = (date) => {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear() + 543;

    const hours = String(d.getHours()).padStart(2, "0");
    const minute = String(d.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minute} น.`;
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
  };
}
