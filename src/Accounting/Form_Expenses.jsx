import React, { useEffect, useRef, useState } from "react";
import { useDataContext } from "../Context";

function Form_Expenses() {
  const [searchCategory, setSearchCategory] = useState("");
  const [dropDown, setDropDown] = useState(false);

  const refCategory = useRef(null);

  const {
    storeCategories,
    handleChangeExpenses,
    insertExpenses,
    formCategories,
    formExpenses,
    setShowExpensesForm,
    loading,
  } = useDataContext();

  const inputStyle =
    "w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400";

  // close dropdown outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (refCategory.current && !refCategory.current.contains(e.target)) {
        setDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // set category when editing
  useEffect(() => {
    if (!formCategories) {
      const select = storeCategories?.find(
        (ctg) => ctg?.categories_id === formExpenses?.category_id,
      );
      console.log(select);

      if (select) {
        setSearchCategory(
          `${select?.categories_id} - ${select?.categories_name}`,
        );
      }
    } else {
      setSearchCategory("");
    }
  }, [formCategories, storeCategories]);

  return (
    <>
      {/* Modal */}
      <div className="fixed inset-0 z-30 flex items-center justify-center p-3">
        <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-5">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Form Expenses
          </h2>

          <form className="flex flex-col gap-4">
            {/* Category */}
            <div ref={refCategory} className="relative">
              <label className="text-sm font-medium">Categories Name*</label>

              <input
                type="text"
                value={searchCategory}
                placeholder="Search categories..."
                onChange={(e) => {
                  setSearchCategory(e.target.value);
                  setDropDown(true);
                }}
                onFocus={() => setDropDown(true)}
                className={inputStyle}
              />

              {dropDown && (
                <div className="absolute top-full left-0 w-full bg-white border rounded-md max-h-44 overflow-y-auto shadow-lg z-50">
                  {storeCategories?.results?.length > 0 ? (
                    storeCategories?.results?.map((ctg) => (
                      <div
                        key={ctg.categories_id}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => {
                          setSearchCategory(
                            `${ctg.categories_id} - ${ctg.categories_name}`,
                          );

                          setDropDown(false);

                          handleChangeExpenses({
                            target: {
                              name: "category_id",
                              value: ctg.categories_id,
                            },
                          });
                        }}
                      >
                        {ctg.categories_id} - {ctg.categories_name}
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-gray-400 text-sm">
                      No categories found
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Expense Code*</label>

              <select
                name="expense_type_id"
                value={formExpenses?.expense_type_id ?? ""}
                onChange={handleChangeExpenses}
                className={inputStyle}
              >
                <option value="">Select Code</option>
                {storeCategories?.expenseType?.map((code) => (
                  <option
                    value={`${code.expense_type_id}`}
                    key={code.expense_type_id}
                  >
                    {code.code}
                  </option>
                ))}
              </select>
            </div>
            {/* Date */}
            <div>
              <label className="text-sm font-medium">Expenses Date*</label>

              <input
                type="date"
                name="expenses_date"
                value={formExpenses?.expenses_date ?? ""}
                onChange={handleChangeExpenses}
                className={inputStyle}
              />
            </div>

            {/* Amount */}
            <div>
              <label className="text-sm font-medium">Expenses Amount*</label>

              <input
                type="text"
                name="expenses_amount"
                placeholder="Expenses amount"
                value={formExpenses?.expenses_amount ?? ""}
                onChange={handleChangeExpenses}
                className={inputStyle}
              />
            </div>

            {/* Paid By */}
            <div>
              <label className="text-sm font-medium">Paid By*</label>

              <select
                name="paid_by"
                value={formExpenses?.paid_by ?? ""}
                onChange={handleChangeExpenses}
                className={inputStyle}
              >
                <option value="">Select payment</option>
                <option value="Cash">Paid by Cash</option>
                <option value="Bank">Paid by Bank</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium">
                Expenses Description
              </label>

              <textarea
                name="expenses_description"
                placeholder="Expenses description"
                value={formExpenses?.expenses_description ?? ""}
                onChange={handleChangeExpenses}
                className={`${inputStyle} min-h-[90px]`}
              />
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowExpensesForm(false)}
                className="border cursor-pointer rounded-md py-2 font-medium hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={insertExpenses}
                className="cursor-pointer rounded-md py-2 font-medium text-white bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 hover:opacity-90"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* backdrop */}
      <div className="fixed inset-0 bg-black/40 z-20"></div>
    </>
  );
}

export default Form_Expenses;
