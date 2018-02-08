export const getRecordById = (sellers, idToFind) => sellers.find(({ id }) => id === idToFind);

export const replaceSellerWithObjects = (receipts, sellers) =>
  receipts
    .map(receipt => ({
      ...receipt,
      seller: getRecordById(sellers, receipt.seller),
      place: getRecordById(sellers, receipt.place),
    }));
