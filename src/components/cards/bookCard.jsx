import React, { Component } from 'react';
import { ListGroup, Card } from 'react-bootstrap';
import './card.css';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

export default class BooksCard extends Component {
  gotService = new GotService();

  constructor(props) {
    super(props);
    this.state = {
      book: null,
      loading: true,
      error: false
    };
  }

  componentDidMount() {
    this.loadBookData();
  }

  onBookDetailsLoaded = (book) => {
    this.setState({
      book,
      loading: false
    });
  }

  onError() {
    this.setState({
      book: null,
      error: true
    });
  }

  loadBookData() {
    const { bookId } = this.props;
    if (!bookId) {
      return;
    }

    this.setState({
      loading: true
    });

    this.gotService.getBook(bookId)
      .then(this.onBookDetailsLoaded)
      .catch(() => this.onError());
  }

  render() {
    const { book, error, loading } = this.state;

    if (!book && error) {
      return <ErrorMessage />;
    }

    if (loading) {
      return <Spinner />;
    }

    const {
      id,
      name,
      numberOfPages,
      publisher,
      released
    } = book;

    return (
      <>
        <Card className="border-0 shadow-lg m-4">
          <Card.Body className="text-center p-0">
            <Card.Header className="text-white colorscheme fs p-2">{name}</Card.Header>
            <ListGroup variant="flush rounded">
              <ListGroup.Item className="d-flex justify-content-between py-2 card-bg ">
                <span className="item-width term text-left"> Number of pages</span>
                <span>{numberOfPages}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between py-2 card-bg ">
                <span className="item-width term text-left"> Publisher</span>
                <span>{publisher}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between py-2 card-bg ">
                <span className="item-width term text-left"> Released</span>
                <span>{released}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
        <div className={`book_cover book_${id}b mx-auto`} />
      </>
    );
  }
}
