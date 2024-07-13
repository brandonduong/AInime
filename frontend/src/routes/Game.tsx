import { useLoaderData } from "react-router-dom";
import axiosConfig from "../api/axiosConfig";
import { padZero } from "../common/helper";
import HomeButton from "../components/Home/HomeButton";
import AnimeInfo, { Anime } from "../components/Home/Game/AnimeInfo";

type UrlParams = {
  date: String;
};

export default function Game() {
  const anime = useLoaderData() as Anime;
  return (
    <div className="flex basis-1/2 flex-col">
      <AnimeInfo anime={anime} />
      <HomeButton>Fake</HomeButton>
      <HomeButton>Real</HomeButton>
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
