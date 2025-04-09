CREATE TYPE "public"."payment_method" AS ENUM('Hand to Hand', 'bKash', 'Nagad', 'Rocket', 'Bank Transfer', 'Credit Card', 'Debit Card');--> statement-breakpoint
CREATE TABLE "salary_payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"teacher_id" uuid NOT NULL,
	"amount_paid" integer NOT NULL,
	"bonus" integer DEFAULT 0,
	"payment_method" "payment_method" NOT NULL,
	"notes" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teachers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text NOT NULL,
	"salary_amount" integer NOT NULL,
	"total_paid" integer DEFAULT 0,
	"last_paid_at" timestamp,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "teachers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "salary_payments" ADD CONSTRAINT "salary_payments_teacher_id_teachers_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE cascade ON UPDATE no action;