"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import envConfig from "@/config";
import { useToast } from "@/components/ui/use-toast";
import { LoginBody } from "./const";
import { LoginBodyType } from "./type";
import authApiRequest from "@/apiRequest/auth";
import { useRouter } from "next/navigation";
import { clientSessionToken } from "@/lib/http";
import { handleErrorApi } from "@/lib/utils";
import { useState } from "react";

const FormLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginBodyType) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const result = await authApiRequest.login(values);
      toast({
        title: "Login succes!",
      });
      await authApiRequest.auth({ sessionToken: result.payload.data.token });
      clientSessionToken.value = result.payload.data.token;

      router.push("/me");
    } catch (error: any) {
      handleErrorApi({ error, setError: form.setError });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[500px] w-full"
        noValidate
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="!mt-7 w-full">
          Login
        </Button>
      </form>
    </Form>
  );
};

export default FormLogin;
