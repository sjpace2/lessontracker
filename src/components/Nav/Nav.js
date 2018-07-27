import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
var moment = require('moment');



class Nav extends Component {
    constructor () {
        super ()
        this.state = {
            nameOfUser: '',
            userPic: ''
        }
    }


    componentDidMount = () => {
        axios.get('/api/user-data').then(res=>{
            console.log(res)
            this.setState({nameOfUser: res.data.user_name, userPic: res.data.user_pic })
        })
    }

    logout = () => {
        axios.get('/api/logout').then(res=>{
            this.props.history.push('/')
        })
    }

    render(){
       
        let todaysDate = moment().format('ddd MMM DD')
        
    
    let displayNav = () => {
        if(this.props.location.pathname === '/'){
            return 
        } else {
            return displayNav = 
            <div className="navbar">
                <div className='title'>Lesson Tracker</div>
                <div className='date'>{ todaysDate }</div>
                <div className='welcome'>{this.state.nameOfUser}</div>
                <img className='pic' src={this.state.userPic} alt="user pic"/>
                <Button id='logout' onClick = { this.logout }> Logout </Button>
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



