import { Outlet, useNavigation, useParams } from "react-router-dom";
import ModeTabs from "../components/Home/ModeTabs";
import { Link } from "react-router-dom";
import { getTodayDate, isArchive } from "../common/helper";
import Loading from "../components/Home/Loading";
import HomeButton from "../components/Home/HomeButton";
import Heart from "../components/Icons/Heart";
import CustomBorder from "../components/Home/CustomBorder";
export default function Home() {
  const { mode, date } = useParams();
  const { state } = useNavigation();

  return (
    <>
      <div className="flex relative mb-1 justify-between items-end">
        <Link to="/">
          <div className="flex gap-1">
            <div className="w-10 h-10">
              <CustomBorder>
                <img src="/logo.png" alt="aiguess" />
              </CustomBorder>
            </div>
            <h1 className="text-4xl font-black text-pink-900">
              AI<span className="text-pink-400">nime</span>
            </h1>
          </div>
        </Link>
        <div className="flex items-end gap-1">
          <div className="font-bold italic text-lg">
            <Link
              to={`/ainime/${mode ? mode : "anime"}/${
                isArchive(mode, date) ? getTodayDate() : "archive"
              }`}
            >
              <h5 className="underline">
                {isArchive(mode, date)
                  ? "Archive"
                  : date
                  ? date
                  : getTodayDate()}
              </h5>
            </Link>
          </div>
          <a
            href="https://ko-fi.com/brandonduong"
            target="_blank"
            rel="noreferrer"
          >
            <HomeButton icon border>
              <Heart />
            </HomeButton>
          </a>
        </div>
      </div>
      <ModeTabs />
      <CustomBorder grow overflowHidden>
        <div className="flex flex-col h-full justify-between overflow-y-auto">
          {state !== "loading" ? <Outlet /> : <Loading />}
        </div>
      </CustomBorder>
    </>
  );
}
