import { useParams } from "react-router-dom";
import CustomBorder from "../Home/CustomBorder";

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
        <CustomBorder>
          <div
            style={{
              backgroundImage: `url(${imgUrl.toString()})`,
            }}
            className="h-[200px] w-[140px] md:h-[350px] md:w-[225px] bg-center bg-cover bg-no-repeat"
          ></div>
        </CustomBorder>
      </a>
    </>
  );
}
