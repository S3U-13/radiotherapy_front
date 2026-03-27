"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApiRequest } from "@/hooks/useApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { meApi, logoutApi } = useApiRequest();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔥 init ตอนเปิดเว็บ
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        const res = await meApi();

        if (res?.message === "success") {
          setUser(res.user_data); // ✅ แก้ตรงนี้
          localStorage.setItem("user", JSON.stringify(res.user_data));
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      } catch (err) {
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // 🔥 ใช้หลัง login
  const me = async () => {
    try {
      const res = await meApi();

      if (res?.message === "success") {
        setUser(res.user_data); // ✅ แก้ตรงนี้
        localStorage.setItem("user", JSON.stringify(res.user_data));
        return res.user_data; // ✅ return ตัวนี้
      }
    } catch (err) {
      console.error(err);
    }
    return null;
  };

  // 🔥 logout
  const logout = async () => {
    try {
      await logoutApi();
    } catch (e) {
      console.error("logout failed", e);
    }

    setUser(null);
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, me, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
