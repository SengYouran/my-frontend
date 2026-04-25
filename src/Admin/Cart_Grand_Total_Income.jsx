import React from "react";
import { useDataContext } from "../Context";
import useInViewAnime from "../Hook/useInViewAnime";
import useCountUp from "../Hook/useCountUp";

function Grand_Total_Income() {
  const { amount } = useDataContext();

  const cards = [
    {
      title: "Total Income",
      value: amount?.total_income || 0,
      icon: "fa-dollar-sign",
      bgGradient: "from-blue-400 via-blue-500 to-purple-600",
      shadow: "shadow-[0_4px_10px_rgba(59,130,246,0.2)]",
    },
    {
      title: "Net Profit",
      value: amount?.net_profit || 0,
      icon: "fa-dollar-sign",
      bgGradient: "from-red-400 via-red-500 to-red-600",
      shadow: "shadow-[0_4px_10px_rgba(239,68,68,0.3)]",
    },
    {
      title: "Total Register",
      value: amount?.total_amount_month_year || 0,
      icon: "fa-dollar-sign",
      bgGradient: "from-blue-400 via-blue-500 to-purple-600",
      shadow: "shadow-[0_4px_10px_rgba(59,130,246,0.2)]",
    },
    {
      title: "Total Transport",
      value: amount?.total_transport_month_year || 0,
      icon: "fa-van-shuttle",
      bgGradient: "from-cyan-400 via-blue-500 to-indigo-600",
      shadow: "shadow-[0_4px_10px_rgba(59,130,246,0.2)]",
    },
  ];

  const cardRefs = useInViewAnime("active", 50, [cards]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card, index) => {
        const animatedValue = useCountUp(card.value, 1200 + index * 200);

        return (
          <div
            key={index}
            style={{ transitionDelay: `${index * 0.15}s` }}
            className={`bg-white ${card.shadow} px-3 py-8 rounded-xl flex justify-center items-center gap-3
            transition-all transform duration-200 hover:-translate-y-2`}
            ref={(el) => (cardRefs.current[index] = el)}
          >
            {/* Icon */}
            <div
              className={`bg-gradient-to-r ${card.bgGradient} w-12 h-12 flex justify-center items-center rounded-full`}
            >
              <i className={`fa-solid ${card.icon} text-xl text-white`}></i>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-[12px] text-sm text-gray-500 font-medium tracking-wide">
                {card.title}
              </h3>

              {/* 💰 Animated Value */}
              <h2 className="text-sm md:text-xl font-bold text-gray-900">
                ${animatedValue.toLocaleString()}
              </h2>

              <p className="text-[11px] md:text-[13px] text-gray-500">
                Financial Overview
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Grand_Total_Income;
