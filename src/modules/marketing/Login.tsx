"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { PasswordInput } from "@/components/ui/password-input";
import { CustomBtn } from "../../components/ui/custom-button";
import { userLogin } from "./server/user.action";
import { useRouter } from "next/navigation";

export const loginFormSchema = z.object({
  userName: z.string().min(1),
  password: z.string().min(6),
});
export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

export default function Login() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const data = await userLogin(values);
    if (data.error) {
      toast.error(data.error);
    }
    if (data.message) {
      toast.success(data.message);
      router.push("/dashboard/overview");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username *</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" type="" {...field} />
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
              <FormLabel>Password *</FormLabel>
              <FormControl>
                <PasswordInput placeholder="******" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <CustomBtn
          type="submit"
          className="w-full py-2! "
          variant={"signature"}
        >
          Submit
        </CustomBtn>
      </form>
    </Form>
  );
}
