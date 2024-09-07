import { Outlet } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useCaptcha } from "../hooks/useCaptcha";
function Layout() {
  const { captchaRef } = useCaptcha();

  return (
    <div className="min-h-full min-w-screen max-h-full overflow-hidden h-full w-full bg-pink-200 text-center flex flex-col items-center">
      <div className="flex justify-center w-full min-h-full text-pink-950">
        <div className="flex md:basis-2/3 lg:basis-1/2 flex-col justify-between min-w-0 w-full">
          <div className="flex flex-col grow min-h-full sm:min-h-0 p-1 sm:p-4">
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
