"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { loginAPI } from "@/utils/api";

export default function useHook() {
  const { me } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [field, setField] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginAPI(field.username, field.password);
      // console.log("LOGIN RES:", res);

      if (res?.data?.message === "Login success") {
        // console.log("LOGIN OK");

        const user = await me();
        // console.log("USER FROM ME:", user); // 🔥 ตัวชี้ชะตา

        if (user) {
          // console.log("USER ROLE:", user.role);

          if (["staff", "nurse"].includes(user.role)) {
            router.push("/form");
          } else if (["doctor"].includes(user.role)) {
            router.push("/dashboard");
          } else {
            router.push("/");
          }
        } else {
          console.log("❌ user is null");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    toggleVisibility,
    isVisible,
    field,
    handleChange,
    handleSubmit,
  };
}
