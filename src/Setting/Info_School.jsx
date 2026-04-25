import SchoolAcademicYear from "./Info_School/SchoolAcademicYear";
import SchoolCoreDetial from "./Info_School/SchoolCoreDetial";

function Info_School() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SchoolCoreDetial />
      <SchoolAcademicYear />
    </div>
  );
}

export default Info_School;
