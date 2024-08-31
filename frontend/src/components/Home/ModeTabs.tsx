import { useParams } from "react-router-dom";
import HomeButton from "./HomeButton";
import { Link } from "react-router-dom";
import { isArchive } from "../../common/helper";
import Book from "../Icons/Book";
import Star from "../Icons/Star";
import TV from "../Icons/TV";

export default function ModeTabs() {
  const { mode, date } = useParams();

  function getToday() {
    const today = new Date();
    let todayDate = new Date(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate()
    );
    return todayDate.toISOString().split("T")[0];
  }

  return (
    <div className="flex justify-between border-t-4 border-pink-900">
      <Link
        to={`/ainime/anime/${
          isArchive(mode, date) || mode === "anime"
            ? "archive"
            : date
            ? date
            : getToday()
        }`}
        className="w-full border-l-4 border-r-2 border-pink-900"
      >
        <HomeButton active={mode === "anime" || mode === undefined}>
          <div className="flex justify-center items-center gap-2">
            <div className="size-6">
              <TV />
            </div>{" "}
            Anime
          </div>
        </HomeButton>
      </Link>
      <Link
        to={`/ainime/rating/${
          isArchive(mode, date) || mode === "rating"
            ? "archive"
            : date
            ? date
            : getToday()
        }`}
        className="w-full border-l-2 border-r-2 border-pink-900"
      >
        <HomeButton active={mode === "rating"}>
          <div className="flex justify-center items-center gap-2">
            <Star /> Rating
          </div>
        </HomeButton>
      </Link>
      <Link
        to={`/ainime/title/${
          isArchive(mode, date) || mode === "title"
            ? "archive"
            : date
            ? date
            : getToday()
        }`}
        className="w-full border-l-2 border-r-4 border-pink-900"
      >
        <HomeButton active={mode === "title"}>
          <div className="flex justify-center items-center gap-2">
            <Book /> Titles
          </div>
        </HomeButton>
      </Link>
    </div>
  );
}
