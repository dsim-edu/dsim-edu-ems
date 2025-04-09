import { z } from "zod";
import { spendingSchema } from "../schema/spending.schema";
import { SPENDING_FIELDS } from "../constants";

export type SpendingSchemaType = z.infer<typeof spendingSchema>;
export type SpendingFieldsEnum = (typeof SPENDING_FIELDS)[number];
export type BarchartInfo = {
  amount: number;
  field: SpendingFieldsEnum;
};
