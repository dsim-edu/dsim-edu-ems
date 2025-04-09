CREATE TABLE "student_fees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"meal_fees" integer NOT NULL,
	"education_fees" integer NOT NULL,
	"month" text NOT NULL,
	"year" text,
	"student_id" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "student_fees" ADD CONSTRAINT "student_fees_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "education_fees";--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "meal_fees";