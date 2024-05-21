import axios from '../axios';

const googleAuth = async (name, googleId, userEmail, icon) => {
    console.log(name, googleId, userEmail, icon, '<<<<<<');
    const response = await axios.post('/api/auth/type-google', { name, googleId, userEmail, icon });
    return response;

    // fetch(`${process.env.REACT_APP_BASE_URL}/auth/google`)
    //     .then((response) => {
    //         // Handle the response here
    //     })
    //     .catch((error) => {
    //         // Handle errors here
    //     });
};

export default googleAuth;
