import React, {Component} from 'react';
import axios from 'axios';
import { getStudentData } from './../../ducks/reducer';
import { connect } from 'react-redux';
import './../../styles/main.css';

class Dashboard extends Component {
    
    componentDidMount = () => {
        axios.get('/api/students').then(res => {
            console.log(res.data)
            this.props.getStudentData(res.data[0])
            
        })
    }
    
    render(){
        
      //need to map over res.data to display more than just [0]

    return (
       <div>
        <div className = "dashboard">view all students here</div>
        <button onClick = { ()=>this.props.history.push('/Add_student') }>Add a student</button>
        {this.props.student.first_name}
        </div>
    )
    }
}

function mapStateToProps (state) {
    return {
        student: state.student
    }
}

export default connect (mapStateToProps, {getStudentData})(Dashboard)

