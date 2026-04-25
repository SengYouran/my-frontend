import { useEffect, useMemo } from "react";
import { useState } from "react";

const useExpenses = ({ url, auth, pages, loadLink }) => {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showExpensesForm, setShowExpensesForm] = useState(false);
  const [storeCategories, setStoreCategories] = useState([]);
  const [storeExpenses, setStoreExpenses] = useState([]);
  const [expensePaginate, setExpensePaginate] = useState({});
  const [loadingExpenses, setLoadingExpenses] = useState(true);
  const [typeExpense, setTypeExpense] = useState([]);
  const [formCategories, setFormCategories] = useState({
    categories_name: "",
    categories_description: "",
  });
  const [formExpenses, setFormExpenses] = useState({
    category_id: "",
    expenses_date: "",
    expenses_amount: "",
    paid_by: "",
    expenses_descrition: "",
  });
  async function getCategories() {
    try {
      setLoadingExpenses(true);
      const res = await fetch(`${url}/categories`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Missing to fetch categories");
      }

      setStoreCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingExpenses(false);
    }
  }
  async function getExpenses() {
    try {
      const { page, limit } = pages.expenses;
      setLoadingExpenses(true);
      const res = await fetch(`${url}/expenses?page=${page}&limit=${limit}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Missing to fetch expenses");
      }
      setExpensePaginate(data.pagination);
      setStoreExpenses(data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingExpenses(false);
    }
  }
  async function getTypeExpense() {
    try {
      setLoadingExpenses(true);
      const res = await fetch(`${url}/expenses/typeExpense`);
      if (!res.ok) {
        throw new Error("Error to fetch type expense");
      }
      const data = await res.json();
      setTypeExpense(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingExpenses(false);
    }
  }
  useEffect(() => {
    if (!auth || !location.pathname.startsWith("/expenses")) return;
    getCategories();
    getExpenses();
  }, [location.pathname, loadLink, url]);
  useEffect(() => {
    if (!auth) return;
    getTypeExpense();
  }, [auth]);
  const handleChangeCategories = (e) => {
    setFormCategories({ ...formCategories, [e.target.name]: e.target.value });
  };
  const handleChangeExpenses = (e) => {
    setFormExpenses({ ...formExpenses, [e.target.name]: e.target.value });
  };
  const insertCategories = async () => {
    const { categories_name } = formCategories;
    if (!categories_name) {
      console.warn("Missing field, pleases input");
      return;
    }
    try {
      setLoadingExpenses(true);
      const res = await fetch(`${url}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formCategories),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to insert category");
      }
      await getCategories();
      setShowExpensesForm(true);
      setShowCategoryForm(false);
      setFormCategories({});
    } catch (err) {
      console.err(err);
    } finally {
      setLoadingExpenses(false);
    }
  };
  async function insertExpenses() {
    const {
      category_id,
      expense_type_id,
      expenses_date,
      expenses_amount,
      paid_by,
    } = formExpenses;
    if (
      !category_id ||
      !expense_type_id ||
      !expenses_date ||
      !expenses_amount ||
      !paid_by
    ) {
      console.warn("Failed to field, pleases input...");
      return;
    }
    try {
      setLoadingExpenses(true);
      const res = await fetch(`${url}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(formExpenses),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Missing to insert Expenses");
      }
      await getExpenses();
      setShowExpensesForm(false);
      setFormExpenses({});
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingExpenses(false);
    }
  }
  return {
    showCategoryForm,
    setShowCategoryForm,
    showExpensesForm,
    setShowExpensesForm,
    storeCategories,
    handleChangeCategories,
    handleChangeExpenses,
    insertCategories,
    insertExpenses,
    formCategories,
    formExpenses,
    storeExpenses,
    expensePaginate,
    loadingExpenses,
    typeExpense,
  };
};
export { useExpenses };
