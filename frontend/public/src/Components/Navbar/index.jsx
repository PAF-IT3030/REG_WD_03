import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../../app/actions/user.actions';
import { logout } from '../../app/slices/user.slice';
import Profile from '../../Pages/Profile';
import NotificationDropdown from '../NotificationDropdown';
import UserImage from '../../assets/user.jpeg';
import LogoImage from '../../assets/foodies.png';

Modal.setAppElement('div');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function openModal() {
    setModalIsOpen(!modalIsOpen);
  }

  useEffect(() => {
    if (
      sessionStorage.getItem('Authorization') &&
      sessionStorage.getItem('userId')
    ) {
      if (!user.loginStatus) {
        dispatch(getUser(sessionStorage.getItem('userId')));
      }
    }

    if (!sessionStorage.getItem('Authorization')) {
      navigate('/login');
    }
  }, [dispatch, user.loginStatus, navigate]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <nav className="fixed top-0 w-full bg-gradient-to-r from-[#6363fa] to-[#cc53fc] shadow z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <Link className="navbar-brand" to="/">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/ft.jpg`}
              className="tastebuds logo"
              alt="Logo"
              width="60px"
            />
          </Link>
          <div className="flex items-center flex-row gap-4">
            <div className="flex gap-4 items-center lg:hidden flex-row">
              <NotificationDropdown />
              <button
                className=" text-gray-500 focus:outline-none"
                type="button"
                onClick={toggleMobileMenu}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <Link className="text-gray-700" to="/">
                Feed
              </Link>
              <button
                onClick={() => {
                  navigate('/user');
                }}
                type="button"
                className="text-gray-700">
                Profile
              </button>
              <NotificationDropdown />
            </div>
            <div className="relative">
              <button
                onClick={() => {
                  openModal();
                }}
                className=""
              >
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 101" id="user" className="w-6 h-6">
                <path d="M50.4 54.5c10.1 0 18.2-8.2 18.2-18.2S60.5 18 50.4 18s-18.2 8.2-18.2 18.2 8.1 18.3 18.2 18.3zm0-31.7c7.4 0 13.4 6 13.4 13.4s-6 13.4-13.4 13.4S37 43.7 37 36.3s6-13.5 13.4-13.5zM18.8 83h63.4c1.3 0 2.4-1.1 2.4-2.4 0-12.6-10.3-22.9-22.9-22.9H39.3c-12.6 0-22.9 10.3-22.9 22.9 0 1.3 1.1 2.4 2.4 2.4zm20.5-20.5h22.4c9.2 0 16.7 6.8 17.9 15.7H21.4c1.2-8.9 8.7-15.7 17.9-15.7z" />
              </svg> */}
                {/* <Profile closeModal={openModal} /> */}
                <img
                  src={
                    user?.user?.profileImage
                      ? user.user.profileImage
                      : UserImage
                  }
                  className="user-profile-image img-fluid rounded-full w-8 h-8"
                  alt="Profile"
                />
              </button>

              {modalIsOpen && (
                <div className="absolute right-0 top-0 mt-12 bg-white shadow-lg w-[250px] rounded-md overflow-hidden">
                  <div className="">
                    <span className="flex items-center text-gray-700 hover:bg-gray-200 w-full  p-2">
                      <img
                        src={
                          user?.user?.profileImage
                            ? user.user.profileImage
                            : UserImage
                        }
                        className="user-profile-image img-fluid rounded-full w-8 h-8"
                        alt="Profile"
                      />
                      <span className="p-2 font-bold">
                        {user?.user?.username}
                      </span>
                    </span>
                    <button
                      className="flex items-center text-gray-700 hover:bg-gray-200 w-full  p-2 "
                      onClick={() => {
                        dispatch(logout());
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        id="logout"
                        className="w-6 h-6"
                      >
                        <g>
                          <g>
                            <rect
                              width="24"
                              height="24"
                              opacity="0"
                              transform="rotate(90 12 12)"
                            />
                            <path d="M7 6a1 1 0 0 0 0-2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2H6V6zM20.82 11.42l-2.82-4a1 1 0 0 0-1.39-.24 1 1 0 0 0-.24 1.4L18.09 11H10a1 1 0 0 0 0 2h8l-1.8 2.4a1 1 0 0 0 .2 1.4 1 1 0 0 0 .6.2 1 1 0 0 0 .8-.4l3-4a1 1 0 0 0 .02-1.18z" />
                          </g>
                        </g>
                      </svg>
                      <span className="pl-5 font-bold">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-lg">
            <div className="flex flex-col">
              {!user.loginStatus ? (
                <>
                  <Link
                    to="/login"
                    className="btn btn-warning px-4 py-2 bg-yellow-500 text-white rounded mb-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded mb-2"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link className="text-gray-700 p-2 hover:bg-gray-200"
                    to="/">
                    Feed
                  </Link>
                  <Link className="text-gray-700 p-2 hover:bg-gray-200" to="/user">
                    Profile
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="p-2">
          <Profile closeModal={closeModal} />
        </div>
      </Modal> */}
    </div>
  );
}

export default Navbar;
