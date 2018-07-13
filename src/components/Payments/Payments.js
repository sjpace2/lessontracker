import React, {Component} from 'react';
import axios from 'axios';
import { getStudentData } from './../../ducks/reducer';
import { connect } from 'react-redux';

class Payments extends Component {
    constructor () {
        super ()
        this.state = {
            payments: 0
        }
    }

    handlePaymentsChange = (value) => {
        this.setState({
            payments: value
        })
    }

    sendAmount = (amount) => {
        let date = new Date().toDateString();
        let id = +this.props.match.params.id
        axios.post('/api/payments', {amount, id, date})
    }
//here...get all payments to be mapped over and displayed
    componentDidMount = () => {
        axios.get('/api/getStudentPayments')
        .then()
    }

    render (){
        let selectedStudent = this.props.student.filter( student => {
            let param = +this.props.match.params.id
            return student.id === param
        })
        selectedStudent = selectedStudent[0] ? selectedStudent[0] : selectedStudent
        
        return(
        <div>
            <div>
                Payments from {selectedStudent.first_name} {selectedStudent.last_name}
            </div>
            <div>
                <input onChange={e=>this.handlePaymentsChange(e.target.value)} type="text"/>
                <button onClick={ ()=>this.sendAmount(this.state.payments) }>Save</button>
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

export default connect (mapStateToProps, {getStudentData})(Payments)