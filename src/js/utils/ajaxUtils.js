export function ajax( url, method, obj, onload, onerror = () => {} ) {
  const oReq = new XMLHttpRequest();
  oReq.open( method, url, true );
  oReq.onload = () => {
    const error = onload( oReq ) || false;
    if ( !error ) {
      onerror( error );
    }
  };
  oReq.send( obj );
}
