module.exports = {
    addStudent: (req, res) => {
        const {name, email, phone, day, time} = req.body;
        req.app.get('db').addStudent([name, email, phone, day, time])
        .then( newStudent => {
            res.status(200).send(newStudent)
        })
    },
    getAllStudents: (req, res) => {
        const {id} = req.session.user
        req.app.get('db').getAllStudents(id)
        .then(students => res.status(200).send(students))
    }
}