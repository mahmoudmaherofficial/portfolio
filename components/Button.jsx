const VARIANTS = {
  primary: "bg-slate-700 hover:bg-slate-800 text-white shadow-md hover:shadow-lg ring-1 ring-slate-600",
  secondary: "bg-slate-500 hover:bg-slate-600 text-white shadow-sm ring-1 ring-slate-400",
  danger: "bg-red-600 hover:bg-red-700 text-white shadow-md ring-1 ring-red-500",
  outline:
    "bg-transparent border border-slate-500 hover:border-slate-600 text-slate-700 hover:text-slate-800 shadow-sm",
};

const SIZES = {
  small: "px-3 py-1.5 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-5 py-3 text-lg",
};

const Button = ({ children, className = "", variant = "primary", size = "medium", ...props }) => {
  const variantClasses = VARIANTS[variant] || VARIANTS.primary;
  const sizeClasses = SIZES[size] || SIZES.medium;

  return (
    <button
      className={`rounded-full font-medium transition-all duration-200 ease-in-out cursor-pointer ${variantClasses} ${sizeClasses} ${className}`}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
