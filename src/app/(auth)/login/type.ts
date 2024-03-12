import { z } from "zod";
import { LoginBody } from "./const";

export type LoginBodyType = z.TypeOf<typeof LoginBody>;
