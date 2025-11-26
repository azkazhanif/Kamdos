import React from "react";

interface AuthHeaderProps {
  title: string;
  description?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, description }) => {
  return (
    <div className="text-center lg:text-left mb-10">
      <div className="lg:hidden w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
        K
      </div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
      {description && <p className="text-slate-500">{description}</p>}
    </div>
  );
};

export default AuthHeader;
