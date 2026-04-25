import { useEffect, useState } from "react";

function useNotification({ url, setNotification, pages, auth }) {
  const [readNotification, setReadNotification] = useState([]);
  const [storeReceiver, setStoreReceiver] = useState([]);
  const [loadingNotification, setLoadingNotification] = useState(false);
  const [alertNotification, setAlertNotification] = useState(false);
  const [searchReceiver, setSearchReceiver] = useState("");

  const [formNotification, setFormNotification] = useState({
    sender_id: "",
    receiver_id: "",
    title: "",
    descriptions: "",
  });

  // =========================
  // GET NOTIFICATIONS (POLLING)
  // =========================
  async function getNotification() {
    try {
      if (!auth?.employee_id) return;

      const res = await fetch(
        `${url}/notification?employee_id=${auth?.employee_id}`,
      );

      const data = await res.json();
      if (!res.ok) throw new Error("Error to fetch notification");

      setReadNotification(data);
    } catch (err) {
      console.error("getNotification error:", err);
    }
  }
  async function markReadMessage(id) {
    try {
      setLoadingNotification(true);
      const res = await fetch(`${url}/notification/markread/${id}`, {
        method: "PUT",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error("Fail to marked as read");
      await getNotification();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingNotification(false);
    }
  }

  // 🔥 POLLING (SAFE VERSION)
  useEffect(() => {
    if (!auth?.employee_id) return;

    let isRunning = false;

    const fetchData = async () => {
      if (isRunning) return;
      isRunning = true;

      await getNotification();

      isRunning = false;
    };

    fetchData(); // first call

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchData();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [auth?.employee_id]);

  // =========================
  // GET RECEIVER
  // =========================
  async function getReceiver() {
    try {
      const { page, limit } = pages.receiver;

      setLoadingNotification(true);

      const res = await fetch(
        `${url}/notification/receiver?page=${page}&limit=${limit}`,
      );

      const data = await res.json();

      if (!res.ok) throw new Error("Fail to get receiver");

      setStoreReceiver(data.results);
    } catch (err) {
      console.error("getReceiver error:", err);
    } finally {
      setLoadingNotification(false);
    }
  }

  useEffect(() => {
    getReceiver();
  }, [pages.receiver.page, pages.receiver.limit]);

  // =========================
  // FORM CHANGE
  // =========================
  function handleChangeNotification(e) {
    setFormNotification((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // =========================
  // SEND NOTIFICATION
  // =========================
  async function sendNotification() {
    const { sender_id, receiver_id, title, descriptions } = formNotification;

    if (!sender_id || !receiver_id || !title || !descriptions) {
      console.warn("Missing input notification fields");
      return;
    }

    try {
      setLoadingNotification(true);

      const res = await fetch(`${url}/notification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formNotification),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message || "Fail to insert notification");

      // 🔥 instant refresh
      await getNotification();

      // reset form (SAFE)
      setFormNotification({
        sender_id: "",
        receiver_id: "",
        title: "",
        descriptions: "",
      });

      setSearchReceiver("");
      setNotification(false);
    } catch (err) {
      console.error("sendNotification error:", err);
    } finally {
      setLoadingNotification(false);
    }
  }

  // =========================
  // RETURN
  // =========================
  return {
    readNotification,
    storeReceiver,
    loadingNotification,
    searchReceiver,
    setSearchReceiver,
    formNotification,
    handleChangeNotification,
    sendNotification,
    markReadMessage,
    alertNotification,
    setAlertNotification,
  };
}

export { useNotification };
