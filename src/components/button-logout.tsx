"use client";

import authApiRequest from "@/apiRequest/auth";
import { handleErrorApi } from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const ButtonLogout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer();
      router.push("/login");
    } catch (error: any) {
      handleErrorApi({
        error,
      });
    }
  };
  return (
    <Button size="sm" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default ButtonLogout;
