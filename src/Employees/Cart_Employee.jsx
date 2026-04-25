import React from "react";
import { useDataContext } from "../Context";

function Cart_Employee() {
  const { listEmployee, formEmployees } = useDataContext();
  const cards = [
    {
      title: "Total Employee",
      value: listEmployee?.totalDeactive?.active_employees,
      text_color: "text-blue-900",
    },
    {
      title: "Active Employee",
      value: listEmployee?.totalDeactive?.active_employees,
      text_color: "text-green-900",
    },
    {
      title: "Deactive Employee",
      value: listEmployee?.totalDeactive?.deactive_employees,
      text_color: "text-red-900",
    },
  ];
  return (
    <React.Fragment>
      {!formEmployees && (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          {cards?.map((render, idx) => (
            <div
              key={idx}
              className="bg-gray-100 px-6 py-4 rounded-3xl"
            >
              <h2 className="text-sm font-medium text-gray-900">
                {render?.title}
              </h2>
              <h2 className={`text-2xl font-bold ${render.text_color}`}>
                {render?.value}
              </h2>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

export default Cart_Employee;
