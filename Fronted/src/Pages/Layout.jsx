import { Outlet } from "react-router-dom";
import Sidebar from "../Component/Sidebar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30">
      <Sidebar />

      <main className="ml-[250px] min-h-screen overflow-y-auto">
        <div className="mx-auto max-w-[1600px] p-4 pt-16 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;