import { Outlet } from "react-router-dom";
import ModeTabs from "../components/Home/ModeTabs";
export default function Home() {
  return (
    <div className="flex justify-center overflow-hidden">
      <div className="flex md:basis-2/3 lg:basis-1/2 flex-col">
        <ModeTabs />
        <Outlet />
      </div>
    </div>
  );
}
