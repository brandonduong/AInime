import { AnimeAnswer, Answer } from "../../routes/Game";
import HomeButton from "../Home/HomeButton";
import { vote } from "../../common/helper";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useHistoryState } from "../../store/store";
import { AnimeHidden, RatingHidden, TitleHidden } from "./AnimeStats";

type AnimeModeProps = {
  setAnswer: (anime: AnimeAnswer) => void;
  anime: AnimeHidden | RatingHidden | TitleHidden;
};

export type HistoryItem = Answer & {
  answer: boolean | number;
};

export type History = {
  anime: Record<string, HistoryItem & AnimeHidden>;
  rating: Record<string, HistoryItem & RatingHidden>;
  title: Record<string, HistoryItem & TitleHidden>;
};

export default function AnimeMode({ setAnswer, anime }: AnimeModeProps) {
  const { date, mode } = useParams();
  const [fake, setFake] = useState<boolean>();
  const [history, setHistory] = useHistoryState();
  const [submitted, setSubmitted] = useState(false);

  async function submit() {
    if (fake === undefined) {
      return;
    }
    setSubmitted(true);
    setAnswer(
      (await vote(
        date,
        mode,
        fake,
        JSON.parse(history),
        setHistory,
        anime
      )) as AnimeAnswer
    );
  }

  return (
    <div className="p-4 pt-0">
      <div className="flex justify-between gap-4 mb-4">
        <div className="w-full border-4 border-pink-900">
          <HomeButton
            onClick={() =>
              setFake(fake === false || fake === undefined ? true : undefined)
            }
            active={fake === true}
          >
            Fake
          </HomeButton>
        </div>
        <div className="w-full border-4 border-pink-900">
          <HomeButton
            onClick={() =>
              setFake(fake === true || fake === undefined ? false : undefined)
            }
            active={fake === false}
          >
            Real
          </HomeButton>
        </div>
      </div>
      <div className="border-4 border-pink-900">
        <HomeButton
          onClick={() => submit()}
          disabled={fake === undefined || submitted}
        >
          Guess
        </HomeButton>
      </div>
    </div>
  );
}
