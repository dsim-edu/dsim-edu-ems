import { DONATION_ARR } from "@/modules/dashboard/donations/constants";
import { integer, pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";

export const donationEnum = pgEnum("donation_type", DONATION_ARR);

export const donations = pgTable("donations", {
  id,
  donationType: donationEnum("donation_type").notNull(),
  isMoney: text("is_money").notNull(), // "money" | "other"
  amount: integer("amount"), // Nullable (only for money donations)
  donationDetails: text("donation_details").notNull(),
  donorName: varchar("donor_name", { length: 255 }).notNull(),
  createdAt,
  updatedAt,
});
