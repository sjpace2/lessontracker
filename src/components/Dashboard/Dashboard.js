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
            <div className='student' key={student.id}> 
              
              <div>{student.first_name + ' ' + student.last_name} </div>
              
              <button className='notes' onClick = {()=>this.props.history.push(`/notes/${student.id}`)}>notes</button> 
              <button className='details' onClick = {()=>this.props.history.push(`/student_detail/${student.id}`)}>view details</button>
              <button className='delete' onClick = {()=>this.deleteStudent(student.id)}>delete</button>
              <button onClick={ ()=>this.props.history.push(`/payments/${student.id}`)}>Payments</button>
            </div>
          )
      }) 

    return (
       <div className='dashboard'>
            <div className='add' >
                <button className='addstudent' onClick = { ()=>this.props.history.push('/Add_student') }>Add a student</button>
                <button className='allnotes' onClick={()=>this.props.history.push('/allNotes')}>View all student notes</button> 
            </div>
            <div className='students' >{displayedStudents}</div>
            
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

