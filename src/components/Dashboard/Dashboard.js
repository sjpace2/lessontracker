import React, {Component} from 'react';
import axios from 'axios';
import { getStudentData } from './../../ducks/reducer';
import { connect } from 'react-redux';
import './../../styles/main.css';
import Button from '@material-ui/core/Button';
import DeleteAlert from './DeleteAlert';



class Dashboard extends Component {
    constructor(){
        super()
        this.state={
            open: false
            
        }
        
        
    }
    
    componentDidMount = () => {
        axios.get('/api/students').then(res => {
            
            this.props.getStudentData(res.data)
        })
    }

    // deleteStudent = (id) => {
    //      axios.delete(`/api/students/${id}`).then(res => {
    //         this.props.getStudentData(res.data)
    //     })
    // }

    handleClickOpen = () => {
        this.setState({ open: true })
        
      };
    
    
    render(){
       
        
        
      let displayedStudents = this.props.student.map((student, index) => {
          return (
            <div className='student' key={student.id}> 
              
              <div className='studentName'>{student.first_name + ' ' + student.last_name} </div>
              
            <div className = 'buttonBar'>
             <div className='notes-button'>
              <Button variant='outlined' className='notes' onClick = {()=>this.props.history.push(`/notes/${student.id}`)}> <i className="far fa-sticky-note "></i> 
              <p className='notes'> Notes</p> </Button> 
              </div>
              
              <div className='info-button'>
              <Button variant='outlined' className='info' onClick = {()=>this.props.history.push(`/student_detail/${student.id}`)}> <i className="fas fa-info-circle"></i>
              <p className='info'>Info</p> </Button>
              </div>
              
             
             
              <div className='delete-button'>
             
              <Button variant='outlined' className='delete' 
            
               
                onClick={()=>this.handleClickOpen()}>
                 <i className="far fa-trash-alt"></i> 
              <p className='delete'>Delete</p> </Button>
              </div>
              
              
              
              
              <div className='payments-button'>
              <Button variant='outlined' className='payments' onClick={ ()=>this.props.history.push(`/payments/${student.id}`)}><i className="fas fa-dollar-sign"></i> 
              <p className='payments'>Payments</p> </Button>
             </div>
             <div>
                  <DeleteAlert state={this.state.open} id={student.id}/>
              </div>
             </div>
            
            </div>
             
            
          )
      }) 

    return (
       <div className='dashboard'>
          <DeleteAlert/>
            <div className='add' >
                <Button variant='contained' className='schedule' onClick = { ()=>this.props.history.push('/todaysschedule')}> Today's Schedule </Button> 
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

