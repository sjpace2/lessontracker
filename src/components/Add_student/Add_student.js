import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {createNewStudent} from './../../ducks/reducer';


class Add_student extends Component {
    constructor () {
        super()
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            day: '',
            time: ''
        }
    }

    handleFirstnameChange = (value) => {
        this.setState({
            firstname : value
        })
    }
    handleLastnameChange = (value) => {
        this.setState({
            lastname : value
        })
    }
    handleEmailChange = (value) => {
        this.setState({
            email : value
        })
    }
    handlePhoneChange = (value) => {
        this.setState({
            phone : value
        })
    }
    handleDayChange = (value) => {
        this.setState({
           day : value
        })
    }
    handleTimeChange = (value) => {
        this.setState({
            time : value
        })
    }

    sendStudentInfo = () => {
        axios.post('/api/students', {first_name: this.state.firstname, last_name: this.state.lastname, email: this.state.email, phone: this.state.phone, day: this.state.day, time: this.state.time}).then( res => {
            this.props.createNewStudent(res.data[0])
            this.props.history.push('/dashboard');
        })
    }

    // submitButtonOnClick = () => {
    //     this.sendStudentInfo();
    //     this.props.history.push('/dashboard');
    // }
    


    render() {
    return (
        <div>
            <div>add student info here</div>
                <div>
                    <input placeholder = "First name" type = "text" onChange = { e => this.handleFirstnameChange( e.target.value )} />
                    <input placeholder = "Last name" type = "text" onChange = { e => this.handleLastnameChange( e.target.value)}/>
                    <input placeholder = "Email" type = "text" onChange = { e => this.handleEmailChange( e.target.value)}/>
                    <input placeholder = "Phone" type = "text" onChange = { e => this.handlePhoneChange( e.target.value)}/>
                    <input placeholder = "Lesson Day" type = "text" onChange = { e => this.handleDayChange( e.target.value)}/>
                    <input placeholder = "Lesson Time" type = "text" onChange = { e => this.handleTimeChange( e.target.value)}/>
                </div>
            <button onClick = { () => this.props.history.push('/Dashboard') }>Back to all students</button>
            <button onClick = {(event) => {this.sendStudentInfo()}} >Submit</button>
        </div>
    )
}
}

function mapStateToProps(state){
    return {
        student: state.student
    }
}

export default connect(mapStateToProps, {createNewStudent})(Add_student);