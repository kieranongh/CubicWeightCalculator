import axios from "axios"
import _get from "lodash.get"
import * as math from "mathjs"
import uuid from "uuid"

const fetchProducts = async (base, url, category) => {
  const categorisedProducts = []
  var next = url

  // if next url is not empty, continue searching through API
  while(!!next) {
    let data = await axios.get(base + next)

    const objects = _get(data, "data.objects")

    if(!objects) {
      throw "The API endpoint appears to incorrectly configured"
    }
    const filtered = objects.filter(obj => {
      return obj.category === category
    })
    const calculated = filtered.map(obj => ({
      uuid: uuid(),
      ...obj,
      cubicWeight: calcCubicWeight(obj.size)
    }))
    // Choosing to use push each item instead of concat becuase concat
    // will create a new array and copy over previous items
    // This solution retains the original array and only iterates over a relatively
    // small amount of items
    calculated.forEach(product => categorisedProducts.push(product))
    next = _get(data, "data.next")
  }
  
  return categorisedProducts
}

const CUBIC_WEIGHT_CONVERSION_FACTOR = 250
const DIST_UNIT = "cm"
const calcCubicWeight = ({ height, width, length }) => {
  const h = math.unit(height, DIST_UNIT),
        w = math.unit(width, DIST_UNIT),
        l = math.unit(length, DIST_UNIT)
  const volume = math.multiply(h, w, l)
  const cubicWeight = math.multiply(volume.toNumber('m^3'), CUBIC_WEIGHT_CONVERSION_FACTOR)
  return +math.format(cubicWeight, { precision: 14 })
}

export {
  fetchProducts,
  calcCubicWeight
}