import Link_Pages from "../Pages/Link_pages";
import RootSkelton from "../Root/RootSkelton";
import { useDataContext } from "../Context";

function Header_Link_Navbar() {
  const {
    setShowHidden,
    setFormEmployees,
    setEmployees,
    setViews,
    auth,
    setNewStudent,
    OneEmp,
    loading,
  } = useDataContext();
  return (
    <div
      className={`${"hidden md:flex"} flex-col bg-white rounded-r-xl shadow-[-4px_0_10px_rgba(75,85,99,1)] fixed z-80 left-0 top-0 sm:w-[20%] h-screen`}
    >
      {loading ? (
        <RootSkelton />
      ) : (
        <div>
          <div className="shadow-[0_4px_10px_rgba(75,85,99,0.1)]">
            <h2 className="sm:text-[16px] md:text-xl text-blue-600 font-rowdies text-center my-2">
              SMART <span className="text-red-600">ERP</span>
            </h2>
          </div>
          <div className="flex flex-col gap-2 py-3 ">
            <div className="flex items-center gap-2 mt-4 ml-4 ">
              <img
                className="xl:w-20 xl:h-20 w-14 h-14 rounded-[50%] border-white border-2 bg-gradient-to-r from-blue-500 to-purple-600 p-1"
                src={`http://localhost:3000/uploads/${OneEmp?.profile}`}
                alt="Proile Employee"
              />

              <div className="flex flex-col justify-center gap-1">
                <h2 className="text-sm xl:text-[16px] font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  {OneEmp?.last_name} {OneEmp?.first_name}
                </h2>

                <p className="text-gray-800 font-medium text-xs xl:text-[12px]">
                  {OneEmp?.roles}
                </p>
                <p className="text-gray-700 font-medium text-xs xl:text-[12px]">
                  ID: {OneEmp?.emp_id}
                </p>
              </div>
            </div>
          </div>
          <div className="pl-8 pt-2 mt-8 shadow-[0_-4px_10px_rgba(75,85,99,0.1)]">
            <Link_Pages
              setShowHidden={setShowHidden}
              setFormEmployees={setFormEmployees}
              setEmployees={setEmployees}
              setViews={setViews}
              auth={auth}
              setNewStudent={setNewStudent}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header_Link_Navbar;
