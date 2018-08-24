'use strict'

const { expect } = require('chai')
const sinon = require('sinon')
const mookie = require('..')

describe('mookie', () => {
  it('should throw an error if injected middleware is not a function', () => {
    async function main() {}

    const fn = () => mookie(main).use('')
    expect(fn).to.throw(/must be a function/)
  })

  it('should execute a handler without any middleware', async () => {
    async function main(event, context) {
      return { message: 'Hello world!' }
    }

    const response = await mookie(main)({}, {})
    expect(response).to.deep.equal({ message: 'Hello world!' })
  })

  it('should execute a handler with one middleware injected', async () => {
    async function addRuntime(handler, next) {
      handler.context.runtime = 'nodejs8.10'
      await next()
    }

    async function main(event, context) {
      return {
        event,
        context
      }
    }

    const response = await mookie(main).use(addRuntime)({}, {})
    expect(response).to.deep.equal({
      context: {
        runtime: 'nodejs8.10'
      },
      event: {}
    })
  })

  // TODO: write a case for multiple middlewares injection
})
