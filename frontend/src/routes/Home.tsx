import { Outlet } from "react-router-dom";
import ModeTabs from "../components/Home/ModeTabs";
import { Link } from "react-router-dom";
import HomeButton from "../components/Home/HomeButton";
export default function Home() {
  return (
    <div className="flex justify-center w-full min-h-screen">
      <div className="flex md:basis-2/3 lg:basis-1/2 flex-col justify-between">
        <div className="flex flex-col grow min-h-screen sm:min-h-0 p-1 sm:p-4">
          <div className="flex justify-center relative">
            <Link to={"/"}>
              <h1 className="text-4xl font-black text-pink-900 mb-4">
                AI<span className="text-pink-400">nime</span>
              </h1>
            </Link>
            <div className="absolute right-0 border-4 border-pink-900">
              <HomeButton>test</HomeButton>
            </div>
          </div>
          <ModeTabs />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
