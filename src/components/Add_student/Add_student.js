import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {createNewStudent} from './../../ducks/reducer';
import Button from '@material-ui/core/Button';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import 'rc-time-picker/assets/index.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
        
        this.setState({
            time : value && value.format(format)
        })
    }

    sendStudentInfo = () => {
        axios.post('/api/students', {first_name: this.state.firstname, last_name: this.state.lastname, email: this.state.email, phone: this.state.phone, day: this.state.day, time: this.state.time}).then( res => {
            this.props.createNewStudent(res.data[0])
            this.props.history.push('/dashboard')
    })
    }

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
           
            <div className='add-info-title'>enter student details</div>
                <div className='student-info'>
                    <TextField className='first_name' placeholder = "First name" type = "text" onChange = { e => this.handleFirstnameChange( e.target.value )} />
                    <TextField className='last_name' placeholder = "Last name" type = "text" onChange = { e => this.handleLastnameChange( e.target.value)}/>
                    <TextField className='email' placeholder = "Email" type = "text" onChange = { e => this.handleEmailChange( e.target.value)}/>
                    <TextField className='phone' placeholder = "Phone" type = "text" onChange = { e => this.handlePhoneChange( e.target.value)}/>
                    
            </div>
                
        <div className='day'>
            <form  autoComplete="off">
        <FormControl >
          <InputLabel htmlFor="age-simple">Day</InputLabel>
          <Select
            value={this.state.day}
            onChange={(e)=>this.handleDayChange(e.target.value)}
            inputProps={{
              name: 'day',
              id: 'day-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'Mon'}>Monday</MenuItem>
            <MenuItem value={'Tue'}>Tuesday</MenuItem>
            <MenuItem value={'Wed'}>Wednesday</MenuItem>
            <MenuItem value={'Thu'}>Thursday</MenuItem>
            <MenuItem value={'Fri'}>Friday</MenuItem>
            <MenuItem value={'Sat'}>Saturday</MenuItem>
            <MenuItem value={'Sun'}>Sunday</MenuItem>
            
           </Select>
         </FormControl>
        
        </form>
    </div>
    <div className='time'>
        {timeSelector}
    </div>
          <div className='nav-buttons'>   
            <Button onClick = { () => this.props.history.push('/Dashboard') }>Cancel</Button>
            <Button onClick = {(event) => {this.sendStudentInfo()}} >Submit</Button>
          </div>
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