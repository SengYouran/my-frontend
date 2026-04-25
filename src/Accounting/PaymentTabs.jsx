import { useState, useRef, useEffect } from "react";
import { useDataContext } from "../Context";

export default function PaymentTabs({ setType }) {
  const { updatePage } = useDataContext();

  const tabs = ["Paid", "Unpaid", "Monthly", "Yearly"];
  const [active, setActive] = useState("Paid");
  const underlineRef = useRef(null);
  const tabRefs = useRef({});

  useEffect(() => {
    const el = tabRefs.current[active];
    if (el && underlineRef.current) {
      underlineRef.current.style.width = `${el.offsetWidth}px`;
      underlineRef.current.style.left = `${el.offsetLeft}px`;
    }
  }, [active]);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex gap-6 mt-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            ref={(el) => (tabRefs.current[tab] = el)}
            onClick={() => {
              setType(tab);
              setActive(tab);
              updatePage("accounting", 1); // reset pagination
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

        <span
          ref={underlineRef}
          className="absolute bottom-0 h-[1px] bg-blue-500 transition-all duration-300"
        />
      </div>
    </div>
  );
}