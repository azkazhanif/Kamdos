import React from "react";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const Select: React.FC<SelectProps> = ({ value, onChange, options }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent hover:bg-slate-100 transition-colors text-slate-700 text-sm px-2 py-1 rounded border-none focus:ring-0 cursor-pointer w-auto max-w-full"
    >
      {options.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
};

export default Select;
