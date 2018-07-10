import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';


class Nav extends Component {
    constructor () {
        super ()
        this.state = {
            nameOfUser: ''
        }
    }


    componentDidMount = () => {
        axios.get('/api/users').then(res=>{
            console.log(res.data)
            this.setState({nameOfUser: res.data})
        })
    }

    render(){
    
    let displayNav = () => {
        if(this.props.location.pathname === '/'){
            return 
        } else {
            return displayNav = 
            <div>
            Welcome {this.state.nameOfUser}


            </div>
        }
    }
    return (
        <div>{displayNav()}</div>
    )
}
}


export default withRouter(Nav)

