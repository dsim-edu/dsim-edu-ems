CREATE TYPE "public"."donation_type" AS ENUM('General Donation', 'Zakat', 'Sadaqah', 'Monthly Donation', 'Fitra', 'One-Time Donation', 'Mosque Donation', 'Foreign Donation', 'Scholarship Donation', 'Organization Donation');--> statement-breakpoint
CREATE TABLE "donations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"donation_type" "donation_type" NOT NULL,
	"is_money" text NOT NULL,
	"amount" integer,
	"donation_details" text NOT NULL,
	"donor_name" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
