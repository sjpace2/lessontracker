import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';


class Nav extends Component {
    constructor () {
        super ()
        this.state = {
            nameOfUser: '',
            pic: ''
        }
    }


    componentDidMount = () => {
        axios.get('/api/users').then(res=>{
            
            this.setState({nameOfUser: res.data })
        })
    }

    logout = () => {
        axios.get('/api/logout').then(res=>{
            this.props.history.push('/')
        })
    }

    render(){
       
        let todaysDate = new Date()
        
    
    let displayNav = () => {
        if(this.props.location.pathname === '/'){
            return 
        } else {
            return displayNav = 
            <div className="navbar">
                <div className='welcome'>{this.state.nameOfUser}</div>
                <div className='title'>Lesson Tracker</div>
                <div className='date'>{ todaysDate.toDateString() }</div>
                <button className='logout' onClick = { this.logout } >Logout</button>
            </div>
        }
    }
    return (
       <div>
        {displayNav()} 
        </div>
    )
}
}


export default withRouter(Nav)

