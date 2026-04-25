const dataSchoolInfomation = {
  school_name: "SAM International School",
  motto: "Knowledge Through Virtue & Excellence",
  official_email: "admin@sam.edu.kh",
  contact: "+855-23 444 555",
  physical_address:
    "Svay Meas Village, Vihear Sor Commune, Khsach Kandal District, Kandal Province",
};
import logo_school from "../../assets/SAM_LOGO.png";
function SchoolCoreDetial() {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="px-8 py-6">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
          School Profile & Identity
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage your International School’s public information and operational
          details
        </p>
      </div>

      {/* Content */}
      <div className="p-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* LEFT */}
        <div>
          <GlassSection
            title="International School Core Details"
            icon="fa-solid fa-city"
          >
            <DetailItem
              label="School Name"
              value={dataSchoolInfomation.school_name}
            />
            <DetailItem label="Motto" value={dataSchoolInfomation.motto} />

            {/* Email + Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem
                label="Email"
                value={dataSchoolInfomation.official_email}
              />
              <DetailItem
                label="Contact"
                value={dataSchoolInfomation.contact}
              />
            </div>

            <DetailItem
              label="Address"
              value={dataSchoolInfomation.physical_address}
            />
          </GlassSection>
        </div>

        {/* RIGHT */}
        <GlassSection title="International School SAM">
          <div className="flex justify-center items-center">
            <img
              src={logo_school}
              alt="School Logo"
              className="w-40 h-40 object-contain"
            />
          </div>
          <h2 className="text-green-600 text-center font-bold text-xl">Scholarly Achievement & Morality</h2>
        </GlassSection>
      </div>
    </div>
  );
}

export default SchoolCoreDetial;
/* ===== Glass Section ===== */
function GlassSection({ title, icon, children }) {
  return (
    <div className="backdrop-blur bg-white/70 border border-white/40 rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-medium text-gray-900 mb-4 uppercase tracking-widest flex items-center gap-2">
        {icon && <i className={`${icon} text-red-600 text-xl`}></i>}
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-6">{children}</div>
    </div>
  );
}

/* ===== Item ===== */
function DetailItem({ label, value }) {
  return (
    <div className="px-3 py-2 rounded-xl bg-white/60 border hover:shadow-md transition">
      <p className="text-xs text-gray-400 uppercase">{label}</p>
      <p className="text-sm font-medium text-gray-800 mt-1 break-words">
        {value || "-"}
      </p>
    </div>
  );
}
