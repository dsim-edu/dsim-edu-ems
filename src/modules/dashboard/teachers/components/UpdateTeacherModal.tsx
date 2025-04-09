import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { EditTeacherSchemaType } from "../types/type";
import EditUpdateTeacher from "./UpdateTeacherForm";

export default function UpdateTeacherModal({
  children,
  existedInfo,
}: {
  children: ReactNode;
  existedInfo: EditTeacherSchemaType;
}) {
  return (
    <Dialog>
      <DialogTrigger className="p-2 bg-black/20 rounded-md">
        {children}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <EditUpdateTeacher info={existedInfo} />
      </DialogContent>
    </Dialog>
  );
}
