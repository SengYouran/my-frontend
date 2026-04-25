import React from "react";
import { useDataContext } from "../Context";
import { RenderPageNumbers } from "../Pagination/RenderPageNumbers";

const Pagination = ({ module, totalPages }) => {
  const { pages, updatePage } = useDataContext();
  const page = pages[module]?.page || 1;

  return (
    <div className="flex items-center gap-2">
      <button
        className="border text-[10px] md:text-[13px] text-gray-700 font-medium px-2 p-.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        disabled={page === 1}
        onClick={() => updatePage(module, page - 1)}
      >
        Previous
      </button>

      <RenderPageNumbers module={module} totalPages={totalPages} />

      <button
        className="border text-[10px] md:text-[13px] text-gray-700 font-medium px-2 p-.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        disabled={page === totalPages}
        onClick={() => updatePage(module, page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
