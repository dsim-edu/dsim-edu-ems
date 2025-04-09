import { z } from "zod";
import {
  editTeacherSchema,
  salaryTeacherSchema,
  teacherSchema,
} from "../schema/teacher.schema";

export type TeacherSchemaType = z.infer<typeof teacherSchema>;
export type EditTeacherSchemaType = z.infer<typeof editTeacherSchema>;
export type SalaryTeacherSchemaType = z.infer<typeof salaryTeacherSchema>;
