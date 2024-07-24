import { Rating } from "react-simple-star-rating";
import { Anime } from "../../routes/Game";
import HomeButton from "../Home/HomeButton";
import { padZero } from "../../common/helper";
import { useParams } from "react-router-dom";
import axiosConfig from "../../api/axiosConfig";
import { useState } from "react";

type AnimeModeProps = {
  setAnswer: (anime: Anime) => void;
};

export default function AnimeMode({ setAnswer }: AnimeModeProps) {
  const { date } = useParams();
  const [fake, setFake] = useState<boolean>();

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
      .patch(`/anime/${voteDate}`, { fake })
      .then((res) => {
        const data = res.data as Anime;
        console.log(data);
        setAnswer(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="border-4 md:p-4 mt-4 border-pink-900">
      <div className="flex justify-between gap-4 mb-4">
        <HomeButton
          onClick={() =>
            setFake(fake === false || fake === undefined ? true : undefined)
          }
          active={fake === true}
        >
          Fake
        </HomeButton>
        <HomeButton
          onClick={() =>
            setFake(fake === true || fake === undefined ? false : undefined)
          }
          active={fake === false}
        >
          Real
        </HomeButton>
      </div>
      <HomeButton onClick={() => vote(fake)} disabled={fake === undefined}>
        Guess
      </HomeButton>
    </div>
  );
}
