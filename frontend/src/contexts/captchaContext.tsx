import { createContext, ReactNode, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface CaptchaType {
  captchaRef: React.MutableRefObject<ReCAPTCHA | null>;
}

const CaptchaContext = createContext<CaptchaType>({} as CaptchaType);

const CaptchaProvider = ({ children }: { children: ReactNode }) => {
  const captchaRef = useRef<ReCAPTCHA>(null);

  const value = { captchaRef };

  return (
    <CaptchaContext.Provider value={value}>{children}</CaptchaContext.Provider>
  );
};

export { CaptchaContext };

export default CaptchaProvider;
