import { useDataContext } from "../Context";

function List_Class() {
  const { className } = useDataContext();
  return (
    <div>
      <table className="border border-gray-100 w-full mt-2">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left w-1 border-l-2">ID</th>
            <th className="px-4 py-2 text-left">Class Name</th>
            <th className="px-4 py-2 text-left">Schedule</th>
            <th className="px-4 py-2 text-left">Shift</th>
            <th className="px-4 py-2 text-left">Start Time</th>
            <th className="px-4 py-2 text-left">End Time</th>
          </tr>
        </thead>
        <tbody>
          {className?.map((c, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-white" : "bg-blue-200"}`}
            >
              
              <td className="px-4 py-2 border-l-2">{c?.class_id}</td>
              <td className="px-4 py-2">{c?.class_name}</td>
              <td className="px-4 py-2">Monday - Friday</td>
              <td className="px-4 py-2">Morning - Afternoon - Evening</td>
              <td className="px-4 py-2">7:00 AM</td>
              <td className="px-4 py-2">8:00 PM</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List_Class;
