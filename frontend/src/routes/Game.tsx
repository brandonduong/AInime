import { useLoaderData, useParams } from "react-router-dom";
import axiosConfig from "../api/axiosConfig";
import { padZero } from "../common/helper";
import HomeButton from "../components/Home/HomeButton";
import AnimeInfo, { Anime } from "../components/Game/AnimeInfo";
import { useState } from "react";
import Slider from "../components/Home/Slider";

type UrlParams = {
  date: String;
};

export default function Game() {
  const anime = useLoaderData() as Anime;
  const { date } = useParams();
  const [score, setScore] = useState(5);

  async function vote(fake: boolean) {
    console.log(fake);
    if (!date) {
      const today = new Date();
      await axiosConfig.patch(
        `/daily/${today.getUTCFullYear()}-${padZero(
          today.getUTCMonth() + 1
        )}-${padZero(today.getUTCDate())}`,
        { fake, score }
      );
    } else {
      await axiosConfig.patch(`/daily/${date}`, { fake, score });
    }
  }

  return (
    <div className="flex basis-1/2 flex-col">
      <AnimeInfo anime={anime} />
      <Slider min={0} max={10} value={score} onChange={setScore} />
      {score}
      <HomeButton onClick={() => vote(true)}>Fake</HomeButton>
      <HomeButton onClick={() => vote(false)}>Real</HomeButton>
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
