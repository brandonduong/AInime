import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="h-screen w-screen bg-pink-200 text-center p-4">
      <h1 className="text-4xl font-bold">Anime Eye</h1>
      <Outlet />
    </div>
  );
}

export default Layout;
