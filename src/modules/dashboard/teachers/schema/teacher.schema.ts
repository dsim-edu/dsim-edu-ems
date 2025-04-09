import { z } from "zod";
import { SALARY_PAYMENTS_BD } from "../constants";

export const teacherSchema = z.object({
  fullName: z.string().min(1),
  profileFile: z.string().optional(),
  education_des: z.string().min(1),
  phone_number: z.string().min(11).max(11),
  email: z.string().optional(),
  salary: z.string().min(1),
});
export const editTeacherSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().optional(),
  phone: z.string().min(11).max(11),
  educationDes: z.string().min(1),
  imageUrl: z.string().optional(),
  imagePublicId: z.string().nullable(),
  salaryAmount: z.string().min(1),
});

const methodEnum = z.enum(SALARY_PAYMENTS_BD);
export const salaryTeacherSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  bonus: z.string().optional(),
  method: methodEnum,
  notes: z.string().optional(),
});
