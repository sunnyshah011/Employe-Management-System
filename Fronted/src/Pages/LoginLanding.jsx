import LoginLeftSide from "../Component/LoginLeftSide";

const LoginLanding = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <LoginLeftSide />

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto min-h-screen">
        <div className="w-full max-w-md animate-fade-in relative z-10">
          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-medium text-slate-900 tracking-tight mb-3">
              Welcome Back
            </h2>
            <p className="text-slate-500">
              Select Your Portal to securely access the system.
            </p>
          </div>

          {/* Portals List */}
        </div>
      </div>
    </div>
  );
};

export default LoginLanding;
