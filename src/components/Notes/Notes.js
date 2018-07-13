import React, {Component} from 'react';
import axios from 'axios';

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
            console.log(res.data)
            this.setState({
                usersNotes: res.data
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


    let filteredNotes = this.state.usersNotes.map( (note, index) => {
        return (
        <div key={index}>
             {note.date}: {note.content} 
        </div>
        )
    })
        
        return (
            <div>
                {selectedStudent.first_name} {selectedStudent.last_name}
                
                <input onChange={e=>this.handleNoteChange(e.target.value)} type="text"/>
                <button onClick={()=>this.submitNewNote(+this.props.match.params.id)}>save note</button>
                
                {filteredNotes}
                
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