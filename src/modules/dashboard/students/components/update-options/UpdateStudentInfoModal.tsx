"use client";

import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateStudentInfoForm from "./UpdateStudentInfoForm";
import { useMutation } from "@tanstack/react-query";
import { getSingleStudent } from "../../server/student.action";
import Loading from "@/modules/dashboard/components/Loading";

const UpdateStudentInfoModal = ({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) => {
  const { mutate, data, isPending } = useMutation({
    mutationFn: getSingleStudent,
    mutationKey: ["single_student", "table_students"],
  });

  // console.log(data);
  const fetchData = () => {
    if (!data) {
      mutate({ id });
    }
  };

  return (
    <Dialog>
      <DialogTrigger onClick={fetchData}>{children}</DialogTrigger>
      <DialogContent className="h-[92vh] max-w-xl! overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Student form</DialogTitle>
        </DialogHeader>
        {isPending ? (
          <div className="w-full flex items-center justify-center">
            <Loading />
          </div>
        ) : data?.student ? (
          <UpdateStudentInfoForm data={data?.student} />
        ) : (
          <div>Something went Wrong !</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStudentInfoModal;
