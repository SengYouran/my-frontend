import { useEffect, useState } from "react";

function useTeacher({ url }) {
  const [teacher, setTeacher] = useState([]);
  const [storeTeacherBook, setStoreTeacherBook] = useState([]);
  const [detaiModal, setDetailModal] = useState(false);
  const [showFormTeacherbook, setShowFormTeacherBook] = useState(false);
  const [error, setError] = useState(null);
  const [loadingTeacher, setLoadingTeacher] = useState(true);
  const [showTeacherBook, setShowTeacherBook] = useState(false);
  const [formTeacher, setFormTeacher] = useState({
    employee_id: "",
    subject: "",
    qualification: "",
  });
  const [teacherBook, setTeacherBook] = useState({
    teacher_id: "",
    book_id: "",
  });
  const handleChangeTeacher = (e) => {
    setFormTeacher({ ...formTeacher, [e.target.name]: e.target.value });
  };
  const handleChangeTeacherBook = (e) => {
    setTeacherBook({ ...teacherBook, [e.target.name]: e.target.value });
  };
  async function handleGetAllTeacher() {
    setLoadingTeacher(true);
    try {
      const response = await fetch(`${url}/teacher`);
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data = await response.json();
      setTeacher(data || []); // extract .data from backend
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoadingTeacher(false);
    }
  }
  async function getTeacherBook() {
    try {
      setLoadingTeacher(true);
      const res = await fetch(`${url}/teacherBook`);
      if (!res.ok) {
        throw new Error("Fail to fetch Teacher Book");
      }
      const dataTeacherBook = await res.json();
      const TeacherBook = dataTeacherBook?.filter(
        (check) => check.book_name !== null,
      );
      setStoreTeacherBook(TeacherBook);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingTeacher(false);
    }
  }
  useEffect(() => {
    getTeacherBook();
    handleGetAllTeacher();
  }, [url, showTeacherBook]);
  async function handleTeacherBook() {
    const { teacher_id, book_id } = teacherBook;
    if (!teacher_id || !book_id) {
      console.warn("Missing insert teacher book");
      return;
    }
    try {
      setLoadingTeacher(true);
      const res = await fetch(`${url}/teacherBook`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(teacherBook),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      await getTeacherBook();
      setShowFormTeacherBook(false);
      setTeacherBook({});
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingTeacher(false);
    }
  }
  async function TeacherDetailModal() {
    const { employee_id, subject, qualification } = formTeacher;

    if (!employee_id || !subject || !qualification) {
      console.warn("Missing teacher detail");
      return;
    }
    try {
      setLoadingTeacher(true);
      const res = await fetch(`${url}/teacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formTeacher),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      await handleGetAllTeacher();
      setDetailModal(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoadingTeacher(false);
    }
  }
  return {
    handleGetAllTeacher,
    teacher,
    setTeacher,
    error,
    setError,
    TeacherDetailModal,
    handleChangeTeacher,
    detaiModal,
    setDetailModal,
    teacherBook,
    handleChangeTeacherBook,
    showFormTeacherbook,
    setShowFormTeacherBook,
    getTeacherBook,
    storeTeacherBook,
    handleTeacherBook,
    loadingTeacher,
    showTeacherBook,
    setShowTeacherBook,
  };
}
export { useTeacher };
