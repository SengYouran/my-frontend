import { useNavigate, useParams } from "react-router-dom";
import { useDataContext } from "../Context";
import DetailEmployeeSkeleton from "./DetailEmployeeSkeleton";

function DetailEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { views, setViews, listEmployee, loadingEmployee } = useDataContext();
  const BASE_URL = "https://my-backend-sandy-zeta.vercel.app";
  if (!views) return null;
  const employee = listEmployee?.results?.find((e) => e.id === Number(id));

  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-6 border-b">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
              Employee Profile
            </h2>
            <p className="text-sm text-gray-500">
              Manage and view employee details
            </p>
          </div>

          <button
            onClick={() => {
              navigate("/employees");
              setViews(false);
            }}
            className="px-5 py-2 rounded-xl bg-gray-900 text-white text-sm hover:bg-gray-800 transition"
          >
            ← Back
          </button>
        </div>

        {/* CONTENT */}
        {loadingEmployee ? (
          <DetailEmployeeSkeleton />
        ) : employee ? (
          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT CARD */}
            <div className="relative backdrop-blur bg-white/70 border border-white/40 rounded-2xl text-white rounded-3xl p-6 shadow-lg">
              <div className="flex flex-col items-center text-center">
                <img
                  src={`${BASE_URL}/uploads/${employee.profile}`}
                  alt="profile"
                  className="w-28 h-28 rounded-full border-4 border-white shadow-lg mb-4"
                />

                <h3 className="text-xl font-semibold text-gray-900">
                  {employee.first_name} {employee.last_name}
                </h3>

                <p className="text-sm text-gray-900 opacity-80">
                  {employee.roles}
                </p>

                <span
                  className={`mt-3 px-4 py-1 text-xs rounded-full font-medium
                  ${
                    employee.is_active
                      ? "bg-blue-300 text-green-600"
                      : "bg-blue-300 text-red-500"
                  }`}
                >
                  {employee.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              {/* soft glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-2 space-y-6">
              <GlassSection title="Personal Information">
                <DetailItem label="Email" value={employee.email} />
                <DetailItem label="Gender" value={employee.gender} />
                <DetailItem label="DOB" value={employee.dob?.slice(0, 10)} />
                <DetailItem label="Status" value={employee.status} />
                <DetailItem label="Address" value={employee.address} />
              </GlassSection>

              <GlassSection title="Work Information">
                <DetailItem label="Role" value={employee.roles} />
                <DetailItem
                  label="Experience"
                  value={`${employee.experience} Years`}
                />
                <DetailItem label="Salary" value={`$ ${employee.salary}`} />
                <DetailItem
                  label="Hire Date"
                  value={employee.hire_date?.slice(0, 10)}
                />
                <DetailItem label="Description" value={employee.description} />
              </GlassSection>
            </div>
          </div>
        ) : (
          <div className="p-10 text-center text-gray-500">
            Employee not found
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailEmployee;

/* ===== Glass Section ===== */
function GlassSection({ title, children }) {
  return (
    <div className="backdrop-blur bg-white/70 border border-white/40 rounded-2xl p-6 shadow-md">
      <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-widest">
        {title}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

/* ===== Item ===== */
function DetailItem({ label, value }) {
  return (
    <div className="p-3 rounded-xl bg-white/80 border hover:shadow-md transition">
      <p className="text-xs text-gray-400 uppercase">{label}</p>
      <p className="text-sm font-medium text-gray-800 mt-1">{value || "-"}</p>
    </div>
  );
}
