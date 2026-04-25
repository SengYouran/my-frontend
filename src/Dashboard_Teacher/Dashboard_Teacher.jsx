import Attendance_Chart from "./Attendance_Chart";
import Student_Cart from "./Student_Cart";
import Student_Charts from "./Student_Charts";
import Top_Student_Ranking from "./Top_Student_Ranking";

function Dashboard_Teacher() {
  return (
    <div className="flex flex-col gap-4">
      <Student_Cart />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div >
          <Student_Charts />
        </div>
        <div >
          <Attendance_Chart />
        </div>
      </div>
      <div className="">
        <Top_Student_Ranking />
      </div>
    </div>
  );
}

export default Dashboard_Teacher;
