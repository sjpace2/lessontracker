import React, {Component} from 'react';
import {connect} from 'react-redux';


class Edit_student extends Component {
    constructor () {
        super ()
        this.state = {
            name: ''
        }
    }
    

    render () {

        let selectedStudent = this.props.student.filter( student => {
            let param = +this.props.match.params.id
            return student.id === param
        })
        selectedStudent = selectedStudent[0] ? selectedStudent[0] : selectedStudent

        return(
            <div>
                Edit

            <h1>First name: { selectedStudent.first_name ? selectedStudent.first_name : null }</h1>

            <h1>Last name: { selectedStudent.last_name ? selectedStudent.last_name : null }</h1>

            <h1>Email: { selectedStudent.email ? selectedStudent.email : null }</h1>

            <h1>Phone: { selectedStudent.phone ? selectedStudent.phone : null }</h1>

            <h1>Day: { selectedStudent.day ? selectedStudent.day : null }</h1>

            <h1>Time: { selectedStudent.time ? selectedStudent.time : null }</h1>
            </div>
        )
    }
}



function mapStateToProps (state) {
    return {
        student: state.student
    }
}

export default connect (mapStateToProps)(Edit_student)