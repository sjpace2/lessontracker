import React, {Component} from 'react';
import axios from 'axios';

class allNotes extends Component {
    constructor () {
        super ()
        this.state = {
            notes: []
        }
    }
    
    
    componentDidMount () {
        axios.get('api/allnotes').then(res => {
            
            this.setState({
                notes: res.data
            })
        })
    }
    

    render (){

       let displayedNotes = this.state.notes.map( (note, index) => {
        return (
                <div key={index}>
                {note.first_name} {note.last_name}: {note.content}
                </div>
                )
    })
    
    return (
        <div>
            <div>all notes here</div>
            <div>{displayedNotes}</div>
            <button onClick={()=>this.props.history.push('/dashboard')}>Back</button>
        </div>
      )
    }

}

export default allNotes;        