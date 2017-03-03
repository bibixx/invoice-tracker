import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class RecordsStore extends EventEmitter {
  constructor() {
    super();
    this.records = [
      {
        id: 1,
        name: "Apple iPhone 6s 64GB Silver",
        place: "Teletoruim Promenada",
        date: "2017-03-03",
        warrantyLength: 1,
        notes: "",
        attachements: [
          {
            type: "image",
            url: "https://unsplash.it/200/200?image=998",
          },
          {
            type: "image",
            url: "https://unsplash.it/200/200?image=974",
          },
        ],
      },
      {
        id: 0,
        name: "Lorem ipsum dolor sit amet",
        place: "Media Markt Polska Sp. z o.o (Market Ostrobramska)",
        date: "2014-03-26",
        warrantyLength: 2,
        notes: "Lipsum",
        attachements: [],
      },
    ];
  }

  getAll() {
    return this.records;
  }

  getById( id ) {
    let obj = null;
    this.records.forEach( ( v ) => {
      if ( v.id === parseInt( id, 10 ) ) {
        obj = v;
      }
    } );

    return obj;
  }

  /* eslint-disable default-case */
  handleActions( action ) {
    switch ( action.type ) {
      case "CREATE_QUOTE":
        this.createQuote( action.text, action.teacher, action.info, action.name );
        break;
    }
  }
  /* eslint-enable default-case */
}


const recordsStore = new RecordsStore();
dispatcher.register( recordsStore.handleActions.bind( recordsStore ) );

export default recordsStore;
