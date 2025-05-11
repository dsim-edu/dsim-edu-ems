import { CustomBtn } from "@/components/ui/custom-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showMessageOrError } from "@/lib/show-message-error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { RESULTS_ARR } from "../../constants";
import { publishStudentResult } from "../../server/student.action";
import { StudentResultType } from "../../types";

const ProvideResultModal = ({
  children,
  studentId,
  imageUrl,
  userName,
}: {
  children: ReactNode;
  studentId: string;
  imageUrl: string | null;
  userName: string | null;
}) => {
  const qc = useQueryClient();
  const [result, setResult] = useState<StudentResultType | undefined>(
    undefined
  );
  const { isPending, mutate } = useMutation({
    mutationFn: publishStudentResult,
    onSuccess: async (info) => {
      await showMessageOrError(info, qc, ["table_students"]);
    },
  });

  function onSubmit() {
    if (!result) {
      return toast.error("Please select a result !");
    }
    mutate({ result, studentId });
  }
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              src={imageUrl ? imageUrl : "/muslim-user.png"}
              height={80}
              width={80}
              alt="muslim-user"
              className="size-[80px] bg-slate-500 rounded-full object-cover"
            />
            <h1>{userName}</h1>
          </div>
          <div className="flex items-center justify-between">
            <Select value={result} onValueChange={(e) => setResult(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Result" />
              </SelectTrigger>

              <SelectContent>
                {RESULTS_ARR.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <CustomBtn
              pending={isPending}
              disabled={!result || isPending}
              onClick={onSubmit}
              className="py-2!"
              variant={"signature"}
            >
              Publish
            </CustomBtn>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProvideResultModal;
