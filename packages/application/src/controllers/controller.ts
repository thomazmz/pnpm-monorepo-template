import { Service } from '@monorepo/application/services'

export class Controller {
  public readonly service = new Service()
  public readonly name = 'controller'
}