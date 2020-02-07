import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import '../styles/react-rater.css';

//component to get top rated teachers all time
//where comments $gte: 5
const Subject = props => (
  <tr>
    <td>{props.rating.coments[0].subjectId[0]}</td>
    <td>{props.rating.coments[0].description[0]}</td>
    <td>{props.rating.coments[0].teachername[0]}</td>
    <td><Rater rating={props.rating.total} total={5} interactive={false}/> {props.rating.total} Comentarios</td>
    <td>
      <Link to={"/comments/"+props.rating._id}>comentarios</Link>
    </td>{/*{props.rating.coments[0].subjectId[0]}*/}
  </tr>
)

export default class TopRatedList extends Component {

  constructor(props) {
    super(props);
    this.state = {ratings: []};
  }

  componentDidMount() {
    axios.get('https://pfinalapi.herokuapp.com/rated/toprated/')
     .then(response => {
       this.setState({ ratings: response.data });
       console.log(response.data);
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
      <h3>Top 5 most commented teachers all time</h3>
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