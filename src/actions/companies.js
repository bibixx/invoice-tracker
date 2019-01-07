export const getCompanies = page => ({ type: 'COMPANIES/GET', payload: page });

export const getCompaniesSuccess = companies => ({ type: 'COMPANIES/GET/SUCCESS', payload: companies });
export const getCompaniesFailure = error => ({ type: 'COMPANIES/GET/FAILURE', payload: error });
export const getCompaniesStart = () => ({ type: 'COMPANIES/GET/START' });
