import React, {Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className='none'>
                    {note.first_name} {note.last_name} {note.date} </Typography>
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
        <div>
            <div className='notes-container'>
            <div className='all-notes-title'>All Notes</div>
            <Button className='back-to-dashboard-top' onClick={()=>this.props.history.push('/dashboard')}>Back</Button>
            </div>
            <div>{displayedNotes}</div>
            <Button className='back-to-dashboard' onClick={()=>this.props.history.push('/dashboard')}>Back</Button>
        </div>
      )
    }

}

export default allNotes;        