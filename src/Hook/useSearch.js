import { useEffect, useState } from "react";

function useSearch({
  auth,
  url,
  setpaidStudentType,
  pages,
  setPaginate,
  searchLoading,
  setSearchLoading,
  searchStudentPayment,
}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [studentSearch, setStudentSearch] = useState([]);
  const handleSearchStudentPayment = async () => {
    try {
      const { page, limit } = pages.searchStudent;
      setSearchLoading(true);
      const res = await fetch(
        `${url}/payment/searchStudentPayment?keyword=${searchStudentPayment}&page=${page}&limit=${limit}`,
      );
      const dataStudetnPayment = await res.json();
      if (!res.ok) throw new Error(dataStudetnPayment.message);
      setStudentSearch(dataStudetnPayment);
    } catch (err) {
      console.error(err);
    } finally {
      setSearchLoading(false);
    }
  };
  useEffect(() => {
    if (!auth) return;
    handleSearchStudentPayment();
  }, [auth, searchStudentPayment]);
  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-CA", { timeZone: "Asia/Phnom_Penh" });
  };
  const handleFilterByDate = async () => {
    if (!startDate || !endDate) return;

    const start = formatDate(startDate);
    const end = formatDate(endDate);

    try {
      const { page, limit } = pages.searchByDate;
      const res = await fetch(
        `${url}/payment/filterByDate?startDate=${start}&endDate=${end}&page=${page}&limit=${limit}`,
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      setpaidStudentType(data.results);
      setPaginate(data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
    }
  };
  useEffect(() => {
    if (!auth) return;
    if (!startDate || !endDate) return;

    handleFilterByDate();
  }, [pages.searchByDate.page, pages.searchByDate.limit]);
  useEffect(() => {
    if (!auth) return;

    if (searchStudentPayment.length >= 3) {
      handleSearchStudentPayment();
      return;
    }

    if (searchStudentPayment.length === 0) {
      handleSearchStudentPayment();
      return;
    }
  }, [searchStudentPayment]);
  return {
    handleSearchStudentPayment,

    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleFilterByDate,
    studentSearch,
    searchLoading,
  };
}
export { useSearch };
