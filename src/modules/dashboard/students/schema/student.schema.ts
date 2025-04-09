import {
  COURSE_ARRAY,
  GENDER_ARRAY,
  PASS_STATUS_ARRAY,
  SESSION_RANGES,
} from "@/modules/dashboard/students/constants";
import { z } from "zod";

export const courseEnum = z.enum(COURSE_ARRAY);
export const genderEnum = z.enum(GENDER_ARRAY);
export const sessionEnum = z.enum(SESSION_RANGES);
export const passStatusEnum = z.enum(PASS_STATUS_ARRAY);
export const AddStudentSchema = z.object({
  name: z.string().min(1, { message: "Student name is required" }),
  fatherName: z.string(),
  motherName: z.string(),
  course: courseEnum, // Validates against classEnum values
  session_range: sessionEnum, // Validates against sessionEnum values
  address: z.string(),
  dateOfBirth: z.coerce.date(),
  imageFile: z.string().optional(),
  gender: genderEnum, // Validates against genderEnum values
  physicalCondition: z.string(),
  admissionTimePaid: z.string().optional(),
});

export const UpdateStudentSchema = z.object({
  name: z.string().min(1, { message: "Student name is required" }),
  fatherName: z.string(),
  motherName: z.string(),
  course: courseEnum, // Validates against classEnum values
  sessionRange: sessionEnum, // Validates against sessionEnum values
  address: z.string(),
  dateOfBirth: z.coerce.date(),
  imageUrl: z.string().optional(),
  imagePublicId: z.string().optional(),
  gender: genderEnum, // Validates against genderEnum values
  physicalCondition: z.string(),
  admissionTimePaid: z.number().optional(),
});
