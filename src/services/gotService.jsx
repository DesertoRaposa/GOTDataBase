import React from 'react';

export default class GotService {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`
      + `, received ${res.status}`);
    }
    return res.json(); // await
  }

  getAllBooks = async () => {
    const res = await this.getResource('/books/');
    return res.map(this._transformBook);
  }

  getBook = async (id) => {
    const book = await this.getResource(`/books/${id}/`);
    return this._transformBook(book);
  }

  // сначала ждем результат getResource,потом вызываем map, когда res вернется
   getAllCharacters = async () => {
     const result = await this.getResource('/characters?page=10&pageSize=20');
     return result.map(this._transformCharacter);
   }

   getCharacter = async (id) => {
     const character = await this.getResource(`/characters/${id}`);
     return this._transformCharacter(character);
   }

  getAllHouses = async () => {
    const res = await this.getResource('/houses/');
    return res.map(this._transformHouse);
  }

  getHouse = async (id) => {
    const house = await this.getResource(`/houses/${id}/`);
    return this._transformHouse(house);
  }

  isSet = (data) => { // проверка на отсутствие запрашиваемой информации
    if (data) {
      return data;
    }
    return (
      <span className="badge badge-secondary">no info</span>
    );
  }

  dateСonversion = (data) => {
    const timestamp = new Date(data); // toLocaleDateString()
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const year = timestamp.getFullYear();
    const day = timestamp.getDate();
    const month = timestamp.getMonth();
    return `${months[month]} ${day}, ${year}`;
  }

  arrayPrepare = (arr) => {
    // console.log(arr.filter(elem => elem.length > 0));
    if (arr.filter((elem) => elem.length > 0).length === 0) {
      return <span className="badge badge-secondary">no info</span>;
    }
    return arr.join(', ');
  }

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)$/;
    return item.url.match(idRegExp)[1];
  }

  _transformCharacter = (char) => ({
    id: this._extractId(char),
    name: this.isSet(char.name),
    gender: this.isSet(char.gender),
    born: this.isSet(char.born),
    died: this.isSet(char.died),
    culture: this.isSet(char.culture),
    titles: this.arrayPrepare(char.titles)
  });

  _transformHouse = (house) => ({
    id: this._extractId(house),
    name: this.isSet(house.name),
    region: this.isSet(house.region),
    words: this.isSet(house.words),
    titles: this.arrayPrepare(house.titles),
    coatOfArms: this.isSet(house.coatOfArms)
  });

  _transformBook = (book) => ({
    id: this._extractId(book),
    name: this.isSet(book.name),
    numberOfPages: this.isSet(book.numberOfPages),
    publisher: this.isSet(book.publisher),
    released: this.isSet ? this.dateСonversion(book.released) : null
  });
}
