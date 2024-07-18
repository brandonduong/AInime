import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export default function HomeButton({ children, onClick }: ButtonProps) {
  return (
    <button className="p-2" onClick={onClick}>
      {children}
    </button>
  );
}
