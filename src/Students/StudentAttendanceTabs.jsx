import { useRef, useEffect, useMemo } from "react";
import { useDataContext } from "../Context";

function StudentAttendanceTabs({ setActive, active }) {
  const { auth, updatePage } = useDataContext();

  const underlineRef = useRef(null);
  const tabRefs = useRef({});

  // 🎯 Define all tabs
  const allTabs = ["Students", "Ranks", "Attendances"];

  // 🎯 Role-based filter
  const tabs = useMemo(() => {
    if (auth?.role === "Admin") {
      return allTabs.filter((tab) => tab !== "Ranks");
    }
    return allTabs;
  }, [auth]);

  // 🎯 Prevent active stuck on hidden tab
  useEffect(() => {
    if (!tabs.includes(active)) {
      setActive(tabs[0]);
    }
  }, [tabs, active, setActive]);

  // 🎯 Underline animation
  useEffect(() => {
    const el = tabRefs.current[active];
    if (el && underlineRef.current) {
      underlineRef.current.style.width = `${el.offsetWidth}px`;
      underlineRef.current.style.left = `${el.offsetLeft}px`;
    }
  }, [active, tabs]);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex gap-6 mt-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            ref={(el) => (tabRefs.current[tab] = el)}
            onClick={() => {
              setActive(tab);
              updatePage("student", 1);
            }}
            className={`pb-2 text-sm font-medium transition-colors cursor-pointer
              ${
                active === tab
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
          >
            {tab}
          </button>
        ))}

        {/* underline */}
        <span
          ref={underlineRef}
          className="absolute bottom-0 h-[2px] bg-blue-500 transition-all duration-300"
        />
      </div>
    </div>
  );
}

export default StudentAttendanceTabs;
