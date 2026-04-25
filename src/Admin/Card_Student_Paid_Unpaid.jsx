import React from "react";
import { useDataContext } from "../Context";
import useInViewAnime from "../Hook/useInViewAnime";
import useCountUp from "../Hook/useCountUp";

function Card_Student_Paid_Unpaid() {
  const { totalPaidUnpaid, total_expenses } = useDataContext();

  // Cards definition for scalable mapping (colors and gradients untouched)
  const cards = [
    {
      title: "Total Expenses",
      value: total_expenses?.total_expenses,
      subtitle: "Financial Overview",
      icon: "fas fa-hand-holding-usd",
      bgGradient: "from-blue-400 via-blue-500 to-purple-600",
      shadow: "shadow-[0_4px_10px_rgba(59,130,246,0.2)]",
      valueColor: "text-black",
    },
    {
      title: "Paid Students",
      value: totalPaidUnpaid?.total_paid_active,
      subtitle: "Successfully Paid",
      icon: "fa-solid fa-circle-check",
      bgGradient: "from-green-400 to-green-600",
      shadow: "shadow-[0_4px_10px_rgba(34,197,94,0.2)]",
      valueColor: "text-green-600",
    },
    {
      title: "Unpaid Students",
      value: totalPaidUnpaid?.total_unpaid_active,
      subtitle: "Pending Payments",
      icon: "fa-solid fa-triangle-exclamation",
      bgGradient: "from-red-400 to-red-600",
      shadow: "shadow-[0_4px_10px_rgba(239,68,68,0.2)]",
      valueColor: "text-red-600",
    },
    {
      title: "Overdue",
      value: totalPaidUnpaid?.total_overdue,
      subtitle: "Expired & Unpaid",
      icon: "fa-solid fa-clock",
      bgGradient: "from-orange-400 to-orange-600",
      shadow: "shadow-[0_4px_10px_rgba(249,115,22,0.2)]",
      valueColor: "text-orange-600",
    },
  ];
  const cardRefs = useInViewAnime("active", 50, [cards]);
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card, index) => {
        const animeValue = useCountUp(card.value, 1200 + index * 200);
        return (
          <div
            key={index}
            style={{ transitionDelay: `${index * 0.2}s` }}
            className={`bg-white ${card.shadow} px-3 py-8 rounded-xl flex justify-center items-center gap-3
          transition-all transform duration-200 hover:-translate-y-2`}
            ref={(el) => (cardRefs.current[index] = el)}
          >
            <div
              className={`bg-gradient-to-r ${card.bgGradient} w-12 h-12 flex justify-center items-center rounded-full`}
            >
              <i className={`${card.icon} text-xl text-white`}></i>
            </div>
            <div>
              <h3 className="text-[12px] md:text-[14px] text-gray-500 font-medium">
                {card.title}
              </h3>
              <h2
                className={`text-sm md:text-xl font-bold text-gray-900 ${card.valueColor}`}
              >
                {index === 0 && "$"}
                {animeValue.toLocaleString()}
              </h2>
              <p className="text-[10px] md:text-[13px] text-gray-500">
                {card.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Card_Student_Paid_Unpaid;
