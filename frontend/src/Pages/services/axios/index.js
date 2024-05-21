import axios from 'axios';

// axios base config
export default axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Credentials': true,
    //     'Access-Control-Allow-Methods': ['GET', 'POST', 'OPTIONS'],
    // },
});
