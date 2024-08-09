import { useParams } from "react-router-dom";
import HomeButton from "./HomeButton";
import { Link } from "react-router-dom";
import { isArchive } from "../../common/helper";

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
        to={`/anime/${
          isArchive(mode, date) ? "archive" : date ? date : getToday()
        }`}
        className="w-full border-l-4 border-r-2 border-pink-900"
      >
        <HomeButton active={mode === "anime" || mode === undefined}>
          Anime
        </HomeButton>
      </Link>
      <Link
        to={`/rating/${
          isArchive(mode, date) ? "archive" : date ? date : getToday()
        }`}
        className="w-full border-l-2 border-r-2 border-pink-900"
      >
        <HomeButton active={mode === "rating"}>Rating</HomeButton>
      </Link>
      <Link
        to={`/title/${
          isArchive(mode, date) ? "archive" : date ? date : getToday()
        }`}
        className="w-full border-l-2 border-r-4 border-pink-900"
      >
        <HomeButton active={mode === "title"}>Titles</HomeButton>
      </Link>
    </div>
  );
}
