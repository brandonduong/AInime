import { useParams } from "react-router-dom";
import { AnimeAnswer, RatingAnswer } from "../../routes/Game";
import HomeButton from "../Home/HomeButton";

export default function AnswerInfo({
  answer,
}: {
  answer: AnimeAnswer | RatingAnswer;
}) {
  const { mode } = useParams();

  function AnimeVotes({
    fake,
    real,
    fakeLabel,
    realLabel,
  }: {
    fake: String;
    real: String;
    fakeLabel: String;
    realLabel: String;
  }) {
    return (
      <div className="flex justify-between gap-4">
        <div className="border-4 border-pink-900 p-4 w-full">
          <h2 className="text-4xl font-bold italic">{fake}</h2>
          <p className="text-xs font-bold italic">{fakeLabel}</p>
        </div>
        <div className="border-4 border-pink-900 p-4 w-full">
          <h2 className="text-4xl font-bold italic">{real}</h2>
          <p className="text-xs font-bold italic">{realLabel}</p>
        </div>
      </div>
    );
  }

  function AnimeAnswer({ answer }: { answer: AnimeAnswer }) {
    return (
      <div>
        {answer.fake ? (
          <div>
            <AnimeVotes
              fake={answer.aiVotes.toString()}
              real={answer.realVotes.toString()}
              fakeLabel="Voted Fake"
              realLabel="Voted Real"
            />
          </div>
        ) : (
          <div className="flex gap-4 flex-col items-center">
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
            <div className="flex flex-col w-full justify-center gap-4">
              <h5 className="font-bold text-xl">{answer.name}</h5>
              <AnimeVotes
                fake={answer.aiVotes.toString()}
                real={answer.realVotes.toString()}
                fakeLabel="Voted Fake"
                realLabel="Voted Real"
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  function RatingAnswer({ answer }: { answer: RatingAnswer }) {
    function calculateAverageScore(scores: number[]) {
      const sum = scores.reduce(
        (part, next, ind) => part + next * (ind / 2 + 0.5),
        0
      );
      const numVotes = scores.reduce((part, next) => part + next, 0);
      return sum / numVotes;
    }

    return (
      <div className="flex gap-4 flex-col items-center">
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

        <div className="flex flex-col w-full justify-center gap-4">
          <h5 className="font-bold text-xl">{answer.name}</h5>
          <AnimeVotes
            fake={answer.score.toString()}
            real={calculateAverageScore(answer.scores).toFixed(2).toString()}
            fakeLabel="Actual Score"
            realLabel="Average Guess"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {"fake" in answer ? (
        <AnimeAnswer answer={answer} />
      ) : (
        <RatingAnswer answer={answer} />
      )}
    </div>
  );
}
