'use strict'

module.exports = function mookie(func) {
  const middlewares = []

  function mookieInstance(event, context) {
    mookieInstance.event = event
    mookieInstance.context = context
    mookieInstance.response = undefined

    return run(0).then(() => mookieInstance.response)
  }

  function run(i) {
    if (i < middlewares.length)
      return Promise.resolve(middlewares[i](mookieInstance, run.bind(null, i + 1)))

    return func(mookieInstance.event, mookieInstance.context).then(response => {
      mookieInstance.response = response
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
