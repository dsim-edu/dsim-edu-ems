ALTER TABLE "students" ADD COLUMN "gen_roll" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_gen_roll_unique" UNIQUE("gen_roll");