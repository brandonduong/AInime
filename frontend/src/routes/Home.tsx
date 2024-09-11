import { Outlet, useNavigation } from "react-router-dom";
import ModeTabs from "../components/Home/ModeTabs";
import Loading from "../components/Home/Loading";
import CustomBorder from "../components/Home/CustomBorder";
export default function Home() {
  const { state } = useNavigation();

  return (
    <>
      <ModeTabs />
      <CustomBorder grow overflowHidden>
        <div className="flex flex-col h-full justify-between overflow-y-auto bg-pink-100 dark:bg-dark-mode-card">
          {state !== "loading" ? <Outlet /> : <Loading />}
        </div>
      </CustomBorder>
    </>
  );
}
