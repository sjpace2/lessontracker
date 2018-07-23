import React, {Component} from 'react';
import axios from 'axios';
import { getStudentData } from './../../ducks/reducer';
import { connect } from 'react-redux';

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
        let date = new Date().toDateString();
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
            return <div key={index} id={payment.id}>
                        ${payment.amount}, {" "}
                        {payment.date}
                        
                        <button onClick = {()=>this.deletePayment(payment.id)}>delete</button>
                   </div>
        })
        console.log(displayedPayments)
        
        
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
                <input value = {this.state.payments} onChange={e=>this.handlePaymentsChange(e.target.value)} type="text"/>
                <button onClick={ ()=>this.sendAmount(this.state.payments) }>Save</button>
            </div>
            <div>
                {displayedPayments}
            </div>
            
            <button onClick={()=>this.props.history.push('/dashboard')}>Back</button>
        </div>
        //may want to have this back button go to student details at some point
        )
    }
}

function mapStateToProps (state) {
    return {
        student: state.student
    }
}

export default connect (mapStateToProps, {getStudentData})(Payments)