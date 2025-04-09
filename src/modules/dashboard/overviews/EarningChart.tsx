"use client";

import { useQueries } from "@tanstack/react-query";
import { CircleChart } from "./CircleChart";
import { getAllEarnings } from "./server/analytics.action";
import { useAmountStore } from "./store/use-amount";

export default function EarningChart() {
  const { setEarnings } = useAmountStore();
  const results = useQueries({
    queries: [
      {
        queryKey: ["donationsData"],
        queryFn: async () => {
          const data = await getAllEarnings();
          setEarnings(data.totalAmountsFormDonation);
          return { totalAmountsFormDonation: data.totalAmountsFormDonation };
        },
      },
      {
        queryKey: ["admissionPayments"],
        queryFn: async () => {
          const data = await getAllEarnings();
          setEarnings(data.totalAmountsAddmissionTimePayment);
          return {
            totalAmountsAddmissionTimePayment:
              data.totalAmountsAddmissionTimePayment,
          };
        },
      },
      {
        queryKey: ["mealFees"],
        queryFn: async () => {
          const data = await getAllEarnings();
          setEarnings(data.mealFees);
          return { mealFees: data.mealFees };
        },
      },
      {
        queryKey: ["educationFees"],
        queryFn: async () => {
          const data = await getAllEarnings();
          setEarnings(data.educationFees);
          return { educationFees: data.educationFees };
        },
      },
    ],
  });

  const [
    { data: donationData, isLoading: donationLoading },
    { data: admissionData, isLoading: admissionLoading },
    { data: mealData, isLoading: mealLoading },
    { data: educationData, isLoading: educationLoading },
  ] = results;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-2">
      {/* Donations */}
      <CircleChart
        title="Total Donations"
        amount={donationData?.totalAmountsFormDonation}
        isPending={donationLoading}
        color="violet"
      />

      {/* Admission Payments */}
      <CircleChart
        title="Total Admission Payments"
        amount={admissionData?.totalAmountsAddmissionTimePayment}
        isPending={admissionLoading}
        color="green"
      />

      {/* Meal Fees */}
      <CircleChart
        title="Total Meal Fees"
        amount={mealData?.mealFees}
        isPending={mealLoading}
        color="tomato"
      />

      {/* education */}
      <CircleChart
        title="Total Education Fees"
        amount={educationData?.educationFees}
        isPending={educationLoading}
        color="aqua"
      />
    </div>
  );
}
