import { ReactNode } from "react";

type BorderProps = {
  children: ReactNode;
  grow?: boolean;
  overflowHidden?: boolean;
};

export default function CustomBorder({
  children,
  grow,
  overflowHidden,
}: BorderProps) {
  return (
    <div
      className={`border-4 border-pink-900 ${grow ? "grow" : ""} ${
        overflowHidden ? "overflow-hidden" : ""
      }`}
    >
      {children}
    </div>
  );
}
