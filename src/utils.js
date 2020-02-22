import axios from "axios"
import _get from "lodash.get"
import * as math from "mathjs"

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

const CUBIC_WEIGHT_CONVERSION_FACTOR = 250
const DIST_UNIT = "cm"
const calcCubicWeight = ({ height, width, length }) => {
  const h = math.unit(height, DIST_UNIT),
        w = math.unit(width, DIST_UNIT),
        l = math.unit(length, DIST_UNIT)
  const volume = math.multiply(h, w, l)
  const cubicWeight = math.multiply(volume.toNumber('m^3'), CUBIC_WEIGHT_CONVERSION_FACTOR)
  return math.format(cubicWeight, { precision: 14 })
}

export {
  fetchProducts
}