import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createNewStudent} from './../../ducks/reducer';
import axios from 'axios';

class Student_detail extends Component {
    constructor(){
        super()
        this.state={
            first: '',
            last: '',
            email: '',
            phone: '',
            day: '',
            time: ''
        }
    }

    handleFirstChange = (value) => {
        this.setState({
            first: value
        })
    }

    handleLastChange = (value) => {
        this.setState({
            last: value
        })
    }

    handlePhoneChange = (value) => {
        this.setState({
            phone: value
        })
    }

    handleEmailChange = (value) => {
        this.setState({
            email: value
        })
    }

    handleDayChange = (value) => {
        this.setState({
            day: value
        })
    }

    handleTimeChange = (value) => {
        this.setState({
            time: value
        })
    }

    updateFirst = (id) => {
        axios.put(`api/students/${id}`, {first_name: this.state.first})
        .then(res => {
            this.props.createNewStudent(res.data[0])
        })
    }

    updateLast = (id) => {
        axios.put(`api/students/${id}`, {last_name: this.state.last})
        .then(res => {
            this.props.createNewStudent(res.data[0])
        })
    }

    updateEmail = (id) => {
        axios.put(`api/students/${id}`, {email: this.state.email})
        .then(res => {
            this.props.createNewStudent(res.data[0])
        })
    }

    updatePhone = (id) => {
        axios.put(`api/students/${id}`, {phone: this.state.phone})
        .then(res => {
            this.props.createNewStudent(res.data[0])
        })
    }

    updateDay = (id) => {
        axios.put(`api/students/${id}`, {day: this.state.day})
        .then(res => {
            this.props.createNewStudent(res.data[0])
        })
    }

    updateTime = (id) => {
        axios.put(`api/students/${id}`, {time: this.state.time})
        .then(res => {
            this.props.createNewStudent(res.data[0])
        })
    }

    
    
    render () {
    
    let selectedStudent = this.props.student.filter( student => {
        let param = +this.props.match.params.id
        return student.id === param
    })
    selectedStudent = selectedStudent[0] ? selectedStudent[0] : selectedStudent
   
    return (
        <div>
            <h1>
                First name: { selectedStudent.first_name ? selectedStudent.first_name : null }
                <input onChange={e=>this.handleFirstChange(e.target.value)} type="text"/> 
                <button onClick={ ()=>this.updateFirst(selectedStudent.id) }>save</button>
           </h1>

            <h1>
                Last name: { selectedStudent.last_name ? selectedStudent.last_name : null }
                <input onChange={e=>this.handleLastChange(e.target.value)} type="text"/>
                <button onClick={ ()=>this.updateLast(selectedStudent.id) }>save</button>
            </h1>

            <h1>
                Email: { selectedStudent.email ? selectedStudent.email : null }
                <input onChange={e=>this.handleEmailChange(e.target.value)} type="text"/>
                <button onClick={ ()=>this.updateEmail(selectedStudent.id) }>save</button>
            </h1>

            <h1>
                Phone: { selectedStudent.phone ? selectedStudent.phone : null }
                <input onChange={e=>this.handlePhoneChange(e.target.value)} type="text"/>
                <button onClick={ ()=>this.updatePhone(selectedStudent.id) }>save</button>
            </h1>

            <h1>
                Day: { selectedStudent.day ? selectedStudent.day : null } 
                <input onChange={e=>this.handleDayChange(e.target.value)} type="text"/>
                <button onClick={ ()=>this.updateDay(selectedStudent.id) }>save</button>
            </h1>

            <h1>
                Time: { selectedStudent.time ? selectedStudent.time : null } 
                <input onChange={e=>this.handleTimeChange(e.target.value)} type="text"/>
                <button onClick={ ()=>this.updateTime(selectedStudent.id) }>save</button>
            </h1>
        
            <button onClick = { ()=>this.props.history.push('/dashboard') }>Return to Students</button>
            
            <button>Notes</button>

            {/* <button onClick = { ()=>this.props.history.push('/Edit_student') } >Edit</button> */}

        
            

        </div>
    )
}
}

function mapStateToProps (state) {
    return {
        student: state.student
    }
}

export default connect (mapStateToProps, {createNewStudent})(Student_detail)