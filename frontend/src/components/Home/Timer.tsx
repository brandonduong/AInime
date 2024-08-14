import { useState } from "react";
import { padZero } from "../../common/helper";

export default function Timer({ countdownTo }: { countdownTo: Date }) {
  // Set the date we're counting down to
  let countDownDate = countdownTo;
  countDownDate.setUTCDate(countDownDate.getUTCDate() + 1);
  countDownDate.setUTCHours(0, 0, 0, 0);
  // Find the distance between now and the count down date

  const [distance, setDistance] = useState(
    countDownDate.getTime() - new Date().getTime()
  );

  // Update the count down every 1 second
  const x = setInterval(function () {
    // Get today's date and time
    const now = new Date().getTime();
    setDistance(countDownDate.getTime() - now);

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
    }
  }, 1000);

  return (
    <div>
      {Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}:
      {padZero(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)))}:
      {padZero(Math.floor((distance % (1000 * 60)) / 1000))}
    </div>
  );
}
