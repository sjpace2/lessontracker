import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {createNewStudent} from './../../ducks/reducer';
import Button from '@material-ui/core/Button';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';
const now = moment().hour(0).minute(0);
const format = 'h:mm a';




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
    // handleTimeChange = (value) => {
    //     this.setState({
    //         time : value
    //     })
    // }

    handleTimeChange = (value) => {
        console.log(value && value.format(format));
        this.setState({
            time : value && value.format(format)
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
      let timeSelector =     <TimePicker
      showSecond={false}
      defaultValue={now}
      className="xxx"
      onChange={this.handleTimeChange}
      format={format}
      use12Hours
      inputReadOnly
    />
    return (
        <div>
           
            <div>add student info here</div>
                <div>
                    <input placeholder = "First name" type = "text" onChange = { e => this.handleFirstnameChange( e.target.value )} />
                    <input placeholder = "Last name" type = "text" onChange = { e => this.handleLastnameChange( e.target.value)}/>
                    <input placeholder = "Email" type = "text" onChange = { e => this.handleEmailChange( e.target.value)}/>
                    <input placeholder = "Phone" type = "text" onChange = { e => this.handlePhoneChange( e.target.value)}/>
                    <input placeholder = "Lesson Time" type = "text" onChange = { e => this.handleTimeChange( e.target.value)}/>
                </div>
                <div>
                <Button variant='contained' className='mon' onClick={()=>this.handleDayChange('Mon')} > Mon </Button>
                <Button variant='contained' className='tue' onClick={()=>this.handleDayChange('Tue')} > Tue </Button>
                <Button variant='contained' className='wed' onClick={()=>this.handleDayChange('Wed')} > Wed </Button>
                <Button variant='contained' className='thu' onClick={()=>this.handleDayChange('Thu')} > Thu </Button>
                <Button variant='contained' className='fri' onClick={()=>this.handleDayChange('Fri')} > Fri </Button>
                <Button variant='contained' className='sat' onClick={()=>this.handleDayChange('Sat')} > Sat </Button>
                <Button variant='contained' className='sun' onClick={()=>this.handleDayChange('Sun')} > Sun </Button>
                </div>
            {timeSelector}
                <div>
               
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