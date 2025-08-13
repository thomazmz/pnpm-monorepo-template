import { Service } from '@monorepo/application/services'

describe('service', () => {
  it('should pass', () => {
    const service = new Service()
    expect(service.name).toBe('service')
  })
})