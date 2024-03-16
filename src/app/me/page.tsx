import envConfig from "@/config";
import { cookies } from "next/headers";
import React from "react";
import Profile from "./profile";
import accountApiRequest from "@/apiRequest/account";

const MeProfile = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const result = await accountApiRequest.me(sessionToken?.value ?? "");
  return (
    <div>
      <Profile />
    </div>
  );
};

export default MeProfile;
