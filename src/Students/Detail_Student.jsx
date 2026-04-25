import React from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../Context";

function Detail_Student() {
  const { setViews, infoDetailStudent, detaiStudentlLoading } =
    useDataContext();

  const navigate = useNavigate();
  const student = infoDetailStudent?.[0];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div>
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Student Profile
            </h2>
            <p className="text-sm text-gray-500">
              Detail information of student
            </p>
          </div>

          <button
            onClick={() => {
              navigate("/students");
              setViews(false);
            }}
            className="cursor-pointer px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition"
          >
            ← Back
          </button>
        </div>

        {/* BODY */}
        {detaiStudentlLoading ? (
          <div className="p-10 text-center">Loading...</div>
        ) : student ? (
          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT PROFILE */}
            <div className="bg-gradient-to-br from-indigo-300 to-blue-400 text-white rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-white text-indigo-600 flex items-center justify-center text-2xl font-bold mb-4">
                {student.first_name?.charAt(0)}
              </div>

              <h3 className="text-xl font-medium text-blue-950">
                {student.first_name} {student.last_name}
              </h3>

              <p className="text-sm text-blue-900 font-medium">{student.gender}</p>

              {/* LEVEL */}
              <div className="mt-4 px-4 py-1 text-sm bg-white text-indigo-600 rounded-full font-medium">
                Level {student.level}
              </div>

              {/* POINTS */}
              <div className="mt-3 text-xl font-medium">
                 {student.total_points} Points
              </div>
            </div>

            {/* RIGHT DETAILS */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card label="First Name" value={student.first_name} />
              <Card label="Last Name" value={student.last_name} />
              <Card label="Gender" value={student.gender} />
              <Card label="Phone" value={student.telephone} />
              <Card label="Date of Birth" value={student.dob?.slice(0, 10)} />
              <Card label="Address" value={student.address} />
              <Card label="Book" value={student.book_name} />
              <Card label="Level" value={student.level} />
              <Card label="Total Points" value={student.total_points} />
            </div>
          </div>
        ) : (
          <div className="p-10 text-center text-gray-500">No student data</div>
        )}
      </div>
    </div>
  );
}

export default Detail_Student;

/* CARD */
function Card({ label, value }) {
  return (
    <div className="p-4 rounded-xl border bg-gray-50 hover:shadow-md transition">
      <p className="text-xs text-gray-400 uppercase">{label}</p>
      <p className="text-sm font-semibold text-gray-800 mt-1">{value || "-"}</p>
    </div>
  );
}
