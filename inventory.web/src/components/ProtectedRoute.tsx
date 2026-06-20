"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
        const microsoftToken = localStorage.getItem("microsoftAccessToken");


    if (!token && !microsoftToken) {
      router.replace("/login");
      return;
    }

    setChecking(false);
  }, [router]);

  if (checking) {
    return <main className="p-8">Checking authentication...</main>;
  }

  return <>{children}</>;
}