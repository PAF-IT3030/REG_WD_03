import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUserById } from "../../app/actions/user.actions";
import { deleteUserById } from "../../app/actions/user.actions";
import storage from "../../util/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Profile(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState(user?.user?.username);
  const [email, setEmail] = useState(user?.user?.email);
  const [contactNumber, setContactNumber] = useState(user?.user?.contactNumber);
  const [country, setCountry] = useState(user?.user?.country);
  const [profileImage, setProfileImage] = useState(user?.user?.profileImage ? user.user.profileImage : null);

  console.log(user.user);

  useEffect(() => {
    // dispatch(getUser(user.userId));
    if (user.user) {
      setUsername(user.user.username);
      setEmail(user.user.email);
      setContactNumber(user.user.contactNumber);
      setCountry(user.user.country);
      setProfileImage(user.user.profileImage);
    }
    // if (!user.user) {
    //   dispatch(getUser(user.userId));
    // }
  }, [dispatch, user.user, user.userId]);

  const handleSubmit = () => {
    const userUpdate = {
      id: user.user.id,
      username,
      email,
      contactNumber,
      country,
      profileImage
    };

    dispatch(updateUserById(userUpdate));

    props.closeModal();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      dispatch(deleteUserById(user.userId));

      props.closeModal();
    }
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];

    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/users/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setProfileImage(url);
        });
      }
    );
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">Update Profile</h1>
      <hr />
      <div className="container mx-auto">
        <div className="flex justify-center mt-5">
          <div className="w-full  max-h-[350px] p-5 bg-white shadow-md rounded overflow-auto">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex">
                  <div>
                    {profileImage && (
                      <img
                        src={profileImage}
                        className="min-w-36 max-w-36  min-h-36 max-h-36 object-cover rounded-md"
                        alt="Profile"
                      />
                    )}
                    <label htmlFor="profileImage" className="block text-gray-700 text-sm font-bold mb-2">
                      Profile Image
                    </label>
                  </div>
                  <div>
                    <input
                      type="file"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="profileImage"
                      onChange={(e) => {
                        uploadImage(e);
                      }}
                    />
                    <button
                      className="text-red-500 hover:bg-red-700  font-bold py-2 px-4 rounded w-full mt-3"
                      onClick={() => {
                        setProfileImage("https://i.discogs.com/57iTb7iRduipsfyksYodpaSpz_eEjtg52zPBhCwBPhI/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTY5Nzg2/ODEtMTU0OTgxMTIz/OC02NjMxLmpwZWc.jpeg")
                      }}
                    >
                      reset
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
                    onClick={() => {
                      props.closeModal();
                    }}
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-50 disabled:cursor-not-allowed "
                    disabled={!email || !contactNumber || !country || !profileImage}
                  >
                    UPDATE
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                    onClick={() => handleDelete()}
                  >
                    DELETE
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="contactNumber" className="block text-gray-700 text-sm font-bold mb-2">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="contactNumber"
                    placeholder="Enter your contact number"
                    value={contactNumber}
                    onChange={(e) => {
                      setContactNumber(e.target.value);
                    }}
                    pattern="[0-9]{10}"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="country"
                    placeholder="Enter your country"
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                  />
                </div>
              </div>

            </form>
          </div>
        </div>
      </div >
    </div >
  );
}

export default Profile;
