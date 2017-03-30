import dispatcher from "../dispatcher";

export function createRecord( obj, callback ) {
  dispatcher.dispatch( {
    type: "CREATE_RECORD",
    obj,
    callback,
  } );
}

export function editRecord( id, obj, callback ) {
  dispatcher.dispatch( {
    type: "EDIT_RECORD",
    id,
    obj,
    callback,
  } );
}

export function removeRecord( id, callback ) {
  dispatcher.dispatch( {
    type: "REMOVE_RECORD",
    id,
    callback,
  } );
}

export function syncRecords() {
  dispatcher.dispatch( {
    type: "SYNC_RECORD",
  } );
}
