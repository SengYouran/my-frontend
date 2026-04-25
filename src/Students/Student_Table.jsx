import { useNavigate } from "react-router-dom";
import { useDataContext } from "../Context";

function Student_Table({ activeStudnet, setViews }) {
  const { getDetailStudent, setFormStudent, updateStudentInfomation } =
    useDataContext();//write updatestudent more
  const navigate = useNavigate();
  function DetailStudent(id) {
    navigate(`/students/detail/${id}`);
  }
  return (
    <div className="mt-6">
      {activeStudnet?.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4 min-h-[60vh]">
          <h2 className="text-2xl text-gray-700 font-bold">
            No student records found.
          </h2>
          <p className="text-[15px] text-gray-600 font-medium">
            Student list is currently empty.
          </p>
        </div>
      ) : (
        <table className="border border-gray-200 mt-3 min-w-full text-xs md:text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="xl:p-2 p-1 text-left border-l-2">ID Card</th>
              <th className="xl:p-2 p-1 text-left">Name</th>
              <th className="xl:p-2 p-1 text-left hidden xl:table-cell">
                Gender
              </th>
              <th className="xl:p-2 p-1 text-left hidden md:table-cell">
                Telephone
              </th>
              <th className="xl:p-2 p-1 text-left">Class</th>
              <th className="xl:p-2 p-1 text-left">Book</th>
              <th className="xl:p-2 p-1 text-left">Shift</th>
              <th className="xl:p-2 p-1 text-left hidden xl:table-cell">
                Start Time
              </th>
              <th className="xl:p-2 p-1 text-left hidden xl:table-cell">
                End Time
              </th>
              <th className="xl:p-2 p-1 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {activeStudnet?.map((stu, idx) => (
              <tr
                key={idx}
                className={`${idx % 2 === 0 ? "bg-white" : "bg-gradient-to-r from-blue-50 via-blue-100 to-blue-100"}`}
              >
                <td className="xl:p-2 p-1 border-l-2">{stu?.id_card}</td>
                <td className="xl:p-2 p-1">
                  {stu?.last_name} {stu?.first_name}
                </td>
                <td className="xl:p-2 p-1 hidden xl:table-cell">
                  {stu?.gender}
                </td>
                <td className="xl:p-2 p-1 hidden md:table-cell">
                  {stu?.telephone}
                </td>
                <td className="xl:p-2 p-1">{stu?.class_name}</td>
                <td className="xl:p-2 p-1">{stu?.book_name}</td>
                <td className="xl:p-2 p-1">{stu?.shift}</td>
                <td className="xl:p-2 p-1 hidden xl:table-cell">
                  {stu?.start_time}{" "}
                  {stu?.shift === "Afternoon" || stu?.shift === "Evening"
                    ? "PM"
                    : "AM"}
                </td>
                <td className="xl:p-2 p-1 hidden xl:table-cell">
                  {stu?.end_time}{" "}
                  {stu?.shift === "Afternoon" || stu?.shift === "Evening"
                    ? "PM"
                    : "AM"}
                </td>
                <td className="flex items-center gap-2">
                  <h2
                    onClick={() => {
                      setFormStudent(stu);
                    }}
                    className="bg-yellow-500 px-2 py-1 text-[14px] text-white font-medium rounded-md w-1/3 text-center cursor-pointer"
                  >
                    Edit
                  </h2>
                  <h2
                    onClick={() => {
                      DetailStudent(stu?.student_id);
                      setViews(true);
                      getDetailStudent(stu?.student_id);
                    }}
                    className="text-white cursor-pointer w-1/3 text-center text-[14px] bg-green-500 m-2 font-medium px-2 py-1 rounded-md"
                  >
                    {stu?.is_active === 1 ? "Detail" : "Deactive"}
                  </h2>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Student_Table;
