"use client";

import { useRef, useState } from "react";
import LoginModal from "./login/page";
import { Button } from "@heroui/button";
import { ThemeSwitch } from "@/components/theme-switch";

export default function Home() {
  const LoginRef = useRef(null);
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center  overflow-hidden bg-[#fafafa] dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-500">

      {/* Background Graphic */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.5] dark:opacity-[0.2] mix-blend-multiply dark:mix-blend-lighten pointer-events-none"
        style={{ backgroundImage: "url('/images/n02.png')" }}
      />

      {/* Elegant Fade Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#fafafa] via-transparent to-[#fafafa] dark:from-[#0a0a0a] dark:to-[#0a0a0a] pointer-events-none opacity-80"></div>

      {/* Floating Theme Switcher */}
      <div className="fixed bottom-6 left-4 -translate-y-1/2 z-50">
        <ThemeSwitch />
      </div>

      {/* Header with Logos */}
      <header className="absolute top-0 left-0 w-full p-8 md:px-12 md:py-10 flex justify-between items-center z-20">
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" className="h-8 md:h-10 dark:hidden object-contain" alt="Yield Wise Logo" />
          <img src="/images/logowhite.png" className="h-8 md:h-10 hidden dark:block object-contain" alt="Yield Wise Logo" />
        </div>
      </header>

      {/* Main Content */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl w-full">

        <div className="mb-8 flex flex-col items-center select-none">
          <h1 className="text-4xl md:text-6xl  font-light tracking-widest text-[#111] dark:text-[#f4f4f5] uppercase mb-4 opacity-90 drop-shadow-sm">
            Consent Form
          </h1>
          <div className="h-[1px] w-[80px] bg-neutral-100 dark:bg-neutral-800 mb-6"></div>
          <h2 className="text-xl md:text-2xl font-light text-neutral-800 dark:text-neutral-400 tracking-[0.2em]">
            ออกใบยินยอมการรักษา
          </h2>
        </div>

        <p className="text-base text-neutral-800 dark:text-neutral-500 max-w-md font-light mb-12 leading-relaxed">
          ระบบออกใบยินยอมอิเล็กทรอนิกส์เพื่อความสะดวกและรวดเร็ว
          <br />โปรดเข้าสู่ระบบเพื่อเริ่มใช้งาน
        </p>

        <Button
          size="lg"
          radius="md"
          onPress={() => setOpenLogin(true)}
          className="group relative overflow-hidden bg-[#111] text-white hover:bg-black dark:bg-[#f4f4f5] dark:text-black dark:hover:bg-white font-medium tracking-[0.2em] uppercase text-sm px-16 py-8 transition-all hover:shadow-2xl hover:-translate-y-0.5"
        >
          <span className="relative z-10 flex items-center gap-3">
            Login
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1.5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </span>
        </Button>
      </section>

      {/* Minimal Footer */}
      <footer className="absolute bottom-8 w-full text-center z-10">
        <p className="text-[10px] uppercase tracking-[0.3em] font-light text-neutral-400 dark:text-neutral-600">
          RADIOTHERAPY APP // 2026
        </p>
      </footer>

      {/* Login Modal */}
      <LoginModal
        isOpen={openLogin}
        onClose={() => setOpenLogin(false)}
        LoginRef={LoginRef}
      />
    </main>
  );
}
