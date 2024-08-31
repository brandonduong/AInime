import React from "react";
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
        path: "/ainime",
        element: <Home />,
        children: [
          {
            path: "/ainime",
            element: <Game />,
            loader: dateLoader,
          },
          {
            path: "/ainime/:mode/:date",
            element: <Game />,
            loader: dateLoader,
          },
          {
            path: "/ainime/:mode/archive",
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
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
