import { SALARY_PAYMENTS_BD } from "@/modules/dashboard/teachers/constants";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";

export const paymentMethodEnum = pgEnum("payment_method", SALARY_PAYMENTS_BD);

export const teachers = pgTable("teachers", {
  id,
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone").notNull(),
  educationDes: text("education_des").notNull(),
  imageUrl: text("image_url"),
  imagePublicId: text("image_public_id"),
  salaryAmount: integer("salary_amount").notNull(), // Monthly salary
  totalPaid: integer("total_paid").default(0), // Total salary received
  lastPaidAt: timestamp("last_paid_at"), // Last payment date
  createdAt,
  updatedAt,
});

export const teacherRelations = relations(teachers, ({ many }) => ({
  salaryPayments: many(salaryPayments),
}));

export const salaryPayments = pgTable("salary_payments", {
  id,
  teacherId: uuid("teacher_id")
    .notNull()
    .references(() => teachers.id, { onDelete: "cascade" }),
  amountPaid: integer("amount_paid").notNull(),
  bonus: integer("bonus").default(0), // Any bonus added
  paymentMethod: paymentMethodEnum("payment_method").notNull(), // Cash, Bank Transfer, etc.
  notes: text("notes"),
  createdAt,
  updatedAt,
});

export const salaryPaymentsRelations = relations(salaryPayments, ({ one }) => ({
  teacher: one(teachers, {
    fields: [salaryPayments.teacherId],
    references: [teachers.id],
  }),
}));
