import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ListGroup, Row, Col } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

export class BooksList extends Component {
  gotService = new GotService();

  constructor(props) {
    super(props);
    this.state = {
      booksList: null,
      error: false
    };
  }

  componentDidMount() {
    this.gotService.getAllBooks()
      .then((booksList) => {
        this.setState({
          booksList,
          error: false
        });
      })
      .catch(() => { this.onError(); });
  }

  componentDidCatch() {
    this.setState({
      booksList: null,
      error: true
    });
  }

  onError() {
    this.setState({
      booksList: null,
      error: true
    });
  }

  onBookSelected(bookID) {
    const { history } = this.props;
    history.push(`/books/${bookID}`);
  }

  renderItems(arr) {
    return arr.map((item) => {
      const { id, name } = item;
      return (
        <li
          key={id}
          className="list-group-item"
          onClick={() => this.onBookSelected(id)}
        >
          { name }
        </li>
      );
    });
  }

  render() {
    const { booksList, error } = this.state;

    if (error) {
      return <ErrorMessage />;
    }

    if (!booksList) {
      return <Spinner />;
    }

    return (
      <Row className="p-2 m-0">
        <Col md="" className="py-4">
          <Scrollbars style={{ height: 500 }} className="rounded my-4">
            <ListGroup
              variant="flush"
              className="rounded item-list card-bg shadow cursor-pointer"
            >
              { this.renderItems(booksList) }
            </ListGroup>
          </Scrollbars>
        </Col>
      </Row>
    );
  }
}
export default withRouter(BooksList);
