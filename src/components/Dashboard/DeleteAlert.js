import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class DeleteAlert extends Component {
    constructor(){
        super()
        this.state={
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
    

    render(){
        const { fullScreen } = this.props;
        return(
            <div>
            <Dialog
            fullScreen={fullScreen}
            open={this.state.open}
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
              <Button onClick={this.handleClose} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>  
          </div>
        )
    }
}