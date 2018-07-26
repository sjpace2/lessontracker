import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import axios from 'axios';
import { getStudentData } from './../../ducks/reducer';
import { connect } from 'react-redux';


//use this to delete onClick = {()=>this.deleteStudent(student.id)}>
class DeleteAlert extends Component {
    constructor(props){
        super(props)
        console.log(this.props.state)
        this.state={
          open: this.props.state
      }
    }

    
    handleClose = () => {
        this.setState({ open: false });
        
    }

    deleteStudent = (id) => {
         axios.delete(`/api/students/${id}`).then(res => {
            this.props.getStudentData(res.data)
        })
        this.handleClose()
        
    }
    

    render(){
        console.log(this.props.state)
        console.log(this.props.id)
      
        const { fullScreen } = this.props;
        return(
            <div>
            <Dialog
            fullScreen={fullScreen}
            open={this.props.state}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                All student info and notes are about to be deleted. Payments will still be shown on the 'All Payments' page. Are you sure you'd like to proceed?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Disagree
              </Button>
              <Button onClick={()=>this.deleteStudent(this.props.id)} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>  
          </div>
        )
    }
}


function mapStateToProps (state) {
    return {
        student: state.student
    }
}

export default connect (mapStateToProps, {getStudentData})(DeleteAlert)