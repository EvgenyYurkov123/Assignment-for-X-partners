import { Routes, Route } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import Home from "./pages/Home/Home";
import Reg from "./pages/Reg/Reg";
import Login from "./pages/Login/Login";

export default function App() {

  
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/reg", element: <Reg /> },
    { path: "/login", element: <Login /> },
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



