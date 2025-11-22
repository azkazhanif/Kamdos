import React from "react";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = "Empty",
  type = "text",
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-transparent hover:bg-slate-50 rounded border-none focus:ring-0 text-sm px-2 py-1 text-slate-700 placeholder-slate-300 transition-colors"
    />
  );
};

export default Input;
