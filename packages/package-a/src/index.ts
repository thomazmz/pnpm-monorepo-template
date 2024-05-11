import { SomeObject } from '@monorepo/package-b'

function call(someObject: SomeObject) {
  console.log('logged from package a')
}

call({
  something: 'something'
})