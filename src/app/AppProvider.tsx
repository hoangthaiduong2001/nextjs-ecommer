"use client";

import { clientSessionToken } from "@/lib/http";
import React, { useState } from "react";

const AppProvider = ({
  children,
  initSessionToken = "",
}: {
  children: React.ReactNode;
  initSessionToken?: string;
}) => {
  useState(() => {
    if (typeof window !== "undefined") {
      clientSessionToken.value = initSessionToken;
    }
  });

  return <>{children}</>;
};

export default AppProvider;
