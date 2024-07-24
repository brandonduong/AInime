import { Rating } from "react-simple-star-rating";
import { Anime } from "../../routes/Game";
import HomeButton from "../Home/HomeButton";
import { padZero } from "../../common/helper";
import { useParams } from "react-router-dom";
import axiosConfig from "../../api/axiosConfig";
import { useState } from "react";

type RatingModeProps = {
  setAnswer: (anime: Anime) => void;
};

export default function RatingMode({ setAnswer }: RatingModeProps) {
  const { date } = useParams();
  const [score, setScore] = useState(0);

  async function vote() {
    if (score === undefined) {
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
      .patch(`/rating/${voteDate}`, { score })
      .then((res) => {
        const data = res.data as Anime;
        console.log(data);
        setAnswer(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changeStar(rating: number) {
    if (rating !== score) {
      setScore(rating);
    }
  }

  return (
    <div className="border-4 md:p-4 mt-4 border-pink-900">
      <div className="bg-pink-300 mb-4">
        <Rating
          onClick={changeStar}
          initialValue={score}
          allowFraction={true}
          iconsCount={10}
          key={score}
          emptyColor="lightslategray"
        />
      </div>
      <HomeButton onClick={() => vote()} disabled={score === 0}>
        Guess
      </HomeButton>
    </div>
  );
}
