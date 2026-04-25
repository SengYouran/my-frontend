import { useDataContext } from "../Context";

function Type_Report({ setTypeReport, typeReport,setBgType, type_dynamic }) {
  const { typeNameReport, setTypeNameReport } = useDataContext();

  return (
    <div
      className={`absolute left-0 mt-2 z-10 w-full bg-white border-2 border-purple-600 p-2 rounded-lg shadow-lg
      transition-all duration-300 ease-out
      ${typeReport ? "opacity-100 translate-y-2 scale-100 pointer-events-auto" : "opacity-0 translate-y-0 scale-95 pointer-events-none"}`}
    >
      {type_dynamic.map((ty) => {
        const isActive = ty.Tname === typeNameReport;

        return (
          <div key={ty.id} className="my-1">
            <div
              className={`${
                isActive
                  ? "p-[2px] rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600"
                  : ""
              }`}
              onClick={() => {
                setBgType(ty.id);
                setTypeNameReport(ty.Tname);
                setTypeReport(false);
              }}
            >
              <h2
                className={`text-[15px] font-medium rounded-full px-2 py-1 cursor-pointer transition-all ${
                  isActive ? "bg-white text-purple-600 font-bold" : "text-gray-700 hover:text-yellow-700"
                }`}
              >
                {ty.Tname}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Type_Report;