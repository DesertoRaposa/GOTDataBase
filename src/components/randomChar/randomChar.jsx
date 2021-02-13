import React, { Component } from 'react';
import './randomChar.css';
import { Card, ListGroup } from 'react-bootstrap';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {
  gotService = new GotService();

  static defaultProps = { interval: 100000 };// можно задавать параметры по умолчанию для пропсов

  constructor(props) {
    super(props);
    this.state = {
      char: {},
      loading: true,
      error: false
    };
  }

  componentDidMount() { // вызывается когда компонент успешно отрисовался и появился  на странице
    const { interval } = this.props;
    this.updateCharacter();
    this.timerId = setInterval(this.updateCharacter, interval);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false
    });
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false
    });
  }

  updateCharacter = () => {
    const id = Math.floor(Math.random() * 140 + 25); // от 25 до 140 персонажа
    // const id = 1300000; //для проверки обработки ошибок
    this.gotService.getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  }

  render() {
    const { char, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
      <Card className="border-0  my-4 bg-color">
        {errorMessage}
        {spinner}
        {content}
      </Card>
    );
  }
}

const View = ({ char }) => {
  const {
    name,
    gender,
    born,
    died,
    culture
  } = char;
  return (
    <>
      <Card.Body className="text-center p-0 ">
        <Card.Header className="text-white colorscheme fs p-2">
          Random Character:
          {` ${name}`}
        </Card.Header>
        <ListGroup variant="flush rounded">
          <ListGroup.Item className="d-flex justify-content-between py-2 card-bg">
            <span className="term">Gender </span>
            <span>{gender}</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between card-bg">
            <span className="term">Born </span>
            <span>{born}</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between card-bg">
            <span className="term">Died </span>
            <span>{died}</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between card-bg">
            <span className="term">Culture </span>
            <span>{culture}</span>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </>
  );
};
