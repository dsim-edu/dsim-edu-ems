"use server";

import { db } from "@/drizzle/db";
import { students } from "@/drizzle/schemas/students";
import { handleServerError } from "@/lib/handle-server-error";
import { deleteFromCloude, uploadToCloude } from "@/lib/upload-image";
import { SortingState } from "@tanstack/react-table";
import { and, asc, count, desc, eq, ilike, SQL } from "drizzle-orm";
import { AddStudentSchema } from "../schema/student.schema";
import {
  AddStudentSchemaType,
  courseEnumType,
  DBStudentType,
  sessionRangeEnumType,
} from "../types";
import { RESULTS_ARR } from "../constants";

export const createStudent = async ({
  student,
  base64,
}: {
  student: AddStudentSchemaType;
  base64: string | null;
}) => {
  try {
    const { success, data } = AddStudentSchema.safeParse(student);
    if (!success) {
      return { message: "Invalid data !" };
    }

    const imgInfo = await uploadToCloude({
      base64,
      folder: "student",
    });

    let lastStudentRoll = 0;
    if (data.course) {
      const [lastStudent] = await db
        .select({ genRoll: students.genRoll })
        .from(students)
        .where(
          and(
            eq(students.course, data.course),
            eq(students.sessionRange, data.session_range)
          )
        )
        .orderBy(desc(students.genRoll))
        .limit(1);
      if (lastStudent) {
        lastStudentRoll = lastStudent.genRoll;
      }
    }
    //insert data
    await db.insert(students).values({
      name: data.name,
      fatherName: data.fatherName,
      motherName: data.motherName,
      address: data.address!,
      course: data.course!,
      dataOfBirth: data.dateOfBirth,
      gender: data.gender!,
      genRoll: lastStudentRoll + 1,
      imageUrl: imgInfo.secure_url,
      imagePublicId: imgInfo.public_id,
      sessionRange: data.session_range!,
      admissionTimePaid: Number(data.admissionTimePaid),
    });
    return { message: "New Student Created " };
  } catch (error) {
    return handleServerError(error);
  }
};

export const getSingleStudent = async ({ id }: { id: string }) => {
  try {
    const [student] = await db
      .select()
      .from(students)
      .where(eq(students.id, id));

    return { student };
  } catch (error) {
    console.log(error);

    return { student: null };
  }
};

export const updateStudent = async ({
  student,
  base64,
}: {
  student: DBStudentType;
  base64: string | null;
}) => {
  try {
    const imgInfo = await uploadToCloude({
      base64,
      folder: "student",
    });
    if (!student.imageUrl && student.imagePublicId) {
      await deleteFromCloude(student.imagePublicId!);
    }

    const studentInfo: DBStudentType = {
      ...student,
      imageUrl: student.imageUrl || imgInfo.secure_url,
      imagePublicId: student.imageUrl
        ? student.imagePublicId
        : imgInfo.public_id,
    };

    //insert data
    await db
      .update(students)
      .set(studentInfo)
      .where(eq(students.id, student.id));
    return { message: " Student Updated " };
  } catch (error) {
    return handleServerError(error);
  }
};

// query
export const getStudentsForTable = async ({
  limit,
  offset,
  search,
  sorting,
  course,
  sessionRange,
}: {
  limit: number;
  offset: number;
  search?: string;
  sorting?: SortingState;
  course: courseEnumType | "all";
  sessionRange: sessionRangeEnumType | "all";
}) => {
  try {
    const studentQuery = db
      .select({
        id: students.id,
        imageUrl: students.imageUrl,
        imagePublicId: students.imagePublicId,
        name: students.name,
        roll: students.genRoll,
        sessionRange: students.sessionRange,
        course: students.course,
        result: students.result,
      })
      .from(students);

    const conditions = [];
    if (search) {
      conditions.push(ilike(students.name, `%${search}%`));
    }

    if (course !== "all") {
      conditions.push(eq(students.course, course));
    }

    if (sessionRange !== "all") {
      conditions.push(eq(students.sessionRange, sessionRange));
    }

    if (conditions.length) {
      studentQuery.where(and(...conditions));
    }

    let sortInfo: SQL<unknown> | null = null;
    if (sorting?.length) {
      if (sorting[0].id === "name") {
        sortInfo = sorting[0].desc ? desc(students.name) : asc(students.name);
      }

      if (sortInfo) {
        studentQuery.orderBy(sortInfo);
      }
    }
    const allStudents = await studentQuery.limit(limit).offset(offset);

    const [{ studentCount }] = await db
      .select({ studentCount: count() })
      .from(students)
      .where(and(...conditions));

    return {
      allStudents,
      studentCount,
    };
  } catch (error) {
    return handleServerError(error);
  }
};

export const publishStudentResult = async ({
  result,
  studentId,
}: {
  result: (typeof RESULTS_ARR)[number];
  studentId: string;
}) => {
  try {
    await db.update(students).set({ result }).where(eq(students.id, studentId));
    return { message: "Result published" };
  } catch (error) {
    return handleServerError(error);
  }
};

export const deleteStudent = async ({
  studentId,
  imagePublicId,
}: {
  studentId: string;
  imagePublicId: string | null;
}) => {
  try {
    await db.delete(students).where(eq(students.id, studentId));
    if (imagePublicId) {
      await deleteFromCloude(imagePublicId);
    }
    return { message: "Student Deleted" };
  } catch (error) {
    return handleServerError(error);
  }
};
