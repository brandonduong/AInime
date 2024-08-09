import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className="min-h-screen min-w-screen max-h-screen overflow-hidden h-full w-full bg-pink-200 text-center flex flex-col items-center">
      <Outlet />
    </div>
  );
}

export default Layout;
