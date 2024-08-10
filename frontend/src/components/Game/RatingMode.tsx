import { Rating } from "react-simple-star-rating";
import { RatingAnswer } from "../../routes/Game";
import HomeButton from "../Home/HomeButton";
import { vote } from "../../common/helper";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useHistoryState } from "../../store/store";
import { AnimeHidden, RatingHidden, TitleHidden } from "./AnimeStats";

type RatingModeProps = {
  setAnswer: (anime: RatingAnswer) => void;
  anime: AnimeHidden | RatingHidden | TitleHidden;
};

export default function RatingMode({ setAnswer, anime }: RatingModeProps) {
  const { date, mode } = useParams();
  const [score, setScore] = useState(0);
  const [history, setHistory] = useHistoryState();

  async function submit() {
    if (score === 0) {
      return;
    }
    setAnswer(
      (await vote(
        date,
        mode,
        score,
        JSON.parse(history),
        setHistory,
        anime
      )) as RatingAnswer
    );
  }

  function changeStar(rating: number) {
    if (rating !== score) {
      setScore(rating);
    }
  }

  return (
    <div className="p-4 pt-0">
      <div className="bg-pink-300 mb-4 border-4 border-pink-900">
        <Rating
          onClick={changeStar}
          initialValue={score}
          allowFraction={true}
          iconsCount={10}
          key={score}
          emptyColor="lightslategray"
          fillColor="black"
        />
      </div>
      <div className="border-4 border-pink-900">
        <HomeButton onClick={() => submit()} disabled={score === 0}>
          Guess
        </HomeButton>
      </div>
    </div>
  );
}
