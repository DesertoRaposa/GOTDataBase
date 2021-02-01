import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import GotService from '../../services/gotService';
import ItemDetails, { Field } from '../itemDetails';

export default class BooksItem extends Component {
  gotService = new GotService();

  render() {
    const { bookId } = this.props;
    return (
      <Col md="5" className="mx-auto pb-4">
        <ItemDetails
          itemId={bookId} // инфо о выбранном элементе
          getData={this.gotService.getBook}
        >
          <Field field="numberOfPages" label="Number of pages" />
          <Field field="publisher" label="Publisher" />
          <Field field="released" label="Released" />
        </ItemDetails>
      </Col>
    );
  }
}
