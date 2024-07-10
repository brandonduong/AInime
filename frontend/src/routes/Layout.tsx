import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="h-screen w-screen bg-pink-200 flex justify-center items-center">
      <Outlet />
    </div>
  );
}

export default Layout;
