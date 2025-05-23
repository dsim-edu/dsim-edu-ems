import { ENGLISH_MONTHS } from "../constants";
import { sessionRangeEnumType } from "../types";

export function getMonthsBetweenRange(
  sessionRange: sessionRangeEnumType
): string[] {
  if (sessionRange === "no_session") return [];

  const match = sessionRange.match(/january_(\d+)_december_(\d+)/);
  if (!match) throw new Error("Invalid session range format");

  const startYear = parseInt(match[1], 10);

  const months: string[] = [];
  let currentYear = startYear;

  for (const month of ENGLISH_MONTHS) {
    months.push(`${month} ${currentYear}`);
  }

  return months;
}
