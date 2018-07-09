const intialState = {
    student: {
        name: '',
        email: '',
        phone: '',
        day: '',
        time: '' 
    }
}

const STUDENT_DATA = 'STUDENT_DATA';

export function getStudentData (student) {
    return {
        type: STUDENT_DATA,
        payload: student
    }
}

export default function reducer (state=intialState, action) {
    switch (action.type) {
        case STUDENT_DATA:
            return Object.assign({}, state, {student: action.payload})
        default:
            return state
    }
}

