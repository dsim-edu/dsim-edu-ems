import { ZodError } from "zod";
import { DrizzleError } from "drizzle-orm";
import { DatabaseError, NeonDbError } from "@neondatabase/serverless";

// Function to handle various errors
export function handleServerError(error: unknown) {
  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return {
      status: 400,
      error: "Invalid input data",
      message: "",
      // details: error.flatten().fieldErrors,
    };
  }

  if (error instanceof DatabaseError) {
    console.log(error);

    return {
      status: 500,
      error: error.detail,
      message: "",
    };
  }

  // Handle NeonDB errors (PostgreSQL errors)
  if (error instanceof NeonDbError) {
    if (error.code === "23505") {
      return {
        status: 400,
        error: "please provide a unique name.",
        message: "",
      };
    }
    if (error.code === "23503") {
      return {
        status: 400,
        error: "Foreign key constraint violation.",
        message: "",
      };
    }
    if (error.code === "23502") {
      return {
        status: 400,
        error: "A required field is missing.",
        message: "",
      };
    }
    return { status: 500, error: "Database error occurred.", message: "" };
  }

  // Handle Drizzle ORM errors
  if (error instanceof DrizzleError) {
    return { status: 500, error: "Database query error." };
  }

  console.log(error);

  // Generic fallback error
  return {
    status: 500,
    error: "Something went wrong. Try again.",
  };
}
