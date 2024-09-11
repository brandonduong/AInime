import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  icon?: boolean;
  border?: boolean;
};

export default function HomeButton({
  children,
  onClick,
  active,
  disabled,
  icon,
  border,
}: ButtonProps) {
  return (
    <button
      className={`disabled:grayscale h-full w-full text-xl ${
        border && `border-4 border-pink-900 dark:border-dark-pink-900`
      } font-bold uppercase text-pink-950 dark:text-gray-200 ${
        active
          ? "bg-pink-500 dark:bg-dark-pink-500 hover:bg-pink-600 dark:hover:bg-dark-pink-600 text-rose-100 dark:text-gray-200 hover:text-rose-200 dark:hover:text-gray-200"
          : "bg-pink-300 hover:bg-pink-400 dark:bg-dark-pink-300 dark:hover:bg-dark-pink-400"
      } ${icon ? "rounded-full flex p-1" : "p-2"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
