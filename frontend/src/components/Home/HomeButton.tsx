import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

export default function HomeButton(props: ButtonProps) {
  return <button className="p-2">{props.children}</button>;
}
