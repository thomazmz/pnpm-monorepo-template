import { Utilities } from '@monorepo/library/utilities'

describe('Utilities', () => {
  it('should pass', () => {
    expect(Utilities.uppercase('hello!')).toBe('HELLO!')
  })
})