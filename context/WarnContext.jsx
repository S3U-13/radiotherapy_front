// WarnContext.js
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useApiRequest } from "@/hooks/useApi";

const WarnContext = createContext();

export const WarnProvider = ({ children }) => {
  const didFetch = useRef(false);
  const { fetchCountWarnPending } = useApiRequest();
  const [countWarn, setCountWarn] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [countWarnSigned, setCountWarnSigned] = useState(0);
  const [notificationsSigned, setNotificationsSigned] = useState([]);
  // const [type, setType] = useState("pending");

  const refreshByType = async (type) => {
    const data = await fetchCountWarnPending(type);

    if (type === "pending") {
      setNotifications(data.data);
      setCountWarn(data.count);
    } else {
      setNotificationsSigned(data.data);
      setCountWarnSigned(data.count);
    }
  };

  const loadAll = async () => {
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
      console.error(error);
    }
  };

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    loadAll();
  }, []);

  return (
    <WarnContext.Provider
      value={{
        notifications,
        countWarn,
        refreshByType,
        // setType,
        // type,
        loadAll,
        notificationsSigned,
        countWarnSigned,
      }}
    >
      {children}
    </WarnContext.Provider>
  );
};

export const useWarn = () => useContext(WarnContext);
