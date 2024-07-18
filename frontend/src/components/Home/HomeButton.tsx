import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
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
      className={`p-2 disabled:opacity-75 w-full ${
        active
          ? "bg-pink-500 hover:bg-pink-600"
          : "bg-pink-300 hover:bg-pink-400"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
