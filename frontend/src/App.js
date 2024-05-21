import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import User from "./Pages/User";
import SharedPosts from "./Pages/SharedPosts";
import Profile from "./Pages/Profile";
import UserPosts from "./Pages/UserPosts";
import GitHubAuthCallback from "./Pages/services/gitAuthCallBack/GitHubAuthCallback";

function App() {
  return (
    <div>
      <Router>
        {sessionStorage.getItem("Authorization") && <Navbar />}
        <div className={sessionStorage.getItem("Authorization") ? "pt-[calc(4.4rem+5px)]" : ""}>
          <Routes>
            <Route path="/" element={sessionStorage.getItem("Authorization") ? <Home /> : <Login />} />
            <Route path="/user" element={sessionStorage.getItem("Authorization") ? <User /> : <Login />} />
            <Route path="/user/:userId" element={sessionStorage.getItem("Authorization") ? <UserPosts /> : <Login />} />
            <Route path="/sharedposts" element={sessionStorage.getItem("Authorization") ? <SharedPosts /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/profile" element={sessionStorage.getItem("Authorization") ? <Profile /> : <Login />} />
            <Route path="/auth/git/callback" element={<GitHubAuthCallback />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
