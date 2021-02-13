import React, { Component } from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';
import CharCard from '../cards/charCard';

export default class CharList extends Component {
  gotService = new GotService();

  constructor(props) {
    super(props);
    this.state = {
      charList: null,
      error: false,
      selectedChar: null
    };
  }

  componentDidMount() {
    this.gotService.getAllCharacters()
      .then((charList) => {
        this.setState({
          charList,
          error: false
        });
      })
      .catch(() => { this.onError(); });
  }

  componentDidCatch() {
    this.setState({
      charList: null,
      error: true
    });
  }

  onError() {
    this.setState({
      charList: null,
      error: true
    });
  }

  onCharSelected = (id) => { // выбираем персонажа
    this.setState({
      selectedChar: id
    });
  }

  renderItems(arr) {
    return arr.map((item) => {
      const { id, name, gender } = item;
      return (
        <li
          key={id}
          className="list-group-item"
          onClick={() => this.onCharSelected(id)}
        >
          { `${name} (${gender})` }
        </li>
      );
    });
  }

  render() {
    const { charList, error, selectedChar } = this.state;

    if (error) {
      return <ErrorMessage />;
    }

    if (!charList) {
      return <Spinner />;
    }

    const items = this.renderItems(charList);

    return (
      <Row className="p-2 m-0">
        <Col md="" className="py-4">
          <CharCard charId={selectedChar} />
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
