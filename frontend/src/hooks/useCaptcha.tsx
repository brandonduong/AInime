import { useContext } from "react";
import { CaptchaContext } from "../contexts/captchaContext";
export function useCaptcha() {
  const context = useContext(CaptchaContext);
  if (!context)
    throw new Error("useCaptcha must be used within an CaptchaProvider");
  return context;
}
