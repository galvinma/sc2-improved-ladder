import { Route, Routes } from "react-router";

import type { RouteProps } from "./routes/RouteProps";
import { getRoutes } from "./routes/Routes";
import Layout from "./layouts/Layout";

function App() {
  const routes = getRoutes();
  const publicRoutes = routes.filter(
    (route: RouteProps) => !route.privateRoute
  );
  const privateRoutes = routes.filter(
    (route: RouteProps) => route.privateRoute
  );

  return (
    <div>
      <Routes>
        <Route element={<Layout privateRoute={false} />}>
          {publicRoutes.map((route: RouteProps) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route element={<Layout privateRoute={true} />}>
          {privateRoutes.map((route: RouteProps) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
