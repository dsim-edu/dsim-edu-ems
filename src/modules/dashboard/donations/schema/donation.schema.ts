import { z } from "zod";
import { DONATION_ARR } from "../constants";

// Zod Schema for validation
export const donationSchema = z.object({
  donationType: z.enum(DONATION_ARR, { message: "Select a donation type" }),
  isMoney: z.enum(["money", "other"], { message: "Select donation type" }),
  amount: z.string().optional(),
  donationDetails: z
    .string()
    .min(3, { message: "Details must be at least 3 characters" }),
  donorName: z
    .string()
    .min(3, { message: "Donor name must be at least 3 characters" }),
});
