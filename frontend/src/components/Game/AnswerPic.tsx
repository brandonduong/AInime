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
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
          className="h-[200px] w-[140px] md:h-[300px] md:w-[211px]"
        ></div>
      </a>
    </>
  );
}
