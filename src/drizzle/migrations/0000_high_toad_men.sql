CREATE TYPE "public"."class" AS ENUM('first', 'second', 'third', 'fourth', 'fifth');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'other');--> statement-breakpoint
CREATE TYPE "public"."pass_status" AS ENUM('pass', 'fail', 'null');--> statement-breakpoint
CREATE TYPE "public"."session" AS ENUM('jan_2020_dec_2021', 'jan_2022_dec_2023', 'jan_2024_dec_2025');--> statement-breakpoint
CREATE TABLE "students" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"image_url" text NOT NULL,
	"image_public_id" text NOT NULL,
	"father_name" text NOT NULL,
	"mother_name" text NOT NULL,
	"class" "class" NOT NULL,
	"dob" date NOT NULL,
	"gender" "gender" NOT NULL,
	"session" "session" NOT NULL,
	"address" text NOT NULL,
	"physical_condition" text DEFAULT 'normal',
	"admission_time_paid" integer DEFAULT 0,
	"meal_fees" integer DEFAULT 0,
	"boarding_fees" integer DEFAULT 0,
	"gen_roll" serial NOT NULL,
	"pass_status" "pass_status" DEFAULT 'null',
	"result" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "students_gen_roll_unique" UNIQUE("gen_roll")
);
