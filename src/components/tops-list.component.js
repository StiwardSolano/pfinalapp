import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

//component to get top rated teachers
const Subject = props => (
  <tr>
    <td>{props.rating.coments[0].subjectId[0]}</td>
    <td>{props.rating.coments[0].description[0]}</td>
    <td>{props.rating.coments[0].teachername[0]}</td>
    <td><Rater rating={props.rating.total} total={5} interactive={false}/> {props.rating.total} Positivo</td>
    <td>
      <Link to={"/comments/"+props.rating._id}>comentarios</Link>
    </td>{/**/}
  </tr>
)

export default class TopsList extends Component {

  constructor(props) {
    super(props);
    this.state = {ratings: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/rated/top/')
     .then(response => {
       this.setState({ ratings: response.data });
       //console.log(response.data);
     })
     .catch((error) => {
        console.log(error);
     })
  }

  ratingList() {
    return this.state.ratings.map(currentRating => {
      return <Subject rating={currentRating} key={currentRating._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Class positive feedback based on comments</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Sigla</th>
              <th>Descripcion</th>
              <th>Profesor</th>
              <th>Rating</th>
              <th>Ver Comentarios</th>
            </tr>
          </thead>
          <tbody>
            { this.ratingList() }
          </tbody>
        </table>
      </div>
    )
  }
}