import { useLoaderData, useParams } from "react-router-dom";
import axiosConfig from "../api/axiosConfig";
import { padZero } from "../common/helper";
import AnimeInfo, {
  AnimeHidden,
  RatingHidden,
  TitleHidden,
} from "../components/Game/AnimeInfo";
import { useEffect, useState } from "react";
import AnswerInfo from "../components/Game/AnswerInfo";
import AnimeMode, { History } from "../components/Game/AnimeMode";
import RatingMode from "../components/Game/RatingMode";
import { useHistoryState } from "../store/store";

type UrlParams = {
  date: string;
  mode: string;
};

export type AnimeAnswer = Answer & {
  realVotes: number;
  aiVotes: number;
  fake: boolean;
};

export type RatingAnswer = Answer & {
  scores: number[];
  score: number;
};

export type Answer = {
  malId: string;
  name: string;
  imgUrl: string;
  guess: boolean | number;
};

export default function Game() {
  const anime = useLoaderData() as AnimeHidden | RatingHidden | TitleHidden;
  const { mode, date } = useParams();
  const [answer, setAnswer] = useState<AnimeAnswer | RatingAnswer>();
  const [history, setHistory] = useHistoryState();

  useEffect(() => {
    const m = mode ? mode : "anime";
    const d = date ? date : new Date().toISOString().split("T")[0];

    const guess = (JSON.parse(history) as History)[m as keyof History][d];
    if (guess) {
      if (m === "anime" || m === "title") {
        // Get guess stats
        setAnswer({
          malId: guess.malId,
          realVotes: 0,
          aiVotes: 0,
          name: guess.name,
          imgUrl: guess.imgUrl,
          fake: guess.answer as boolean,
          guess: guess.guess as boolean,
        });
      } else if (m === "rating") {
        setAnswer({
          malId: guess.malId,
          score: guess.answer as number,
          name: guess.name,
          imgUrl: guess.imgUrl,
          scores: [],
          guess: guess.guess as number,
        });
      }
    } else {
      setAnswer(undefined);
    }
  }, [mode, date]);

  return (
    <div className="border-4 border-pink-900 grow">
      <div className="flex flex-col h-full justify-between">
        {answer === undefined ? (
          <>
            <AnimeInfo anime={anime} />
            {(mode === undefined || mode === "anime" || mode === "title") && (
              <AnimeMode setAnswer={setAnswer} />
            )}
            {mode === "rating" && <RatingMode setAnswer={setAnswer} />}
          </>
        ) : (
          <>
            <AnswerInfo answer={answer} />
          </>
        )}
      </div>
    </div>
  );
}

export async function todayLoader() {
  const today = new Date();
  const anime = await axiosConfig.get(
    `/anime/${today.getUTCFullYear()}-${padZero(
      today.getUTCMonth() + 1
    )}-${padZero(today.getUTCDate())}`
  );
  return anime.data;
}

export async function dateLoader({ params }: { params: any }) {
  const { date, mode } = params as UrlParams;
  const anime = await axiosConfig.get(`/${mode}/${date}`);
  return anime.data;
}
