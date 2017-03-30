export function ajax( url, method, obj, onload, onerror = () => {} ) {
  const oReq = new XMLHttpRequest();
  const loc = window.location;
  const urlToConnect = `${loc.protocol}//${loc.hostname}${( loc.port === "" ) ? "" : ":80"}${url}`;

  oReq.open( method, urlToConnect, true );
  if ( typeof obj === "string" ) {
    oReq.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
  }
  oReq.onload = () => {
    const error = onload( oReq ) || false;
    if ( !error ) {
      onerror( error );
    }
  };
  oReq.send( obj );
}
