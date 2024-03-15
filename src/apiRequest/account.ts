import http from "@/lib/http";
import { AccountResType } from "./type";

const accountApiRequest = {
  //server
  me: (sessionToken: string) => {
    http.get<AccountResType>("account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
  },
  //client
  meClient: () => http.get<AccountResType>("account/me"),
};

export default accountApiRequest;
