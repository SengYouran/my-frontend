import React from "react";
import { useDataContext } from "../Context";
import useInViewAnime from "../Hook/useInViewAnime";

function Top_Student_Ranking() {
  const { topRankStudent } = useDataContext();
  const rankRefs = useInViewAnime("active", 50);

  return (
    <div
      ref={(el) => (rankRefs.current[0] = el)}
      style={{ transitionDelay: "0.6s" }}
      className="bg-white rounded-xl p-5 shadow-[0_4px_10px_rgba(75,85,99,.2)] w-full"
    >
      <h3 className="font-medium text-xl text-gray-700 mb-4">
        Top Student Ranking
      </h3>
      <table className="border border-gray-200 mt-3 min-w-full text-sm xl-text[15px]">
        <thead className="bg-gray-200">
          <tr>
            <th className="xl:p-2 p-1 text-left border-l">Name</th>
            <th className="xl:p-2 p-1 text-left hidden sm:table-cell">Book</th>
            <th className="xl:p-2 p-1 text-left">Attendance</th>
            <th className="xl:p-2 p-1 text-left">Question</th>
            <th className="xl:p-2 p-1 text-left">Subject</th>
            <th className="xl:p-2 p-1 text-left">Total</th>
            <th className="xl:p-2 p-1 text-left">Rank</th>
          </tr>
        </thead>
        <tbody>
          {topRankStudent?.map((top, idx) => (
            <tr
              key={top.book_id + idx}
              className={
                idx % 2 === 0
                  ? "bg-white"
                  : "bg-gradient-to-r from-blue-50 via-blue-100 to-blue-100"
              }
            >
              <td className="xl:p-2 p-1 border-l">
                {top.last_name} {top?.first_name}
              </td>
              <td className="xl:p-2 p-1 hidden sm:table-cell">{top?.book_name}</td>
              <td className="xl:p-2 p-1">{top?.total_attendance_points}</td>
              <td className="xl:p-2 p-1">{top?.total_question_points}</td>
              <td className="xl:p-2 p-1">{top?.subject_points}</td>
              <td className="xl:p-2 p-1">{top?.total_points}</td>
              <td className="xl:p-2 p-1">{top?.ranking}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Top_Student_Ranking;
