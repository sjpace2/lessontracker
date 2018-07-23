import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Add_student from './components/Add_student/Add_student';
import Dashboard from './components/Dashboard/Dashboard';
import Notes from './components/Notes/Notes';
import Student_detail from './components/Student_detail/Student_detail';
import allNotes from './components/AllNotes/AllNotes';
import Payments from './components/Payments/Payments';
import allPayments from './components/AllPayments/AllPayments';

export default (
    <Switch>
        <Route exact path = '/' component = { Auth }/>
        <Route path = '/add_student' component = { Add_student }/>
        <Route path = '/dashboard' component = { Dashboard }/>
        <Route path = '/notes/:id' component = { Notes }/>
        <Route path = '/student_detail/:id' component = { Student_detail }/>
        <Route path = '/allnotes' component = { allNotes }/>
        <Route path = '/payments/:id' component = { Payments }/>
        <Route path = '/allpayments' component = { allPayments } />
    </Switch>
    )