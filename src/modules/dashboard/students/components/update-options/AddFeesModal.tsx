import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import AddFeesForm from "./AddFeesForm";
import { sessionRangeEnumType } from "../../types";

const AddFeesModal = ({
  children,
  session,
  studentId,
}: {
  children: ReactNode;
  session: sessionRangeEnumType;
  studentId: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <AddFeesForm studentId={studentId} session={session} />
      </DialogContent>
    </Dialog>
  );
};

export default AddFeesModal;
