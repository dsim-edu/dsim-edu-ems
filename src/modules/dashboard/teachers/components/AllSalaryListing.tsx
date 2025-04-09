"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";

import { useState } from "react";
import {
  useDeleteSalaryInfo,
  useSalaryRecords,
} from "../hooks/use-salary-record";
import { useParams } from "next/navigation";
import EditSalaryForm from "./EditSalaryForm";

export default function AllSalaryListing() {
  const params = useParams() as { teacher_id: string };

  const [recordId, setRecordId] = useState("");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useSalaryRecords(params.teacher_id);
  const deleteMutation = useDeleteSalaryInfo();

  const salaryInfo = data?.pages.flat() || [];

  return (
    <div className="max-w-2xl mx-auto p-4 backdrop-blur-sm text-gray-300">
      <h2 className="text-2xl font-bold mb-4 text-white">Salary Records</h2>

      {isPending ? (
        <div className="w-full flex items-center justify-start">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : salaryInfo.length === 0 ? (
        <p className="text-gray-500">No salaryInfo found.</p>
      ) : (
        <ul className="space-y-4">
          {salaryInfo.map((salary) => (
            <li key={salary.id} className="border p-4 rounded-md shadow-sm">
              <p>
                <span className="font-medium">Amount:</span> {salary.amountPaid}
              </p>

              <p>
                <span className="font-medium">Bonus:</span>{" "}
                {salary.bonus ? salary.bonus : "N/A"}
              </p>
              <p>
                <span className="font-medium">Payment Method:</span>{" "}
                {salary.paymentMethod}
              </p>
              <p className="text-sm text-yellow-500">
                <span className="font-medium text-gray-300">Salary Notes:</span>{" "}
                {salary.notes}
              </p>
              <p className="text-sm text-blue-500">
                <span className="font-medium">Created At:</span>{" "}
                {salary.createdAt.toDateString()}
              </p>
              {salary.updatedAt.toDateString() !==
                salary.createdAt.toDateString() && (
                <p className="text-sm text-yellow-500">
                  <span className="font-medium">Created At:</span>{" "}
                  {salary.updatedAt.toDateString()}
                </p>
              )}
              <div className="flex gap-2 mt-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="cursor-pointer">Edit</Button>
                  </DialogTrigger>
                  <DialogTitle></DialogTitle>
                  <DialogContent>
                    <EditSalaryForm
                      info={{
                        amount: salary.amountPaid.toString(),
                        method: salary.paymentMethod,
                        bonus: salary.bonus
                          ? salary.bonus.toString()
                          : undefined,
                        notes: salary.notes ? salary.notes : undefined,
                      }}
                      recordId={salary.id}
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  className="cursor-pointer"
                  variant="destructive"
                  onClick={() => {
                    setRecordId(salary.id);
                    deleteMutation.mutate(salary.id);
                  }}
                  disabled={deleteMutation.isPending && recordId === salary.id}
                >
                  {deleteMutation.isPending && recordId === salary.id
                    ? "Deleting..."
                    : "Delete"}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {hasNextPage && (
        <div className="flex justify-center mt-4">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
