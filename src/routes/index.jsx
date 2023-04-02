import React from "react";
import { useRoutes } from "react-router-dom";
import Signup from "../component/SignUp";
import Signin from "../component/SignIn";
import Todo from "../component/Todo";
import Intro from "../component/Intro";

const routeList = [
  {
    path: `/`,
    element: <Intro />,
  },
  {
    path: `/signup`,
    element: <Signup />,
  },
  {
    path: `/signin`,
    element: <Signin />,
  },
  {
    path: `/todo`,
    element: <Todo />,
  },
];
const RenderRouter = () => {
  return useRoutes(routeList);
};

export default RenderRouter;
