import { z } from "zod";
import { donationSchema } from "../schema/donation.schema";

export type DonationValueType = z.infer<typeof donationSchema>;
