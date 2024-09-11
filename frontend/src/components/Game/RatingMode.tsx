import { RatingAnswer } from "../../routes/Game";
import HomeButton from "../Home/HomeButton";
import { vote } from "../../common/helper";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useHistoryState } from "../../store/store";
import { RatingHidden } from "./AnimeStats";
import Play from "../Icons/Play";
import ChevronRight from "../Icons/ChevronRight";
import { useCaptcha } from "../../hooks/useCaptcha";

type RatingModeProps = {
  setAnswer: (anime: RatingAnswer) => void;
  anime: RatingHidden;
  setLoading: (loading: boolean) => void;
};

export default function RatingMode({
  setAnswer,
  anime,
  setLoading,
}: RatingModeProps) {
  const { date, mode } = useParams();
  const [history, setHistory] = useHistoryState();
  const [ind, setInd] = useState(-1);
  const { captchaRef } = useCaptcha();
  async function submit() {
    if (ind === -1) {
      return;
    }
    setLoading(true);
    const token = await captchaRef.current!.executeAsync();
    captchaRef.current!.reset();
    setAnswer(
      (await vote(
        date,
        mode,
        ind,
        JSON.parse(history),
        setHistory,
        anime,
        token || ""
      )) as RatingAnswer
    );
    setLoading(false);
  }

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 xl:flex gap-4 flex-wrap">
        {anime.options.map((o, i) => (
          <div className="grow" key={`option-${i}`}>
            <HomeButton
              onClick={() => setInd(ind !== i || ind === -1 ? i : -1)}
              active={ind === i}
              border
            >
              <div className="relative">
                <div
                  className={`absolute left-0 top-1/2 translate-y-[-50%] ${
                    ind === i ? "visible" : "invisible"
                  }`}
                >
                  <ChevronRight />
                </div>
                {anime.options[i].toFixed(2)}
              </div>
            </HomeButton>
          </div>
        ))}
      </div>
      <HomeButton onClick={() => submit()} disabled={ind === -1} border>
        <div className="flex justify-center items-center gap-2">
          <Play />
          Guess
        </div>
      </HomeButton>
    </div>
  );
}
