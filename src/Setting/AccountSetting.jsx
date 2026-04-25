import React from "react";
import { useDataContext } from "../Context";
import Security_Health from "./Security_Health";

function AccountSetting() {
  const { OneEmp } = useDataContext();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col gap-2">
        <div className="p-2 lg:px-8 lg:py-6">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            Setting Account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Create your administrative presense and security protocols
          </p>
        </div>
        <div className="p-1 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT CARD */}
          <div className="relative w-full backdrop-blur bg-white/70 rounded-2xl text-white p-6 shadow-lg border-l-2 border-red-600">
            <div className="flex flex-col items-center text-center gap-1">
              <h2 className="text-xl text-lime-900 font-bold">
                PROFILE IDENTITY
              </h2>
              <img
                src={`http://localhost:3000/uploads/${OneEmp.profile}`}
                alt="profile"
                className="w-40 h-40 border-4"
              />

              <h3 className="text-sm font-semibold text-gray-600">
                CURRENT ROLE
              </h3>

              <p className="text-[15px] text-gray-900 font-bold">
                {OneEmp.roles}
              </p>

              <span className={`text-sm text-gray-800 italic`}>
                member since {OneEmp.hire_date?.slice(0, 10)}
              </span>
            </div>
            <div className="w-full flex flex-col justify-center items-stretch mt-8">
              {/* HEADER */}
              <div className="flex justify-center items-center mb-3 gap-4">
                <h2 className="text-lg text-gray-800 font-bold">
                  Security Health
                </h2>
                <i className="fa-solid fa-user-shield text-green-600"></i>
              </div>

              {/* CONTENT */}
              <div className="w-full">
                <Security_Health OneEmp={OneEmp} />
              </div>
            </div>

            {/* soft glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
          </div>
          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            <GlassSection title="Personal Information">
              <DetailItem label="Email" value={OneEmp.email} />
              <DetailItem label="Gender" value={OneEmp.gender} />
              <DetailItem label="DOB" value={OneEmp.dob?.slice(0, 10)} />
              <DetailItem label="Status" value={OneEmp.status} />
              <DetailItem label="Address" value={OneEmp.address} />
              <DetailItem
                label="Experience"
                value={`${OneEmp.experience} Years`}
              />
              <DetailItem label="Salary" value={`$ ${OneEmp.salary}`} />

              <DetailItem label="Description" value={OneEmp.description} />
            </GlassSection>

            <GlassSection title="Authentication Management">
              <div className="col-span-2 grid md:grid-cols-2 gap-6 items-start">
                {/* LEFT TEXT */}
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Change Access Password
                  </h2>
                  <p className="text-[15px] text-gray-500">
                    Update your password to maintain security. We recommend at
                    least 12 characters with a mix of symbols.
                  </p>
                  <div className="flex justify-center items-center gap-2 bg-gray-200 hover:bg-gray-300 transition-all duration-500 px-4 py-2 rounded-full mt-4 cursor-pointer">
                    <i className="fa-brands fa-expeditedssl"></i>
                    <h2 className="text-gray-900">Update Password</h2>
                  </div>
                </div>

                {/* RIGHT FORM */}
                <div className="space-y-2 bg-gray-200 rounded-xl px-4 py-2">
                  <input
                    type="password"
                    value={OneEmp?.password}
                    placeholder="Current Password"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
              </div>
            </GlassSection>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSetting;
/* ===== Glass Section ===== */
function GlassSection({ title, children }) {
  return (
    <div className="backdrop-blur bg-white/70 border border-white/40 rounded-2xl p-2 lg:p-6 shadow-md">
      <h4 className="text-xl font-medium text-gray-900 mb-4 uppercase tracking-widest">
        {title}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

/* ===== Item ===== */
function DetailItem({ label, value }) {
  return (
    <div className="p-2 rounded-xl bg-white/80 border hover:shadow-md transition">
      <p className="text-xs text-gray-400 uppercase">{label}</p>
      <p className="text-sm font-medium text-gray-800 mt-1">{value || "-"}</p>
    </div>
  );
}
