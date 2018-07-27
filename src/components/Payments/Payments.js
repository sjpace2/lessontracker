import React, {Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { getStudentData } from './../../ducks/reducer';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
var moment = require('moment');

class Payments extends Component {
    constructor () {
        super ()
        this.state = {
            payments: "",
            paymentsList: []
        }
    }

    componentDidMount = () => {
        this.getPayments()
    }

    deletePayment = (id) => {
        let student_id = +this.props.match.params.id
        axios.delete(`/api/deletePayment/${id}`, {data: {student_id}}).then(res=>{
            this.setState({
                paymentsList: res.data
            })
        })
        this.getPayments()
    }

    handlePaymentsChange = (value) => {
        this.setState({
            payments: value
        })
    }

    sendAmount = (amount) => {
        let date = moment().format('MM/DD/YYYY')
        let id = +this.props.match.params.id
        axios.post('/api/payments', {amount, id, date})
        .then( res => {
            this.setState({
                payments: "",
               
            })
            this.getPayments()})
    }

    getPayments = () => {
        let id = +this.props.match.params.id
        axios.get(`/api/studentpayments/${id}`)
        .then(res => {
            this.setState({
                paymentsList: res.data
            })
        })
    }



    render (){
       
       
        let displayedPayments = this.state.paymentsList.map( (payment, index) => {
            return <div className='ind-payments' key={index} id={payment.id}>
                        ${payment.amount}, {" "}
                        {payment.date}
                        
                        <Button onClick = {()=>this.deletePayment(payment.id)}>delete</Button>
                   </div>
        })
      
        
        
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
                <TextField placeholder = 'enter amount' value = {this.state.payments} onChange={e=>this.handlePaymentsChange(e.target.value)} type="text"/>
                <Button onClick={ ()=>this.sendAmount(this.state.payments) }>Save</Button>
                <Button className='payments-back-right' onClick={()=>this.props.history.push('/dashboard')}>Back</Button>
            </div>
            <div>
                {displayedPayments.reverse()}
            </div>
            
            <Button onClick={()=>this.props.history.push('/dashboard')}>Back</Button>
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