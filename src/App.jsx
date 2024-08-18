import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Components/Layout/Layout"
import Home from './Components/Home/Home';
import Login from "./Components/Login/Login";
import Register from './Components/Register/Register';
import { AuthContextProvider } from "./Components/Context/AuthContext";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";

function App() {

  const router = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        { index: true, element: <ProtectedRoutes> <Home /> </ProtectedRoutes>  },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ]
    }
  ])

  return (
    <>
    <AuthContextProvider>
    <RouterProvider router={router} />
    </AuthContextProvider>
    </>
  )
}

export default App
