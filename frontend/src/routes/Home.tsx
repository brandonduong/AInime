import { Outlet } from "react-router-dom";
import ModeTabs from "../components/Home/ModeTabs";
import Archive from "../components/Home/Archive";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="flex justify-center w-full min-h-screen">
      <div className="flex md:basis-2/3 lg:basis-1/2 flex-col justify-between p-1 md:p-4">
        <div>
          <Link to={"/"}>
            <h1 className="text-4xl">AInime</h1>
          </Link>
          <ModeTabs />
          <Outlet />
        </div>
        <div className="border-4 mt-4 border-pink-900">
          <Archive />
        </div>
      </div>
    </div>
  );
}
