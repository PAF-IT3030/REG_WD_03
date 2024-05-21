import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gitAuthCallBackHandler from './gitAuthCallBack';
import { useDispatch } from 'react-redux';
import { login } from '../../../app/actions/user.actions';
import { userCredential } from '../LogUser';


const GitHubAuthCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        if (code) {
            handleGitHubAuthCallback(code);
        }
    }, [location]);

    const handleGitHubAuthCallback = async (code) => {
        try {
            const response = await gitAuthCallBackHandler(code);
            // handle successful authentication (e.g., store token, redirect)
            console.log('Authentication successful:', response.data);

            dispatch(login(userCredential));
            if (response.data?.token) {
                navigate('/');
            }
        } catch (error) {
            // handle error 
            console.error('Authentication failed:', error);
            navigate('/login');
        }
    };

    return (
        <div className='bg-[#24292e] h-screen flex flex-col justify-center items-center' style={{ fontSize: '1.5rem' }}>
            <img src={`${process.env.PUBLIC_URL}/assets/images/icon/github.svg`}
                alt="github"
                className="w-20 h-20 mb-4"
            />
            <span className='text-[#2dba4e]'>
                Authenticating with GitHub...
            </span>
        </div>
    );
};

export default GitHubAuthCallback;
