"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/utils/auth";

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!isAdmin()) {
      router.push("/dashboard");
      return;
    }

    setAllowed(true);
  }, [router]);

  if (!allowed) {
    return <p>Checking permission...</p>;
  }

  return <>{children}</>;
}