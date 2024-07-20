import { useLoaderData, useParams } from "react-router-dom";
import axiosConfig from "../api/axiosConfig";
import { padZero } from "../common/helper";
import HomeButton from "../components/Home/HomeButton";
import AnimeInfo, { AnimeHidden } from "../components/Game/AnimeInfo";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import AnswerInfo from "../components/Game/AnswerInfo";

type UrlParams = {
  date: String;
};

export type Anime = {
  malId: String;
  realVotes: number;
  aiVotes: number;
  score: number;
  name: String;
  imgUrl: String;
  scores: number[];
  fake: Boolean;
};

export default function Game() {
  const anime = useLoaderData() as AnimeHidden;
  const { date } = useParams();
  const [score, setScore] = useState(0);
  const [fake, setFake] = useState<boolean>();
  const [answer, setAnswer] = useState<Anime>();

  async function vote(fake: boolean | undefined) {
    if (fake === undefined) {
      return;
    }
    let voteDate;
    if (!date) {
      const today = new Date();
      voteDate = `${today.getUTCFullYear()}-${padZero(
        today.getUTCMonth() + 1
      )}-${padZero(today.getUTCDate())}`;
    } else {
      voteDate = date;
    }
    await axiosConfig
      .patch(`/daily/${voteDate}`, { fake, score })
      .then((res) => {
        const data = res.data as Anime;
        console.log(data);
        setAnswer(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changeStar(rating: number) {
    if (rating !== score) {
      setScore(rating);
    } else {
      setScore(0);
    }
  }

  return (
    <div className="flex md:basis-2/3 lg:basis-1/2">
      {answer === undefined ? (
        <div>
          <AnimeInfo anime={anime} />
          <div className="border-4 md:p-4 mt-4 border-pink-900">
            <div className="bg-pink-300">
              <Rating
                onClick={changeStar}
                initialValue={score}
                iconsCount={10}
                allowFraction={true}
                key={score}
                emptyColor="lightslategray"
              />
            </div>
            <div className="flex justify-between gap-4 my-4">
              <HomeButton
                onClick={() =>
                  setFake(
                    fake === false || fake === undefined ? true : undefined
                  )
                }
                active={fake === true}
              >
                Fake
              </HomeButton>
              <HomeButton
                onClick={() =>
                  setFake(
                    fake === true || fake === undefined ? false : undefined
                  )
                }
                active={fake === false}
              >
                Real
              </HomeButton>
            </div>
            <HomeButton
              onClick={() => vote(fake)}
              disabled={fake === undefined}
            >
              Guess
            </HomeButton>
          </div>
        </div>
      ) : (
        <div>
          <AnswerInfo answer={answer} />
        </div>
      )}
    </div>
  );
}

export async function todayLoader() {
  const today = new Date();
  const anime = await axiosConfig.get(
    `/daily/${today.getUTCFullYear()}-${padZero(
      today.getUTCMonth() + 1
    )}-${padZero(today.getUTCDate())}`
  );
  return anime.data;
}

export async function dateLoader({ params }: { params: any }) {
  const { date } = params as UrlParams;
  const anime = await axiosConfig.get(`/daily/${date}`);
  return anime.data;
}
