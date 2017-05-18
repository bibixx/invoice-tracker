export default function reducer( state = [], action ) {
  return [
    {
      id: "a",
      name: "Firma D",
      city: "New city",
      street: "New street",
      zip: "00-000",
      nip: "0000000000",
      isSeller: true,
      isPlace: true,
    },
    {
      id: "b",
      name: "Firma B",
      city: "New city",
      street: "New street",
      zip: "00-000",
      nip: "0000000000",
      isSeller: true,
      isPlace: false,
    },
    {
      id: "c",
      name: "Firma A",
      city: "New city",
      street: "New street",
      zip: "00-000",
      nip: "0000000000",
      isSeller: false,
      isPlace: true,
    },
  ];
}
