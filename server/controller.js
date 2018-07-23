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

    ignoreAuthInDevelopment: (req, res, next) => {
        if(process.env.MODE === 'development' && !req.session.user){
            req.session.user = {
                id:1, 
                auth_id:'google-oauth2|102948968802324753832', 
                user_name: 'Stephen Pace',	
                user_pic: 'https://lh5.googleusercontent.com/-sapgzN9K2rg/AAAAAAAAAAI/AAAAAAAAAwg/RLOCqjo6wDU/photo.jpg',
            };
            next();
        } else {
            next();
        }
    },

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
        req.app.get('db').get_teacher_students([id])
        .then(students => res.status(200).send(students))
        
        
    },

    deleteStudent: (req, res, next) => {
        const {id} = req.params;
        req.app.get('db').delete_student([id])
        .then(students => next())
        
    },

    getNameOfUser: (req, res) => {
        const {user_name, user_pic} = req.session.user;
       res.status(200).send(user_name)
    },

    editFirstName: (req, res) => {
        const {id} = req.params;
        const {first_name} = req.body;
        req.app.get('db').edit_first_name([first_name, id])
        
        .then(students => res.status(200).send(students))
        

    },
    
    editLastName: (req, res) => {
        const {id} = req.params;
        const {last_name} = req.body;
        req.app.get('db').edit_last_name([last_name, id])
        .then(students => {
            res.status(200).send(students)} )
    },

    editEmail: (req, res) => {
        const {id} = req.params;
        const {email} = req.body;
        req.app.get('db').edit_email([email, id])
        .then(students => res.status(200).send(email) )
    },

    editPhone: (req, res) => {
        const {id} = req.params;
        const {phone} = req.body;
        req.app.get('db').edit_phone([phone, id])
        .then(students => res.status(200).send(phone) )
    },

    editDay: (req, res) => {
        const {id} = req.params;
        const {day} = req.body;
        req.app.get('db').edit_day([day, id])
        .then(students => res.status(200).send(day) )
    },

    editTime: (req, res) => {
        const {id} = req.params;
        const {time} = req.body;
        req.app.get('db').edit_time([time, id])
        .then(students => res.status(200).send(time) )
    },

    addNote: (req, res, next) => {
        const {id} = req.params;
        const {note, date} = req.body;
        req.app.get('db').add_note([note, date, id])
        .then(notes => next())
        
    },

    getUserNotes: (req, res) => {
        const {id} = req.params;
        req.app.get('db').get_user_notes([id])
        .then(notes => res.status(200).send(notes))
    },

    getAllNotes: (req, res) => {
        const {id} = req.session.user;
        req.app.get('db').get_all_notes([id])
        .then(notes => res.status(200).send(notes))
    },

    addPayment: (req, res) => {
        const {id, amount, date} = req.body;
        const {id: allpayment_id} = req.session.user;
        req.app.get('db').add_payments([amount, id, date])
        .then(payments => {
        console.log(payments)
        req.app.get('db').add_allpayments([amount, allpayment_id, date, id, payments[0].id])
        .then(payments => res.status(200).send(payments)) 
        })
    },
    
    getAllPayments: (req, res) => {
        const {id} = req.session.user;
        req.app.get('db').get_all_payments([id])
        .then(payments => res.status(200).send(payments))
    },

    getStudentPayments: (req, res) => {
        const {id} = req.params;
        req.app.get('db').get_student_payments([id])
        .then( payments => res.status(200).send( payments ))
    },

    deletePayment: (req, res) => {
        const {id} = req.params;
        req.app.get('db').delete_payment([id])
        .then( payments => res.status(200).send( payments ))
       
    }

   
   
 }



