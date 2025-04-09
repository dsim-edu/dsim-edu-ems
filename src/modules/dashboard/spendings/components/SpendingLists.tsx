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
import { useDeleteSpending, useSpendings } from "../hooks/use-spending";
import EditSpendingForm from "./EditSpendingForm";

export default function SpendingLists() {
  const [delationId, setDeletionId] = useState<string>("");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useSpendings();
  const deleteMutation = useDeleteSpending();

  const spendings = data?.pages.flat() || [];

  return (
    <div className="max-w-2xl mx-auto md:p-4 backdrop-blur-sm text-gray-300">
      <h2 className="text-2xl font-bold mb-4 text-white">Spending Records</h2>

      {isPending ? (
        <div className="w-full flex items-center justify-start">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : spendings.length === 0 ? (
        <p className="text-gray-500">No spendings found.</p>
      ) : (
        <ul className="space-y-4">
          {spendings.map((spending) => (
            <li key={spending.id} className="border p-4 rounded-md shadow-sm">
              <p className="font-semibold text-white">
                {spending.spendingField}
              </p>
              {spending.spendingDetails && (
                <p className="font-semibold text-slate-400 text-sm">
                  Desc : {spending.spendingDetails}
                </p>
              )}

              <p>
                <span className="font-medium ">Amount:</span>{" "}
                <span className="font-bold text-green-500">
                  {spending.amount}
                </span>{" "}
                taka
              </p>
              <h2>
                For : <span>{spending.month}</span>,{" "}
                <span>{spending.year}</span>
              </h2>
              <div className="flex gap-2 mt-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="cursor-pointer">Edit</Button>
                  </DialogTrigger>
                  <DialogTitle></DialogTitle>
                  <DialogContent>
                    <EditSpendingForm
                      spending={{
                        amount: spending.amount.toString(),
                        month: spending.month,
                        spendingField: spending.spendingField,
                        year: spending.year,
                        spendingDetails: spending.spendingDetails ?? undefined,
                      }}
                      id={spending.id}
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  className="cursor-pointer"
                  variant="destructive"
                  onClick={() => {
                    setDeletionId(spending.id);
                    deleteMutation.mutate(spending.id);
                  }}
                  disabled={
                    deleteMutation.isPending && delationId === spending.id
                  }
                >
                  {deleteMutation.isPending && delationId === spending.id
                    ? "Deleting..."
                    : "Delete"}
                </Button>
              </div>
              <div className="mt-2  *:text-xs *:text-blue-500">
                <h4>Added At : {spending.createdAt.toLocaleString()}</h4>
                {spending.createdAt.toString() !==
                  spending.updatedAt.toString() && (
                  <h4 className="text-yellow-500!">
                    Edited At : {spending.updatedAt.toLocaleString()}
                  </h4>
                )}
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
