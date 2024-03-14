import envConfig from "@/config";
import { cookies } from "next/headers";
import React from "react";
import Profile from "./profile";

const MeProfile = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const result = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken?.value}`,
      },
    }
  ).then(async (res) => {
    const payload = await res.json();
    const data = {
      status: res.status,
      payload,
    };
    if (!res.ok) {
      throw data;
    }
    return data;
  });
  console.log(result);
  return (
    <div>
      <Profile />
    </div>
  );
};

export default MeProfile;
