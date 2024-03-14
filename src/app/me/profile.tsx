"use client";

import React from "react";
import { useAppContext } from "../AppProvider";

const Profile = () => {
  const { sessionToken } = useAppContext();
  console.log(sessionToken);
  return <div>Profile</div>;
};

export default Profile;
