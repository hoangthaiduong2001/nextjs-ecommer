import { z } from "zod";
import { RegisterBody } from "./const";

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;
