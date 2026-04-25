import { useEffect, useState } from "react";

function useEmployees({ url, handleGetAllTeacher, auth, pages, newStudent }) {
  const [listEmployee, setListEmployee] = useState([]);
  const [OneEmp, setOneEmp] = useState({});
  const [formEmployees, setFormEmployees] = useState(false);
  const [views, setViews] = useState(false);
  const [error, setError] = useState(null);
  const [empPaginate, setEmpPaginate] = useState({});
  const [loadingEmployee, setLoadingEmployee] = useState(true);
  const initialEmployee = {
    employee_id: "",
    emp_id: "",
    first_name: "",
    last_name: "",
    profile: null,
    gender: "",
    status: "",
    experience: "",
    dob: "",
    telephone: "",
    address: "",
    roles: "",
    salary: "",
    email: "",
    password: "",
    description: "",
    hire_date: "",
  };
  const [employees, setEmployees] = useState(initialEmployee);

  // fetch get employees
  const { page, limit } = pages.employee;
  const fetchEmployees = async () => {
    try {
      setLoadingEmployee(true);
      setError(null);
      const response = await fetch(
        `${url}/employees?page=${page}&limit=${limit}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data = await response.json();
      setListEmployee(data);
      setEmpPaginate(data.pagination);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoadingEmployee(false);
    }
  };
  useEffect(() => {
    const isEmployeePage = location.pathname.startsWith("/employees");

    if (!isEmployeePage && !newStudent) return;

    fetchEmployees();
  }, [location.pathname, page, limit, newStudent]);
  async function handleGetOneEmp() {
    try {
      setLoadingEmployee(true);
      const res = await fetch(`${url}/employees/${auth?.employee_id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch a employee");
      }
      const data = await res.json();
      setOneEmp(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoadingEmployee(false);
    }
  }

  useEffect(() => {
    if (!auth) return;
    handleGetOneEmp();
  }, [auth]);

  const handleChangeEmployee = (e) => {
    const { name, value, files } = e.target;

    setEmployees((prev) => ({
      ...(prev || {}),
      [name]: files ? files[0] : value,
    }));
  };

  // ✅ CREATE
  async function handleCrateEmployee() {
    const requiredFields = [
      "emp_id",
      "first_name",
      "last_name",
      "email",
      "password",
      "gender",
      "dob",
      "salary",
    ];

    if (requiredFields.some((f) => !employees[f])) {
      return alert("Please fill required fields ❌");
    }

    try {
      setLoadingEmployee(true);
      const formData = new FormData();

      Object.entries(employees).forEach(([key, value]) => {
        if (value === null) return;
        if (key === "dob" && value.includes("T")) value = value.slice(0, 10);
        if (key === "hire_date" && value.includes("T"))
          value = value.slice(0, 10);
        if (key === "salary") value = value ? parseFloat(value) : 0;
        formData.append(key, value);
      });

      const res = await fetch(`${url}/employees`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setFormEmployees(false);
      await fetchEmployees();
      await handleGetAllTeacher();
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoadingEmployee(false);
    }
  }

  // ✅ UPDATE
  async function handleUpdateEmployee(id) {
    try {
      setLoadingEmployee(true);

      const formData = new FormData();

      Object.entries(employees).forEach(([key, value]) => {
        // skip null/empty fields for password and profile
        if (value === null || value === undefined) return;
        if (key === "password" && !value) return; // do not overwrite empty password
        if (key === "profile" && value instanceof String && !value) return;

        // format DOB
        if (key === "dob" && value.includes("T")) value = value.slice(0, 10);

        // salary should always be a number
        if (key === "salary") value = value ? parseFloat(value) : 0;

        formData.append(key, value);
      });
      const res = await fetch(`${url}/employees/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setFormEmployees(false);

      // 🔹 refresh employee list to get updated data including profile URL
      await fetchEmployees();
      await handleGetAllTeacher();
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoadingEmployee(false);
    }
  }

  // ✅ DELETE
  async function handleDeleteEmployee(id) {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    try {
      setLoadingEmployee(true);
      const res = await fetch(`${url}/employees/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      await fetchEmployees();
      alert("Deleted successfully ✅");
      await handleGetAllTeacher();
    } catch (err) {
      console.error(err);
      alert("Delete failed ❌");
    } finally {
      setLoadingEmployee(false);
    }
  }

  return {
    listEmployee,
    employees,
    setEmployees,
    error,
    handleChangeEmployee,
    handleCrateEmployee,
    handleUpdateEmployee,
    handleDeleteEmployee,
    formEmployees,
    setFormEmployees,
    fetchEmployees,
    views,
    setViews,
    OneEmp,
    empPaginate,
    loadingEmployee,
    initialEmployee,
  };
}

export default useEmployees;
