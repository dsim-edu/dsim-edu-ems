ALTER TABLE "student_fees" DROP CONSTRAINT "student_fees_student_id_students_id_fk";
--> statement-breakpoint
ALTER TABLE "student_fees" ADD CONSTRAINT "student_fees_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;