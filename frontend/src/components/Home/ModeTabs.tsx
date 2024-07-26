import { useParams } from "react-router-dom";
import HomeButton from "./HomeButton";
import { Link } from "react-router-dom";

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
    <div className="flex justify-between">
      <Link to={`/anime/${date ? date : getToday()}`} className="w-full">
        <HomeButton active={mode === "anime" || mode === undefined}>
          Anime
        </HomeButton>
      </Link>
      <Link to={`/rating/${date ? date : getToday()}`} className="w-full">
        <HomeButton active={mode === "rating"}>Rating</HomeButton>
      </Link>
      <Link to={`/title/${date ? date : getToday()}`} className="w-full">
        <HomeButton active={mode === "title"}>Titles</HomeButton>
      </Link>
    </div>
  );
}
