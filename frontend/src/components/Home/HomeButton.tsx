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
      className={`p-2 disabled:grayscale w-full text-lg font-bold uppercase text-pink-900 ${
        active
          ? "bg-pink-400 hover:bg-pink-500"
          : "bg-pink-300 hover:bg-pink-400"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
