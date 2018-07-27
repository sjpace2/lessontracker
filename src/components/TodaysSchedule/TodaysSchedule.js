import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getStudentData} from './../../ducks/reducer';
var moment = require('moment');


class TodaysSchedule extends Component {
    

    componentDidMount () {
        this.getTodaysSchedule()
    }
    
    getTodaysSchedule = () => {
    
      //map through students
      //add moment property
           let convertedStudentObj = this.props.student.map((student,i)=>{ 
            let splitArr = this.props.student[i].time.split(' ')
             let timeStr = splitArr[0].concat(':').concat(splitArr[1])
             

           student.momentTime = moment.utc(timeStr, "hh:mm:a")._i
           return student;
           })
           
      //sort by moment time
           
           let sortedStudents = convertedStudentObj.sort(function(a, b){
              
            if (moment.utc(a.momentTime, "hh:mm:a").isBefore(moment.utc(b.momentTime, "hh:mm:a"))) return -1
                else return 1
           })
          
      //map to return divs
        
        let date = moment()
        let currentDay = (moment(date, "YYYY-MM-DD").format('ddd D MMM')).slice(0, 3)
        let displayedStudents = []
        sortedStudents.map( (student, index) => {
            if (student.day.includes(currentDay)) {
            displayedStudents.push(<div key={index}>{student.first_name + " " + student.last_name + " " + student.time + " "}</div>)
            }
        })
        
        return displayedStudents;
    }

    render () {
        let date = moment()

        return (
            <div>
                
                <div>
                Lessons for {moment(date, "YYYY-MM-DD").format('ddd D MMM')}
                </div>
                <div>
                
                {this.getTodaysSchedule()}

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

export default connect (mapStateToProps, {getStudentData})(TodaysSchedule)
