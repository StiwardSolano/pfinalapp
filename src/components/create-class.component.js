import React, { Component } from 'react';
import axios from 'axios';

export default class CreateClass extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      teachername: '',
      description: '',
      //subjectId: '',
      subjects: [], //descs
      //subjectAcron: [],//siglas
      teachers: [] //profs
    }

    this.onChangeTeachername = this.onChangeTeachername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    //this.onChangeSubjectId = this.onChangeSubjectId.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      teachername: '',
      description: '',
      //subjectId: '',
      subjects: [],
      //subjectAcron: [],
      teachers: []
    }

  }

  componentDidMount() {
    axios.all([

    axios.get('https://pfinalapi.herokuapp.com/teachers/')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              teachers: response.data.map(user => user.teachername),
              teachername: response.data[0].teachername
            })
          }
        })
        .catch((error) => {console.log(error)}),

    axios.get('https://pfinalapi.herokuapp.com/subjects/')
        .then(responseSubj => {
        if (responseSubj.data.length > 0) {
            this.setState({
            subjects: responseSubj.data.map(subj => subj.description),
            subject: responseSubj.data[0].subject,
            /*
            subjectAcron: responseSubj.data.map(subj => subj.subjectId),
            subjectId: responseSubj.data[0].subjectId*/
            })
        }
        })
        .catch((error) => {console.log(error)})
    ]);
  }

  onChangeTeachername(e) {
    this.setState({
      teachername: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
/*
  onChangeSubjectId(e) {
    this.setState({
      subjectId: e.target.value
    });
  }*/

  onSubmit(e) {
    e.preventDefault();
    const classes = {
      teachername: this.state.teachername,
      description: this.state.description
    };

  console.log(classes);
    //TODO check route & update it
  axios.post('https://pfinalapi.herokuapp.com/class/test', classes)
  .then(res => console.log(res.data))
  .catch(error => {
    console.log(error.response)
});;

  //window.location = '/class';
  }

  render() {
    return (
      <div>
        <h3>Asignar Clase</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Profesor: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.teachername}
                onChange={this.onChangeTeachername}>
                {
                  this.state.teachers.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Materia: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}>
                {
                  this.state.subjects.map(function(subj) {
                    return <option 
                      key={subj}
                      value={subj}>{subj}
                      </option>;
                  })
                }
            </select>
          </div>
          
          <div className="form-group">
            <input type="submit" value="Create Class" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}