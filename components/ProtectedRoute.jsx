// "use client";
// import React, { useEffect } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
// import { Button } from "@heroui/button";

// export default function ProtectedRoute({ children, role }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push("/");
//     }
//   }, [user, loading, router]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-[#0a0a0a]">
//         <div className="w-8 h-8 border-4 border-gray-200 dark:border-zinc-800 border-t-[#111] dark:border-t-[#f4f4f5] rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (!user) return null;

//   return children;
// }
"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // 🔥 ยังไม่ login
    if (!user) {
      router.push("/");
      return;
    }

    // 🔥 login แล้ว แต่ role ไม่ผ่าน
    // if (role && !role.includes(user.role)) {
    //   router.push("/unauthorized"); // หรือจะไม่ redirect ก็ได้
    // }
  }, [user, loading, role, router]);

  // 🔄 loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-[#0a0a0a]">
        <div className="w-8 h-8 border-4 border-gray-200 dark:border-zinc-800 border-t-[#111] dark:border-t-[#f4f4f5] rounded-full animate-spin"></div>
      </div>
    );
  }

  // ❌ ยังไม่มี user
  if (!user) return null;

  // ❌ role ไม่ผ่าน → แสดง UI
  if (role && !role.includes(user.role)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] dark:bg-[#0a0a0a] text-[#111] dark:text-[#f4f4f5] transition-colors duration-500 p-6 relative overflow-hidden">
        {/* Background Graphic */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.2] dark:opacity-[0.2] mix-blend-multiply dark:mix-blend-lighten pointer-events-none"
          style={{ backgroundImage: "url('/images/bg5.jpg')" }}
        ></div>
        <div className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-gray-200/40 to-white/10 dark:from-zinc-800/20 dark:to-zinc-900/10 rounded-full blur-3xl opacity-50 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative z-10 flex flex-col items-center text-center p-10 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm max-w-lg w-full">
          <div className="mb-8">
            <img
              src="/images/logoppk.png"
              alt="PPK Logo"
              className="object-contain drop-shadow-sm transition-transform hover:scale-105 h-20 md:h-24"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase mb-4 opacity-90">
            Unauthorized
          </h1>
          <div className="h-[1px] w-[60px] bg-black dark:bg-white mb-6"></div>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-light mb-10 leading-relaxed">
            คุณไม่มีสิทธิ์เข้าถึงหน้านี้
            <br />
            กรุณาตรวจสอบสิทธิ์ของคุณหรือติดต่อผู้ดูแลระบบ
          </p>
          <Button
            radius="md"
            onPress={() => {
              if (["staff", "nurse"].includes(user.role)) {
                router.push("/form");
              } else if (["doctor"].includes(user.role)) {
                router.push("/dashboard");
              } else {
                router.push("/");
              }
            }}
            className="group relative overflow-hidden bg-[#111] text-white hover:bg-black dark:bg-[#f4f4f5] dark:text-black dark:hover:bg-white font-medium tracking-[0.2em] uppercase text-sm px-10 py-6 transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            <span className="relative z-10">กลับสู่หน้าหลัก</span>
          </Button>
        </div>
      </div>
    );
  }

  // ✅ ผ่านทุกอย่าง
  return children;
}
