import { createBrowserRouter } from "react-router-dom";
import Homepage from "./components/Pages/Homepage/Homepage";
import Single from "./components/Pages/Single/Single";
import Topbar from "./components/Topbar/Topbar";
import Write from "./components/Pages/Write/Write";
import Settings from "./components/Pages/Settings/Settings";
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Register/Register";
import App from "./App";

const appRouter = createBrowserRouter([


  {
    path: "/",
    element: <App/>,
    children: [
      
        {
            path: "/",
            element: <Homepage />,
          },

        {
            path: "/login",
            element: 
            
            <Login />,
          },
        
          {
            path: "/posts/:postId",
            element: <Single />,
          },
        
          {
            path: "/register",
            element: <Register />,
          },
        
          {
            path: "/setting",
            element: <Settings />,
          },
        
          {
            path: "/write",
            element: <Write />,
          },


    ]


  }


 
]);

export default appRouter;
