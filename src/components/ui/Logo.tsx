import React from "react";

interface LogoProps {
  text?: boolean;
}

const Logo: React.FC<LogoProps> = ({ text = false }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-blue-500/50 shadow-lg">
        K
      </div>

      {text && (
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">
          Kambos
        </h1>
      )}
    </div>
  );
};

export default Logo;
