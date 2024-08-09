import { useLoaderData, useParams } from "react-router-dom";
import axiosConfig from "../api/axiosConfig";
import { padZero } from "../common/helper";
import {
  AnimeHidden,
  RatingHidden,
  TitleHidden,
} from "../components/Game/AnimeStats";
import { useEffect, useState } from "react";
import AnswerInfo from "../components/Game/AnswerInfo";
import AnimeMode, { History } from "../components/Game/AnimeMode";
import RatingMode from "../components/Game/RatingMode";
import { useHistoryState } from "../store/store";
import HomeButton from "../components/Home/HomeButton";
import AnimeStats from "../components/Game/AnimeStats";
import AnimeInfo from "../components/Game/AnimeInfo";

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
        <AnimeStats anime={anime} />
        <div className="grow text-balance flex flex-col">
          <div className="grow justify-center items-center flex flex-col p-4 gap-4">
            {answer !== undefined && <AnswerInfo answer={answer} />}
            <AnimeInfo genres={anime.genres}>
              {"oneLiner" in anime ? (
                <>
                  <h2 className="uppercase font-bold">{anime.oneLiner}</h2>
                  <h5>{anime.summary}</h5>
                </>
              ) : (
                <h2 className="text-xl font-bold mb-2">{anime.title}</h2>
              )}
            </AnimeInfo>
          </div>
          {answer === undefined ? (
            <>
              {(mode === undefined || mode === "anime" || mode === "title") && (
                <AnimeMode setAnswer={setAnswer} />
              )}
              {mode === "rating" && <RatingMode setAnswer={setAnswer} />}
            </>
          ) : (
            <div className="border-4 border-pink-900 m-4 mt-0">
              <HomeButton>Archive</HomeButton>
            </div>
          )}
        </div>
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
