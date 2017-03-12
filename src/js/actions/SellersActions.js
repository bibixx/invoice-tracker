import dispatcher from "../dispatcher";

export function createSeller( obj, callback ) {
  dispatcher.dispatch( {
    type: "CREATE_SELLER",
    obj,
    callback,
  } );
}

export function syncSellers() {
  dispatcher.dispatch( {
    type: "SYNC_SELLER",
  } );
}
