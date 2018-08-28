'use strict'

module.exports = function mookie(func) {
  const middlewares = []

  function mookieInstance(event, context) {
    const handler = {
      event,
      context,
      response: undefined
    }

    return run(handler, 0).then(() => handler.response)
  }

  function run(handler, i) {
    if (i < middlewares.length) {
      return Promise.resolve(
        middlewares[i](handler, run.bind(null, handler, i + 1))
      )
    }

    return func(handler.event, handler.context).then(response => {
      handler.response = response
    })
  }

  mookieInstance.use = function use(middleware) {
    if (typeof middleware !== 'function') {
      throw new TypeError('`middleware` must be a function')
    }

    middlewares.push(middleware)

    return mookieInstance
  }

  return mookieInstance
}
