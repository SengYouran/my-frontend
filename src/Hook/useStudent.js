import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

function useStudent({
  url,
  setLocalLoading,
  auth,
  setShowFormPayment,
  setDataStudent,
  fetchStudentPayment,
  setDataStudentSearch,
  pages,
  formStudent,
  setFormStudent,
  book_id,
  setTopRankStudent,
}) {
  const [listBook, setListBook] = useState([]);
  const [listStudentAtt, setListStudentAtt] = useState([]);
  const [listStudentPoint, setListStudentPoint] = useState([]);
  const [showAttendance, setShowAttendance] = useState(false);
  const [teacher_ID, setTeacher_ID] = useState(9);
  const [showPoint, setShowPoint] = useState(false);
  const [studentPaginate, setStudentPaginate] = useState({});
  const [attendancePiaginate, setAttendancePiginate] = useState({});
  const [total_students_teacher, set_total_students_teacher] = useState({});
  const { page, limit } = pages.student;

  const [active, setActive] = useState("Students");
  const [formAttendance, setFormAttendance] = useState({
    student_id: "",
    attendance_date: "",
    attendance_status: "",
    description: "",
  });

  const [formStudentPoint, setFormStudentPoint] = useState({
    student_id: "",
    booK_id: "",
    attendance_point: "",
    question_point: "",
    total_point: "",
    point_date: "",
    remark: "",
  });

  const [searchStudentAt, setSearchStudentAt] = useState("");
  const handleSearchStudents = async () => {
    try {
      setLocalLoading(true);
      const res = await fetch(
        `${url}/student/searchStudent?employee_id=${teacher_ID}&keyword=${searchStudentAt}&page=${page}&limit=${limit}`,
      );
      if (!res.ok) throw new Error("Fail to fetch search student");
      const data = await res.json();
      setDataStudent(data.results);
      setStudentPaginate(data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLocalLoading(false);
    }
  };
  useEffect(() => {
    if (!auth || !searchStudentAt) return;
    handleSearchStudents();
  }, [searchStudentAt]);

  // ---------------- FETCH FUNCTIONS ----------------
  async function getAllBook() {
    try {
      setLocalLoading(true);
      const res = await fetch(`${url}/book`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setListBook(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLocalLoading(false);
    }
  }

  async function getAllInfoStudent() {
    try {
      setLocalLoading(true);
      const res = await fetch(
        `${url}/student?teacher=${teacher_ID}&page=${page}&limit=${limit}`,
        {
          credentials: "include",
        },
      );
      if (!res.ok) throw new Error("Failed to fetch students");
      const data = await res.json();
      setDataStudent(data.data);
      setStudentPaginate(data.pagination);
      setDataStudentSearch(data.data);
      set_total_students_teacher(data.totalStudentUnderTeacher);
    } catch (err) {
      console.error(err);
    } finally {
      setLocalLoading(false);
    }
  }
  async function getStudentAttendance() {
    let DynamicID = 0;
    DynamicID = auth?.role === "Admin" ? teacher_ID : auth?.employee_id;
    try {
      setLocalLoading(true);
      const res = await fetch(
        `${url}/attendance?employeeID=${DynamicID}&page=${page}&limit=${limit}`,
        {
          credentials: "include",
        },
      );
      if (!res.ok) throw new Error("Failed to fetch attendance");
      const data = await res.json();
      setListStudentAtt(data.rows);
      setAttendancePiginate(data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLocalLoading(false);
    }
  }

  async function getStudentPoint() {
    try {
      setLocalLoading(true);
      const res = await fetch(
        `${url}/point?teacher=${auth?.employee_id}&book=${book_id}`,
        {
          credentials: "include",
        },
      );
      if (!res.ok) throw new Error("Failed to fetch student points");
      const data = await res.json();
      setListStudentPoint(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLocalLoading(false);
    }
  }
  async function getTopStudentRanking() {
    try {
      setLocalLoading(true);
      const res = await fetch(
        `${url}/topstudentrank?teacher=${auth?.employee_id}`,
      );
      if (!res.ok) throw new Error("Fail to fetch top student rankinf");
      const data = await res.json();
      setTopRankStudent(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLocalLoading(false);
    }
  }

  // ---------------- USE EFFECT ----------------
  useEffect(() => {
    if (!auth) return;
    getAllBook();
    getTopStudentRanking();
  }, [auth]);

  useEffect(() => {
    if (!teacher_ID || !location.pathname.startsWith("/students")) return;

    const { page, limit } = pages.student;

    getAllInfoStudent(page, limit);
  }, [
    pages.student.page,
    pages.student.limit,
    teacher_ID,
    location.pathname,
    active,
  ]);
  useEffect(() => {
    if (!auth || !teacher_ID) return;
    getStudentPoint();
  }, [book_id, active]);
  useEffect(() => {
    if (!auth || !teacher_ID) return;
    getStudentAttendance();
  }, [auth, , page, limit, teacher_ID, active]);
  // ---------------- FORM HANDLERS ----------------
  function handleChangeStudent(e) {
    setFormStudent({ ...formStudent, [e.target.name]: e.target.value });
  }

  function handleChangeStudentAttendance(e) {
    setFormAttendance({ ...formAttendance, [e.target.name]: e.target.value });
  }

  function handleChangeStudentPoint(e) {
    setFormStudentPoint({
      ...formStudentPoint,
      [e.target.name]: e.target.value,
    });
  }

  // ---------------- INSERT / POST FUNCTIONS ----------------
  async function handleInsertStudent() {
    const requiredFields = [
      "class_id",
      "employee_id",
      "book_id",
      "id_card",
      "first_name",
      "last_name",
      "gender",
      "dob",
      "telephone",
      "address",
      "shift",
      "createdAt",
      "start_time",
      "end_time",
    ];

    for (let field of requiredFields) {
      if (!formStudent[field]) {
        console.warn(`Missing field: ${field}`);
        return;
      }
    }

    setLocalLoading(true);
    try {
      const res = await fetch(`${url}/student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formStudent),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to insert student");

      await getAllInfoStudent();

      setShowFormPayment(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLocalLoading(false);
    }
  }

  async function updateStudentInfomation(id) {
    try {
      setLocalLoading(true);
      const res = await fetch(`${url}/student/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "appliction/json" },
        body: JSON.stringify(formStudent),
      });
      const data = await res.json();
      if (!res.ok) throw new Error("Fail to update the information student's");
      await getAllInfoStudent();
    } catch (err) {
      console.error(err);
    } finally {
      setLocalLoading(false);
    }
  }
  async function handleAttendance() {
    const { student_id, attendance_date, attendance_status } = formAttendance;
    if (!student_id || !attendance_date || !attendance_status) {
      console.warn("Missing attendance fields");
      return;
    }

    try {
      setLocalLoading(true);
      const res = await fetch(`${url}/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.role}`,
        },
        body: JSON.stringify(formAttendance),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data?.message || "Failed to insert attendance");

      getStudentAttendance();
      setFormAttendance({});
      setShowAttendance(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLocalLoading(false);
    }
  }

  async function handleInsertStudentPoint() {
    const {
      student_id,
      attendance_point,
      question_point,
      total_point,
      point_date,
    } = formStudentPoint;
    if (
      !student_id ||
      !attendance_point ||
      !question_point ||
      !total_point ||
      !point_date
    ) {
      console.warn("Missing student point fields");
      return;
    }

    setLocalLoading(true);
    try {
      const res = await fetch(`${url}/point`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formStudentPoint),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data?.message || "Failed to insert student point");

      await getStudentPoint();
      setFormStudentPoint({});
      setShowPoint(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLocalLoading(false);
    }
  }
  async function handleDeleteStudent(student_id) {
    try {
      setLocalLoading(true);
      const res = await fetch(`${url}/student/${student_id}/delete`, {
        method: "PUT",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      await fetchStudentPayment();
      await getAllInfoStudent();
    } catch (err) {
      console.error(err);
    } finally {
      setLocalLoading(false);
    }
  }
  async function handleReactiveStudent(student_id) {
    try {
      setLocalLoading(true);
      const res = await fetch(`${url}/student/${student_id}/reactive`, {
        method: "PUT",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      await fetchStudentPayment();
      setDataStudent((pre) => [...pre, data]);
    } catch (err) {
      console.error(err);
    } finally {
      setLocalLoading(false);
    }
  }
  return {
    // student form
    handleChangeStudent,
    handleInsertStudent,

    // lists
    listBook,

    // attendance
    showAttendance,
    setShowAttendance,
    handleChangeStudentAttendance,
    formAttendance,
    handleAttendance,
    listStudentAtt,

    // student points
    handleChangeStudentPoint,
    handleInsertStudentPoint,
    formStudentPoint,
    showPoint,
    setShowPoint,
    listStudentPoint,

    // teacher
    teacher_ID,
    setTeacher_ID,

    //Deleting student
    handleDeleteStudent,

    //Reactive student
    handleReactiveStudent,
    attendancePiaginate,
    studentPaginate,
    total_students_teacher,

    //search student
    searchStudentAt,
    setSearchStudentAt,
    handleSearchStudents,

    //tab active
    active,
    setActive,updateStudentInfomation
  };
}

export { useStudent };
