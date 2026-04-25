import React, { useEffect } from "react";
import { useDataContext } from "../Context";
import useInViewAnime from "../Hook/useInViewAnime";
import useCountUp from "../Hook/useCountUp";

function Cart_Paymet_Amount() {
  const { amount } = useDataContext();

  // Define cards in array for scalable mapping
  const cards = [
    {
      title: "Total Year",
      value: amount?.total_amount_yearly,
      subtitle: "Financial Overview",
      icon: "fa-solid fa-dollar-sign",
      bgGradient: "from-blue-400 via-blue-500 to-purple-600",
      shadow: "shadow-[0_4px_10px_rgba(59,130,246,0.2)]",
    },
    {
      title: "Total Month",
      value: amount?.total_amount_monthly,
      subtitle: "Financial Overview",
      icon: "fa-solid fa-dollar-sign",
      bgGradient: "from-blue-400 via-blue-500 to-purple-600",
      shadow: "shadow-[0_4px_10px_rgba(59,130,246,0.2)]",
    },
    {
      title: "Total Year Transport",
      value: amount?.total_amount_Yearly_transport,
      subtitle: "Financial  Overview",
      icon: "fa-solid fa-van-shuttle",
      bgGradient: "from-blue-400 via-blue-500 to-purple-600",
      shadow: "shadow-[0_4px_10px_rgba(59,130,246,0.2)]",
    },
    {
      title: "Total Month Transport",
      value: amount?.total_amount_Monthly_transport,
      subtitle: "Financial Overview",
      icon: "fa-solid fa-van-shuttle",
      bgGradient: "from-blue-400 via-blue-500 to-purple-600",
      shadow: "shadow-[0_4px_10px_rgba(59,130,246,0.2)]",
    },
  ];
  const cardRefs = useInViewAnime("active", 50, [cards]);
  useEffect(() => {
    cardRefs.current = [];
  }, [cards]);
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card, index) => {
        const animeValue = useCountUp(card.value, 1200 + index * 200);
        return (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            style={{ transitionDelay: `${index * 0.15}s` }}
            className={`bg-white ${card.shadow} px-3 py-8 rounded-xl flex justify-center items-center gap-3
          transition-all transform duration-200 hover:-translate-y-2`}
          >
            <div
              className={`bg-gradient-to-r ${card.bgGradient} w-12 h-12 flex justify-center items-center rounded-full`}
            >
              <i className={`${card.icon} text-xl text-white`}></i>
            </div>
            <div>
              <h3 className="text-[11px] xl:text-[15px] text-gray-500 font-medium tracking-wide">
                {card.title}
              </h3>
              <h2 className="text-sm xl:text-xl font-bold text-gray-900">
                ${animeValue.toLocaleString()}
              </h2>
              <p className="text-[13px] text-gray-500">{card.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Cart_Paymet_Amount;
