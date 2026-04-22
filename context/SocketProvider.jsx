"use client";
import React, { useEffect } from "react";
import { socket } from "@/lib/socket";
import { useAuth } from "@/context/AuthContext";

export default function SocketProvider({ children }) {
  const { user } = useAuth();
  useEffect(() => {
    if (!user.userid) return;
    socket.connect(); // เผื่อยังไม่ connect
    socket.emit("join", user.userid);
    return () => {
      socket.disconnect();
    };
  }, []);
  return children;
}
