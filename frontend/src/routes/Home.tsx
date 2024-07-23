import { Outlet } from "react-router-dom";
export default function Home() {
  return (
    <div className="flex justify-center overflow-hidden">
      <Outlet />
    </div>
  );
}
