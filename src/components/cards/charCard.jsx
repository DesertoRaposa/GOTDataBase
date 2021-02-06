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

export default class CharCard extends Component {
  gotService = new GotService();

  constructor(props) {
    super(props);
    this.state = {
      char: null,
      loading: true,
      error: false
    };
  }

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    const { charId } = this.props;
    if (charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  onCharDetailsLoaded = (char) => {
    this.setState({
      char,
      loading: false
    });
  }

  onError() {
    this.setState({
      char: null,
      error: true
    });
  }

  updateChar() {
    const { charId } = this.props;
    if (!charId) {
      return;
    }

    this.setState({
      loading: true
    });

    this.gotService.getCharacter(charId)
      .then(this.onCharDetailsLoaded)
      .catch(() => this.onError());
  }

  render() {
    const { char, error, loading } = this.state;
    if (!char && error) {
      return <ErrorMessage />;
    }
    if (!char) {
      return <AlertMessage />;
    }

    const {
      name,
      gender,
      born,
      died,
      culture
    } = char;

    if (loading) {
      return <Spinner />;
    }

    return (
      <Card className="border-0 shadow-lg">
        <Card.Body className="text-center p-0">
          <Card.Header className="text-white colorscheme fs p-2">{name}</Card.Header>
          <ListGroup variant="flush rounded">
            <ListGroup.Item className="d-flex justify-content-between py-2 card-bg ">
              <span className="item-width term text-left"> Gender</span>
              <span>{gender}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between py-2 card-bg ">
              <span className="item-width term text-left"> Born</span>
              <span>{born}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between py-2 card-bg ">
              <span className="item-width term text-left"> Died</span>
              <span>{died}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between py-2 card-bg ">
              <span className="item-width term text-left"> Culture</span>
              <span>{culture}</span>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }
}
