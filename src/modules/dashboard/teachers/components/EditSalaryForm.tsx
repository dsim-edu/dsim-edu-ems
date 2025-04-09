import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CustomBtn } from "@/components/ui/custom-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { showMessageOrError } from "@/lib/show-message-error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SALARY_PAYMENTS_BD } from "../constants";
import { salaryTeacherSchema } from "../schema/teacher.schema";
import { updateTeacherSalary } from "../server/teacher.action";
import { SalaryTeacherSchemaType } from "../types/type";

export default function EditSalaryForm({
  info,
  recordId,
}: {
  info: SalaryTeacherSchemaType;
  recordId: string;
}) {
  const qc = useQueryClient();
  const form = useForm({
    resolver: zodResolver(salaryTeacherSchema),
    defaultValues: {
      amount: info.amount,
      bonus: info.bonus,
      method: info.method,
      notes: info.notes,
    },
  });

  // mutations
  const { isPending, mutate } = useMutation({
    mutationFn: updateTeacherSalary,
    onSuccess: async (info) => {
      await showMessageOrError(info, qc, ["salary_record"]);
    },
  });

  function onSubmit(values: SalaryTeacherSchemaType) {
    mutate({ info: values, recordId });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full mx-auto p-4  border rounded-lg"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount *</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bonus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bonus</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Method *</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Payment Method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SALARY_PAYMENTS_BD.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Give some information about this payment."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CustomBtn pending={isPending} variant={"signature"} type="submit">
          Update
        </CustomBtn>
      </form>
    </Form>
  );
}
