module.exports = {
    addStudent: (req, res) => {
        
        const {id: user_id} = req.session.user;
        const {first_name, last_name, email, phone, day, time} = req.body;
        req.app.get('db').add_student([first_name, last_name, email, phone, day, time, user_id])
        .then( newStudent => {
            res.status(200).send(newStudent)
        })
    },
    getAllStudents: (req, res) => {
        const {id} = req.session.user;
        req.app.get('db').get_teacher_students(id)
        .then(students => res.status(200).send(students))
        
        
    }
}

