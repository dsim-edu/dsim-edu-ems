import React from "react";
import EarningChart from "./EarningChart";
import SpendingChart from "./SpendingChart";
import Total from "./Total";

export const DashboardOverView = () => {
  return (
    <div>
      <h1 className="ml-3 text-white">All Earnings</h1>
      <EarningChart />
      <h1 className="ml-3 text-white mb-1 mt-2 ">All Spendings</h1>
      <SpendingChart />
      <h1 className="ml-3 text-white mb-1 mt-2 ">Total</h1>
      <Total />
    </div>
  );
};
