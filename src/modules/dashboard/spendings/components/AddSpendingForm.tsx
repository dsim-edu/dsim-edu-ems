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
import { format } from "date-fns";
import { useForm } from "react-hook-form";

import { spendingSchema } from "../schema/spending.schema";
import { createSpending } from "../server/spending.action";
import { SpendingSchemaType } from "../types/type";
import { ALL_MONTHS, YEARS_ARR, SPENDING_FIELDS } from "../constants";

export default function AddSpendingForm() {
  const qc = useQueryClient();

  const form = useForm<SpendingSchemaType>({
    resolver: zodResolver(spendingSchema),
    defaultValues: {
      month: format(new Date(), "MMMM") as (typeof ALL_MONTHS)[number],
      year: format(new Date(), "yyyy") as (typeof YEARS_ARR)[number],
      amount: "",
      spendingDetails: "",
      spendingField: undefined,
    },
  });

  // mutations

  // mutations
  const { isPending, mutate } = useMutation({
    mutationFn: createSpending,
    onSuccess: async (info) => {
      await showMessageOrError(info, qc, ["", "allSpendings", "spendings"]);
      if (info.message) {
        form.reset();
      }
    },
  });

  const onSubmit = (data: SpendingSchemaType) => {
    mutate({ spendingInfo: data });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-7 max-w-lg mx-auto p-4 border rounded-md shadow-sm backdrop-blur-xs text-white"
      >
        <h2 className="text-xl font-semibold">Spending Form</h2>

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
                    <SelectValue placeholder="Select spending type" />
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
              <FormLabel>
                Amount <span className=""> (Taka)</span> *
              </FormLabel>
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
          Submit Spending
        </CustomBtn>
      </form>
    </Form>
  );
}
