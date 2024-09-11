import { Link, useNavigation } from "react-router-dom";
import HomeButton from "../components/Home/HomeButton";
import TV from "../components/Icons/TV";
import Question from "../components/Icons/Question";
import Loading from "../components/Home/Loading";
import CustomBorder from "../components/Home/CustomBorder";

export default function Menu() {
  const { state } = useNavigation();

  return (
    <>
      <CustomBorder grow overflowHidden>
        <div className="flex flex-col h-full justify-between overflow-y-auto">
          {state !== "loading" ? (
            <>
              <h3 className="flex flex-wrap gap-x-4 justify-between text-lg font-bold px-4 py-2 bg-pink-300 dark:bg-dark-pink-300 border-b-4 border-pink-900 dark:border-dark-pink-900">
                <span className="flex gap-1 whitespace-nowrap">
                  Choose Theme:
                </span>
              </h3>
              <div className="p-4 gap-4 grid grow bg-pink-100 dark:bg-dark-mode-card">
                <Link to={`/ainime`}>
                  <HomeButton border>
                    <div className="flex justify-center">
                      <div className="flex-col md:flex-row flex items-center gap-2 md:basis-1/2">
                        <div className="size-10 min-w-10 min-h-10">
                          <TV />
                        </div>
                        <div className="md:text-start">
                          <h5>AInime</h5>
                          <div className="text-sm">
                            <p className="text-black text-xs italic text-pretty dark:text-gray-300">
                              Real vs AI-generated anime plot and manga/light
                              novel titles
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </HomeButton>
                </Link>

                {[1, 2, 3].map((id) => (
                  <HomeButton disabled border key={`theme-${id}`}>
                    <div className="flex justify-center">
                      <div className="flex-col md:flex-row flex items-center gap-2 md:basis-1/2">
                        <div className="size-10 min-w-10 min-h-10">
                          <Question />
                        </div>
                        <div className="md:text-start">
                          <h5>???</h5>
                          <div className="text-sm">
                            <p className="text-black text-xs italic dark:text-gray-300">
                              New themes coming soon!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </HomeButton>
                ))}
              </div>
            </>
          ) : (
            <Loading />
          )}
        </div>
      </CustomBorder>
    </>
  );
}
