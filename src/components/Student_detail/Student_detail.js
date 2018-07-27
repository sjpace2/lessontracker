import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createNewStudent} from './../../ducks/reducer';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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
        axios.put(`api/students/first/${id}`, {first_name: this.state.first})
        .then(res => {
            
            this.props.createNewStudent(res.data[0])
        })
    }

    updateLast = (id) => {
        axios.put(`api/students/last/${id}`, {last_name: this.state.last})
        .then(res => {
            
            console.log(res.data)
            this.props.createNewStudent(res.data[0])
        })
    }

    updateEmail = (id) => {
        axios.put(`api/students/email/${id}`, {email: this.state.email})
        .then(res => {
            this.props.createNewStudent(res.data[0])
        })
    }

    updatePhone = (id) => {
        axios.put(`api/students/phone/${id}`, {phone: this.state.phone})
        .then(res => {
            this.props.createNewStudent(res.data[0])
        })
    }

    updateDay = (id) => {
        axios.put(`api/students/day/${id}`, {day: this.state.day})
        .then(res => {
            this.props.createNewStudent(res.data[0])
        })
    }

    updateTime = (id) => {
        axios.put(`api/students/time/${id}`, {time: this.state.time})
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
            <div className='add-info-title'>
                {selectedStudent.first_name} {selectedStudent.last_name}
            </div>
            
            <div className='student-details'>
            <h1 className='d_firstname'>
                First name: { selectedStudent.first_name ? selectedStudent.first_name : null }
                <TextField placeholder='edit' className = 'd_textfield' onChange={e=>this.handleFirstChange(e.target.value)} type="text"/> 
                <Button onClick={ ()=>this.updateFirst(selectedStudent.id) }>update</Button>
           </h1>

            <h1 className='d_lastname'>
                Last name: { selectedStudent.last_name ? selectedStudent.last_name : null }
                <TextField placeholder='edit' className = 'd_textfield' onChange={e=>this.handleLastChange(e.target.value)} type="text"/>
                <Button onClick={ ()=>this.updateLast(selectedStudent.id) }>update</Button>
            </h1>

            <h1 className='d_email'>
                Email: { selectedStudent.email ? selectedStudent.email : null }
                <TextField placeholder='edit' className = 'd_textfield' onChange={e=>this.handleEmailChange(e.target.value)} type="text"/>
                <Button onClick={ ()=>this.updateEmail(selectedStudent.id) }>update</Button>
            </h1>

            <h1 className='d_phone'>
                Phone: { selectedStudent.phone ? selectedStudent.phone : null }
                <TextField placeholder='edit' className = 'd_textfield' onChange={e=>this.handlePhoneChange(e.target.value)} type="text"/>
                <Button onClick={ ()=>this.updatePhone(selectedStudent.id) }>update</Button>
            </h1>

            <h1 className='d_day'>
                Day: { selectedStudent.day ? selectedStudent.day : null } 
                <TextField placeholder='edit' className = 'd_textfield' onChange={e=>this.handleDayChange(e.target.value)} type="text"/>
                <Button onClick={ ()=>this.updateDay(selectedStudent.id) }>update</Button>
            </h1>

            <h1 className='d_time'>
                Time: { selectedStudent.time ? selectedStudent.time : null } 
                <TextField placeholder='edit' className = 'd_textfield' onChange={e=>this.handleTimeChange(e.target.value)} type="text"/>
                <Button onClick={ ()=>this.updateTime(selectedStudent.id) }>update</Button>
            </h1>
        <div className='navbuttons'>
            <Button onClick = { ()=>this.props.history.push('/dashboard') }>Back</Button>
            
            <Button onClick = {()=>this.props.history.push(`/notes/${this.props.match.params.id}`)}>Notes</Button>

            <Button onClick={ ()=>this.props.history.push(`/payments/${this.props.match.params.id}`)}>Payments </Button>

            {/* <button onClick = { ()=>this.props.history.push('/Edit_student') } >Edit</button> */}

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

export default connect (mapStateToProps, {createNewStudent})(Student_detail)