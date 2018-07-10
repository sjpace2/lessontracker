import React, {Component} from 'react';
import axios from 'axios';
import { getStudentData } from './../../ducks/reducer';
import { connect } from 'react-redux';
import './../../styles/main.css';

class Dashboard extends Component {
    
    componentDidMount = () => {
        axios.get('/api/students').then(res => {
            
            this.props.getStudentData(res.data)
        })
    }

    deleteStudent = (id) => {
         axios.delete(`/api/students/${id}`).then(res => {
            this.props.getStudentData(res.data)
        })
    }
    
    render(){
        console.log(this.props.student)
        
      let displayedStudents = this.props.student.map((student, index) => {
          return (
              <div key={student.id}> {student.first_name + ' ' + student.last_name} <button>notes</button> 
              <button>edit</button>
              <button onClick = {()=>this.deleteStudent(student.id)}>delete</button>
          </div>
          )
      }) 

    return (
       <div>
        <div className = "dashboard"></div>
        {displayedStudents}
        <button onClick = { ()=>this.props.history.push('/Add_student') }>Add a student</button>
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

