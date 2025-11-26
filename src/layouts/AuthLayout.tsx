import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-600 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-br from-brand-600 to-brand-800"></div>
        <div className="relative z-10 text-white p-12 max-w-lg">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 shadow-xl border border-white/10">
            <span className="text-3xl font-bold">K</span>
          </div>
          <h1 className="text-4xl font-bold mb-6">
            Manage projects with the power of AI.
          </h1>
          <p className="text-brand-100 text-lg leading-relaxed">
            Kambos brings together Kanban boards, timelines, and AI-assisted
            planning to help teams deliver faster.
          </p>

          {/* Abstract decoration */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
