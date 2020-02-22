import { calcCubicWeight } from '../utils'

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
