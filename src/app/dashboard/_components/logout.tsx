"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout <LogOut className="size-4" />
    </Button>
  );
}
