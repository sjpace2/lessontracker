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
        
        
      let displayedStudents = this.props.student.map((student, index) => {
          return (
            <div key={student.id}> 
              
              {student.first_name + ' ' + student.last_name} 
              
              <button onClick = {()=>this.props.history.push(`/notes/${student.id}`)}>notes</button> 
              <button onClick = {()=>this.props.history.push(`/student_detail/${student.id}`)}>view details</button>
              <button onClick = {()=>this.deleteStudent(student.id)}>delete</button>
            </div>
          )
      }) 
//do join on view all student notes
    return (
       <div>
        <div className = "dashboard"></div>
        {displayedStudents}
        <button onClick = { ()=>this.props.history.push('/Add_student') }>Add a student</button>
        <button onClick={()=>this.props.history.push('/allNotes')}>View all student notes</button> 
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

