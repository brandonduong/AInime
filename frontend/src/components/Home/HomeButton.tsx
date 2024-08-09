import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
};

export default function HomeButton({
  children,
  onClick,
  active,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={`p-2 disabled:grayscale w-full text-xl font-bold uppercase text-pink-900 ${
        active
          ? "bg-pink-500 hover:bg-pink-600 text-rose-100 hover:text-rose-200"
          : "bg-pink-300 hover:bg-pink-400"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
