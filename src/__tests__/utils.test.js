import axios from 'axios';
import { calcCubicWeight, fetchProducts } from '../utils'

jest.mock('axios')

test('Check calcCubicWeight, integer input/output', () => {
  const height = 20,
        width = 30,
        length = 40,
        expected = 6
  
  const result = calcCubicWeight({ height, width, length})

  expect(result).toEqual(expected)
})

test('Check calcCubicWeight, decimal places in output, no floating point errors', () => {
  const height = 5,
        width = 26,
        length = 26,
        expected = 0.845

  const result = calcCubicWeight({ height, width, length})

  expect(result).toEqual(expected)      
})


test('Check calcCubicWeight, decimal input/output, no floating point errors', () => {
  const height = 87.5,
        width = 49.5,
        length = 56.7,
        expected = 61.39546875

  const result = calcCubicWeight({ height, width, length})

  expect(result).toEqual(expected)      
})

test('Fetches API, calculates data, one endpoint', async () => {
  const base = "base",
        url = "url",
        category = "Box",
        objects = [{
          title: "Product 1",
          category: "Box",
          size: {
            height: 20,
            width: 30,
            length: 40
          }
        },
        {
          title: "Product 2",
          category: "Bowl",
          size: {
            height: 20,
            width: 30,
            length: 40
          }
        },
        {
          title: "Product 3",
          category: "Box",
          size: {
            height: 20,
            width: 30,
            length: 40
          }
        }
      ],
      next = null
  
  const resp = { data: { objects, next } }
  axios.get.mockResolvedValue(resp)
  const result = await fetchProducts(base, url, category)

  // Category filters as intended
  expect(result).toHaveLength(2)

  // Order is preserved
  expect(result[0].title).toBe(objects[0].title)

  // Cubic weight calculated correctly
  expect(result[0].cubicWeight).toBe(6)
  
  expect(axios.get.mock.calls.length).toBe(1)
})
