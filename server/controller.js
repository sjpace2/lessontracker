module.exports = {
    // ignoreAuthInDevelopment: (req, res, next) => {
    //     if(process.env.MODE === 'development'){
    //         req.session.user = {
    //             id:1, 
    //             auth_id:'google-oauth2|102948968802324753832', 
    //             user_name: 'Stephen Pace',	
    //             user_pic: 'https://lh5.googleusercontent.com/-sapgzN9K2rg/AAAAAAAAAAI/AAAAAAAAAwg/RLOCqjo6wDU/photo.jpg',
    //         };
    //         next();
    //     }
    //     next();
    // },

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

