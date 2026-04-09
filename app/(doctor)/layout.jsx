"use client"; // ✅
import React from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { WarnProvider } from "@/context/WarnContext";
import { FormProvider } from "@/context/FormContext";

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <ProtectedRoute role={["doctor"]}>
        <WarnProvider>
          <FormProvider>
            <Content>{children}</Content>
          </FormProvider>
        </WarnProvider>
      </ProtectedRoute>
    </AuthProvider>
  );
}

export function Content({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F1F1] dark:bg-[#0e0e11]">
      {/* ---- Navbar ---- */}
      <div
        className={`sticky top-0 z-30 bg-inherit transition-all duration-300 ml-78"
         
        `}
      >
        <Navbar />
      </div>

      <div className="flex flex-1 transition-all duration-300">
        {/* ---- Desktop Sidebar ---- */}

        <Sidebar />

        {/* ---- Main ---- */}
        <main
          className={`flex-1 transition-all duration-300 rounded-lg pr-4 pb-4 `}
        >
          {children}
        </main>
      </div>

      {/* ---- Mobile Drawer ---- */}
    </div>
  );
}
