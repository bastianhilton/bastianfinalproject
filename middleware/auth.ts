import {useFusionAuth} from "@fusionauth/vue-sdk";

const routeGuard = (loggedIn: boolean, fallback: string) => {
  return () => {
    const fusionAuth = useFusionAuth();
    if (fusionAuth.isLoggedIn.value !== loggedIn) {
      return fallback;
    }
  }
}