import React from 'react';
import { withRouter } from 'react-router-dom';

function Nav (props) {
    
    let displayNav = () => {
        if(props.location.pathname === '/'){
            return 
        } else {
            return displayNav = 'this is the navbar'
        }
    }
    return (
        <div>{displayNav()}</div>
    )
}
export default withRouter(Nav) 