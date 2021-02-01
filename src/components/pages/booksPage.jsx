import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';

export class BooksPage extends Component {
  gotService = new GotService();

  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  componentDidCatch() {
    this.setState({
      error: true
    });
  }

  render() {
    const { error } = this.state;
    const { history } = this.props;
    if (error) {
      return <ErrorMessage />;
    }

    return (
      <Row>
        <Col md="5" className="ml-4">
          <ItemList
            onItemSelected={(itemId) => {
              history.push(`/books/${itemId}`); // получаем history  как пропс с помощью withRouter, таким образом можем переключаться на страницу с книгой
            }}
            getData={this.gotService.getAllBooks}
            renderItem={(item) => item.name}
          />
        </Col>
      </Row>
    );
  }
}
export default withRouter(BooksPage);
