import React from "react";
import { useRoutes } from "react-router-dom";
import Signup from "../component/SignUp";
import Signin from "../component/SignIn";
import Todo from "../component/Todo";

const routeList = [
  {
    path: `/`,
    element: <Todo />,
  },
  {
    path: `/signup`,
    element: <Signup />,
  },
  {
    path: `/signin`,
    element: <Signin />,
  },
];
const RenderRouter = () => {
  return useRoutes(routeList);
};

export default RenderRouter;
