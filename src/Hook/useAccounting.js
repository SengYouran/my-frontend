import { useEffect, useState } from "react";

function useAccounting({
  url,
  setNewStudent,
  setFormStudent,
  setSearchStudentPayment,
  pages,
  loadLink,
}) {
  const [showFormPayment, setShowFormPayment] = useState(false);
  const [paidStudentType, setpaidStudentType] = useState([]);
  const [type, setType] = useState("Paid");
  const [searchPaidUnpaid, setSearchPaidUnpaid] = useState("");
  const [loadingAccounting, setLoadingAccounting] = useState(true);

  const [changeEdit, setChangeEdit] = useState(false);
  const [paginate, setPaginate] = useState({});
  const [payment, setPayment] = useState({
    student_id: "",
    amount: "",
    pay_type: "",
    period_start: "",
    period_end: "",
    pay_status: "",
    transport_type: "",
    transport_fee: "",
  });
  const { page, limit } = pages.accounting;
  const fetchStudentPayment = async () => {
    try {
      setLoadingAccounting(true);
      const res = await fetch(
        `${url}/payment?type=${type}&page=${page}&limit=${limit}`,
        { credentials: "include" },
      );
      if (!res.ok) throw new Error("Failed to fetch student payments");
      const data = await res.json();
      setpaidStudentType(data.results);
      setPaginate(data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAccounting(false);
    }
  };
  useEffect(() => {
    if (!location.pathname.startsWith("/finance") || loadLink !== "Finance")
      return;
    fetchStudentPayment();
  }, [loadLink, location.pathname, type, page, limit]);
  const searchStudentPaidUnpaid = async () => {
    try {
      setLoadingAccounting(true);
      const res = await fetch(
        `${url}/payment/searchpaidunpaid?keyword=${searchPaidUnpaid}&page=${page}&limit=${limit}`,
      );
      const data = await res.json();
      if (!res.ok) throw new Error("Faid to fetch student paid and unpaid");
      setpaidStudentType(data.results);
      setPaginate(data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAccounting(false);
    }
  };
  useEffect(() => {
    if (!searchPaidUnpaid) return;
    searchStudentPaidUnpaid();
  }, [searchPaidUnpaid]);
  // ---------------- FETCH FUNCTIONS ----------------
  /*
  useEffect(() => {
    const today = new Date();
    if (!auth) return;

    let result = [];

    switch (type) {
      case "Paid":
        result = studentPayment.filter(
          (p) => p.pay_status === "Paid" && new Date(p.period_end) >= today,
        );
        break;

      case "Monthly":
        result = studentPayment.filter(
          (p) =>
            p.pay_type === "Monthly" &&
            p.pay_status === "Paid" &&
            new Date(p.period_end) >= today,
        );
        break;

      case "Yearly":
        result = studentPayment.filter(
          (p) =>
            p.pay_type === "Yearly" &&
            p.pay_status === "Paid" &&
            new Date(p.period_end) >= today,
        );
        break;

      default:
        result = studentPayment.filter(
          (p) => p.pay_status === "Paid" && new Date(p.period_end) >= today,
        );
    }

    
  }, [type, studentPayment]);
  useEffect(() => {
    const today = new Date();
    if (!auth) return;
    let expireData = [];
    switch (typeExpire) {
      case "Current_deactive":
        expireData = studentPayment?.filter(
          (expireAtt) =>
            expireAtt.pay_status === "Unpaid" &&
            new Date(expireAtt.period_end) >= today,
        );
        break;
      /*  case "expire_active":
        expireData = studentPayment?.filter(
          (expireAtt) =>
            expireAtt.pay_status === "Paid" &&
            new Date(expireAtt.period_end) <= today,
        );
        break;
      case "expire_deactive":
        expireData = studentPayment?.filter(
          (expireAtt) =>
            expireAtt.pay_status === "Unpaid" &&
            new Date(expireAtt.period_end) <= today,
        );
        break;
      default:
        expireData = studentPayment?.filter(
          (expireAtt) =>
            expireAtt.pay_status === "Unpaid" &&
            new Date(expireAtt.period_end) >= today,
        );
    }
    
  }, [typeExpire, studentPayment]);*/
  // ---------------- USE EFFECT ----------------

  // ---------------- FORM HANDLERS ----------------
  function handleChangePaymentStudent(e) {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  }

  // ---------------- POST / INSERT ----------------
  async function insertPaymentStudent() {
    const requiredFields = [
      "student_id",
      "amount",
      "pay_type",
      "period_start",
      "period_end",
      "pay_status",
      "transport_type",
    ];

    for (let field of requiredFields) {
      if (!payment[field]) {
        console.warn(`Missing field: ${field}`);
        return;
      }
    }

    setLoadingAccounting(true);
    try {
      const res = await fetch(`${url}/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payment),
        credentials: "include", // ✅ send JWT cookie
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to insert payment");
      await fetchStudentPayment();
      setPayment({
        student_id: "",
        amount: "",
        pay_type: "",
        period_start: "",
        period_end: "",
        pay_status: "",
        transport_type: "",
        transport_fee: "",
      });
      setFormStudent({});
      setSearchStudentPayment("");
      setShowFormPayment(false);
      setNewStudent(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAccounting(false);
    }
  }
  async function updatePaymentStudent(id) {
    try {
      setLoadingAccounting(true);

      const res = await fetch(`${url}/payment/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      await fetchStudentPayment();
      setShowFormPayment(false);
      setChangeEdit(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAccounting(false);
    }
  }
  return {
    type,
    setType,
    showFormPayment,
    setShowFormPayment,
    payment,
    setPayment,
    handleChangePaymentStudent,
    insertPaymentStudent,
    loadingAccounting,
    paidStudentType,
    fetchStudentPayment,
    setpaidStudentType,
    searchPaidUnpaid,
    setSearchPaidUnpaid,
    searchStudentPaidUnpaid,
    paginate,
    setPaginate,
    updatePaymentStudent,changeEdit, setChangeEdit
  };
}

export { useAccounting };
