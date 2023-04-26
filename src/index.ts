import generateLinks from "./modules/generateLinks";

import type Filters from "./types/Filters";

const args = process.argv.slice(2);
const [rooms, price, page] = args
const filters: Filters = {
  rooms: parseInt(rooms),
  price: parseInt(price),
  page: parseInt(page)
}


if (filters.rooms && filters.price) {
  generateLinks({
    rooms: filters.rooms,
    price: filters.price,
    page: filters.page
  });
} else {
  console.log(`filters ${filters.rooms} ${filters.price}`)
  console.error(`Error:
  You should provide rooms and max price. E.g:
  npm start 3 1250`)
}
