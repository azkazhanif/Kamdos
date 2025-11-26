import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  onClick,
  children,
  type = "button",
  fullWidth = false,
}) => {
  const baseStyle =
    "px-6 py-2 rounded-lg text-sm font-medium shadow-md transition-transform active:scale-95";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
