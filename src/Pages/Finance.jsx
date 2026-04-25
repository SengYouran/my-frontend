import React from "react";
import List_Student from "../Accounting/List_Student";
import { useDataContext } from "../Context";
import ReloadPageSkeleton from "../Accounting/ReloadPageSkeleton";

function Finance() {
  const { auth, loadingAccounting } = useDataContext();
  return (
    <div className="bg-white p-2 rounded md:mr-4">
      {auth ? <List_Student /> : <ReloadPageSkeleton />}
    </div>
  );
}

export default Finance;
