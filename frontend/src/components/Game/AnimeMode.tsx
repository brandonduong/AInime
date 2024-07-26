import { AnimeAnswer } from "../../routes/Game";
import HomeButton from "../Home/HomeButton";
import { padZero } from "../../common/helper";
import { useParams } from "react-router-dom";
import axiosConfig from "../../api/axiosConfig";
import { useState } from "react";

type AnimeModeProps = {
  setAnswer: (anime: AnimeAnswer) => void;
};

export default function AnimeMode({ setAnswer }: AnimeModeProps) {
  const { date, mode } = useParams();
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
    let m;
    if (!mode) {
      m = "anime";
    } else {
      m = mode;
    }
    await axiosConfig
      .patch(`/${m}/${voteDate}`, { fake })
      .then((res) => {
        const data = res.data;
        console.log(data);
        setAnswer(data);
      })
      .catch((err) => {
        console.log(err);
      });
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
        <HomeButton onClick={() => vote(fake)} disabled={fake === undefined}>
          Guess
        </HomeButton>
      </div>
    </div>
  );
}
