"use client";
import React, { useState } from "react";
import { useApiRequest } from "@/hooks/useApi";

export default function useHook({
  onClose,
  formId,
  setFormId,
  formTypeId,
  setFormTypeId,
}) {
  const { FormListByHn } = useApiRequest();
  const [formData, setFormData] = useState();

  useEffect(() => {
    if (!formTypeId) return;

    if (formTypeId === 1) {
      const fetchData = async () => {
        const data = await FormListByHn();
      };
    } else if (formTypeId === 2) {
    } else if (formTypeId === 3) {
    }
  });
  return {};
}
