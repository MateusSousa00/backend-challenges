const input = {
  purchases: [
    {
      date: "2022-01-01",
      products: [
        {
          cod: "a",
          amount: 2,
          unit_value: 12.34,
        },
        {
          cod: "b",
          amount: 1,
          unit_value: 3.99,
        },
        {
          cod: "c",
          amount: 3,
          unit_value: 98.14,
        },
      ],
    },
    {
      date: "2022-01-02",
      products: [
        {
          cod: "a",
          amount: 6,
          unit_value: 12.34,
        },
        {
          cod: "b",
          amount: 1,
          unit_value: 3.99,
        },
        {
          cod: "c",
          amount: 1,
          unit_value: 34.02,
        },
      ],
    },
  ],
};

//using map

const result = input.purchases
  .flatMap((purchase) => purchase.products)
  .reduce((acc, item) => acc + item.amount * item.unit_value, 0);

console.log(`(using flatMap and reduce) Total Value: R$ ${result}`); //435.14

//without map, flatMap or reduce

function filterByKey(arr, key) {
  let index = 0;
  let result = [];
  function rec() {
    if (index < arr.length) {
      result.push(arr[index][key]);
      index++;
    }
    index < arr.length && rec();
  }
  rec();
  return result;
}

function multiplyArr(arr, firstKey, secondKey) {
  let index = 0;
  let result = 0;
  function rec() {
    if (index < arr.length) {
      result += arr[index][firstKey] * arr[index][secondKey];
      index++;
    }
    index < arr.length && rec();
  }
  rec();
  return result;
}

const products = filterByKey(input.purchases, "products").concat.apply(
  [],
  filterByKey(input.purchases, "products")
);

const total = multiplyArr(products, "amount", "unit_value");

console.log(`(without map, flatMap or reduce) Total Value: R$${total}`); //435.14