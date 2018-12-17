import faker from 'faker';

const stringToInt = s => parseInt(s.toLowerCase().replace(/[^a-z0-9]/g, '32'), 36);

faker.seed(stringToInt('invoice'));

const generateFakeCompanies = () => ({
  id: faker.random.uuid(),
  name: faker.company.companyName(),
  city: faker.address.city(),
  streetAddress: faker.address.streetAddress(),
  zipCode: faker.address.zipCode(),
  isPlaceOfPurchase: faker.random.boolean(),
  isSeller: faker.random.boolean(),
});

export const fakeCompanies = new Array(80).fill({}).map(generateFakeCompanies);

const generateFakeProduct = () => ({
  id: faker.random.uuid(),
  timestamp: (faker.date.past(5)).getTime(),
  name: faker.commerce.productName(),
  warrantyLength: faker.random.number({ min: 1, max: 3 }),
  placeOfPurchase: faker.random.arrayElement(
    fakeCompanies
      .filter(({ isPlaceOfPurchase }) => isPlaceOfPurchase),
  ),
  seller: faker.random.arrayElement(
    fakeCompanies
      .filter(({ isSeller }) => isSeller),
  ),
});

export const fakeProducts = new Array(101).fill({}).map(generateFakeProduct);
