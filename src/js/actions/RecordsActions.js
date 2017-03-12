import dispatcher from "../dispatcher";

export function createRecord( obj, callback ) {
  dispatcher.dispatch( {
    type: "CREATE_RECORD",
    obj,
    callback,
  } );
}

export function syncRecords() {
  dispatcher.dispatch( {
    type: "SYNC_RECORD",
  } );
}
