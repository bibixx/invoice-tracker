import { RECORDS_PER_PAGE } from 'src/constants/pages';
import { fakeCompanies } from 'src/utils/faker';

export const getCompanies = page => Promise.resolve({
  companies: fakeCompanies.slice(page * RECORDS_PER_PAGE, (page + 1) * RECORDS_PER_PAGE),
  numberOfPages: Math.ceil(fakeCompanies.length / RECORDS_PER_PAGE),
});

export const getCompanyById = id => Promise.resolve(
  fakeCompanies.find(({ id: companyId }) => id === companyId),
);
