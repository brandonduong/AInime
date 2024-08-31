import { Outlet, useNavigation, useParams } from "react-router-dom";
import ModeTabs from "../components/Home/ModeTabs";
import { Link } from "react-router-dom";
import { getTodayDate, isArchive } from "../common/helper";
import Loading from "../components/Home/Loading";
import HomeButton from "../components/Home/HomeButton";
import Heart from "../components/Icons/Heart";
export default function Home() {
  const { mode, date } = useParams();
  const { state } = useNavigation();

  return (
    <>
      <div className="flex justify-center relative">
        <div className="border-4 border-pink-900 absolute left-0 rounded-full">
          <a
            href="https://ko-fi.com/brandonduong"
            target="_blank"
            rel="noreferrer"
          >
            <HomeButton icon={true}>
              <Heart />
            </HomeButton>
          </a>
        </div>
        <Link to="/">
          <h1 className="text-4xl font-black text-pink-900 mb-1">
            AI<span className="text-pink-400">nime</span>
          </h1>
        </Link>
        <div className="absolute right-0 bottom-1 font-bold italic text-lg">
          <Link
            to={`/ainime/${mode ? mode : "anime"}/${
              isArchive(mode, date) ? getTodayDate() : "archive"
            }`}
          >
            <h5 className="underline">
              {isArchive(mode, date) ? "Archive" : date ? date : getTodayDate()}
            </h5>
          </Link>
        </div>
      </div>
      <ModeTabs />
      <div className="border-4 border-pink-900 grow overflow-hidden">
        <div className="flex flex-col h-full justify-between overflow-y-auto">
          {state !== "loading" ? <Outlet /> : <Loading />}
        </div>
      </div>
    </>
  );
}
