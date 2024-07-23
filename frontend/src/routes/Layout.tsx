import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen min-w-screen h-full w-full bg-pink-200 text-center flex flex-col items-center p-1 md:p-4">
      <Link to={"/"}>
        <h1 className="text-4xl">AInime</h1>
      </Link>
      <Outlet />
    </div>
  );
}

export default Layout;
