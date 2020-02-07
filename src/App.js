import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

import Navbar from "./components/navbar.component";
import CreateTeacher from "./components/create-teacher.component";
import CreateSubject from "./components/create-subject.component";
import CreateClass from "./components/create-class.component";
import ClassList from "./components/class-list.component";
import CommentsTest from "./components/comments.test.component";
import TopsList from "./components/tops-list.component";
import WorstList from "./components/worst-list.component";
import TopRatedList from "./components/top-rated-list.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={ClassList} />
        <Route path="/teachers" component={CreateTeacher} />
        <Route path="/subjects" component={CreateSubject} />
        <Route path="/class" component={CreateClass} />
        <Route path="/top" exact component={TopsList} />
        <Route path="/comments/:id" component={CommentsTest} />
        <Route path="/worst" component={WorstList} />
        <Route path="/toprated" component={TopRatedList} />
      </div>
    </Router>
  );
}

export default App;
