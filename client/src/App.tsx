import { Routes, Route } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import People from "./Pages/PeoplePage/PeoplePage";
import Account from "./Pages/Account/Account";

export default function App() {


  const routes = [
    { path: "/", element: <Home /> },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "/account", element: <Account /> },
    { path: "/people", element: <People /> },
  ];

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </>
  );
}



