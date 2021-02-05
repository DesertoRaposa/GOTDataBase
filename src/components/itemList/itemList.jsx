import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './itemList.css';

import { ListGroup } from 'react-bootstrap';
import Spinner from '../spinner';

export default class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: null
    };
  }

  componentDidMount() {
    const { getData } = this.props;

    getData()
      .then((itemList) => {
        this.setState({
          itemList
        });
      });
  }

  renderItems(arr) {
    const { renderItem, onItemSelected } = this.props;
    return arr.map((item) => {
      const { id } = item;
      const label = renderItem(item);
      return (
        <ListGroup.Item
          key={id}
          className="py-2 card-bg"
          onClick={() => onItemSelected(id)}
        >
          {label}
        </ListGroup.Item>
      );
    });
  }

  render() {
    const { itemList } = this.state;

    if (!itemList) {
      return <Spinner />;
    }

    const items = this.renderItems(itemList);

    return (
      <Scrollbars style={{ height: 500 }} className="rounded my-4">
        <ListGroup variant="flush" className="rounded item-list card-bg shadow">
          {items}
        </ListGroup>
      </Scrollbars>
    );
  }
}