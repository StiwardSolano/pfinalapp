import React, { Component} from "react";
import axios from 'axios';
const teacherid_array = window.location.pathname.split('/');

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",

      comment: {
        teacherId: "",
        name: "",
        message: ""
      }
    };

    // bind context to methods
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log(teacherid_array[2]);
  }

  /**
   * Handle form input field changes & update the state
   */
  handleFieldChange = event => {
    const { value, name } = event.target;

    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value,
        teacherId: teacherid_array[2]
      }
    });
  };

  /**
   * Form submit handler
   */
  onSubmit(e) {
    // prevent default form submission
    e.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }

    // loading status and clear error
    this.setState({ error: "", loading: true });

    // persist the comments on server
    //new persist function using axios
    const comment = {
      teacherId: teacherid_array[2],
      name: this.state.comment.name,
      message: this.state.comment.message
    };

    console.log(comment);

    axios.post('http://localhost:5000/comments/add/'+teacherid_array[2], comment)
    .then(res => console.log(res.data))
    .then(res => {
        // add time return from api and push comment to parent state
        comment.teacherId = teacherid_array[2];
        //console.log(comment);
        this.props.addComment(comment);
        // clear the message box
        this.setState({
          loading: false,
          comment: { ...comment, message: "", name:"" }
        });
      })
    .catch(error => {
      console.log(error.response);
      this.setState({
        error: "Error fatal, revisa la api.",
        loading: false
      });
    });
    //
    /*
    let { comment } = this.state;
    fetch('http://localhost:5000/comments/add/'+teacherid_array[2], {
      method: "post",
      body: //JSON.stringify(comment)
          JSON.stringify(
            teacherid_array[2],
            this.state.comment.name,
            this.state.comment.message
          )  
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.setState({ loading: false, error: res.error });
          console.log('El error está aquí:'+res.error);
        } else {
          // add time return from api and push comment to parent state
          comment.teacherId = teacherid_array[2];
          //console.log(comment);
          this.props.addComment(comment);

          // clear the message box
          this.setState({
            loading: false,
            comment: { ...comment, message: "", name:"" }
          });
        }
      })
      .catch(err => {
        this.setState({
          error: "Error fatal, revisa la api.",
          loading: false
        });
      });*/
  }

  /**
   * Simple validation
   */
  isFormValid() {
    return this.state.comment.name !== "" && this.state.comment.message !== "";
  }

  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  render() {
    return (
      <React.Fragment>
        <form method="post" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              onChange={this.handleFieldChange}
              value={this.state.comment.name}
              className="form-control"
              placeholder="😎 Nombre"
              name="name"
              type="text"
            />
          </div>

          <div className="form-group">
            <textarea
              onChange={this.handleFieldChange}
              value={this.state.comment.message}
              className="form-control"
              placeholder="🤬 Tus palabras"
              name="message"
              rows="5"
            />
          </div>

          {this.renderError()}

          <div className="form-group">
            <button disabled={this.state.loading} className="btn btn-primary">
              Insertar Commentario &#10148;
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
