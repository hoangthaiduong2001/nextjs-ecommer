import envConfig from "@/config";

type CustomOptions = RequestInit & {
  baseUrl?: string;
};

class HttpError extends Error {
  status: number;
  payload: any;
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

const request = async <Response>(
  method: "GET" | "PUT" | "POST" | "DELETE",
  url: string,
  option?: CustomOptions
) => {
  const body = option?.body ? JSON.stringify(option.body) : undefined;
  const baseHeaders = {
    "Content-Type": "application/json",
  };
  const baseUrl = option?.baseUrl || envConfig.NEXT_PUBLIC_API_ENDPOINT;
  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;
  const res = await fetch(fullUrl, {
    ...option,
    headers: {
      ...baseHeaders,
      ...option?.headers,
    },
    body,
    method,
  });

  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };
  if (!res.ok) {
    throw new HttpError(data);
  }
  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options, body });
  },
};

export default http;
