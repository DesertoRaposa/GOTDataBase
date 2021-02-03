import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import RowBlock from '../rowBlock';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';

export default class CharacterPage extends Component {
  gotService = new GotService();

  constructor(props) {
    super(props);
    this.state = {
      selectedChar: null,
      error: false
    };
  }

  componentDidCatch() {
    this.setState({
      error: true
    });
  }

  onItemSelected = (id) => {
    this.setState({
      selectedChar: id
    });
  }

  render() {
    const { error, selectedChar } = this.state;
    if (error) {
      return <ErrorMessage />;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllCharacters}
        renderItem={({ name, gender }) => `${name} (${gender})`}
      />
    );

    const itemDetails = (
      <ItemDetails
        itemId={selectedChar}
        getData={this.gotService.getCharacter}
      >
        <Field field="gender" label="Gender" />
        <Field field="born" label="Born" />
        <Field field="died" label="Died" />
        <Field field="culture" label="Culture" />
        <Field field="titles" label="Titles" />
      </ItemDetails>
    );

    return (
      <Row className="p-2 m-0">
        <RowBlock left={itemList} right={itemDetails} />
      </Row>
    );
  }
}
