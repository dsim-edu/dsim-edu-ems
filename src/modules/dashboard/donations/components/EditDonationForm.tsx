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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DONATION_ARR } from "../constants";
import { donationSchema } from "../schema/donation.schema";
import { editDonation } from "../server/donation.action";
import { DonationValueType } from "../types";

export default function EditDonationForm({
  donation,
  id,
}: {
  donation: DonationValueType;
  id: string;
}) {
  const qc = useQueryClient();
  const [isMoney] = useState<"money" | "other">(donation.isMoney);

  const form = useForm<DonationValueType>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      donationType: donation.donationType,
      isMoney: donation.isMoney,
      amount: donation.amount,
      donationDetails: donation.donationDetails,
      donorName: donation.donorName,
    },
  });

  // mutations

  // mutations
  const { isPending, mutate } = useMutation({
    mutationFn: editDonation,
    onSuccess: async (info) => {
      await showMessageOrError(info, qc, ["donations"]);
    },
  });

  const onSubmit = (data: DonationValueType) => {
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
          name="donationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Donation Type</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select donation type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {DONATION_ARR.map((type) => (
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
          name="isMoney"
          render={() => (
            <FormItem>
              <FormLabel className="text-gray-400">Donation Type</FormLabel>
              <FormControl>
                <RadioGroup value={isMoney} disabled className="flex gap-4">
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="money" />
                    <FormLabel className="font-normal text-gray-400">
                      Money
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="other" />
                    <FormLabel className="font-normal text-gray-400">
                      Other
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amount Input (Only if Money is Selected) */}
        {isMoney === "money" && (
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (in Taka)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="Enter amount" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Donation Details */}
        <FormField
          control={form.control}
          name="donationDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Donation Details</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Describe the donation (e.g., item details, purpose)"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Donor Name */}
        <FormField
          control={form.control}
          name="donorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Donor Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter donor name" />
              </FormControl>
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
