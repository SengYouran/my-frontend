import { useDataContext } from "../Context";

const RenderPageNumbers = ({ module, totalPages }) => {
  const { pages, updatePage } = useDataContext();

  const page = pages[module]?.page || 1;
  const visiblePages = 5;
  
  let startPage = Math.max(page - Math.floor(visiblePages / 2), 1);
  let endPage = Math.min(startPage + visiblePages - 1, totalPages);

  if (endPage - startPage + 1 < visiblePages) {
    startPage = Math.max(endPage - visiblePages + 1, 1);
  }

  const pagesArray = [];

  for (let i = startPage; i <= endPage; i++) {
    pagesArray.push(i);
  }

  return (
    <div className="flex gap-1">
      {pagesArray.map((p) => (
        <button
          key={p}
          onClick={() => updatePage(module, p)}
          className={`px-1.5 md:px-2 md:py-.5 border rounded text-[13px] cursor-pointer ${
            page === p
              ? "bg-blue-500 border-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export { RenderPageNumbers };
