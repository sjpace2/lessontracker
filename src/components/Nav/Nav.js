import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';



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
                <div className='title'>Lesson Tracker</div>
                <div className='date'>{ todaysDate.toDateString() }</div>
                <div className='welcome'>{this.state.nameOfUser}</div>
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

// const styles = {
//     button: {
//       background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//       borderRadius: 3,
//       border: 0,
//       color: 'white',
//       height: 48,
//       padding: '0 30px',
//       boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//       textTransfrom: 'uppercase'
      
//     },
//   };

export default withRouter(Nav)



