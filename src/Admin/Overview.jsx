import React, { useEffect, useState } from "react";
import Cart_student from "./Cart_student";
import AllStudentChart from "./AllStudnetChart";
import Charts_Level from "./Charts_Level";
import Cart_Grand_Total_Income from "./Cart_Grand_Total_Income";
import MonthlyIncomeChart from "./MonthlyIncomeChart";
import Card_Student_Paid_Unpaid from "./Card_Student_Paid_Unpaid";

function Overview() {
  return (
    <div className="m-2 md:mr-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <i className="fa-solid fa-gauge text-xl text-gray-700"></i>
        <h2 className="text-sm md:text-xl font-medium text-gray-700">
          Dashboard Overview
        </h2>
      </div>
      <div>
        <Cart_student />
      </div>
      <div>
        <Cart_Grand_Total_Income />
      </div>
      <Card_Student_Paid_Unpaid />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="">
          <AllStudentChart />
        </div>
        <div className="">
          <Charts_Level />
        </div>
      </div>
      <div>
        <MonthlyIncomeChart />
      </div>
    </div>
  );
}

export default Overview;
