"use client";
import { useApiRequest } from "@/hooks/useApi";
import React, { useEffect, useState } from "react";

export default function useDataHook() {
  const { staffList, fetchDataUsers } = useApiRequest();

  const [dataManageUser, setDataManageUser] = useState([]);
  const [userDatas, setUserDatas] = useState([]);
  const [userPagination, setUserPagination] = useState({});

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("" || "");
  const [debounceSearch, setDebounceSearch] = useState("" || "");

  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    const data = await staffList();
    setDataManageUser(data || []);
  };

  const loadDataUsers = async () => {
    setLoading(true);

    const data = await fetchDataUsers(page, limit, debounceSearch);

    if (data) {
      setUserDatas(data.users);
      setUserPagination(data.pagination);
    } else {
      setUserDatas([]);
      setUserPagination({});
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  //page
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 300); // 0.3 วิ

    return () => clearTimeout(timer);
  }, [search]);

  // ✅ reset page ตอน search เปลี่ยน
  useEffect(() => {
    setPage(1);
  }, [debounceSearch]);

  useEffect(() => {
    loadDataUsers();
  }, [page, limit, debounceSearch]);

  return {
    dataManageUser,
    loading,
    userDatas,
    userPagination,
    page,
    limit,
    search,
    setPage,
    setLimit,
    setSearch,
    loadData,
  };
}
