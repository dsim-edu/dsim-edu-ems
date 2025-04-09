"use client";

import { CustomBtn } from "@/components/ui/custom-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { showMessageOrError } from "@/lib/show-message-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ALL_MONTHS, SPENDING_FIELDS, YEARS_ARR } from "../constants";
import { spendingSchema } from "../schema/spending.schema";
import { editSpendings } from "../server/spending.action";
import { SpendingSchemaType } from "../types/type";

export default function EditSpendingForm({
  spending,
  id,
}: {
  spending: SpendingSchemaType;
  id: string;
}) {
  const qc = useQueryClient();

  const form = useForm<SpendingSchemaType>({
    resolver: zodResolver(spendingSchema),
    defaultValues: {
      month: spending.month,
      year: spending.year,
      amount: spending.amount,
      spendingDetails: spending.spendingDetails,
      spendingField: spending.spendingField,
    },
  });

  // mutations

  // mutations
  const { isPending, mutate } = useMutation({
    mutationFn: editSpendings,
    onSuccess: async (info) => {
      await showMessageOrError(info, qc, ["spendings"]);
    },
  });

  const onSubmit = (data: SpendingSchemaType) => {
    mutate({ info: data, id });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-7 max-w-full w-full mx-auto p-4 border rounded-md shadow-sm backdrop-blur-xs text-white"
      >
        <h2 className="text-xl font-semibold">Donation Form</h2>

        {/* Donation Type Selection */}
        <FormField
          control={form.control}
          name="spendingField"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Spending Field *</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select donation type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SPENDING_FIELDS.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Money or Other Donation */}
        <FormField
          control={form.control}
          name="spendingDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descriptions</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Give a descriptions.." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount (in Taka) *</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="Enter amount" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year *</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {YEARS_ARR.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="month"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Month *</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ALL_MONTHS.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <CustomBtn pending={isPending} type="submit" variant={"signature"}>
          Submit Chnages
        </CustomBtn>
      </form>
    </Form>
  );
}
