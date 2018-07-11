import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getStudentData} from './../../ducks/reducer';

class Student_detail extends Component {
    
    editName = () => {
        
    }
    
    
    render (){
    
    
    
    let selectedStudent = this.props.student.filter( student => {
        let param = +this.props.match.params.id
        return student.id === param
    })
    selectedStudent = selectedStudent[0] ? selectedStudent[0] : selectedStudent
   
    return (
        <div>
            <h1>Name: { selectedStudent.first_name ? selectedStudent.first_name : null }{' '}{ selectedStudent.last_name ? selectedStudent.last_name : null }
            <button onClick = {this.editName}>edit</button></h1>
            <h1>Email: { selectedStudent.email ? selectedStudent.email : null }<button>edit</button></h1>
            <h1>Phone: { selectedStudent.phone ? selectedStudent.phone : null }<button>edit</button></h1>
            <h1>Day: { selectedStudent.day ? selectedStudent.day : null }<button>edit</button></h1>
            <h1>Time: { selectedStudent.time ? selectedStudent.time : null }<button>edit</button></h1>
            <button onClick = { ()=>this.props.history.push('/dashboard') }>Back</button>
            <button>Notes</button>
            <h1>{selectedStudent.data}</h1>
            

        </div>
    )
}
}

function mapStateToProps (state) {
    return {
        student: state.student
    }
}

export default connect (mapStateToProps, {getStudentData})(Student_detail)