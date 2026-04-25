import { useState } from "react";
import { useDataContext } from "../Context";
import Student_Table from "./Student_Table";
import Student_Attendance_Form from "./Student_Attendance_Form";
import StudentAttendanceTabs from "./StudentAttendanceTabs";
import ListStudentAttendance from "./ListStudentAttendance";
import Form_Point from "./Form_Point";
import ListStudentPoint from "./ListStudentPoint";
import SearchStudent from "./SearchStudent";
import Pagination from "../Pagination/Pagination";
import Card_Student_Under_Teacher from "./Card_Student_Under_Teacher";
import SkeletonStudentTable from "./SkeletonStudentTable";

function Student_list() {
  const {
    newStudent,
    loading,
    showAttendance,
    setShowAttendance,
    handleAttendance,
    formAttendance,
    handleChangeStudentAttendance,
    teacher,
    showPoint,
    setShowPoint,
    teacher_ID,
    setTeacher_ID,
    auth,
    dataStudent,
    pages,
    studentPaginate,
    updatePage,
    localLoading,
    setViews,
    views,
    active,
    setActive,
  } = useDataContext();
  const end = Math.min(
    pages.student.page * studentPaginate?.limit,
    studentPaginate?.totalPages,
  );
  if (views) return null;

  function renderStudent() {
    if (auth?.role === "Admin") {
      if (localLoading) {
        return <SkeletonStudentTable active={active} />;
      } else {
        return (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 my-4">
              {teacher?.map((render, idx) => (
                <div
                  className={`${render?.employee_id === teacher_ID ? "text-white bg-gradient-to-r from-purple-400 via-blue-500 to-blue-600" : "text-black border border-gray-400 hover:bg-gray-200 "} 
                rounded-md px-3 p-1 cursor-pointer`}
                  onClick={() => {
                    setTeacher_ID(render?.employee_id);
                    updatePage("student", 1);
                  }}
                  key={idx}
                >
                  <h2 className="text-[14px] font-medium">
                    {render?.last_name} {render?.first_name}
                  </h2>
                </div>
              ))}
            </div>
            {active === "Attendances" ? (
              <ListStudentAttendance />
            ) : (
              <div>
                <Card_Student_Under_Teacher />
                <Student_Table
                  activeStudnet={dataStudent}
                  setViews={setViews}
                />
                <div className="flex justify-between items-center gap-4 mt-2">
                  <p className="text-sm text-gray-600">
                    Showing {dataStudent?.length === 0 ? 0 : ""} -{" "}
                    {Math.min(end, dataStudent?.length)} of {dataStudent.length}{" "}
                    students
                  </p>

                  <div className="md:mr-4">
                    <Pagination
                      module={"student"}
                      totalPages={studentPaginate?.totalPages}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }
    }
    if (active === "Students") {
      if (localLoading) {
        return <SkeletonStudentTable />;
      }
      return (
        <div>
          <Student_Table activeStudnet={dataStudent} setViews={setViews} />
          <div className="flex justify-between items-center gap-4 mt-2">
            <p className="text-sm text-gray-600">
              Showing {dataStudent?.length === 0 ? 0 : ""} -{" "}
              {Math.min(end, dataStudent?.length)} of {dataStudent.length}{" "}
              students
            </p>

            <div className="md:mr-4">
              <Pagination
                module={"student"}
                totalPages={studentPaginate?.totalPages}
              />
            </div>
          </div>
        </div>
      );
    }
    if (active === "Ranks") {
      if (localLoading) {
        return <SkeletonStudentTable />;
      }
      return <ListStudentPoint auth={auth} />;
    }
    if (active === "Attendances") {
      if (localLoading) {
        return <SkeletonStudentTable />;
      }
      return <ListStudentAttendance />;
    }
  }
  return (
    <div className="flex flex-col">
      {newStudent ? null : (
        <div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-list text-sm md:text-xl text-gray-700"></i>
              <h2 className="text-sm md:text-xl font-bold text-gray-700">
                Students List
              </h2>
            </div>
            {auth?.role === "Teacher" && (
              <div className="flex items-center gap-2">
                <div
                  onClick={() => setShowAttendance(true)}
                  className="bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 px-3 hover:opacity-80 py-1 rounded-md cursor-pointer"
                >
                  <h2 className="text-center text-white">Add Attendance</h2>
                </div>
                <div
                  onClick={() => setShowPoint(true)}
                  className="bg-gradient-to-r from-purple-400 via-blue-500 to-blue-600 px-3 hover:opacity-80 py-1 rounded-md cursor-pointer"
                >
                  <h2 className="text-center text-white">Add Point</h2>
                </div>
              </div>
            )}
          </div>
          {/**Student search */}
          <div className="my-2">
            <SearchStudent />
          </div>
          {/**tabs */}
          <div>
            <StudentAttendanceTabs active={active} setActive={setActive} />
          </div>
          {renderStudent()}
          <div className={`${showAttendance ? "block" : "hidden"}`}>
            <Student_Attendance_Form
              activeStudnet={dataStudent}
              setShowAttendance={setShowAttendance}
              handleAttendance={handleAttendance}
              formAttendance={formAttendance}
              handleChangeStudentAttendance={handleChangeStudentAttendance}
              loading={loading}
            />
          </div>
          <div className={`${showPoint ? "block" : "hidden"}`}>
            <Form_Point
              activeStudnet={dataStudent}
              setShowPoint={setShowPoint}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Student_list;
