import React, { Component } from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';
import HouseCard from '../cards/houseCard';

export default class HousesList extends Component {
  gotService = new GotService();

  constructor(props) {
    super(props);
    this.state = {
      housesList: null,
      error: false,
      selectedHouse: null
    };
  }

  componentDidMount() {
    this.gotService.getAllHouses()
      .then((housesList) => {
        this.setState({
          housesList,
          error: false
        });
      })
      .catch(() => { this.onError(); });
  }

  componentDidCatch() {
    this.setState({
      housesList: null,
      error: true
    });
  }

  onError() {
    this.setState({
      housesList: null,
      error: true
    });
  }

  onHouseSelected = (id) => {
    this.setState({
      selectedHouse: id
    });
  }

  renderItems(arr) {
    return arr.map((item) => {
      const { id, name, region } = item;
      return (
        <li
          key={id}
          className="list-group-item"
          onClick={() => this.onHouseSelected(id)}
        >
          { `${name} (${region})` }
        </li>
      );
    });
  }

  render() {
    const { housesList, error, selectedHouse } = this.state;

    if (error) {
      return <ErrorMessage />;
    }

    if (!housesList) {
      return <Spinner />;
    }

    const items = this.renderItems(housesList);

    return (
      <Row className="p-2 m-0">
        <Col md="" className="py-4">
          <HouseCard houseID={selectedHouse} />
          <Scrollbars style={{ height: 500 }} className="rounded my-4">
            <ListGroup
              variant="flush"
              className="rounded item-list card-bg shadow cursor-pointer"
            >
              { items }
            </ListGroup>
          </Scrollbars>
        </Col>
      </Row>
    );
  }
}
