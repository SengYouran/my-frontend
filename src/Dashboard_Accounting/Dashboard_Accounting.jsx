import Card_Paid_Unpaid from "./Card_Paid_Unpaid";
import Cart_Paymet_Amount from "./Cart_Paymet_Amount";
import Chart_Expenses from "./Chart_Expenses";
import Chart_Payment_Amount from "./Chart_Payment_Amount";
import Chart_Payment_Transport from "./Chart_Payment_Transport";

function Dashboard_Accounting() {
  return (
    <div className="flex flex-col gap-3 xl:mr-4">
      <div className="flex items-center gap-2">
        <i className="fa-solid fa-gauge text-xl text-gray-700"></i>
        <h2 className="text-xl font-medium text-gray-700">
          Dashboard Overview
        </h2>
      </div>
      <Cart_Paymet_Amount />
      <Card_Paid_Unpaid />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="w-full">
          <Chart_Payment_Amount />
        </div>
        <div className="w-full">
          <Chart_Payment_Transport />
        </div>
      </div>
      <Chart_Expenses />
    </div>
  );
}

export default Dashboard_Accounting;
