import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

const teacherid_array = window.location.pathname.split('/');

export default class CommentsTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      loading: false
    };

    this.addComment = this.addComment.bind(this);
  }

  componentDidMount() {
    // loading
    this.setState({ loading: true });
    console.log(teacherid_array[2]);
    // colocar id de comentarios
    fetch("https://pfinalapi.herokuapp.com/comments/"+teacherid_array[2])
      .then(res => res.json())
      .then(res => {
        this.setState({
          comments: res,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  /**
   * Add new comment
   * @param {Object} comment
   */
  addComment(comment) {
    this.setState({
      loading: false,
      comments: [comment, ...this.state.comments]
    });
  }

  render() {
    return (
      <div className="App container bg-light shadow">
        <div className="row">
          <div className="col-4  pt-3 border-right">
            <h6>Comenta a tu Profesor</h6>
            <CommentForm addComment={this.addComment} />
          </div>
          <div className="col-8  pt-3 bg-white">
            <CommentList
              loading={this.state.loading}
              comments={this.state.comments}
            />
          </div>
        </div>
      </div>
    );
  }
}