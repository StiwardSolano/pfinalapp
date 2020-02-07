import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Subject = props => (
  <tr>
    <td>{props.class.subjectId}</td>
    <td>{props.class.description}</td>
    <td>{props.class.teachername}</td>
    <td>
      <Link to={"/edit/"+props.class._id}>edit</Link> | 
      <a href="/#" onClick={() => { props.deleteClass(props.class._id) }}>delete</a>
      | <Link to={"/comments/"+props.class._id}>comentarios</Link>
    </td>
  </tr>
)

export default class ClassList extends Component {

  constructor(props) {
    super(props);
    this.deleteClass = this.deleteClass.bind(this);
    this.state = {classes: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/class/')
     .then(response => {
       this.setState({ classes: response.data });
     })
     .catch((error) => {
        console.log(error);
     })
  }

  deleteClass(id) {
    axios.delete('http://localhost:5000/class'+id)
      .then(res => console.log(res.data));
    this.setState({
        classes: this.state.classes.filter(el => el._id !== id)
    })
  }

  classList() {
    return this.state.classes.map(currentclass => {
      return <Subject class={currentclass} deleteClass={this.deleteClass} key={currentclass._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Clases</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Sigla</th>
              <th>Descripcion</th>
              <th>Profesor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            { this.classList() }
          </tbody>
        </table>
      </div>
    )
  }
}