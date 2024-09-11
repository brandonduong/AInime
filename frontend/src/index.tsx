import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./routes/Layout";
import ErrorPage from "./routes/ErrorPage";
import Game, { dateLoader } from "./routes/Game";
import Home from "./routes/Home";
import Archive from "./routes/Archive";
import Menu from "./routes/Menu";
import CaptchaProvider from "./contexts/captchaContext";
import DarkModeProvider from "./contexts/darkModeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Menu />,
      },
      {
        path: "/:theme",
        element: <Home />,
        children: [
          {
            path: "/:theme",
            element: <Game />,
            loader: dateLoader,
          },
          {
            path: "/:theme/:mode/:date",
            element: <Game />,
            loader: dateLoader,
          },
          {
            path: "/:theme/:mode/archive",
            element: <Archive />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <CaptchaProvider>
    <DarkModeProvider>
      <RouterProvider router={router} />
    </DarkModeProvider>
  </CaptchaProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
