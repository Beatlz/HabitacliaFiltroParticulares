import puppeteer from "puppeteer"
import getPageUrl from "../utils/getPageUrl"

import type Filters from "../types/Filters"

export default async (filters: Filters) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const url = getPageUrl(filters.page || 0)

  await page.goto(url)

  const results = await page.evaluate((filters: Filters) => {
    const elements = Object.values(document.querySelectorAll(".list-item"))
    const filteredApartments: {
      price: number,
      rooms: number,
      url: string,
    }[] = []

    elements.forEach(element => {
      // Elements
      const priceElement = element.querySelector("[itemprop='price']") as HTMLElement
      const roomsElement = element.querySelector(".list-item-feature") as HTMLElement
      // Attributes
      const price = parseInt(priceElement.innerText.replace(".", ""))
      const rooms = parseInt(roomsElement.innerText.split("-")[1])
      const url = element.querySelector("h3.list-item-title > a")?.getAttribute("href")!
        
      if (price < filters.price && rooms === filters.rooms) {
        filteredApartments.push({
          url,
          price,
          rooms
        })
      }
    })

    console.log(filteredApartments)

    return filteredApartments
  }, filters)

  await browser.close()

  if (results.length) {
    results.forEach(result => {
      console.log(result.url)
    })

    return
  }

  console.log(`No results for filters: ${filters.rooms} rooms, €${filters.price} in page ${filters.page && filters.page !== 0 ? filters.page + 1 : 1}`)

  return results
}
