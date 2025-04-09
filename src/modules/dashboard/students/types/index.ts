import { z } from "zod";
import {
  AddStudentSchema,
  UpdateStudentSchema,
} from "../schema/student.schema";
import {
  COURSE_ARRAY,
  GENDER_ARRAY,
  RESULTS_ARR,
  SESSION_RANGES,
} from "../constants";
import { InferSelectModel } from "drizzle-orm";
import { students } from "@/drizzle/schema";
import { studentFeesSchema } from "../schema/fees.schema";

export type DBStudentType = InferSelectModel<typeof students>;
export type AddStudentSchemaType = z.infer<typeof AddStudentSchema>;
export type UpdateStudentSchemaType = z.infer<typeof UpdateStudentSchema>;

export type UploadImageType = {
  secure_url: string;
  public_id: string;
};

export type genderEnumType = (typeof GENDER_ARRAY)[number];
export type courseEnumType = (typeof COURSE_ARRAY)[number];
export type sessionRangeEnumType = (typeof SESSION_RANGES)[number];

export type StudentListingType = {
  id: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  name: string;
  roll: number;
  result: string | null;
  sessionRange: sessionRangeEnumType;
  course: courseEnumType;
};

export type StudentFeesSchemaType = z.infer<typeof studentFeesSchema>;

export type FeesFormInfType = {
  session: sessionRangeEnumType;
};

export type StudentResultType = (typeof RESULTS_ARR)[number];
