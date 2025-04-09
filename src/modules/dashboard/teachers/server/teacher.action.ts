"use server";

import { db } from "@/drizzle/db";
import {
  EditTeacherSchemaType,
  SalaryTeacherSchemaType,
  TeacherSchemaType,
} from "../types/type";
import {
  editTeacherSchema,
  salaryTeacherSchema,
  teacherSchema,
} from "../schema/teacher.schema";
import { deleteFromCloude, uploadToCloude } from "@/lib/upload-image";
import { handleServerError } from "@/lib/handle-server-error";
import { salaryPayments, teachers } from "@/drizzle/schema";
import { desc, eq } from "drizzle-orm";
import { UploadImageType } from "../../students/types";

export const createTeacher = async ({
  teacher,
  base64,
}: {
  teacher: TeacherSchemaType;
  base64: string | null;
}) => {
  try {
    const { success, data } = teacherSchema.safeParse(teacher);
    if (!success) {
      return { message: "Invalid data !" };
    }

    //insert data
    const [teacherData] = await db
      .insert(teachers)
      .values({
        name: data.fullName,
        phone: data.phone_number,
        salaryAmount: Number(data.salary),
        educationDes: data.education_des,
        email: data.email,
      })
      .returning();

    if (base64) {
      const imgInfo = await uploadToCloude({
        base64,
        folder: "teacher",
      });

      await db
        .update(teachers)
        .set({ imageUrl: imgInfo.secure_url, imagePublicId: imgInfo.public_id })
        .where(eq(teachers.id, teacherData.id));
    }
    return { message: "New Teacher Created " };
  } catch (error) {
    return handleServerError(error);
  }
};
export const updateTeacher = async ({
  teacher,
  base64,
}: {
  teacher: EditTeacherSchemaType;
  base64: string | null;
}) => {
  try {
    const { success, data } = editTeacherSchema.safeParse(teacher);
    if (!success) {
      return { message: "Invalid data !" };
    }

    // delete existed profile,
    if (base64) {
      if (teacher.imagePublicId) {
        await deleteFromCloude(teacher.imagePublicId);
      }
    }

    // updation new images
    let imageInfo: UploadImageType = { public_id: "", secure_url: "" };
    if (base64) {
      const imgInfo = await uploadToCloude({
        base64,
        folder: "teacher",
      });
      imageInfo = imgInfo;
    } else {
      imageInfo = {
        public_id: teacher.imagePublicId!,
        secure_url: teacher.imageUrl!,
      };
    }

    //insert data
    await db
      .update(teachers)
      .set({
        name: data.name,
        phone: data.phone,
        salaryAmount: Number(data.salaryAmount),
        educationDes: data.educationDes,
        email: data.email,
        imageUrl: imageInfo.secure_url,
        imagePublicId: imageInfo.public_id,
      })
      .where(eq(teachers.id, teacher.id));
    return { message: " Teacher Info Updated " };
  } catch (error) {
    return handleServerError(error);
  }
};

export async function getAllTeachers() {
  return await db.select().from(teachers).orderBy(desc(teachers.createdAt));
}
export async function deleteTeacher({ teacherId }: { teacherId: string }) {
  try {
    const [teacher] = await db
      .select({ publicId: teachers.imagePublicId })
      .from(teachers)
      .where(eq(teachers.id, teacherId));
    if (!teacher) {
      return { error: "teacher not found !" };
    }
    if (teacher.publicId) {
      await deleteFromCloude(teacher.publicId);
    }

    await db.delete(teachers).where(eq(teachers.id, teacherId));
    return { message: " Teacher Deleted " };
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getTeacherSalaryPaginated(
  limit: number = 10,
  offset: number = 0,
  teacherId: string
) {
  return await db
    .select()
    .from(salaryPayments)
    .orderBy(desc(salaryPayments.createdAt))
    .limit(limit)
    .offset(offset)
    .where(eq(salaryPayments.teacherId, teacherId));
}

// Delete Donation
export async function deleteSalaryRecords(id: string) {
  await db.delete(salaryPayments).where(eq(salaryPayments.id, id));
}

export const createTeacherSalary = async ({
  info,
  teacherId,
}: {
  info: SalaryTeacherSchemaType;
  teacherId: string;
}) => {
  try {
    const { success, data } = salaryTeacherSchema.safeParse(info);
    if (!success) {
      return { message: "Invalid data !" };
    }

    //insert data
    await db.insert(salaryPayments).values({
      amountPaid: Number(data.amount),
      paymentMethod: data.method,
      bonus: Number(data.bonus),
      teacherId,
      notes: data.notes ? data.notes : "",
    });

    return { message: "New Records Created " };
  } catch (error) {
    return handleServerError(error);
  }
};
export const updateTeacherSalary = async ({
  info,
  recordId,
}: {
  info: SalaryTeacherSchemaType;
  recordId: string;
}) => {
  try {
    const { success, data } = salaryTeacherSchema.safeParse(info);
    if (!success) {
      return { message: "Invalid data !" };
    }

    //insert data
    await db
      .update(salaryPayments)
      .set({
        amountPaid: Number(data.amount),
        paymentMethod: data.method,
        bonus: Number(data.bonus),
        notes: data.notes ? data.notes : "",
      })
      .where(eq(salaryPayments.id, recordId));

    return { message: " Record Updated " };
  } catch (error) {
    return handleServerError(error);
  }
};
