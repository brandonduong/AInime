import { Outlet, useParams } from "react-router-dom";
import ModeTabs from "../components/Home/ModeTabs";
import { Link } from "react-router-dom";
import { getTodayDate, isArchive } from "../common/helper";
export default function Home() {
  const { mode, date } = useParams();

  return (
    <div className="flex justify-center w-full min-h-screen">
      <div className="flex md:basis-2/3 lg:basis-1/2 flex-col justify-between min-w-0">
        <div className="flex flex-col grow min-h-screen sm:min-h-0 p-1 sm:p-4">
          <div className="flex justify-center relative">
            <Link to={"/"}>
              <h1 className="text-4xl font-black text-pink-900 mb-1">
                AI<span className="text-pink-400">nime</span>
              </h1>
            </Link>
            <div className="absolute right-0 bottom-1 font-bold italic text-xs">
              <Link to={`/${mode ? mode : "anime"}/archive`}>
                <h5 className="underline">
                  {isArchive(mode, date)
                    ? "Archive"
                    : date
                    ? date
                    : getTodayDate()}
                </h5>
              </Link>
            </div>
          </div>
          <ModeTabs />
          <div className="border-4 border-pink-900 grow overflow-hidden">
            <div className="flex flex-col h-full justify-between overflow-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
