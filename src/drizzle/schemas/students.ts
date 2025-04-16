import {
  COURSE_ARRAY,
  GENDER_ARRAY,
  PASS_STATUS_ARRAY,
  SESSION_RANGES,
} from "@/modules/dashboard/students/constants";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";

// Enums
export const courseEnum = pgEnum("course", COURSE_ARRAY);
export const sessionRangeEnum = pgEnum("session_range", SESSION_RANGES);

export const genderEnum = pgEnum("gender", GENDER_ARRAY);

export const passStatusEnum = pgEnum("pass_status", PASS_STATUS_ARRAY);

// Student Schema
export const students = pgTable("students", {
  id,
  name: text("name").notNull(),
  imageUrl: text("image_url"),
  imagePublicId: text("image_public_id"),
  fatherName: text("father_name"),
  motherName: text("mother_name"),
  course: courseEnum("course").notNull().default("Moqtob"),
  dataOfBirth: date("date_of_birth", { mode: "date" }).notNull(),
  gender: genderEnum("gender").notNull(),
  sessionRange: sessionRangeEnum("session_range")
    .notNull()
    .default("january_2025_december_2026"),
  address: text("address"),
  physicalCondition: text("physical_condition").default("normal"),
  admissionTimePaid: integer("admission_time_paid").default(0),

  genRoll: integer("gen_roll").notNull(),
  passStatus: passStatusEnum("pass_status").default("null"),
  result: text("result"),
  createdAt,
  updatedAt,
});

export const studentRelations = relations(students, ({ many }) => ({
  feesRecords: many(studentFees),
}));

export const studentFees = pgTable("student_fees", {
  id,
  mealFees: integer("meal_fees").notNull(),
  educationFees: integer("education_fees").notNull(),
  month: text("month").notNull(),
  year: text("year"),
  studentId: uuid("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const studentFeesRelations = relations(studentFees, ({ one }) => ({
  student: one(students, {
    fields: [studentFees.studentId],
    references: [students.id],
  }),
}));
