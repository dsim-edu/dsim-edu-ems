"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import { useDeleteDonation, useDonations } from "../hooks/use-donations";

import { useState } from "react";
import EditDonationForm from "./EditDonationForm";

export default function DonationList() {
  const [delationId, setDeletionId] = useState<string>("");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useDonations();
  const deleteMutation = useDeleteDonation();

  const donations = data?.pages.flat() || [];

  return (
    <div className="max-w-2xl mx-auto md:p-4 backdrop-blur-sm text-gray-300">
      <h2 className="text-2xl font-bold mb-4 text-white">Donation Records</h2>

      {isPending ? (
        <div className="w-full flex items-center justify-start">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : donations && donations.length === 0 ? (
        <p className="text-gray-500">No donations found.</p>
      ) : (
        <ul className="space-y-4">
          {donations.map((donation) => (
            <li key={donation.id} className="border p-4 rounded-md shadow-sm">
              <p className="font-semibold text-white">
                {donation.donationType}
              </p>
              <p>
                <span className="font-medium">Donor:</span> {donation.donorName}
              </p>
              {donation.isMoney === "money" && (
                <p>
                  <span className="font-medium ">Amount:</span>{" "}
                  <span className="font-bold text-green-500">
                    {donation.amount}
                  </span>{" "}
                  taka
                </p>
              )}
              <p>
                <span className="font-medium">Details:</span>{" "}
                {donation.donationDetails}
              </p>
              <p className="text-sm text-blue-500">
                <span className="font-medium">Created At:</span>{" "}
                {donation.createdAt.toDateString()}
              </p>
              {donation.updatedAt.toDateString() !==
                donation.createdAt.toDateString() && (
                <p className="text-sm text-yellow-500">
                  <span className="font-medium">Updated At:</span>{" "}
                  {donation.updatedAt.toDateString()}
                </p>
              )}
              <div className="flex gap-2 mt-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="cursor-pointer">Edit</Button>
                  </DialogTrigger>
                  <DialogTitle></DialogTitle>
                  <DialogContent>
                    <EditDonationForm
                      donation={{
                        donationDetails: donation.donationDetails,
                        donationType: donation.donationType,
                        donorName: donation.donationType,
                        isMoney: donation.isMoney as "money" | "other",
                        amount: donation.amount ? String(donation.amount) : "0",
                      }}
                      id={donation.id}
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  className="cursor-pointer"
                  variant="destructive"
                  onClick={() => {
                    setDeletionId(donation.id);
                    deleteMutation.mutate(donation.id);
                  }}
                  disabled={
                    deleteMutation.isPending && delationId === donation.id
                  }
                >
                  {deleteMutation.isPending && delationId === donation.id
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
