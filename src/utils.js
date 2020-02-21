import axios from "axios"
import _get from "lodash.get"

const fetchProducts = async (base, url, category) => {
  const categorisedProducts = []
  var next = url

  // if next url is not empty, continue searching through API
  while(!!next) {
    let data = await axios.get(base + next)

    console.log(`data, CP => `, data, categorisedProducts)
    const objects = _get(data, "data.objects")
    console.log(`category => `, category)
    const filtered = objects.filter(obj => {
      console.log(`obj.category => `, obj.category)
      return obj.category === category
    })
    console.log(`filtered => `, filtered)
    const calculated = filtered.map(obj => ({
      ...obj,
      cubicWeight: calcCubicWeight(obj.size)
    }))
    calculated.forEach(product => categorisedProducts.push(product))
    // categorisedProducts = categorisedProducts.concat(calculated)
    next = data.data.next
  }
  return categorisedProducts
}

const CENTIMETRE_CUBED_TO_METERS_CUBED = 1000000
const CUBIC_WEIGHT_CONVERSION_FACTOR = 250
const calcCubicWeight = ({ height, width, length }) => {
  return height * width * length / CENTIMETRE_CUBED_TO_METERS_CUBED * CUBIC_WEIGHT_CONVERSION_FACTOR
}

export {
  fetchProducts
}