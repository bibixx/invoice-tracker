import { EventEmitter } from "events";

import { ajax } from "../utils/ajaxUtils";

import dispatcher from "../dispatcher";

class RecordsStore extends EventEmitter {
  constructor() {
    super();
    this.records = [];
    this.searchFunctionName = "date";
    this.searchFunctionMode = "ASC";
  }

  getAll() {
    switch ( this.searchFunctionName ) {
      case "title":
        this.searchFunction = ( a, b ) => {
          return a.name.localeCompare( b.name );
        };
        break;
      case "date":
      default:
        this.searchFunction = ( a, b ) => {
          const dateA = new Date( a.date );
          const dateB = new Date( b.date );
          return dateB.getTime() - dateA.getTime();
        };
        break;
    }

    const records = this.records.slice( 0 );
    records.sort( ( a, b ) => {
      if ( this.searchFunctionMode === "ASC" ) {
        return this.searchFunction( a, b );
      }

      return this.searchFunction( b, a );
    } );

    return records;
  }

  changeSortMode( a, b ) {
    this.searchFunctionName = a;
    this.searchFunctionMode = b;
    this.emit( "change" );
  }

  getById( id ) {
    let obj = null;
    this.records.forEach( ( v ) => {
      if ( v.id === id ) {
        obj = v;
      }
    } );

    return obj;
  }

  syncRecords() {
    ajax( "/server/getRecords.php", "POST", {}, ( oReq ) => {
      try {
        const response = JSON.parse( oReq.response );
        if ( typeof response.error === "undefined" ) {
          const records = [];

          response.forEach( ( record ) => {
            const data = record.data;

            records.unshift( {
              id: data.id,
              name: data.Product,
              place: data.Place,
              seller: data.Seller,
              date: data.Date,
              warrantyLength: data["Warranty-length"],
              notes: data.Notes,
              attachements: record.files,
            } );
          } );

          this.records = records;
          this.emit( "change" );
        } else {
          alert( response.error );
          console.error( response );
        }
      } catch ( e ) {
        // console.error( oReq.response, e );
        console.error( e );
      }
    } );
  }

  createRecord( obj, callback = () => {} ) {
    ajax( "/server/addRecord.php", "POST", obj, ( oReq ) => {
      try {
        const response = JSON.parse( oReq.response );

        if ( typeof response.error !== "undefined" ) {
          alert( JSON.parse( oReq.response ).error );
          console.error( response );
          return;
        }

        const data = response.data.data;

        this.records.unshift( {
          id: data.id,
          name: data.Product,
          place: data.Place,
          seller: data.Seller,
          date: data.Date,
          warrantyLength: data["Warranty-length"],
          notes: data.Notes,
          attachements: response.files,
        } );

        callback( oReq );
        this.emit( "change" );
      } catch ( e ) {
        console.error( oReq.response, e );
        // console.error( e );
      }
    } );
  }

  editRecord( id, obj, callback = () => {} ) {
    obj.append( "id", id );
    ajax( "/server/editRecord.php", "POST", obj, ( oReq ) => {
      try {
        const response = JSON.parse( oReq.response );

        if ( typeof response.error !== "undefined" ) {
          alert( JSON.parse( oReq.response ).error );
          console.error( response );
          return;
        }

        const data = response.data.data;

        this.records.forEach( ( v, key ) => {
          if ( v.id === id ) {
            this.records[key] = {
              id: data.id,
              name: data.Product,
              place: data.Place,
              seller: data.Seller,
              date: data.Date,
              warrantyLength: data["Warranty-length"],
              notes: data.Notes,
              attachements: response.files,
            };
          }
        } );

        callback( oReq );
        this.emit( "change" );
      } catch ( e ) {
        // console.error( oReq.response, e );
        console.error( e );
      }
    } );
  }

  removeRecord( id, callback = () => {} ) {
    const obj = `id=${id}`;
    ajax( "/server/removeRecord.php", "POST", obj, ( oReq ) => {
      try {
        this.records = this.records.filter( ( v ) => {
          if ( v.id === id ) {
            return false;
          }
          return true;
        } );

        callback( oReq );
        this.emit( "change" );
      } catch ( e ) {
        console.error( oReq.response, e );
        console.error( e );
      }
    } );
  }

  /* eslint-disable default-case */
  handleActions( action ) {
    switch ( action.type ) {
      case "CREATE_RECORD":
        this.createRecord( action.obj, action.callback );
        break;
      case "EDIT_RECORD":
        this.editRecord( action.id, action.obj, action.callback );
        break;
      case "REMOVE_RECORD":
        this.removeRecord( action.id, action.callback );
        break;
      case "SYNC_RECORD":
        this.syncRecords();
        break;
    }
  }
  /* eslint-enable default-case */
}


const recordsStore = new RecordsStore();
dispatcher.register( recordsStore.handleActions.bind( recordsStore ) );

window.RecordsStore = recordsStore;

export default recordsStore;
