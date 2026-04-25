import React from "react";
import { useDataContext } from "../Context";

function Card_Student_Under_Teacher() {
  const { total_students_teacher } = useDataContext();

  // Create an array for cards to map through, cleaner and scalable
  const cards = [
    {
      title: "Total Students",
      value: total_students_teacher?.total_students,
      subtitle: "Current students",
      icon: "fa-users",
      bgGradient: "from-blue-100 via-blue-200 to-blue-300",
      iconColor: "text-blue-600",
    },
    {
      title: "Male Students",
      value: total_students_teacher?.total_male,
      subtitle: "Total students",
      icon: "fa-user-tie",
      bgGradient: "from-green-100 via-green-200 to-green-300",
      iconColor: "text-green-600",
    },
    {
      title: "Female Students",
      value: total_students_teacher?.total_female,
      subtitle: "Total students",
      icon: "fa-user-graduate",
      bgGradient: "from-purple-100 via-purple-200 to-purple-300",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-gradient-to-r ${card.bgGradient} p-2 md:p-4 rounded-xl shadow-md flex items-center gap-2 md:gap-4 transition-transform transform hover:scale-105`}
        >
          <div className="bg-white w-12 h-12 flex justify-center items-center rounded-full shadow">
            <i className={`fa-solid ${card.icon} text-xl ${card.iconColor}`}></i>
          </div>
          <div>
            <h3 className="text-xs md:text-sm font-medium text-gray-700">{card.title}</h3>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{card.value}</h2>
            <p className="text-xs md:text-sm text-gray-500">{card.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card_Student_Under_Teacher;