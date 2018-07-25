import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getStudentData} from './../../ducks/reducer';


class TodaysSchedule extends Component {
    constructor () {
        super ()
    }

    render () {

       console.log(this.props)
        return (
            <div>Today is Monday...</div>
        )
    }
}


function mapStateToProps (state) {
    return {
        student: state.student
    }
}

export default connect (mapStateToProps, {getStudentData})(TodaysSchedule)
