"use server";

import { db } from "@/drizzle/db";
import { handleServerError } from "@/lib/handle-server-error";

import { spendings } from "@/drizzle/schemas/spending";
import { desc, eq } from "drizzle-orm";
import { spendingSchema } from "../schema/spending.schema";
import { SpendingSchemaType } from "../types/type";

export const createSpending = async ({
  spendingInfo,
}: {
  spendingInfo: SpendingSchemaType;
}) => {
  try {
    const { success, data } = spendingSchema.safeParse(spendingInfo);
    if (!success) {
      return { message: "Invalid data !" };
    }

    //insert data
    await db.insert(spendings).values({
      amount: Number(data.amount),
      month: data.month,
      spendingDetails: data.spendingDetails,
      spendingField: data.spendingField,
      year: data.year,
    });
    return { message: "Spendings Added " };
  } catch (error) {
    return handleServerError(error);
  }
};

export async function getSpendingsPaginated(
  limit: number = 10,
  offset: number = 0
) {
  return await db
    .select()
    .from(spendings)
    .orderBy(desc(spendings.createdAt))
    .limit(limit)
    .offset(offset);
}

// Delete Donation
export async function deleteSpending(id: string) {
  await db.delete(spendings).where(eq(spendings.id, id));
}

export async function editSpendings({
  id,
  info,
}: {
  info: SpendingSchemaType;
  id: string;
}) {
  try {
    await db
      .update(spendings)
      .set({
        amount: Number(info.amount),
        month: info.month,
        spendingDetails: info.spendingDetails,
        spendingField: info.spendingField,
        year: info.year,
      })
      .where(eq(spendings.id, id));

    return { message: "Spending Updated" };
  } catch (error) {
    return handleServerError(error);
  }
}
