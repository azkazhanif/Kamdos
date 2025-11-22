import React from "react";

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder = "Type something...",
  minHeight = "400px",
}) => {
  return (
    <textarea
      placeholder={placeholder}
      className={`w-full h-full resize-none text-slate-700 leading-7 border-none focus:ring-0 p-0 bg-transparent text-base min-h-[${minHeight}]`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Textarea;
