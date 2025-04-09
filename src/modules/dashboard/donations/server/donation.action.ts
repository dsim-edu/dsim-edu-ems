"use server";

import { db } from "@/drizzle/db";
import { handleServerError } from "@/lib/handle-server-error";

import { donations } from "@/drizzle/schema";
import { desc, eq } from "drizzle-orm";
import { donationSchema } from "../schema/donation.schema";
import { DonationValueType } from "../types";

export const createDonation = async ({
  donationInfo,
}: {
  donationInfo: DonationValueType;
}) => {
  try {
    const { success, data } = donationSchema.safeParse(donationInfo);
    if (!success) {
      return { message: "Invalid data !" };
    }

    //insert data
    await db.insert(donations).values({
      donationDetails: data.donationDetails,
      donationType: data.donationType,
      donorName: data.donorName,
      isMoney: data.amount ? "money" : "other",
      amount: data.amount ? Number(data.amount) : 0,
    });
    return { message: "Donation Added " };
  } catch (error) {
    return handleServerError(error);
  }
};

export async function getDonationsPaginated(
  limit: number = 10,
  offset: number = 0
) {
  return await db
    .select()
    .from(donations)
    .orderBy(desc(donations.createdAt))
    .limit(limit)
    .offset(offset);
}

// Delete Donation
export async function deleteDonation(id: string) {
  await db.delete(donations).where(eq(donations.id, id));
}
export async function editDonation({
  id,
  info,
}: {
  info: DonationValueType;
  id: string;
}) {
  try {
    await db
      .update(donations)
      .set({
        amount: info.amount ? Number(info.amount) : 0,
        donationDetails: info.donationDetails,
        donationType: info.donationType,
        donorName: info.donorName,
        isMoney: info.isMoney,
      })
      .where(eq(donations.id, id));

    return { message: "Donation Updated" };
  } catch (error) {
    return handleServerError(error);
  }
}
