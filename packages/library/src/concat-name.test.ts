import { concatName } from './concat-name'

describe('concatName', ()  => {
  it('should concat name', () => {
    const result = concatName('Thomaz', 'Zandonotto')
    expect(result).toBe('thomaz-zandonotto')
  })
})