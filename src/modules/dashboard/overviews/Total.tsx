"use client";
import React from "react";
import TotalCard from "./TotalCard";
import { useQuery } from "@tanstack/react-query";
import { getTeacherAndStudentCounts } from "./server/analytics.action";
import Loading from "../components/Loading";
import { useAmountStore } from "./store/use-amount";

const Total = () => {
  const info = useAmountStore();
  const { data, isPending } = useQuery({
    queryKey: ["allteacherAndStudents"],
    queryFn: async () => {
      const data = await getTeacherAndStudentCounts();
      return data;
    },
  });
  if (isPending) {
    return (
      <div className="min-h-[350px] flex items-center justify-center m-auto w-full text-white">
        <Loading />
      </div>
    );
  }

  if (!data) {
    return <div>Nothing to show !</div>;
  }

  const totalEarings = info.earnings.reduce((prev, curr) => prev + curr);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] gap-3 bg-transparent p-2">
      <TotalCard info={[{ title: "Teachers", amount: data.teacherCount }]} />
      <TotalCard info={[{ title: "Students", amount: data.studentCount }]} />
      <TotalCard
        info={[
          { title: "Total Earnings (Taka)", amount: totalEarings },
          { title: "Total Spending (taka)", amount: info.allSpending },
          {
            title: "Total Revenue (taka)",
            amount: totalEarings - info.allSpending,
          },
        ]}
      />
    </div>
  );
};

export default Total;
