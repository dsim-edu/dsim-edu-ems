import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CustomBtn } from "@/components/ui/custom-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudent } from "../../server/student.action";
import { showMessageOrError } from "@/lib/show-message-error";

const DeleteStudentModal = ({
  children,
  imagePublicId,
  studentId,
}: {
  children: ReactNode;
  imagePublicId: string | null;
  studentId: string;
}) => {
  const qc = useQueryClient();
  const [text, setText] = useState<string>("");

  const { isPending, mutate } = useMutation({
    mutationFn: deleteStudent,
    onSuccess: async (info) => {
      await showMessageOrError(info, qc, ["table_students"]);
    },
  });

  function onSubmit() {
    mutate({ imagePublicId, studentId });
  }
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            NB: if you delete, it will also delete all the neccessary info which
            has associated with this student. eg: palyment history.
          </DialogDescription>
          <div>
            <h1 className="mt-3 mb-1 text-blue-500 text-sm ">
              Write &quot;<span className="text-gray-400">delete</span>&quot;
              below to delete this student.
            </h1>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ener Delete Text"
            />
            <CustomBtn
              onClick={onSubmit}
              pending={isPending}
              disabled={text !== "delete" || isPending}
              className="my-2"
              variant={"destructive"}
            >
              Delete
            </CustomBtn>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteStudentModal;
