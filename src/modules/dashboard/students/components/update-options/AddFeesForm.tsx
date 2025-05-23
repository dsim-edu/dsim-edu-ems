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
import { showMessageOrError } from "@/lib/show-message-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ENGLISH_MONTHS, ISLAMIC_YEARS_ARR } from "../../constants";
import { getMonthsBetweenRange } from "../../helper";
import { studentFeesSchema } from "../../schema/fees.schema";
import { createStudentFees } from "../../server/fees.action";
import { sessionRangeEnumType, StudentFeesSchemaType } from "../../types";

export default function AddFeesForm({
  session,
  studentId,
}: {
  session: sessionRangeEnumType;
  studentId: string;
}) {
  const qc = useQueryClient();
  const form = useForm<StudentFeesSchemaType>({
    resolver: zodResolver(studentFeesSchema),
    defaultValues: {
      session: session,
      meal_fees: "",
      education_fee: "",
      month: "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: createStudentFees,
    onSuccess: async (info) => {
      if (info.message) {
        form.reset();
      }
      await showMessageOrError(info, qc);
    },
  });

  function onSubmit(values: StudentFeesSchemaType) {
    mutate({ feesInfo: values, studentId });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-full w-full relative mx-auto py-10"
      >
        <h1 className="text-xl font-bold absolute -top-6 text-gray-500">
          Student Fees
        </h1>
        <FormField
          control={form.control}
          name="meal_fees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meal fee *</FormLabel>
              <FormControl>
                <Input placeholder="Give amount" type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="education_fee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Education fee *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Give educational costs"
                  type="number"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="session"
          render={() => (
            <FormItem>
              <FormLabel className="text-gray-500">Session *</FormLabel>
              <Select value={session}>
                <FormControl>
                  <SelectTrigger className="text-gray-500">
                    <SelectValue placeholder="Enter session" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={session}>{session}</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Month *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select month " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getMonthsBetweenRange(session).length === 0 ? (
                        <div>
                          {ENGLISH_MONTHS.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </div>
                      ) : (
                        getMonthsBetweenRange(session).map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {session === "no_session" && (
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year *</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="select year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ISLAMIC_YEARS_ARR.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
        <CustomBtn pending={isPending} variant={"signature"} type="submit">
          Submit
        </CustomBtn>
      </form>
    </Form>
  );
}
