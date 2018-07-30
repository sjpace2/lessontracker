import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
var moment = require('moment');



class Nav extends Component {
    constructor () {
        super ()
        this.state = {
            nameOfUser: '',
            userPic: '',
            top: false,
            left: false
        }
    }

    toggleDrawer = (side, open) => {
        this.setState({
            [side]: open,
        })
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
        let sideList = (
            <div className='side-list'>
            <List className='left-drawer'> 
                <div className='title-drawer'>Lesson Tracker</div>
                <div className='date'>{ todaysDate }</div>
                <div className='welcome'>Welcome {this.state.nameOfUser}!</div>
                <img className='pic-drawer' src={this.state.userPic} alt="user pic"/>
                <Button className='home' onClick={()=>this.props.history.push('/dashboard')}>Home </Button>
                <Button className='schedule' onClick = { ()=>this.props.history.push('/todaysschedule')}> Today's Schedule </Button> 
                <Button className='addstudent' onClick = { ()=>this.props.history.push('/Add_student') }> Add Student </Button>
                <Button className='allnotes' onClick={()=>this.props.history.push('/allNotes')}>  All Notes</Button> 
                <Button className='allPayments' onClick = { ()=>this.props.history.push('/allpayments')}> All Payments </Button></List>
            <Divider />
            <List> <Button className='logout-left' onClick = { this.logout }> Logout </Button></List>
          </div>
          ) 

        let todaysDate = moment().format('ddd MMM DD')
        
    
    let displayNav = () => {
        if(this.props.location.pathname === '/'){
            return 
        } else {
            return displayNav = 
           <div className='nav'>
           
            
            <div className="navbar">
                {/* <button className='side-menu' onClick={()=>this.toggleDrawer('left', true)}>
                    <div className='hamburger'></div>
                    <div className='hamburger'></div>
                    <div className='hamburger'></div>
                </button> */}
                 <i onClick={()=>this.toggleDrawer('left', true)} className="fas fa-bars"></i>
                <div className='title'>Lesson Tracker</div>
                <div className='date'>{ todaysDate }</div>
                <div className='welcome'>{this.state.nameOfUser}</div>
                <img className='pic' src={this.state.userPic} alt="user pic"/>
                <Button id='logout' onClick = { this.logout }> Logout </Button>
            
           
           
            </div>
            
          
            
            </div>
        }
    }
    return (
       <div>
        {displayNav()}

          <div>
            
      
            <Drawer open={this.state.left} onClose={()=>this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={()=>this.toggleDrawer('left', false)}
            onKeyDown={()=>this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
        </div>
        </div>
        )
    }
}

export default withRouter(Nav)



