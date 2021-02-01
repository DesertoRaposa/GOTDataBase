import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class HousesPage extends Component {
  gotService = new GotService();

  constructor(props) {
    super(props);
    this.state = {
      selectedHouse: null,
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
      selectedHouse: id
    });
  }

  render() { // проверяем ошибки
    const { error, selectedHouse } = this.state;
    if (error) {
      return <ErrorMessage />;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllHouses}// здесь может быть любой метод из gotServices
        renderItem={({ name, region }) => `${name} (${region})`}
      /> // отрисовать можно что угодно, имя, пол, регион
    );

    const itemDetails = (
      <ItemDetails
        itemId={selectedHouse}
        getData={this.gotService.getHouse}
      >
        <Field field="region" label="Region" />
        <Field field="words" label="Words" />
        <Field field="titles" label="Titles" />
        <Field field="coatOfArms" label="Coat of arms" />
      </ItemDetails>
    );

    return (
      <Row>
        <RowBlock left={itemList} right={itemDetails} />
      </Row>
    );
  }
}

ItemList.defaultProps = { // свойства по умолчанию
  onItemSelected: () => {}
};
