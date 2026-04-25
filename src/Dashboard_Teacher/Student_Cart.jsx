import React, { useEffect } from "react";
import { useDataContext } from "../Context";
import useInViewAnime from "../Hook/useInViewAnime";
import useCountUp from "../Hook/useCountUp";

function Student_Cart() {
  const { amount } = useDataContext();
  const getGrowthStyle = (value) => {
    if (value > 0) return "text-green-600";
    if (value < 0) return "text-red-600";
    return "text-gray-500";
  };
  const cards = [
    {
      title: "Total Students",
      value: amount?.total_students,
      subtitle: "Current total students",
      icon: "fa-users",
      bgGradient: "from-blue-400 via-blue-500 to-purple-600",
    },
    {
      title: "Male Students",
      value: amount?.total_male,
      subtitle: "Total male students",
      icon: "fa-user",
      bgGradient: "from-blue-400 via-blue-500 to-purple-600",
    },
    {
      title: "Female Students",
      value: amount?.total_female,
      subtitle: "Total female students",
      icon: "fa-user-graduate",
      bgGradient: "from-blue-400 via-blue-500 to-purple-600",
    },
    {
      title: "New Students",
      value: amount?.new_students_this_month,
      subtitle: `${amount?.percent_growth ?? 100}%`,
      someText: "this month",
      colorTxt: getGrowthStyle(amount?.percent_growth ?? 100),
      icon: "fa-user-plus",
      bgGradient: "from-blue-400 via-blue-500 to-purple-600",
    },
  ];
  const cardRefs = useInViewAnime("active", 50, [cards]);
  useEffect(() => {
    cardRefs.current = [];
  }, [cards]);
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
      {cards?.map((card, index) => {
        const animeValue = useCountUp(card.value, 1200 + index * 200);
        return (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            style={{ transitionDelay: `${index * 0.15}s` }}
            className={`bg-white shadow-[0_4px_10px_rgba(59,130,246,0.2)] px-3 py-8 rounded-xl flex justify-center items-center gap-3
            transition-all transform duration-200 hover:-translate-y-2`}
          >
            <div
              className={`bg-gradient-to-r ${card.bgGradient} w-12 h-12 flex justify-center items-center rounded-full`}
            >
              <i
                className={`fa-solid ${card.icon} text-sm xl:text-xl rounded-xl text-white`}
              ></i>
            </div>
            <div>
              <h3 className="text-sm xl:text-[15px] text-gray-600">
                {card.title}
              </h3>
              <h2 className="text-sm xl:text-xl font-bold text-gray-900">
                {animeValue.toLocaleString()}
              </h2>
              <p className={`text-[11px] xl:text-[13px] ${card?.colorTxt} flex items-center gap-2`}>
                {card.subtitle}{" "}
                <p className="text-gray-900">{card?.someText}</p>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Student_Cart;
