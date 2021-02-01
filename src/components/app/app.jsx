import React, { Component } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import {
  CharacterPage,
  BooksPage,
  HousesPage,
  BooksItem
} from '../pages';

const Page = styled.div`
  max-width: 1440px;
  min-height:100vh;
  margin: auto;
`;

export default class App extends Component {
  gotService = new GotService();

  constructor(props) {
    super(props);
    this.state = {
      showRandomChar: true,
      error: false
    };
  }

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    const { showRandomChar, error } = this.state;

    if (error) {
      return <ErrorMessage />;
    }
    const char = showRandomChar ? <RandomChar /> : null;

    return (
      <Router>
        <Page>
          <div className="app mx-4">
            <Container className="shadow-lg bg px-0 pb-4 rounded">
              <Header />
              <Row>
                <Col md="4" className="m-4 pb-4">
                  {char}
                </Col>
              </Row>
              <Route path="/" exact component={() => <Col className="mx-auto my-4" md="5"><h5 className="font-weight-normal text-light text-center p-3 colorscheme shadow-lg rounded">Welcome to GOT DataBase</h5></Col>} />
              <Route path="/characters" component={CharacterPage} />
              <Route path="/books" component={BooksPage} exact />
              <Route
                path="/books/:id"
                render={(match) => <BooksItem bookId={match.match.params.id} />}
              />
              <Route path="/houses" component={HousesPage} />
            </Container>
          </div>
        </Page>
      </Router>
    );
  }
}
