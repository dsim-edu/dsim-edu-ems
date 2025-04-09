CREATE TYPE "public"."month" AS ENUM('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');--> statement-breakpoint
CREATE TYPE "public"."spending_field" AS ENUM('Electric bills', 'Religious Books', 'Educational Materials', 'Tech for Education', 'Library Resources', 'Building Maintenance', 'New Construction', 'Hygiene & Sanitation', 'Student Food & Housing', 'Student Aid', 'Medical Expenses', 'Student Supplies', 'Teacher Training', 'Office Supplies', 'Transportation', 'Community Programs', 'Charity Support', 'Community Education');--> statement-breakpoint
CREATE TYPE "public"."year" AS ENUM('2024', '2025', '2026', '2027', '2028', '2029', '2030');--> statement-breakpoint
CREATE TABLE "spendings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"spending_field" "spending_field" NOT NULL,
	"month" "month" NOT NULL,
	"year" "year" NOT NULL,
	"amount" integer NOT NULL,
	"spending_details" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
