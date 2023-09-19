import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./css/style.css" ;
import PokemonDetails from './components/PokemonDetails';
import Login from './components/Login';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Details",
    element: <PokemonDetails />,
  },
  {
    path: "/login",
    element: <Login  />,
  },

],
);

ReactDOM.createRoot(document.getElementById("root")as HTMLElement).render(
  <RouterProvider router={router} />
);

