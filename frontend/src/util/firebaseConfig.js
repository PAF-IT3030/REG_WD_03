// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

//Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_eeDq-JSCpgPQQj9EMmC0LdpwdiwJTtg",
    authDomain: "paf-power-pluse-cd42c.firebaseapp.com",
    projectId: "paf-power-pluse-cd42c",
    storageBucket: "paf-power-pluse-cd42c.appspot.com",
    messagingSenderId: "604976872212",
    appId: "1:604976872212:web:898f2ae2a407d4cbc46001",
    measurementId: "G-5LKDB7L716"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;

// Import the functions you need from the SDKs you need

// import { initializeApp } from 'firebase/app';
// import { getStorage } from 'firebase/storage';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAc_5pCEud6wxE8wnzSJr5VR8JjuUQ709w",
//     authDomain: "pafproject-a0c6b.firebaseapp.com",
//     projectId: "pafproject-a0c6b",
//     storageBucket: "pafproject-a0c6b.appspot.com",
//     messagingSenderId: "812077042747",
//     appId: "1:812077042747:web:642d182b887776b349e01e"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);
// export default storage;