import React, { Component } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
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

const Title = () => (
  <div className="d-flex mx-4 align-items-end title-height">
    <div className="" md="5">
      <h2 className="title text-light text-start">
        Welcome to Game of Thrones DataBase.
      </h2>
    </div>
  </div>
);

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

  toggleRandomChar = () => {
    const { showRandomChar } = this.state;
    this.setState({
      showRandomChar: !showRandomChar
    });
  }

  render() {
    const { showRandomChar, error } = this.state;

    if (error) {
      return <ErrorMessage />;
    }
    return (
      <Router>
        <Container className="my-4 shadow-lg rounded containerwidth">
          <Row className="position-relative">
            <Col md="8" className="bg rounded">
              <Title />
              {/* <Route
                path="/"
                exact
                component={() => <Title />} //компонент появится только на главной странице
              /> */}
              <Button
                className="m-4 shadow-lg text-light"
                onClick={this.toggleRandomChar}
                variant=""
              >
                Show me a random character
              </Button>
              <Col md="8" className="ml-2">
                {showRandomChar ? null : <RandomChar />}
              </Col>
              <div className="d-flex mx-4 flex-column">
                <Header />
              </div>
            </Col>
            <Col md="4" className="rounded-right white-bg p-0">
              <Route path="/characters" component={CharacterPage} />
              <Route path="/houses" component={HousesPage} />
              <Route path="/" exact component={() => <> <div className="glt"/> <div className="vl"/> <div className="glb"/> </>} />
            </Col>
            <Route path="/" exact component={() => <div className="bg-info main-bg shadow"> </div>} />
          </Row>
        </Container>

        {/* <Page>

          <div className="app mx-4 shadow-lg">
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
        </Page> */}
      </Router>
    );
  }
}
