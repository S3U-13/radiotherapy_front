// WarnContext.js
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useApiRequest } from "@/hooks/useApi";
import { socket } from "@/lib/socket";

const WarnContext = createContext();

export const WarnProvider = ({ children }) => {
  const { fetchCountWarnPending } = useApiRequest();

  const [countWarn, setCountWarn] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const [countWarnSigned, setCountWarnSigned] = useState(0);
  const [notificationsSigned, setNotificationsSigned] = useState([]);

  const loadingRef = useRef(false); // 🔥 กันยิง API ซ้ำ

  // -------------------------
  // โหลดข้อมูลทั้งหมด
  // -------------------------
  const loadAll = async () => {
    if (loadingRef.current) return; // ❗กันยิงซ้ำ
    loadingRef.current = true;

    try {
      const [pendingData, historyData] = await Promise.all([
        fetchCountWarnPending("pending"),
        fetchCountWarnPending("history"),
      ]);

      setCountWarn(pendingData?.count || 0);
      setNotifications(pendingData?.data || []);

      setCountWarnSigned(historyData?.count || 0);
      setNotificationsSigned(historyData?.data || []);
    } catch (error) {
      console.error("LOAD WARN ERROR:", error);
    } finally {
      loadingRef.current = false;
    }
  };

  // -------------------------
  // โหลดแยก type (optional)
  // -------------------------
  const refreshByType = async (type) => {
    try {
      const data = await fetchCountWarnPending(type);

      if (type === "pending") {
        setNotifications(data?.data || []);
        setCountWarn(data?.count || 0);
      } else {
        setNotificationsSigned(data?.data || []);
        setCountWarnSigned(data?.count || 0);
      }
    } catch (err) {
      console.error("REFRESH TYPE ERROR:", err);
    }
  };

  // -------------------------
  // socket listener
  // -------------------------
  useEffect(() => {
    const handleReload = () => {
      loadAll();
    };
    socket.on("new-notification", handleReload);
    socket.on("form-saved", handleReload);
    socket.on("form-progress", handleReload);
    socket.on("form-success", handleReload);
    return () => {
      socket.off("new-notification", handleReload);
      socket.off("form-saved", handleReload);
      socket.off("form-progress", handleReload);
      socket.off("form-success", handleReload);
    };
  }, []);

  // -------------------------
  // initial load
  // -------------------------
  useEffect(() => {
    loadAll();
  }, []);

  return (
    <WarnContext.Provider
      value={{
        notifications,
        countWarn,
        notificationsSigned,
        countWarnSigned,
        loadAll,
        refreshByType,
      }}
    >
      {children}
    </WarnContext.Provider>
  );
};

export const useWarn = () => useContext(WarnContext);
