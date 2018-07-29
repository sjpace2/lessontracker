import React, {Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {connect} from 'react-redux';


class Notes extends Component {
    constructor () {
        super ()
        this.state = {
            note: '',
            usersNotes: [],
            date: ''
            
        }
    }

    componentDidMount = () => {
        let currentDate = new Date().toDateString()
        let id = this.props.match.params.id
        axios.get(`/api/userNotes/${id}`)
        .then(res => {
            this.setState({
                usersNotes: res.data,
                date: currentDate
            })  
        }) 
    }  

    handleNoteChange = (value) => {
        this.setState({
            note: value
        })
    }

    
    
    submitNewNote = (id) => {
        axios.post(`/api/notes/${id}`, {note: this.state.note, date: this.state.date})
        .then(res => {
            
            this.setState({
                usersNotes: res.data,
                note: ''
            })
            this.componentDidMount()
        })
        
    }


    render () {
    let selectedStudent = this.props.student.filter( student => {
        let param = +this.props.match.params.id
        return student.id === param
    })
    selectedStudent = selectedStudent[0] ? selectedStudent[0] : selectedStudent


    let noteDropDown = this.state.usersNotes.map( (note, index) => {
        return (
        <div  key={index}>
                 <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className='none'>
                    {note.date} </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography>
                   {note.content} 
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
        </div>
        )
       
    })

     
        
        return (
            <div className="main-notes">
                <div className="notes-name">
                    {selectedStudent.first_name} {selectedStudent.last_name}
                </div>
                <div className='notes-text-field'>
                <TextField value={this.state.note} className='multiline-flexible' label="Enter new note" multiline rowsMax="4" onChange={e=>this.handleNoteChange(e.target.value)}
                        margin="normal"  />
                <Button onClick={()=>this.submitNewNote(+this.props.match.params.id)} >Save</Button>
                </div>
                   {noteDropDown}
                <Button onClick={()=>this.props.history.push('/dashboard')} >Back </Button>
                
            </div>
        )
    }
}



function mapStateToProps (state) {
    return {
        student: state.student
    }
}

export default connect (mapStateToProps)(Notes)