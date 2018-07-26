import React from 'react';
import logo from './../../styles/Auth/logo/logo.png';

export default function Auth () {
    
    function login() {
        let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;

        let redirectUri = encodeURIComponent(`${window.origin}/auth/callback`);
    
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
    }
    
    return (
        <div className="login">
            <div className="logo">
             Lesson Tracker
            </div>
            
            <img src={logo} alt="logo"/>
            
            <div className="slogan">
            Teach Simply
            </div>
            
            <div className="button">
            <button onClick={login} >Enter</button>
            </div>
        </div>
    )
}