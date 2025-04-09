import { z } from "zod";
import { ALL_MONTHS, SPENDING_FIELDS, YEARS_ARR } from "../constants";

export const spendingSchema = z.object({
  spendingField: z.enum(SPENDING_FIELDS, {
    message: "Select a spending field",
  }),
  month: z.enum(ALL_MONTHS, { message: "Select a month" }), // ✅ Fixed message
  year: z.enum(YEARS_ARR, { message: "Select a year" }), // ✅ Fixed incorrect reference
  spendingDetails: z.string().optional(),

  amount: z.string().min(1, { message: "Amount must be greater than 0" }), // ✅ Added validation for amount
});
