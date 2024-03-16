"use client";

import React, { useEffect } from "react";
import accountApiRequest from "@/apiRequest/account";
import { clientSessionToken } from "@/lib/http";
import { handleErrorApi } from "@/lib/utils";

const Profile = () => {
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await accountApiRequest.meClient();
        console.log(result);
      } catch (error: any) {
        handleErrorApi({ error });
      }
    };
    fetchRequest();
  }, []);
  return <div>Profile</div>;
};

export default Profile;
