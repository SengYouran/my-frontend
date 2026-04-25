const terms = [
  {
    name: "Michaelmas Term",
    startMonth: 11,
    endMonth: 2,
    textMonth: "Nov-Feb",
  },
  {
    name: "Lent Term",
    startMonth: 3,
    endMonth: 7,
    textMonth: "Mar-July",
  },
  {
    name: "Trinity Term",
    startMonth: 8,
    endMonth: 12,
    textMonth: "Aug-Dec",
  },
];
const month = new Date().getMonth() + 1;

const currentTerm = terms.find(
  (t) => month >= t.startMonth && month <= t.endMonth,
)
function getAcademicYear(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  let startYear;

  // Academic year starts in November
  if (month >= 11) {
    startYear = year;
  } else {
    startYear = year - 1;
  }

  return {
    current: `${startYear}-${startYear + 1}`,
    next: `${startYear + 1}-${startYear + 2}`,
  };
}

const academicYears = getAcademicYear();

function SchoolAcademicYear() {
  return (
    <div className="p-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
      <div className="bg-gray-200 px-8 py-6 rounded-md">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-calendar-check text-red-600 text-xl"></i>
          <h2 className="text-xl font-medium text-gray-900 uppercase tracking-widest">
            Academic Cycle
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT: Academic Year */}
          <div className="mt-4">
            <h2 className="text-xs font-medium text-gray-500">
              CURRENT ACADEMIC YEAR
            </h2>

            <div className="flex items-center gap-4 mt-4">
              <div className="border-2 border-blue-950 py-6 px-5 rounded-xl flex flex-col items-center gap-1 w-32">
                <h2 className="text-blue-950 text-sm font-semibold">
                  {academicYears?.current}
                </h2>
                <p className="text-[10px] text-red-600 font-medium">
                  ACTIVE NOW
                </p>
              </div>

              <div className="bg-gray-400 py-6 px-5 rounded-xl flex flex-col items-center gap-1 w-32">
                <h2 className="text-blue-950 text-sm font-semibold">
                  {academicYears?.next}
                </h2>
                <p className="text-[10px] text-gray-600 font-medium">
                  UPCOMING
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Terms */}
          <div className="mt-4 w-full">
            <h2 className="text-xs font-medium text-gray-500">
              CURRENT TERM / SEMESTER
            </h2>

            <div className="mt-4 flex flex-col gap-3">
              {terms?.map((term, idx) => {
                const isActive = term.startMonth === currentTerm?.startMonth;

                return (
                  <div
                    key={idx}
                    className={`flex justify-between items-center px-4 py-3 rounded-xl border transition
              ${
                isActive
                  ? "bg-blue-950 text-white shadow-md"
                  : "bg-white hover:bg-gray-50"
              }`}
                  >
                    <h2 className="text-sm font-medium">{term.name}</h2>
                    <p className="text-xs opacity-80">{term.textMonth}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchoolAcademicYear;
