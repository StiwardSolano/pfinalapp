import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.scss';
import '../styles/react-raterReco.css';
import Reco from "./reco.component";

//component to get worst rated teachers
const Subject = props => (
  <tr>
    <td>{props.rating.coments[0].subjectId[0]}</td>
    <td>{props.rating.coments[0].description[0]}</td>
    <td>{props.rating.coments[0].teachername[0]}</td>
    <td><Rater rating={props.rating.total} total={5} interactive={false}><Reco /></Rater> {props.rating.total} Comentarios de mejora</td>
    <td>
      <Link to={"/comments/"+props.rating._id}>comentarios</Link>
    </td>{/**/}
  </tr>
)

export default class RecoList extends Component {

  constructor(props) {
    super(props);
    this.state = {ratings: []};
  }

  componentDidMount() {
    axios.get('https://pfinalapi.herokuapp.com/rated/reco/')
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
        <h3>Class negative feedback based on comments</h3>
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