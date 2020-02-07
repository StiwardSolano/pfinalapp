import React, { Component } from 'react';
import axios from 'axios';

export default class CreateSubject extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      subjectId: ''
    }

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSubjectId = this.onChangeSubjectId.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      description: '',
      subjectId: ''
    }

  }

  componentDidMount() {

  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangeSubjectId(e) {
    this.setState({
      subjectId: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const subject = {
      description: this.state.description,
      subjectId: this.state.subjectId,
    };

  console.log(subject);

  axios.post('http://localhost:5000/subjects/add', subject)
  .then(res => console.log(res.data));

  //window.location = '/subjects';//-> redirect after post
  }

  render() {
    return (
      <div>
        <h3>Crear Materia</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Descripcion: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-group">
            <label>Siglas de la clase: </label>
            <input type="text" 
                required
                className="form-control"
                value={this.state.subjectId}
                onChange={this.onChangeSubjectId}
                />
          </div>

          <div className="form-group">
            <input type="submit" value="Create Subject" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}