"use server";

import { db } from "@/drizzle/db";
import { studentFees } from "@/drizzle/schemas/students";
import { handleServerError } from "@/lib/handle-server-error";
import { studentFeesSchema } from "../schema/fees.schema";
import { StudentFeesSchemaType } from "../types";
import { eq } from "drizzle-orm";

export const createStudentFees = async ({
  feesInfo,
  studentId,
}: {
  feesInfo: StudentFeesSchemaType;
  studentId: string;
}) => {
  try {
    const { success, data } = studentFeesSchema.safeParse(feesInfo);
    if (!success) {
      return { message: "Invalid data !" };
    }
    //insert data
    await db.insert(studentFees).values({
      mealFees: Number(data.meal_fees),
      educationFees: Number(data.education_fee),
      month: data.month,
      year: data.year,
      studentId,
    });
    return { message: "New Record Created " };
  } catch (error) {
    return handleServerError(error);
  }
};

export const getFeesRecords = async (studentId: string) => {
  return await db
    .select()
    .from(studentFees)
    .where(eq(studentFees.studentId, studentId));
};
export const deleteFeesRecords = async (feesId: string) => {
  try {
    await db.delete(studentFees).where(eq(studentFees.id, feesId));
    return { message: "Deleted" };
  } catch (error) {
    return handleServerError(error);
  }
};
