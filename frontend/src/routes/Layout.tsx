import { Outlet, useParams } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useCaptcha } from "../hooks/useCaptcha";
import { useDark } from "../hooks/useDark";
import Heart from "../components/Icons/Heart";
import HomeButton from "../components/Home/HomeButton";
import { Link } from "react-router-dom";
import { getTodayDate, isArchive } from "../common/helper";
import CustomBorder from "../components/Home/CustomBorder";
import Moon from "../components/Icons/Moon";
import Sun from "../components/Icons/Sun";
function Layout() {
  const { captchaRef } = useCaptcha();
  const { theme, mode, date } = useParams();
  const { dark, setDark } = useDark();

  return (
    <div
      className={`min-h-full min-w-screen max-h-full overflow-hidden h-full w-full bg-pink-200 dark:bg-gray-200 text-center flex flex-col items-center ${
        dark ? "dark" : ""
      }`}
    >
      <div className="flex justify-center w-full min-h-full text-pink-950">
        <div className="flex md:basis-2/3 lg:basis-1/2 flex-col justify-between min-w-0 w-full">
          <div className="flex flex-col grow min-h-full sm:min-h-0 p-1 sm:p-4">
            <div className="flex relative mb-1 justify-between items-end">
              <Link to="/">
                <div className="flex gap-1 items-end">
                  <div className="w-10 h-10">
                    <CustomBorder>
                      <img src="/logo.png" alt="aiguess" />
                    </CustomBorder>
                  </div>
                  <h1 className="text-4xl font-black text-pink-900 leading-8">
                    AI
                    <span className="text-pink-400">
                      {theme === "ainime" ? "nime" : "Guess"}
                    </span>
                  </h1>
                </div>
              </Link>
              <div className="flex items-end gap-1">
                <div className="font-bold italic text-lg">
                  <Link
                    to={
                      theme
                        ? `/${theme}/${mode && mode}/${
                            isArchive(mode, date) ? getTodayDate() : "archive"
                          }`
                        : "/"
                    }
                  >
                    <h5 className="underline text-nowrap leading-5">
                      {isArchive(mode, date)
                        ? "Archive"
                        : date
                        ? date
                        : getTodayDate()}
                    </h5>
                  </Link>
                </div>
                <div>
                  <HomeButton icon border onClick={() => setDark(!dark)}>
                    {dark ? <Moon /> : <Sun />}
                  </HomeButton>
                </div>
                <a
                  href="https://ko-fi.com/brandonduong"
                  target="_blank"
                  rel="noreferrer"
                >
                  <HomeButton icon border>
                    <Heart />
                  </HomeButton>
                </a>
              </div>
            </div>
            <Outlet />
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={process.env.REACT_APP_SITE_KEY!} // Don't expose your secret key directly fetch it from secret variables
              size="invisible"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
