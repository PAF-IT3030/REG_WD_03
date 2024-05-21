import axios from '../axios';

const gitAuthCallBackHandler = async (code) => {
    const response = await axios.post('/api/auth/git/callback', { code });
    return response;
};

export default gitAuthCallBackHandler;
