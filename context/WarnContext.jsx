// WarnContext.js
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useApiRequest } from "@/hooks/useApi";

const WarnContext = createContext();

export const WarnProvider = ({ children }) => {
  const didFetch = useRef(false);
  const { fetchCountWarn } = useApiRequest();
  const [countWarn, setCountWarn] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const loadDataCountWarn = async () => {
    try {
      const data = await fetchCountWarn();
      setCountWarn(data.count);
      setNotifications(data.notifications);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    loadDataCountWarn();
  }, []);

  return (
    <WarnContext.Provider
      value={{
        notifications,
        countWarn,
        loadDataCountWarn,
      }}
    >
      {children}
    </WarnContext.Provider>
  );
};

export const useWarn = () => useContext(WarnContext);
