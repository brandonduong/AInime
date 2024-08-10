import { useLoaderData, useParams } from "react-router-dom";
import axiosConfig from "../api/axiosConfig";
import { getTodayDate } from "../common/helper";
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
import AnswerPic from "../components/Game/AnswerPic";
import { Link } from "react-router-dom";
import Loading from "../components/Home/Loading";

type UrlParams = {
  date: string;
  mode: string;
};

export type AnimeAnswer = AnimeVotes &
  Answer & {
    fake: boolean;
    guess: boolean;
  };

export type RatingAnswer = RatingVotes &
  Answer & {
    guess: number;
  };

export type Answer = {
  malId: string;
  name: string;
  imgUrl: string;
  guess: boolean | number;
};

export type AnimeVotes = {
  realVotes: number;
  aiVotes: number;
};

export type RatingVotes = {
  score: number;
  scores: number[];
};

export default function Game() {
  const { anime, votes } = useLoaderData() as {
    anime: AnimeHidden | RatingHidden | TitleHidden;
    votes: AnimeVotes | RatingVotes | undefined;
  };

  const { mode, date } = useParams();
  const [answer, setAnswer] = useState<AnimeAnswer | RatingAnswer>();
  const [history, setHistory] = useHistoryState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const m = mode ? mode : "anime";
    const d = date ? date : getTodayDate();

    const guess = (JSON.parse(history) as History)[m as keyof History][d];
    if (guess && votes) {
      if ((m === "anime" || m === "title") && "realVotes" in votes) {
        // Get guess stats
        setAnswer({
          malId: guess.malId,
          realVotes: votes.realVotes,
          aiVotes: votes.aiVotes,
          name: guess.name,
          imgUrl: guess.imgUrl,
          fake: guess.answer as boolean,
          guess: guess.guess as boolean,
        });
      } else if (m === "rating" && "scores" in votes) {
        setAnswer({
          malId: guess.malId,
          score: guess.answer as number,
          name: guess.name,
          imgUrl: guess.imgUrl,
          scores: votes.scores,
          guess: guess.guess as number,
        });
      }
    } else {
      setAnswer(undefined);
    }
  }, [mode, date]);

  return (
    <>
      {!loading ? (
        <>
          <AnimeStats anime={anime} />
          <div className="grow flex flex-col">
            <div className="grow justify-center items-center flex flex-col p-4 gap-4 text-pink-950">
              {answer !== undefined &&
                (!("fake" in answer) || !answer.fake) && (
                  <AnswerPic imgUrl={answer.imgUrl} malId={answer.malId} />
                )}
              <AnimeInfo genres={anime.genres}>
                {"oneLiner" in anime ? (
                  <>
                    {answer && (
                      <h2 className="text-xl font-bold">{answer.name}</h2>
                    )}
                    <h2 className="uppercase font-bold text-balance">
                      {anime.oneLiner}
                    </h2>
                    <h5 className="text-pretty">{anime.summary}</h5>
                  </>
                ) : (
                  <h2 className="text-xl font-bold text-balance">
                    {anime.title}
                  </h2>
                )}
              </AnimeInfo>
            </div>
            {answer === undefined ? (
              <>
                {(mode === undefined ||
                  mode === "anime" ||
                  mode === "title") && (
                  <AnimeMode
                    setAnswer={setAnswer}
                    anime={anime}
                    setLoading={setLoading}
                  />
                )}
                {mode === "rating" && (
                  <RatingMode
                    setAnswer={setAnswer}
                    anime={anime}
                    setLoading={setLoading}
                  />
                )}
              </>
            ) : (
              <div className="p-4 pt-0">
                <AnswerInfo answer={answer} />

                <div className="border-4 border-pink-900 mt-4">
                  <Link to={`/${mode ? mode : "anime"}/archive`}>
                    <HomeButton>Archive</HomeButton>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export async function dateLoader({ params }: { params: any }) {
  const { date, mode } = params as UrlParams;
  const m = mode || "anime";
  const d = date || getTodayDate();
  let animeData;

  const history = localStorage.getItem("history");
  let h = history ? (JSON.parse(history) as History) : undefined;
  const guess = h ? h[m as keyof History][d] : undefined;
  let votes = null;
  if (guess) {
    // Fetch additional stats data if guess is defined
    votes = axiosConfig.get(`/${m}/stats/${d}`);
    animeData = {
      ...guess,
    };
  } else {
    const anime = axiosConfig.get(`/${m}/${d}`);
    animeData = (await anime).data;
  }
  votes = await votes;
  const votesData = votes ? votes.data : undefined;

  return { anime: animeData, votes: votesData };
}
