"use server";

import { db } from "@/drizzle/db";
import {
  donations,
  spendings,
  studentFees,
  students,
  teachers,
} from "@/drizzle/schema";
import { count } from "drizzle-orm";
import { SPENDING_FIELDS } from "../../spendings/constants";

export async function getAllEarnings() {
  const [donationData, admissionData, studentFeeData] = await Promise.all([
    db.select({ amount: donations.amount }).from(donations),
    db.select({ admissionTimePaid: students.admissionTimePaid }).from(students),
    db
      .select({
        mealFees: studentFees.mealFees,
        educationFees: studentFees.educationFees,
      })
      .from(studentFees),
  ]);

  const totalAmountsFormDonation = donationData.length
    ? donationData.reduce((acc, item) => acc + (item.amount ?? 0), 0)
    : 0;

  const totalAmountsAddmissionTimePayment = admissionData.length
    ? admissionData.reduce(
        (acc, item) => acc + (item.admissionTimePaid ?? 0),
        0
      )
    : 0;

  const mealFees = studentFeeData.length
    ? studentFeeData.reduce((acc, item) => acc + (item.mealFees ?? 0), 0)
    : 0;

  const educationFees = studentFeeData.length
    ? studentFeeData.reduce((acc, item) => acc + (item.educationFees ?? 0), 0)
    : 0;

  return {
    totalAmountsFormDonation,
    totalAmountsAddmissionTimePayment,
    mealFees,
    educationFees,
  };
}

export const getAllSpendings = async () => {
  const allSpendings = await db
    .select({ amount: spendings.amount, field: spendings.spendingField })
    .from(spendings);

  const allAmount = allSpendings.reduce((prev, current) => {
    return prev + current.amount;
  }, 0);

  const allAmountAndFields = SPENDING_FIELDS.map((item) => {
    const match = allSpendings.find((info) => info.field === item);
    return {
      field: item,
      amount: match?.amount ?? 0,
    };
  });

  return { allAmount, allAmountAndFields };
};
export const getTeacherAndStudentCounts = async () => {
  const [{ studentCount }] = await db
    .select({ studentCount: count() })
    .from(students);
  const [{ teacherCount }] = await db
    .select({ teacherCount: count() })
    .from(teachers);

  return { studentCount, teacherCount };
};
