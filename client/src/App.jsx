import "./App.css";
import Homepage from "./components/Pages/Homepage/Homepage";
import Single from "./components/Pages/Single/Single";
import Topbar from "./components/Topbar/Topbar";
import Write from "./components/Pages/Write/Write";
import Settings from "./components/Pages/Settings/Settings";
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Register/Register";
import { Context } from "./context/Context";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Contact from "./components/Pages/Contact/Contact";
import About from "./components/Pages/About/About";
import MyPosts from "./components/Pages/MyPosts/MyPosts";

function App() {
  const {user} = useContext(Context);

  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/posts" element={<Homepage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={user ? <Homepage /> : <Register />} />
        <Route path="/login" element={user ? <Homepage /> : <Login />} />
        <Route path="/posts/:id" element={<Single />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/mypost" element={user ? <MyPosts /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;