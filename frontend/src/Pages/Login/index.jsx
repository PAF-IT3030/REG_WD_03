import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../app/actions/user.actions";
import { hasGrantedAnyScopeGoogle, useGoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import { toast } from "react-toastify";
import { googleAuth } from "../services";
import { userCredential } from "../services/LogUser";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    dispatch(login(user));
  };

  const [isLoadingGoogleAuth, setIsLoadingGoogleAuth] = useState(false);
  const [isLoadingFBAuth, setIsLoadingFBAuth] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    googleLogout();
  }, []);

  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg);
      setErrorMsg(null);
    }
  }, [errorMsg]);

  // google handlers
  const handleGOuath = useGoogleLogin({
    prompt: "select_account",
    onSuccess: (tokenResponse) => {
      const hasAccess = hasGrantedAnyScopeGoogle(
        tokenResponse,
        "google-scope-1",
        "google-scope-2"
      );
      console.debug(tokenResponse.access_token, tokenResponse, hasAccess);
      fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.warn(data);
          if (data?.id && data?.email && data?.name) {
            googleAuth(data.name, data.id, data.email, data?.picture).then(
              ({ data }) => {
                console.log(data, "<<<");
                if (data?.accessToken) {
                  // setAccessToken(data?.accessToken);
                  localStorage.setItem("accessToken", data?.accessToken);


                  dispatch(login(userCredential));
                  if (data?.token) {
                    navigate("/");
                  }
                } else {
                  setErrorMsg("google authenticate fail");
                }
              }
            );
          } else {
            setErrorMsg("google authenticate fail");
          }
          setIsLoadingGoogleAuth(false);
        })
        .catch((error) => {
          setErrorMsg("google authenticate fail");
          console.log("Error fetching user info:", error);
          setIsLoadingGoogleAuth(false);
        });
    },
    onError: (error) => {
      if (typeof error === "string") {
        setErrorMsg(error);
      }
      setIsLoadingGoogleAuth(false);
    },
  });

  const handleGitHubLoginButton = () => {
    const clientId = process.env.REACT_APP_GIT_CLIENT;
    const redirectUri = encodeURIComponent(window.location.origin + "/auth/git/callback");
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
    window.location.href = url;
  };

  // restrict
  if (sessionStorage.getItem("Authorization")) {
    navigate("/");
  }
  return (
    <div className="h-screen flex flex-col md:flex-row  bg-gray-100">
      <div className="hidden md:block w-2/3">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/cover.svg`}
          alt="cover"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col w-full justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
          <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center flex items-center justify-center gap-3">
            Don't have an account?{" "}
            <Link to="/signup" className=" text-indigo-600 hover:underline">
              Sign up
            </Link>
          </div>
          <button
            onClick={() => {
              setIsLoadingGoogleAuth(true);
              handleGOuath();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded bg-gradient-to-r from-[#6363fa] to-[#cc53fc] flex items-center justify-center w-full mt-4 gap-4"
          >
            <img src={`${process.env.PUBLIC_URL}/assets/images/icon/google.svg`}
              alt="google"
              className="w-6 h-6"
            />
            Sign up with Google
          </button>
          <button
            onClick={() => {
              setIsLoadingFBAuth(true);
              handleGitHubLoginButton();
            }}
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded bg-gradient-to-r from-[#6363fa] to-[#cc53fc] flex items-center justify-center w-full mt-4 gap-4"
          >
            <img src={`${process.env.PUBLIC_URL}/assets/images/icon/github.svg`}
              alt="github"
              className="w-6 h-6"
            />
            Sign up with Git Hub
          </button>


        </div>
      </div>


    </div>
  );
}

export default Login;
