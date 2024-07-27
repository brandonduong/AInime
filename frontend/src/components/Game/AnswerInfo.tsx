import { useParams } from "react-router-dom";
import { AnimeAnswer, RatingAnswer } from "../../routes/Game";
import HomeButton from "../Home/HomeButton";

export default function AnswerInfo({
  answer,
}: {
  answer: AnimeAnswer | RatingAnswer;
}) {
  const { mode } = useParams();

  function AnimeVotes({ fake, real }: { fake: number; real: number }) {
    return (
      <div className="flex justify-between gap-4">
        <div className="border-4 border-pink-900 p-4 w-full">
          <h2 className="text-4xl font-bold italic">{fake}</h2>
          <p className="text-xs font-bold italic">Voted Fake</p>
        </div>
        <div className="border-4 border-pink-900 p-4 w-full">
          <h2 className="text-4xl font-bold italic">{real}</h2>
          <p className="text-xs font-bold italic">Voted Real</p>
        </div>
      </div>
    );
  }

  function AnimeAnswer({ answer }: { answer: AnimeAnswer }) {
    return (
      <div className="p-4">
        {answer.fake ? (
          <div>
            <AnimeVotes fake={answer.aiVotes} real={answer.realVotes} />
          </div>
        ) : (
          <div className="flex gap-4">
            <a
              href={`https://myanimelist.net/${
                mode === "title" ? "manga" : "anime"
              }/${answer.malId}`}
              target="_blank"
              rel="noreferrer"
            >
              <div
                style={{
                  backgroundImage: `url(${answer.imgUrl.toString()})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
                className="h-[200px] w-[140px] md:h-[300px] md:w-[211px]"
              ></div>
            </a>
            <div className="flex flex-col w-full justify-center">
              <h5>{answer.name}</h5>
              <div className="border-4 border-pink-900 mb-4">
                <a
                  href={`https://myanimelist.net/${
                    mode === "title" ? "manga" : "anime"
                  }/${answer.malId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <HomeButton>View on MyAnimeList</HomeButton>
                </a>
              </div>
              <AnimeVotes fake={answer.aiVotes} real={answer.realVotes} />
            </div>
          </div>
        )}
      </div>
    );
  }

  function RatingAnswer({ answer }: { answer: RatingAnswer }) {
    return (
      <div className="flex">
        <a
          href={`https://myanimelist.net/${
            mode === "title" ? "manga" : "anime"
          }/${answer.malId}`}
          target="_blank"
          rel="noreferrer"
        >
          <div
            style={{
              backgroundImage: `url(${answer.imgUrl.toString()})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
            className="h-[200px] w-[140px] md:h-[300px] md:w-[211px]"
          ></div>
        </a>

        <div>
          <h5>
            <a
              href={`https://myanimelist.net/${
                mode === "title" ? "manga" : "anime"
              }/${answer.malId}`}
              target="_blank"
              rel="noreferrer"
            >
              MyAnimeList Link
            </a>
          </h5>
          <h5>{answer.name}</h5>
          <h5>{answer.score}</h5>
          <h5>{answer.scores.join(", ")}</h5>
        </div>
      </div>
    );
  }

  return (
    <div>
      {"fake" in answer ? (
        <AnimeAnswer answer={answer} />
      ) : (
        <RatingAnswer answer={answer} />
      )}
    </div>
  );
}
