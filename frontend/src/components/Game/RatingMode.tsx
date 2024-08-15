import { Rating } from "react-simple-star-rating";
import { RatingAnswer } from "../../routes/Game";
import HomeButton from "../Home/HomeButton";
import { vote } from "../../common/helper";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useHistoryState } from "../../store/store";
import { RatingHidden } from "./AnimeStats";

type RatingModeProps = {
  setAnswer: (anime: RatingAnswer) => void;
  anime: RatingHidden;
  setLoading: (loading: boolean) => void;
};

export default function RatingMode({
  setAnswer,
  anime,
  setLoading,
}: RatingModeProps) {
  const { date, mode } = useParams();
  const [history, setHistory] = useHistoryState();
  const [ind, setInd] = useState(-1);

  async function submit() {
    if (ind === -1) {
      return;
    }
    setLoading(true);
    setAnswer(
      (await vote(
        date,
        mode,
        ind,
        JSON.parse(history),
        setHistory,
        anime
      )) as RatingAnswer
    );
    setLoading(false);
  }

  return (
    <div>
      <div className="mb-4 flex gap-4 flex-wrap">
        {anime.options.map((o, i) => (
          <div className="border-4 border-pink-900 grow" key={`option-${i}`}>
            <HomeButton
              onClick={() => setInd(ind !== i || ind === -1 ? i : -1)}
              active={ind === i}
            >
              {anime.options[i].toFixed(2)}
            </HomeButton>
          </div>
        ))}
      </div>
      <div className="border-4 border-pink-900">
        <HomeButton onClick={() => submit()} disabled={ind === -1}>
          Guess
        </HomeButton>
      </div>
    </div>
  );
}
