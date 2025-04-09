"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, LoaderCircle, Trash2 } from "lucide-react";
import Image from "next/image";
// import UpdateTeacherModal from "./UpdateTeacherModal"; // Separate component for update modal
import { CustomBtn } from "@/components/ui/custom-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { showMessageOrError } from "@/lib/show-message-error";
import { format } from "date-fns";
import Link from "next/link";
import { deleteTeacher, getAllTeachers } from "../server/teacher.action";
import GiveSalaryForm from "./GiveSalaryForm";
import UpdateTeacherModal from "./UpdateTeacherModal";

export default function TeachersList() {
  const qc = useQueryClient();
  const {
    data: teachers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["teachers"],
    queryFn: getAllTeachers,
  });

  // mutations
  const { isPending, mutate } = useMutation({
    mutationFn: deleteTeacher,
    onSuccess: async (info) => {
      await showMessageOrError(info, qc, ["teachers"]);
    },
  });

  if (isLoading)
    return (
      <p className="text-center text-gray-500 px-4">
        <LoaderCircle className="text-white animate-spin" />
      </p>
    );
  if (isError)
    return <p className="text-center text-red-500">Failed to load teachers.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teachers.map((teacher) => (
        <Card
          key={teacher.id}
          className="relative p-4 shadow-lg bg-black/10 backdrop-blur-xs"
        >
          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex gap-2">
            <UpdateTeacherModal
              existedInfo={{
                id: teacher.id,
                educationDes: teacher.educationDes,
                name: teacher.name,
                phone: teacher.phone,
                salaryAmount: teacher.salaryAmount.toString(),
                email: teacher.email ?? undefined,
                imagePublicId: teacher.imagePublicId,
                imageUrl: teacher.imageUrl ?? undefined,
              }}
            >
              <Button variant="ghost" size="icon" asChild>
                <Edit className="w-5 h-5 cursor-pointer text-blue-500" />
              </Button>
            </UpdateTeacherModal>
            <Popover>
              <PopoverTrigger className="p-2 bg-black/20 rounded-md cursor-pointer">
                <Trash2 className="w-5 h-5 text-red-500" />
              </PopoverTrigger>
              <PopoverContent className="flex items-center justify-center flex-col gap-3">
                <p className="text-red-500 text-sm my-4 text-center">
                  NB: This action can&apos;t be undone. This action will also
                  delete all payment records of him.
                </p>
                <CustomBtn
                  pending={isPending}
                  onClick={() => mutate({ teacherId: teacher.id })}
                  variant="destructive"
                  size="icon"
                  className="w-[180px]"
                >
                  Delete Permanently
                </CustomBtn>
              </PopoverContent>
            </Popover>
          </div>

          {/* Profile Image */}
          {teacher.imageUrl ? (
            <div className="flex items-center justify-center">
              <Image
                src={teacher.imageUrl}
                alt={teacher.name}
                width={80}
                height={80}
                className="object-cover rounded-full size-[80px]"
              />
            </div>
          ) : (
            <div className="flex justify-center">
              <Image
                src={"/teacher-user.jpg"}
                alt={"dummy_profile"}
                width={80}
                height={80}
                className="rounded-full object-cover size-[80px]"
              />
            </div>
          )}

          <CardHeader className="text-center">
            <h3 className="text-lg font-semibold">{teacher.name}</h3>
            <p className="text-sm text-gray-400">{teacher.educationDes}</p>
          </CardHeader>

          <CardContent className="text-sm space-y-1">
            <p>
              <span className="font-medium">Email:</span>{" "}
              {teacher.email || "N/A"}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {teacher.phone}
            </p>
            <p>
              <span className="font-medium">Salary:</span>
              <span className="text-blue-500 font-bold text-md ml-2">
                {teacher.salaryAmount} taka
              </span>
            </p>

            <p>
              <span className="font-medium">Last Paid At:</span>{" "}
              {teacher.lastPaidAt
                ? new Date(teacher.lastPaidAt).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <span className="font-medium text-sm text-green-500">
                Last Updated At:
              </span>{" "}
              {format(teacher.updatedAt, "PPPP")}
            </p>
            <GiveSalaryForm name={teacher.name} teacherId={teacher.id} />
            <Link href={`/dashboard/teacher/all/salary-records/${teacher.id}`}>
              <Button variant={"outline"} className="ml-2 cursor-pointer">
                Salary Reocrds
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
