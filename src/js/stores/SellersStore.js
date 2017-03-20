import { EventEmitter } from "events";

import { ajax } from "../utils/ajaxUtils";

import dispatcher from "../dispatcher";

class SellersStore extends EventEmitter {
  constructor() {
    super();
    this.sellers = [];
  }

  getAll() {
    return this.sellers;
  }

  getAllSellers() {
    const obj = [];
    this.sellers.forEach( ( v ) => {
      if ( v.seller ) {
        obj.push( v );
      }
    } );

    return obj;
  }

  getAllPlaces() {
    const obj = [];
    this.sellers.forEach( ( v ) => {
      if ( v.place ) {
        obj.push( v );
      }
    } );

    return obj;
  }

  getById( id ) {
    let obj = null;
    this.sellers.forEach( ( v ) => {
      if ( v.id === id ) {
        obj = v;
      }
    } );

    return obj;
  }

  syncSellers() {
    ajax( "/server/getSellers.php", "POST", {}, ( oReq ) => {
      try {
        const response = JSON.parse( oReq.response );
        if ( typeof response.error === "undefined" ) {
          const sellers = [];

          response.forEach( ( record ) => {
            const data = record.data;

            sellers.unshift( {
              id: data.id,
              name: data.Name,
              city: data.City,
              street: data.Street,
              zip: data.Zip,
              nip: data.NIP,
              seller: ( data.isSeller === "1" ),
              place: ( data.isPlace === "1" ),
            } );
          } );

          this.sellers = sellers;
          this.emit( "change" );
        } else {
          alert( response.error );
          console.error( response );
        }
      } catch ( e ) {
        console.error( oReq.response, e );
      }
    } );
  }

  createSeller( obj, callback = () => {} ) {
    ajax( "/server/addSeller.php", "POST", obj, ( oReq ) => {
      try {
        const response = JSON.parse( oReq.response );

        if ( typeof response.error !== "undefined" ) {
          alert( JSON.parse( oReq.response ).error );
          console.error( response );
          return;
        }

        console.log( response );

        callback( oReq );
        this.emit( "change" );
      } catch ( e ) {
        console.error( oReq.response, e );
      }
    } );
  }

  /* eslint-disable default-case */
  handleActions( action ) {
    switch ( action.type ) {
      case "CREATE_SELLER":
        this.createSeller( action.obj, action.callback );
        break;
      case "SYNC_SELLER":
        this.syncSellers();
        break;
    }
  }
  /* eslint-enable default-case */
}

const sellersStore = new SellersStore();
dispatcher.register( sellersStore.handleActions.bind( sellersStore ) );

export default sellersStore;
