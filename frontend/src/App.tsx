import { Route, Routes } from "react-router";
import Layout from "./layouts/Layout";
import type { RouteProps } from "./routes/RouteProps";
import { getRoutes } from "./routes/Routes";

function App() {
  const routes = getRoutes();
  const publicRoutes = routes.filter((route: RouteProps) => !route.private);

  return (
    <div>
      <Routes>
        <Route element={<Layout private={false} />}>
          {publicRoutes.map((route: RouteProps) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
