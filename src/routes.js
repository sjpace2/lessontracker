import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Add_student from './components/Add_student/Add_student';
import Dashboard from './components/Dashboard/Dashboard';
import Note_details from './components/Note_details/Note_details';
import Notes from './components/Notes/Notes';
import Student_detail from './components/Student_detail/Student_detail';

export default (
    <Switch>
        <Route exact path = '/' component = { Auth }/>
        <Route path = '/add_student' component = { Add_student }/>
        <Route path = '/dashboard' component = { Dashboard }/>
        <Route path = '/note_details' component = { Note_details }/>
        <Route path = '/notes' component = { Notes }/>
        <Route path = '/student_detail' component = { Student_detail }/>
    </Switch>
)