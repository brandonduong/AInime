import { Outlet } from "react-router-dom";
import HomeButton from "../components/Home/HomeButton";

export default function Home() {
  return (
    <div>
      <Outlet />
      <HomeButton>Fake</HomeButton>
      <HomeButton>Real</HomeButton>
    </div>
  );
}
