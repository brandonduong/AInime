import { useParams } from "react-router-dom";
import HomeButton from "./HomeButton";
import { Link } from "react-router-dom";

export default function ModeTabs() {
  const { mode } = useParams();

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
      <Link to={`/anime/${getToday()}`} className="w-full">
        <HomeButton active={mode === "anime" || mode === undefined}>
          Anime
        </HomeButton>
      </Link>
      <Link to={`/rating/${getToday()}`} className="w-full">
        <HomeButton active={mode === "rating"}>Rating</HomeButton>
      </Link>
      <Link to={`/light/${getToday()}`} className="w-full">
        <HomeButton active={mode === "light"}>Light Novel</HomeButton>
      </Link>
    </div>
  );
}
