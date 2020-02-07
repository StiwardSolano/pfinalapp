import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTeacher extends Component {

  constructor(props) {
    super(props);
    this.onChangeTeachername = this.onChangeTeachername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      teachername: ''
    };
  }

  onChangeTeachername(e) {
    this.setState({
      teachername: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const newTeacher = {
      teachername: this.state.teachername,
    };
    console.log(newTeacher);

    axios.post('https://pfinalapi.herokuapp.com/teachers/add', newTeacher)
    .then(res => console.log(res.data));
    
    this.setState({
      teachername: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Crear Profesor</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Nombre Profesor: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.teachername}
                onChange={this.onChangeTeachername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Teacher" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
