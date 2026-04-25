import { useState } from "react";

const useDetailStudent = ({ url }) => {
  const [detaiStudentlLoading, setDetailStudentLoading] = useState(true);
  const [infoDetailStudent, setInfoDetailStudent] = useState({});
  async function getDetailStudent(student_id) {
    try {
      setDetailStudentLoading(true);
      const res = await fetch(`${url}/detailStudent/${student_id}`);
      if (!res.ok) {
        throw new Error(`Fail to fetch detail student. Status: ${res.status}`);
      }
      const data = await res.json();
      setInfoDetailStudent(data);
    } catch (err) {
      console.error(err);
    } finally {
      setDetailStudentLoading(false);
    }
  }
  return { detaiStudentlLoading, infoDetailStudent, getDetailStudent };
};
export { useDetailStudent };
