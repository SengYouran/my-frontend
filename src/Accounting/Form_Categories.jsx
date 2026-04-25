import React from "react";
import { useDataContext } from "../Context";

function Form_Categories({ setShowCategoryForm }) {
  const { handleChangeCategories, insertCategories, formCategories, loading } =
    useDataContext();

  const inputStyle =
    "w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400";

  return (
    <>
      {/* Modal */}
      <div className="fixed inset-0 z-30 flex items-center justify-center p-3">
        <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-5 flex flex-col gap-4">

          <h2 className="text-xl font-semibold text-gray-700 text-center">
            Form Categories
          </h2>

          <form className="flex flex-col gap-4">

            {/* Category Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="categories_name" className="text-sm font-medium">
                Category Name*
              </label>

              <input
                type="text"
                name="categories_name"
                id="categories_name"
                value={formCategories?.categories_name ?? ""}
                onChange={handleChangeCategories}
                placeholder="Enter category name"
                className={inputStyle}
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="categories_description"
                className="text-sm font-medium"
              >
                Description
              </label>

              <textarea
                name="categories_description"
                id="categories_description"
                value={formCategories?.categories_description ?? ""}
                onChange={handleChangeCategories}
                placeholder="Optional description"
                className={`${inputStyle} min-h-[90px]`}
              />
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-2">

              <button
                type="button"
                onClick={() => setShowCategoryForm(false)}
                className="border cursor-pointer rounded-md py-2 font-medium hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={insertCategories}
                className="cursor-pointer rounded-md py-2 font-medium text-white bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 hover:opacity-90"
              >
                {loading ? "Saving..." : "Save"}
              </button>

            </div>

          </form>
        </div>
      </div>

      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-20"></div>
    </>
  );
}

export default Form_Categories;