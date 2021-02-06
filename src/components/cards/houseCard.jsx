import React, { Component } from 'react';
import { Alert, Card, ListGroup } from 'react-bootstrap';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

const AlertMessage = () => (
  <Alert
    variant="dark"
    className="rounded text-center colorscheme border-0 text-light shadow p-1"
  >
    Please, select item in the list
  </Alert>
);

export default class HouseCard extends Component {
  gotService = new GotService();

  constructor(props) {
    super(props);
    this.state = {
      house: null,
      loading: true,
      error: false
    };
  }

  componentDidMount() {
    this.updateHouse();
  }

  componentDidUpdate(prevProps) {
    const { houseID } = this.props;
    if (houseID !== prevProps.houseID) {
      this.updateHouse();
    }
  }

  onHouseDetailsLoaded = (house) => {
    this.setState({
      house,
      loading: false
    });
  }

  onError() {
    this.setState({
      house: null,
      error: true
    });
  }

  updateHouse() {
    const { houseID } = this.props;
    if (!houseID) {
      return;
    }

    this.setState({
      loading: true
    });

    this.gotService.getHouse(houseID)
      .then(this.onHouseDetailsLoaded)
      .catch(() => this.onError());
  }

  render() {
    const { house, error, loading } = this.state;
    if (!house && error) {
      return <ErrorMessage />;
    }
    if (!house) {
      return <AlertMessage />;
    }

    const {
      name,
      region,
      words,
      titles,
      coatOfArms
    } = house;

    if (loading) {
      return <Spinner />;
    }

    return (
      <Card className="border-0 shadow-lg">
        <Card.Body className="text-center p-0">
          <Card.Header className="text-white colorscheme fs p-2">{name}</Card.Header>
          <ListGroup variant="flush rounded">
            <ListGroup.Item className="d-flex justify-content-between py-2 card-bg ">
              <span className="item-width term text-left"> Region</span>
              <span>{region}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between py-2 card-bg ">
              <span className="item-width term text-left"> Words</span>
              <span>{words}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between py-2 card-bg ">
              <span className="item-width term text-left"> Titles</span>
              <span>{titles}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between py-2 card-bg ">
              <span className="item-width term text-left"> Coat of arms</span>
              <span>{coatOfArms}</span>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }
}
