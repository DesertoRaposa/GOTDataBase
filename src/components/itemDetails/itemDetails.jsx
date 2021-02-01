import React, { Component } from 'react';
import './itemDetails.css';
import { Card, ListGroup, Alert } from 'react-bootstrap';

const Field = ({ item, field, label }) => (
  <ListGroup.Item className="d-flex justify-content-between">
    <span className="item-width term text-left">
      {label}
    </span>
    <span>{item[field]}</span>
  </ListGroup.Item>
);

export {
  Field
};

const AlertMessage = () => (
  <Alert variant="dark" className="rounded text-center colorscheme border-0 text-light">
    Please, select item in the list
  </Alert>
);

export default class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null
    };
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    const { itemId } = this.props;
    if (itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData } = this.props;
    if (!itemId) {
      return;
    }
    getData(itemId)
      .then((item) => {
        this.setState({ item });
      });
  }

  render() {
    const { item } = this.state;
    const { children } = this.props;
    if (!item) {
      return <div><AlertMessage /></div>;
    }
    const { name } = item;
    return (
      <Card className="border-0 shadow-lg">
        <Card.Body className="text-center p-0">
          <Card.Header className="text-white bg-dark fs">{name}</Card.Header>
          <ListGroup variant="flush rounded">
            {
            React.Children.map(children, (child) => (
              React.cloneElement(child, { item })
            ))
            }
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }
}
