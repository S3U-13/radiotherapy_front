"use client";

import { Image } from "@heroui/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Logo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Image
      alt="PPK logo"
      src={
        theme === "dark"
          ? "/images/logolong84white.png"
          : "/images/logolong84.png"
      }
      width={150}
    />
  );
}
