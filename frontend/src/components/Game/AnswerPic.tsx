import { useParams } from "react-router-dom";

export default function AnswerPic({
  malId,
  imgUrl,
}: {
  malId: string;
  imgUrl: string;
}) {
  const { mode } = useParams();
  return (
    <>
      <a
        href={`https://myanimelist.net/${
          mode === "title" ? "manga" : "anime"
        }/${malId}`}
        target="_blank"
        rel="noreferrer"
      >
        <div
          style={{
            backgroundImage: `url(${imgUrl.toString()})`,
          }}
          className="h-[200px] w-[140px] md:h-[350px] md:w-[225px] bg-center bg-cover bg-no-repeat"
        ></div>
      </a>
    </>
  );
}
