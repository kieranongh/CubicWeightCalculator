import { calcCubicWeight } from '../utils'

test('Check valid, integer', () => {
  const height = 20,
        width = 30,
        length = 40,
        expected = 6
  
  const result = calcCubicWeight({ height, width, length})

  expect(result).toEqual(expected)
})

test('Check valid, multiple decimal places', () => {
  
})
