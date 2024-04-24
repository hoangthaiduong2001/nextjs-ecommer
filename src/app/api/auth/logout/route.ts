import authApiRequest from "@/apiRequest/auth";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const force = res.force() as boolean | undefined;
  if (force) {
    return Response.json(
      {
        message: "Force logout",
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `sessionToken=; Path=/; HttpOnly; Max-Age=0`,
        },
      }
    );
  }
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  if (!sessionToken) {
    return Response.json(
      {
        message: "Can not get sessionToken",
      },
      {
        status: 400,
      }
    );
  }

  const handleGet = () => {};
  try {
    const result = await authApiRequest.logoutFromNextServerToServer(
      sessionToken.value
    );
    console.log("result", result);
    return Response.json(result.payload, {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=; Path=/; HttpOnly; Max-Age=0`,
      },
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: "Can not determined",
        },
        {
          status: 500,
        }
      );
    }
  }
}
