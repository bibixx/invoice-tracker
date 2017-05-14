export const to2dig = text => ( `00${text}` ).slice( -2 );
export const formatDate = date => `${to2dig( date.getDate() )}.${to2dig( date.getMonth() + 1 )}.${date.getFullYear()}`;
