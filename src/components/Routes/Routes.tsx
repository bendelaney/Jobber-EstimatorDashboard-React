import appLogo from "assets/images/app-logo-placeholder.svg";
import AppFrame from "components/AppFrame";
import { useUserContext } from "../../contexts";
import Auth from "pages/Auth";
import Home from "pages/Home/Home";
import Dashboard from "pages/Dashboard/Dashboard";
import Tester from "pages/Tester";
import ArboristTest from "pages/ArboristTest";

import {
  Navigate,
  Outlet,
  Route,
  Routes as ReactRouterRoutes,
} from "react-router-dom";

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route element={<ProtectedRoutes />}>
        <Route element={<AppFrame logo={appLogo} />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      <Route path="auth" element={<Auth />} />
      {/* Pages for testing/tinkering */}
      {/* <Route path="tester" element={<Tester />} /> */}
      {/* <Route path="ArboristTest" element={<ArboristTest />} /> */}
    </ReactRouterRoutes>
  );
};

const ProtectedRoutes = () => {
  const { user } = useUserContext();

  if (!user.accountName) {
    console.log("NO USER, NAVIGATING TO /auth", user);
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
};

export default Routes;
