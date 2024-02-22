import classNames from "classnames";

const defaultStyling =
  "inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";

const defaultWhite = " border-gray-300 bg-white text-gray-700 hover:bg-gray-50";

const variants = {
  sky: " border-transparent bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-600",
  light: defaultWhite,
  white: defaultWhite,
  "success-outline": "border-teal-400 text-teal-700 bg-white hover:bg-teal-50",
  "danger-outline": "border-red-400 text-red-700 bg-white hover:bg-red-50",
  borderless: "border-none bg-transparent text-gray-600 shadow-none",
  "sky-outline":
    "bg-transparent font-bold text-sky-600 border border-sky-600 shadow-none",
};

const AnimatingSpinner = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const Button = ({
  children,
  onClick,
  variant = "white",
  extraClassName = "",
  type = "button",
  isLoading = false,
  ref,
  ...props
}) => {
  const className = classNames(
    defaultStyling,
    variants[variant],
    extraClassName
  );
  return (
    <button
      type={type}
      ref={ref}
      onClick={onClick}
      className={className}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <AnimatingSpinner /> : null}
      {children}
    </button>
  );
};

export default Button;
