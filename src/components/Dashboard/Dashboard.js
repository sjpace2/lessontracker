import React, {Component} from 'react';
import axios from 'axios';
import { getStudentData } from './../../ducks/reducer';
import { connect } from 'react-redux';
import './../../styles/main.css';
import Button from '@material-ui/core/Button';
import DeleteAlert from './DeleteAlert';
import TodaysSchedule from './../../components/TodaysSchedule/TodaysSchedule';


class Dashboard extends Component {
    constructor(){
        super()
        this.state={
            open: false,
            isHovering: false,
            usersNotes: [],
            selected_name: '',
            selected_id: 0      
        }
      
    }
    

    componentDidMount = () => {
        axios.get('/api/students').then(res => {
            
            this.props.getStudentData(res.data)
        })
        
    }
    
    handleMouseHover = (id) => {
        
        axios.get(`/api/userNotes/${id}`)
        .then( res => {
            if(res.data[0] !== undefined){
            this.setState({
                usersNotes: res.data[0].content 
                })  
            } 
        })
        this.setState(this.toggleHoverState)
        }

      handleMouseHoverLeave = () => {
        this.setState({usersNotes: []})    
        this.setState(this.toggleHoverState)
      }

      

    toggleHoverState(state) {
        return {
          isHovering: !state.isHovering,
        };
    }
    

    handleClickOpen = (name, id) => {
        this.setState({ open: true, selected_id: id, selected_name: name})
      };

    onToggleStateStatus = (deleteAlertState) => {
        this.setState({ open : deleteAlertState})
    }
    
    
    render(){
  
      let displayedStudents = this.props.student.map((student, index) => {
          
              
          return (
           
            <div onClick={()=>this.props.history.push(`/student_detail/${student.id}`)} className='student' key={student.id}> 
              <div className='d_name'>
                <div className='studentName'>
                {student.first_name + ' ' + student.last_name}
                </div>
              </div>
              <div className='button-icons'>
                <div className = 'buttonBar'>
                  <div className='notes-button'>
                     <Button className='notes'  onMouseEnter={()=>this.handleMouseHover(student.id)}
                     onMouseLeave={this.handleMouseHoverLeave} onClick = {()=>this.props.history.push(`/notes/${student.id}`)}> <i className="far fa-sticky-note "></i> 
                    <p className='notes'> Notes</p> </Button> 
                  </div>
                </div>
              
                <div className='info-button'>
                  <Button className='info' onClick = {()=>this.props.history.push(`/student_detail/${student.id}`)}> <i className="fas fa-info-circle"></i>
                  <p className='info'>Info</p> </Button>
                </div>
              
             <div className='payments-button'>
                <Button className='payments' onClick={ ()=>this.props.history.push(`/payments/${student.id}`)}><i className="fas fa-dollar-sign"></i> 
                <p className='payments'>Payments</p> </Button>
             </div>

              <div className='delete-button'>
                <Button className='delete' 
                onClick={()=>this.handleClickOpen(student.first_name, student.id)}>
                 <i className="far fa-trash-alt"></i> 
                <p className='delete'>Delete</p> </Button>
              </div>
             
             <div>
                  <DeleteAlert state={this.state.open} selected_name={this.state.selected_name} selected_id={this.state.selected_id} id={student.id} toggleState={this.onToggleStateStatus} name={student.first_name}/>
             </div>

             </div>
            
            </div>
            )
           
          
      }) 

    return (
    
      <div>
       <div className={this.props.student.length > 0? 'add-students-hidden' : 'add-students-visible'}>
       <div className='welcome-title'> Welcome to Lesson Tracker! </div>
        <i class="fas fa-arrow-right"></i>
        <Button className='new-user-button'>Add your first student</Button>
        <i class="fas fa-arrow-left"></i>
        </div>

        <div className='dashboard'>  
         
          <DeleteAlert />
          
            {
          this.state.isHovering &&
          <div className='usersNotes'>
            {this.state.usersNotes}
          </div>
        }

        
            <div className='students' >
                <div className='top-section'>
                    <div>
                        <TodaysSchedule history={this.props.history}/>
                    </div>
                    <div className={this.props.student.length > 0 ? 'notes-payments' : 'notes-payments-hidden'}>
                        <div onClick={()=>this.props.history.push('/allNotes')} className='all-notes-button'>
                        <a className='all-notes-text'>All Notes</a>
                        </div>
                        <div onClick={()=>this.props.history.push('/allPayments')} className='all-payments-button'>
                        <a className='all-payments-text'>All Payments</a>
                        </div>
                    </div>
                </div>
                <div className='all_students'>
                All students:
                {displayedStudents} 
                </div>
               
             </div>

        </div>
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

