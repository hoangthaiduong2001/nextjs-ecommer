import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  MessageResType,
  RegisterResType,
} from "./type";
import { RegisterBodyType } from "@/app/(auth)/register/type";

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),
  register: (body: RegisterBodyType) =>
    http.post<RegisterResType>("/auth/register", body),
  auth: (body: { sessionToken: string }) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),
  logoutFromNextServerToServer: (sessionToken: string) =>
    http.post<MessageResType>(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),
  logoutFromNextClientToNextServer: () =>
    http.post<MessageResType>(
      "/api/auth/logout",
      {},
      {
        baseUrl: "",
      }
    ),
};

export default authApiRequest;
