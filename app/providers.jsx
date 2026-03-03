"use client";
import { addToast, ToastProvider } from "@heroui/toast";
import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children, themeProps }) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <ToastProvider
        placement="top-center"
        toastProps={{ timeout: 3000, shouldShowTimeoutProgress: true,  }}
      />
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </HeroUIProvider>
  );
}
