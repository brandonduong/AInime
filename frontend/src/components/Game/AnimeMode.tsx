import { AnimeAnswer } from "../../routes/Game";
import HomeButton from "../Home/HomeButton";
import { vote } from "../../common/helper";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useHistoryState } from "../../store/store";

type AnimeModeProps = {
  setAnswer: (anime: AnimeAnswer) => void;
};

export type HistoryItem = {
  guess: boolean | number;
  answer: Answer;
};

export type Answer = {
  answer: boolean | number;
  malId: string;
  name: string;
  imgUrl: string;
};

export type History = {
  anime: Record<string, HistoryItem>;
  rating: Record<string, HistoryItem>;
  title: Record<string, HistoryItem>;
};

export default function AnimeMode({ setAnswer }: AnimeModeProps) {
  const { date, mode } = useParams();
  const [fake, setFake] = useState<boolean>();
  const [history, setHistory] = useHistoryState();

  async function submit() {
    if (fake === undefined) {
      return;
    }
    setAnswer(
      (await vote(
        date,
        mode,
        fake,
        JSON.parse(history),
        setHistory
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
        <HomeButton onClick={() => submit()} disabled={fake === undefined}>
          Guess
        </HomeButton>
      </div>
    </div>
  );
}
