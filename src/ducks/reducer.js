const intialState = {
    student: []
}

const STUDENT_DATA = 'STUDENT_DATA';
const NEW_STUDENT_DATA = 'NEW_STUDENT_DATA';

export function getStudentData (student) {
    return {
        type: STUDENT_DATA,
        payload: student
    }
}

export function createNewStudent (studentData) {
    return {
        type: NEW_STUDENT_DATA,
        payload: studentData
    }
}



export default function reducer (state=intialState, action) {
    switch (action.type) {
        case STUDENT_DATA:  
        return Object.assign({}, state, {student: action.payload})
        
        case NEW_STUDENT_DATA:
            return Object.assign({}, state, {studentData: action.payload})
        
        default:
            return state
    }
}

