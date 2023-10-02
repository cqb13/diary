type Route = {
  name: string;
  path: string;
  signedIn: boolean;
  signedOut: boolean;
};

const routes: Route[] = [
  {
    name: "Home",
    path: "/",
    signedIn: true,
    signedOut: true,
  },
  {
    name: "Register",
    path: "/register",
    signedIn: false,
    signedOut: true,
  },
  {
    name: "Sign In",
    path: "/signin",
    signedIn: false,
    signedOut: true,
  },
  {
    name: "Account",
    path: "/account",
    signedIn: true,
    signedOut: false,
  },
  {
    name: "Diaries",
    path: "/account/diaries",
    signedIn: true,
    signedOut: false,
  },
];

export default routes;
