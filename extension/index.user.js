const elements = Object.values(document.querySelectorAll(".list-item"))

elements.forEach(element => {
  const price = parseInt(element.querySelector("[itemprop='price']").innerText.replace(".", ""))
  const rooms = parseInt(element.querySelector(".list-item-feature").innerText.split("-")[1])
    
  if (price > 1350 || rooms !== 3) element.style.display = "none"
})
