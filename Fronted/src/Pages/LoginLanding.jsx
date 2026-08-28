import { Link } from "react-router-dom";
import LoginLeftSide from "../Component/LoginLeftSide";

const LoginLanding = () => {
  const portalOptions = [
    {
      to: "/login/admin",
      title: "Admin Portal",
      description: "Access the admin dashboard and manage the system.",
      icon: "🛡️",
    },
    {
      to: "/login/employee",
      title: "Employee Portal",
      description: "Access your employee dashboard and manage your work.",
      icon: "👤",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Left Side */}
      <LoginLeftSide />

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto min-h-screen">
        <div className="w-full max-w-md animate-fade-in relative z-10">

          {/* Header */}
          <div className="mb-7 text-center md:text-left">
            <h2 className="text-3xl font-medium text-slate-900 tracking-tight mb-5">
              Welcome Back
            </h2>

            <p className="text-slate-500">
              Select your portal to securely access the system.
            </p>
          </div>

          {/* Portals List */}
          <div className="space-y-4">
            {portalOptions.map((portal) => (
              <Link
                key={portal.to}
                to={portal.to}
                className="group block"
              >
                <div className="flex items-center gap-5 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300">

                  {/* Icon */}
                  <div className="w-14 h-14 shrink-0 flex items-center justify-center rounded-xl bg-slate-100 text-2xl transition-colors duration-300 group-hover:bg-slate-900 group-hover:text-white">
                    {portal.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      {portal.title}
                    </h3>

                    <p className="text-sm text-slate-500 leading-relaxed">
                      {portal.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="text-slate-400 text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:text-slate-900">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-10 text-center">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Employee Management System
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginLanding;