import { useSelector } from "react-redux";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
}) => {
  const darkMode = useSelector((state) => state.darkMode); // adjust selector

  // Variants depending on theme
  const variants = {
    primary: darkMode ? "bg-blue-500 text-white" : "bg-blue-600 text-white",

    secondary: darkMode ? "bg-gray-600 white" : "bg-gray-200 black",

    outline: darkMode
      ? "border border-gray-400 text-gray-200"
      : "border border-blue-600 text-blue-600",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-8 py-2 text-lg",
    icon: "p-2", // only icon
  };

  return (
    <button
      className={`inline-flex gap-1 items-center justify-center rounded-2xl font-medium 
      cursor-pointer disabled:opacity-50 
      hover:opacity-50 active:opacity-50 transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
