import React, {Component} from 'react';
import axios from 'axios';
import { getStudentData } from './../../ducks/reducer';
import { connect } from 'react-redux';
import './../../styles/main.css';
import Button from '@material-ui/core/Button';


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
              
              <div className='studentName'>{student.first_name + ' ' + student.last_name} </div>
              
              <Button variant='outlined' className='notes' onClick = {()=>this.props.history.push(`/notes/${student.id}`)}> Notes </Button> 
              <Button variant='outlined' className='details' onClick = {()=>this.props.history.push(`/student_detail/${student.id}`)}> Student Details</Button>
              <Button variant='outlined' className='delete' onClick = {()=>this.deleteStudent(student.id)}> Delete </Button>
              <Button variant='outlined' onClick={ ()=>this.props.history.push(`/payments/${student.id}`)}> Payments </Button>
            </div>
          )//may want to move payments button to student details page
      }) 

    return (
       <div className='dashboard'>
            <div className='add' >
                <Button variant='contained' className='addstudent' onClick = { ()=>this.props.history.push('/Add_student') }> Add Student </Button>
                <Button variant='contained' className='allnotes' onClick={()=>this.props.history.push('/allNotes')}>  All Notes</Button> 
                <Button variant='contained' className='allPayments' onClick = { ()=>this.props.history.push('/allpayments')}> All Payments </Button>
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

