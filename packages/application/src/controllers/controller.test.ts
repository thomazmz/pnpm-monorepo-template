import { Controller } from '@monorepo/application/controllers'

describe('controller', () => {
  it('should pass', () => {
    const controller = new Controller()
    expect(controller.name).toBe('controller')
    expect(controller.service.name).toBe('SERVICE')
  })
})