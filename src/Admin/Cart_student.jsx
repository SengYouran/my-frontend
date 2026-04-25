import React, { useEffect } from "react";
import { useDataContext } from "../Context";
import useInViewAnime from "../Hook/useInViewAnime";
import useCountUp from "../Hook/useCountUp";

function Cart_student() {
  const { summaryTotal_active_student } = useDataContext();

  // Define cards in array for cleaner mapping (no color change)
  const cards = [
    {
      title: "Total Students",
      value: summaryTotal_active_student?.total_students,
      subtitle: "Current students",
      icon: "fa-users",
      bgGradient: "from-blue-400 via-blue-500 to-purple-600",
    },
    {
      title: "Male Students",
      value: summaryTotal_active_student?.total_male,
      subtitle: "Total students",
      icon: "fa-user",
      bgGradient: "from-blue-400 via-blue-500 to-purple-600",
    },
    {
      title: "Female Students",
      value: summaryTotal_active_student?.total_female,
      subtitle: "Total students",
      icon: "fa-user-graduate",
      bgGradient: "from-blue-400 via-blue-500 to-purple-600",
    },
    {
      title: "New Students",
      value: summaryTotal_active_student?.new_students_this_month,
      subtitle: `${summaryTotal_active_student?.percent_growth}% this month`,
      icon: "fa-user-plus",
      bgGradient: "from-blue-400 via-blue-500 to-purple-600",
    },
  ];
  const cardRefs = useInViewAnime("active", 50, [cards]);
  useEffect(() => {
    cardRefs.current = [];
  }, [cards]);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card, index) => {
        const animeValue = useCountUp(card.value, 1200 + index * 200);
        return (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            style={{ transitionDelay: `${index * 0.1}s` }}
            className="bg-white shadow-[0_4px_10px_rgba(59,130,246,0.2)] px-3 py-8 rounded-xl flex justify-center items-center gap-3 
          transition-all transform duration-200 hover:-translate-y-2"
          >
            <div
              className={`bg-gradient-to-r ${card.bgGradient} w-12 h-12 flex justify-center items-center rounded-full`}
            >
              <i
                className={`fa-solid ${card.icon} text-xl rounded-xl text-white`}
              ></i>
            </div>
            <div>
              <h3 className="text-[12px] md:text-sm text-gray-500 font-medium">
                {card.title}
              </h3>
              <h2 className="text-sm md:text-xl font-bold text-gray-900">
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

export default Cart_student;
