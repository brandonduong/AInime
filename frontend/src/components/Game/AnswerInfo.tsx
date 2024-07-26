import { useParams } from "react-router-dom";
import { AnimeAnswer, RatingAnswer } from "../../routes/Game";

export default function AnswerInfo({
  answer,
}: {
  answer: AnimeAnswer | RatingAnswer;
}) {
  const { mode } = useParams();

  function AnimeAnswer({ answer }: { answer: AnimeAnswer }) {
    return (
      <div>
        {answer.fake ? (
          <div>fake</div>
        ) : (
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
              real
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
              <div>
                <h5>{answer.name}</h5>
                <h5>fake votes: {answer.aiVotes}</h5>
                <h5>real votes: {answer.realVotes}</h5>
              </div>
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
    <div className="border-4 md:p-4 mt-4 border-pink-900">
      {"fake" in answer ? (
        <AnimeAnswer answer={answer} />
      ) : (
        <RatingAnswer answer={answer} />
      )}
    </div>
  );
}
