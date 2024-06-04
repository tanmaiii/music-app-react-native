import * as React from "react";
import { useAuth } from "../context/AuthContext";
import SplashScreen from "../screens/SplashScreen";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

interface AppRouterProps {}

const AppRouter = (props: AppRouterProps) => {
  const { currentUser, loadingAuth, token } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  if (loading) return <SplashScreen />;

  return !currentUser || !token ? <AuthNavigator /> : <MainNavigator />;
};

export default AppRouter;
